---
title: Thinking in GraphQL [Part 1]
description: >
  lorem ipsum
publishDate: 2023-06-03
heroImage: /blog-assets/20221128-how-i-pick-my-tech-stack.webp
alt: How I pick my web technology stack? Workflow diagram of content described in the article.
tags:
  - GraphQL
  - API Design
draft: true
---

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

My colleague, [Colum Ferry](https://twitter.com/FerryColum), tweeted asking people for their opinions on GraphQL. The thread had a variety of responses with differing opinions but the majority consensus was that people were done or tired of GraphQL and were shifting their practices away from it.

<blockquote class="twitter-tweet"><p lang="und" dir="ltr">bad</p>&mdash; wes (@wescopeland_) <a href="https://twitter.com/wescopeland_/status/1665032958493831171?ref_src=twsrc%5Etfw">June 3, 2023</a></blockquote>

For those that know me, I'm a big fan of GraphQL and think it's a fantastic solution in most situations, but this sentiment got me thinking, "is my opinion wrong?" I pondered on the conversation a bit more and chose to respond with a reduction of my thoughts:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">My experience has been the concepts are foreign enough that people don’t know how to adapt to the mental model. It requires some level of understanding data relations and querying which isn’t something most FE devs deal with regularly.</p>&mdash; Dustin Goodman (@dustinsgoodman) <a href="https://twitter.com/dustinsgoodman/status/1665043300275945477?ref_src=twsrc%5Etfw">June 3, 2023</a></blockquote>

To elaborate, my last 3 organizations all adopted GraphQL, but all 3 teams suffered from a lot of the same common pitfalls and challenges in gaining the benefits of GraphQL. These teams all had smart and capable developers on the team. So why has the transition been such a challenge?

I think the problem is multi-faceted. I'll cover these areas as I see them, but they include:

- Legacy impacts of REST & RPC patterns
- Backend v Frontend Mentalities
- Standards and Best Practices
- Depth of Knowledge about the GraphQL Toolchain

## Legacy impacts of REST & RPC patterns

As a web community, we've been utilizing REST APIs and RPC data patterns for so long that we've grown accustomed to these patterns making them our default way of thinking. In REST, we dump full resources as they live in our databases with some business logic and rules to protect sensitive data and have created hacks to expand the basics of these APIs to handle our needs. With RPC patterns, we have access to our data models and server logic so we just collect what we need to fulfill our request. Another way to think about this is to say that whenever someone wants a piece of data, they effectively just make a `SELECT * FROM table ...`. There's little to no consideration for the consequences of these actions as we're typically developing on high performance laptops with high-speed internet access so the extra data feels inconsequential to the outcomes.

To be clear, I am not saying that every app _needs_ to have these considerations, but when customers or consumers start saying, "your site is slow", our solutions are to bring the code closer to their devices, but what if the problem isn't proximity but amount of data?

Mobile networks are always improving and our smart phones have access to our WiFi connections, but mobile hardware does have limitations to what it can handle processing wise. Again, yes this is getting better constantly, but it's because we keep trying to shove more and more data over the wire to these devices so it never feels like we're making progress. Regardless, this is the mental model that exists - I can just fetch my data and let the user's device handle the repercussions because devices are getting better constantly.

GraphQL's model pushes back against this model. It makes the developer think about what data they _actually_ need and request it in a meaningful way. Though this seems like a small challenge, it's probably the largest challenge to true adoption of GraphQL. This brings us to the next challenge...

## Backend v Frontend Mentalities

As a engineer focused on developing APIs and backend systems, you typically think about how data should be structured and passed around before eventually being exposed to the world through your APIs. Frontend focused engineers, on the other hand, are thinking about how to make that data appear for users. But as a backend engineer, you don't know what data the end user really needs without your frontend counterparts, and as a frontend engineer, you don't always know exactly what data is available without your backend engineers. As a result, you both just dump as much info at each other as possible thus exacerbating the data overload and our legacy mental models.

This is not purely the fault of teams as the businesses around them are constantly evolving and needing product to ship faster. This reduces the time these teams have to think about these problems or these problems get delegated to a handful of extremely overloaded lead engineers who can't keep up with the pace of the team around them. As a result, hard to reverse decisions get made by developers who are just trying their best to do their jobs.

This has also led to the fullstack engineer who tries to bridge these gaps. Of course, they're caught in the same crossfire of everyone else and fall back to what they know - just dump the data and go.

Going back to the GraphQL model again, the idea is the backend engineers can expose all the data even if it's not consumed by the frontend team and the frontend team can select what fields they want from the data available. This requires these teams to communicate more which can become another bottleneck for the business and therefore a problem. But, if these two teams started to discuss the actual behavior and needs of the data, better GraphQL fields and entities would arise.

For instance, a status field with a set of values that aren't human consumable need to get mapped somewhere. Should it happen on the frontend or backend? Historically, this problem just gets deferred to the frontend and requires more logic be shipped to clients. With GraphQL, however, we can now have special formatting resolvers in our API that give the client exactly the shape they want the data which alleviates the device needs. So why aren't developers ready to just do this with GraphQL?

## Standards and Best Practices

## Depth of Knowledge about the GraphQL Toolchain
