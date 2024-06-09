---
title: Handling Has-Many Through Cascading Deletes in Rails
description: >
  In our most recent stream, we were updating our tests and discovered that we had a cascading deletion that was failing. We spent a lot of time debugging as there wasn't good documentation on the subject. This is a post describing the solution and how to handle this in Rails.
date: 2024-06-08
heroImage: ./blog-assets/20240608-handling-has-many-through-cascading-deletes-in-rails.png
alt: Handling Has-Many Through Cascading Deletes in Rails
tags:
  - Ruby on Rails
---

On the stream, we're building an event platform using [Ruby on Rails](https://rubyonrails.org/). In this week's past stream (see below), we ran into a problem with cascading deletes while running our tests. This issue stemmed from a misconfiguration of a "has_many through" relationship in our models.

<iframe src="https://www.youtube.com/embed/YVIYRiK2QaA?si=gZaZ6LqK2QrKhi4Y&amp;start=13050" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

To focus on this problem, we'll only look at the relevant parts of our application. This includes the `Event`, `EventSession`, `EventSpeaker`, and `EventSessionSpeaker` models. In our application, an `Event` has many `EventSessions` and `EventSpeakers`. An `EventSession` has many `EventSessionSpeakers`, and an `EventSpeaker` has many `EventSessionSpeakers`. This means we have 2 1-to-many relations and 1 many-to-many relation. Our reduced schema to focus on the relationships looks like this:

```ruby
ActiveRecord::Schema[7.1].define(version: 2024_05_31_000328) do
  create_table "event_session_speakers", id: false, force: :cascade do |t|
    t.string "event_session_id", null: false
    t.string "event_speaker_id", null: false
    t.index ["event_session_id"], name: "index_event_session_speakers_on_event_session_id"
    t.index ["event_speaker_id"], name: "index_event_session_speakers_on_event_speaker_id"
  end

  create_table "event_sessions", id: :string, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    # other fields here
    t.string "event_id"
    t.index ["event_id"], name: "index_event_sessions_on_event_id"
  end

  create_table "event_speakers", id: :string, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    # other fields here
    t.string "event_id"
    t.index ["event_id"], name: "index_event_speakers_on_event_id"
  end

  create_table "events", id: :string, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    # other fields here
  end
```

Our model definitions were as follows:

```ruby
class Event < ApplicationRecord
  has_many :event_sessions, dependent: :destroy
  has_many :event_speakers, dependent: :destroy
end

class EventSession < ApplicationRecord
  belongs_to :event
  has_many :event_session_speakers, dependent: :destroy
  has_many :event_speakers, through: :event_session_speakers
end


class EventSpeaker < ApplicationRecord
  belongs_to :event
  has_many :event_session_speakers, dependent: :destroy
  has_many :event_sessions, through: :event_session_speakers
end


class EventSessionSpeaker < ApplicationRecord
  belongs_to :event_session
  belongs_to :event_speaker
end
```

When we were running an integration test to delete an `Event`, we were receiving an error that a column `event_session_speaker` was not found. The problem existed because of how we defined our `dependent` option on `EventSession` and `EventSpeaker`. For those unfamiliar, the `dependent` option allows you to specify what happens to associated records when the parent record is deleted. The `:destroy` option we used will delete the associated records when the parent record is deleted and _run any associated callbacks_. In this case, the `EventSession` and `EventSpeaker` models were both attempting to delete their associated `EventSessionSpeakers` records. This tried to run the query:

```sql
TRANSACTION (0.1ms)  begin transaction
  EventSession Load (0.1ms)  SELECT "event_sessions".* FROM "event_sessions" WHERE "event_sessions"."event_id" = ?  [["event_id", "30663738"]]
  EventSessionSpeaker Load (0.1ms)  SELECT "event_session_speakers".* FROM "event_session_speakers" WHERE "event_session_speakers"."event_session_id" = ?  [["event_session_id", "42880873"]]
  EventSessionSpeaker Destroy (0.2ms)  DELETE FROM "event_session_speakers" WHERE "event_session_speakers"."" IS NULL
TRANSACTION (0.0ms)  rollback transaction
```

As you can see, the delete query is trying to delete all `EventSessionSpeakers` where the `event_session_speakers` column is `NULL`. This is because the `EventSession` and `EventSpeaker` models are trying to delete their associated `EventSessionSpeakers` records. However, the `EventSessionSpeaker` model is trying to delete the record _twice_ because it is associated with both the `EventSession` and `EventSpeaker` models. This is why the `event_session_speakers` column is `NULL` in the query and making the query invalid.

