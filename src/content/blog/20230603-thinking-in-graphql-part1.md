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

GraphQL's model pushes back against this model. It makes the developer think about what data they _actually_ need and request it in a meaningful way. Though this seems like a small challenge, it's probably the largest challenge to true adoption of GraphQL.

## Backend v Frontend Mentalities

## Standards and Best Practices

## Depth of Knowledge about the GraphQL Toolchain
