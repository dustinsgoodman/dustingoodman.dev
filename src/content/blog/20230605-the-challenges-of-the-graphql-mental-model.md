---
title: 'The Challenges of the GraphQL Mental Model'
description: >
  GraphQL can be an amazing tool for teams to implement the APIs powering their different applications that rely on the same source of data. However, the mental model required for it may not be as straightforward as traditional solutions. Let's explore some of these challenges.
publishDate: 2023-06-05
heroImage: ./blog-assets/20230605-the-challenges-of-the-graphql-mental-model.png
alt: The Challenges of the GraphQL Mental Model
tags:
  - GraphQL
  - API Design
  - Architecture
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

Going back to the GraphQL model again, the idea is the backend engineers can still expose all the data even if it's not consumed by the frontend team and the frontend team can select what fields they want from the data available to reduce client impacts. However, to truly realize the power of GraphQL requires these teams to communicate more which can become another bottleneck for the business and therefore a problem. But, if these two teams started to discuss the actual behavior and needs of the data, better GraphQL fields and entities would arise which could reduce the amount of JavaScript that ships to the client.

For instance, a status field with a set of values that aren't human consumable need to get mapped somewhere. Should it happen on the frontend or backend? Historically, this problem just gets deferred to the frontend and requires more logic be shipped to clients. With GraphQL, however, we can now have special formatting resolvers in our API that give the client exactly the shape they want the data which alleviates the device needs. So why aren't developers ready to just do this with GraphQL?

## Standards and Best Practices

Well, frankly, GraphQL has introduced new API concerns and challenges that didn't exist previously or had good solutions in its REST or RPC counterparts. Cyclic complexity, authorization, sub-query context, data filtering, and rate limiting are examples of these challenges. With REST solutions, there are great tools that exist that just solve many of these problems. With GraphQL, we're finding vendor lock-in challenges or solutions that solve our problems to a point but then we experience limitations with those solutions to these common problems. Several companies are actively trying to solve these challenges but we're just not getting their tools fast enough for our needs as a community.

On top of all of this, we're still not standardized around how certain features of GraphQL should work. That's not to say everything has to work exactly the same way in every instance of a GraphQL API, but we need resources that we can point our less experienced team members towards that can answer their questions on best practices so the more senior members can solve the architecture problems allowing team to be more effective.

[The GraphQL Foundation website includes a document on some best practices](https://graphql.org/learn/best-practices/), but these focus more on API architectural best practices such as pagination, batching, caching, and communication. [How to GraphQL](https://www.howtographql.com/) is a great course that is also recommended for learning the basics of GraphQL, but it doesn't cover some of the techniques for thinking in GraphQL to allow for the building of better APIs. This really brings us the last issue.

## Depth of Knowledge about the GraphQL Toolchain

The GraphQL ecosystem and toolchain is vast. With field level arguments, resolvers for _any_ field, fragments for query reuse, directives, etc., there are now features that aren't common outside of GraphQL that teams probably need to get the most out of their APIs. Education and experience are core to alleviating any challenges presented by this issue. Bringing GraphQL to a group of developers that have never used it prior will produce negative business productivity for the first several weeks as the teams ramp up on how to use the toolchain. However, it still probably takes the most efficient teams several months to fully acclimate and any new developer brought onto these teams will have to go through the same learning.

We're not at a place yet where linters and other developer experience tooling can solve these problems fully. When a team decides on a standard or technique, they need to come to consensus and agree to adhere to the rules. But unlike formatting standards, there aren't solutions readily available to create these guardrails. As a result, teams are required to self-police their standards during development and code review. This comes with the challenge of knowing all the potential avenues where new decisions could arise. When I've worked on teams in the past, someone would try something new we hadn't discussed as a group and we'd have to work backwards to the alternatives to come up with a solution the team collectively would agree to moving forward.

An example of this that comes up during later stages of GraphQL API development is the union type. Should you use it? If we use it, what implications does that have on consumers? Shared fields can't be lifted to the top-level query so is it actually worth utilizing this type over multiple queries in the same operation? Should union types be reserved only for aggregations or searches or can they be used more generically? These are the types of questions and discussions you might start finding your team having and without that experience, some decisions might get made without all the info leading to hard to reverse decisions later.

## Conclusions

If your team needs an API that can be consumed by multiple applications or serve the general public, GraphQL _may_ be the right solution for it. However, the business needs to understand the implications of adopting this style of development. There will be tradeoffs, like with any solution, but the ones exposed by GraphQL do force a shift to the mental model of many developers.

This isn't to say that you should give up on GraphQL in favor of REST or RPC. In fact, REST and RPC both have their own pitfalls that could harm the user experience or limit your businesses ability to grow onto more platforms that you really need to consider as you have these discussions.

I personally enjoy the GraphQL mental model and developing in it and have found that a lot of the solutions I've built with it have enormously benefitted from the decision to use it. The pay offs definitely came much later than many stakeholders would have wanted and setting up the ecosystem in the organization took longer than desired, but the flexibility and adaptability now that these systems exist are appreciated by the business, the developers, and the consumers of their products.

If you want to continue this conversation, please reach out on [Twitter](https://twitter.com/dustinsgoodman) or [Bluesky](https://bsky.app/profile/dustingoodman.dev).