To fix this, we need to update the `dependent` option on the `EventSession` and `EventSpeaker` models. We need to change the `dependent` option to `:delete_all`. This will delete the associated records when the parent record is deleted **without running any associated callback**. This will prevent the duplicated deletions by letting `EventSession` and `EventSpeaker` handle their cleanup individually. So, we updated our models to be:

```ruby
class EventSession < ApplicationRecord
  belongs_to :event
  has_many :event_session_speakers, dependent: :delete_all
  has_many :event_speakers, through: :event_session_speakers
end


class EventSpeaker < ApplicationRecord
  belongs_to :event
  has_many :event_session_speakers, dependent: :delete_all
  has_many :event_sessions, through: :event_session_speakers
end
```

Now, when we run the test, we see the following queries ran:

```sql
TRANSACTION (0.1ms)  begin transaction
  EventSession Load (0.2ms)  SELECT "event_sessions".* FROM "event_sessions" WHERE "event_sessions"."event_id" = ?  [["event_id", "30663738"]]
  EventSessionSpeaker Delete All (0.1ms)  DELETE FROM "event_session_speakers" WHERE "event_session_speakers"."event_session_id" = ?  [["event_session_id", "42880873"]]
  EventSession Destroy (0.1ms)  DELETE FROM "event_sessions" WHERE "event_sessions"."id" = ?  [["id", "42880873"]]
  EventSessionSpeaker Delete All (0.0ms)  DELETE FROM "event_session_speakers" WHERE "event_session_speakers"."event_session_id" = ?  [["event_session_id", "472205080"]]
  EventSession Destroy (0.0ms)  DELETE FROM "event_sessions" WHERE "event_sessions"."id" = ?  [["id", "472205080"]]
  EventSessionSpeaker Delete All (0.0ms)  DELETE FROM "event_session_speakers" WHERE "event_session_speakers"."event_session_id" = ?  [["event_session_id", "894887044"]]
  EventSession Destroy (0.0ms)  DELETE FROM "event_sessions" WHERE "event_sessions"."id" = ?  [["id", "894887044"]]
  EventSessionSpeaker Delete All (0.0ms)  DELETE FROM "event_session_speakers" WHERE "event_session_speakers"."event_session_id" = ?  [["event_session_id", "1020543588"]]
  EventSession Destroy (0.0ms)  DELETE FROM "event_sessions" WHERE "event_sessions"."id" = ?  [["id", "1020543588"]]
  EventSpeaker Load (0.1ms)  SELECT "event_speakers".* FROM "event_speakers" WHERE "event_speakers"."event_id" = ?  [["event_id", "30663738"]]
  EventSessionSpeaker Delete All (0.1ms)  DELETE FROM "event_session_speakers" WHERE "event_session_speakers"."event_speaker_id" = ?  [["event_speaker_id", "668127263"]]
  EventSpeaker Destroy (0.0ms)  DELETE FROM "event_speakers" WHERE "event_speakers"."id" = ?  [["id", "668127263"]]
  EventSessionSpeaker Delete All (0.0ms)  DELETE FROM "event_session_speakers" WHERE "event_session_speakers"."event_speaker_id" = ?  [["event_speaker_id", "350169046"]]
  EventSpeaker Destroy (0.0ms)  DELETE FROM "event_speakers" WHERE "event_speakers"."id" = ?  [["id", "350169046"]]
  EventSessionSpeaker Delete All (0.0ms)  DELETE FROM "event_session_speakers" WHERE "event_session_speakers"."event_speaker_id" = ?  [["event_speaker_id", "1066195201"]]
  EventSpeaker Destroy (0.0ms)  DELETE FROM "event_speakers" WHERE "event_speakers"."id" = ?  [["id", "1066195201"]]
  Event Destroy (0.0ms)  DELETE FROM "events" WHERE "events"."id" = ?  [["id", "30663738"]]
  TRANSACTION (0.2ms)  commit transaction
```

This is taking all the associated session and speaker records and cleaning them up individually. This is the correct behavior we want and will now let us perform the cascading delete as we want.

An important note to make is that this cascading delete is suboptimal and not a function you want run in a production application. In Rails 6, they introduced the `:destroy_async` option which will allow you to run the dependent destroy in a background job. This will prevent the cascading delete from blocking the main thread and causing performance issues. This is an optimization we should make and demonstrate on the next stream.

This was a tricky problem to debug, and there wasn't much documentation on the subject. I hope this post helps others who run into similar issues. If you have any questions or comments, please feel free to reach out to me on [Twitter](https://twitter.com/dustinsgoodman), [Twitch](https://twitch.tv/dustinsgoodman), or comment in the above video. You can find the [full source available on GitHub](https://github.com/dustinsgoodman/event-platform-rails).
