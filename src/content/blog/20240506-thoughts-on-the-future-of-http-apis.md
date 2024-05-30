---
title: Thoughts on the Future of HTTP APIs
description: >
  The introduction of React Server Components (RSCs) and Actions have started a conversation in the JavaScript community about how we interact with our databases and backend services. When developing a new application, do we need to have an API in front of the database?
date: 2024-05-06
heroImage: ./blog-assets/20240506-thoughts-on-the-future-of-http-apis.png
alt: Thoughts on the Future of HTTP APIs
tags:
  - Architecture
  - REST
  - GraphQL
---

The introduction of React Server Components (RSCs) and Actions have started a conversation in the JavaScript community about how we interact with our databases and backend services. When developing a new application, do we need to have an API in front of the database? [Cory House](https://twitter.com/housecor) asked this question on Twitter, and the responses were mixed.

<blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">Poll: Do you believe every web app should have an API (REST/GraphQL/RPC) in front of the DB?<br><br>If always, why?<br>If it depends, upon what?</p>&mdash; Cory House (@housecor) <a href="https://twitter.com/housecor/status/1782402966038679644?ref_src=twsrc%5Etfw">April 22, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I've been thinking on this question since I saw it. I initially responded with "No, it depends" but didn't elaborate as I was still putting my thoughts together. I think this question is really brought about looking at the React and Next.js ecosystem. People are starting to put database calls directly in server components and mutating data directly via server actions. For a lot of JavaScript developers, I think this is a significant shift in how we think about fetching and mutating data in a system. For years, we've been using the REST and GraphQL APIs to interact with our data through tools like the Fetch API, Apollo, Axios, and others, and now, we're finding we don't necessarily need these tools.

Looking at these patterns though, while I recognize their differences from Ruby on Rails or PHP Laravel implementations, I can't help but see some of the paradigms that those tools established. Looking at a Rails controllers, for example, we can see in their base form, they are similar conceptually to this new pattern:

```ruby
# app/controllers/users_controller.rb
class UsersController < ApplicationController
  def index
    @users = User.all
  end
end

# app/views/users/index.html.erb
<div>
  <% @users.each do |user| %>
    <p><%= user.name %></p>
  <% end %>
</div>
```

In this example, our controller fetches all the users from the database and then renders each user's name in a paragraph tag on the DOM. Ruby separates the files this is done, but all the work is done on the server. With RSCs, we would write something like:

```jsx
// components/Users.server.tsx
export default function Users() {
	const users = db.query('SELECT * FROM users');
	return (
		<div>
			{users.map((user) => (
				<p>{user.name}</p>
			))}
		</div>
	);
}
```

There's a beauty in the React version as we can clearly see all the code in one file. We'd probably refactor out the SQL query into a utility for reuse across our app. But what happens when we need the same fetching logic outside of our web application? Let's say new business needs arise where we need a mobile application or a third party developer API. We'd have to rewrite the logic elsewhere - either in an API route or a new API service. In Rails, we'd just enable our API to respond with JSON, e.g.

```ruby
# app/controllers/users_controller.rb
class UsersController < ApplicationController
  def index
    @users = User.all
    respond_to do |format|
      format.html
      format.json { render json: @users }
    end
  end
end
```

In the Next.js version, we'd have to make an API route that leverages a shared utility to respond to the data and we'd have to add a specific file to create the route and respond, e.g.

```jsx
// pages/api/users/routes.ts
import { getUsers } from '../../utils/db';

export async function GET(req, res) {
	const users = await getUsers();
	res.status(200).json(users);
}
```

In the RSC world, we've had to write additional logic or infrastructure to extend our application to support these additional use cases where in the Rails example, we just enabled the feature with a few lines of code. So what does this mean for the future of HTTP APIs?

I think generally speaking, we're going to see more web applications built without a HTTP API initially - specifically more web first applications. With Apple finally starting to open the door to Progressive Web Applications (PWAs), I think app developers are going to be less inclined to build native mobile applications due to the complexities of maintaining those codebases and other app store restrictions. This will enable businesses to focus on a single platform for their products and help them to streamline their development processes even further.

Now, this isn't to say all businesses will stop mobile development as some businesses will rely on native features and will need to go this route. But, with the React Native team trying to bring RSC to React Native, these teams will be able to achieve the same results as web teams which will decrease the need for HTTP APIs.

Businesses that provide third party developer APIs will likely be the only ones that will need to create and maintain HTTP APIs. With a lot of the clients and businesses I'm working with, I'm seeing more and more collaboration among companies so the need for these APIs will start to be more prevalent, but for newer companies that maybe won't start from a REST or GraphQL API, it'll be interesting to see how interested or adverse to these partnerships they'll be given the cost of creating and maintaining these APIs that they didn't previously need.

I think the future of HTTP APIs is going to be more focused on the business needs of the company and less on the technical needs of the company. If a company needs to provide a third party developer API, they'll build one. If they don't, they won't. This will allow companies to focus on their core business and not on the technical debt that comes with maintaining an API that they don't need.

It's still early in the adoption and roll out of these new tools. I'm curious to see how the framework and open source teams creating this paradigm shift will address this problem as it becomes relevant to them. I don't foresee tools like GraphQL or RPC going away given their existing adoption in key enterprises, but I do think we'll see less new applications starting with these tools and less HTTP APIs being developed in general.

Some organizations may discover the need to split off core functionality into separate services and that may lead to new HTTP APIs leveraging REST, GraphQL, or RPCs. It'll be interesting to see how those services get re-integrated into the main application and how the teams will manage the complexity of these services.

I've been sad to see the shift away from GraphQL as it's a tool I enjoy building with and see great benefit but with RSCs and other techniques like Remix's loaders, the benefits it once provided for building frontend applications has definitely lessened. I think with the rise in popularity of typed languages, we'll likely see continued adoption of GraphQL and RPCs for APIs as they provide a lof of similar benefits and there will still be applications that will be built using HTTP APIs, but I think we'll see a lot less of them in the future.
