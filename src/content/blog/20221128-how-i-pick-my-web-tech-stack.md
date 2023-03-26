---
title: How I pick my web technology stack?
description: >
  In this post, I explore how I make technology decisions based on use cases and what technologies I think are best suited towards solving the problem.
publishDate: 2022-11-28
heroImage: /blog-assets/20221128-how-i-pick-my-tech-stack.webp
alt: How I pick my web technology stack? Workflow diagram of content described in the article.
tags:
  - Architecture
  - System Design
  - Teams
---

One of my favorite conversations is trying to decide what technologies are best suited to accomplish the desired end result on a particular project. And well, as you may expect, the answer is “well it depends”.

![Simpson's scene where the class pressures Bart to say it depends as if he were a senior engineer](/blog-assets/20221128-it-depends.webp)

In this post, I hope to explore how I make these decisions. Feel free to challenge my thinking and let’s have a great conversation about how we can improve this decision tree.

**A quick disclaimer** - my skillset is comprised of Ruby & TypeScript/JavaScript and I mostly use React in my day-to-day for frontend work. As such a lot of my decisions will reflect that but I’ll make call outs to alternatives where applicable.

**Another quick disclaimer** - the current ecosystem is evolving _fast_ and some of the things I’m saying here may be incorrect due to being outdated. What I hope you take away is the thought process and not the exact choices as those will evolve with time.

Let’s jump in!

## Starting with the question of what?

The first thing I like to do with any project is understand the end goal. What are we building? A blog? A docs site? A company’s marketing site? A Ecommerce Site? A highly interactive product application? A low interactive product application? Are we displaying rich data?

For each of these archetypes, there is a solution that is arguably more appropriate than other options. To simplify this post, I’ll distill some of these examples down to some arbitrarily simple ones in hopes that the principles will hold up when other factors are introduced into the problem.

## Case 1: Static Content Sites

![Simple static website architecture diagram showing S3 to Cloudfront connected to a user device](/blog-assets/20221128-static-website-architecture.webp)

Are you building a docs site or a personal blog? Is your content relatively static with low-to-no interactive elements? If yes, I strongly recommend using [Astro](<[https://astro.build/](https://astro.build/)>) or an equivalent framework.

### What is Astro?

Astro is a HTML-first framework that utilizes island architectures to allow you to use your preferred component language to create your content and interactive elements. This is extremely powerful in that you ship low-to-no JavaScript to the client that are serviceable via CDNs making your website extremely performant which helps with SEO and other important factors that help these sites perform well.

### Other considerations for Astro

![MDX logo](/blog-assets/20221128-mdx.webp)

Astro also is a winner in my book because they have first-class markdown and MDX experiences which is great for content writers, who aren’t necessarily technical. Thus, making Astro an excellent option for this classification of projects.

### When to maybe not use Astro?

![Excerpt from Astro docs talking about how they aren't the best use case for applications](/blog-assets/20221128-astro-use-case.webp)

[Astro admits this themself](<[https://docs.astro.build/en/concepts/why-astro/#content-focused](https://docs.astro.build/en/concepts/why-astro/#content-focused)>) that there are use cases that maybe they aren’t the best at and that’s okay! This is part of why I recommend them and prioritize them for this type of project. My website is built on Astro and I’ll say the development experience has been superb. That being said, if you’re starting to add features like CTAs to capture consumer information that sends out emails or other needs to interact with other services, this type of tech maybe isn’t for you. Of course, you can use web APIs to send requests to a server or serverless functions but there are better options for this use case that require less tech.

![Architecture diagram demonstrating how to achieve dynamic sites with Astro by introducing a separate API stack](/blog-assets/20221128-separate-architectures-design.webp)

### Alternatives to Astro

Historically speaking, people have used [Gatsby](https://www.gatsbyjs.com/), [Docusaurus](https://docusaurus.io/), and WordPress for these types of sites. I think these are all still valid options and good ones, but it depends on what your priorities are for the project. They each have their own known downsides so that’s another serious consideration.

[11ty](https://www.11ty.dev/) is another great option and I think is the most comparable to Astro in terms of their goals and feature offering. I think picking Astro is just a preference for me so seriously consider this option for your site.

Finally, we have some new kids on the block, but I’m specifically going to talk about [Qwik](https://qwik.builder.io/). I don’t think it’s quite production-ready as it’s still in beta, but I think this is going to shake up this space as they’re focused on delivering minimal JavaScript to the client. I don’t know what their writer experience is yet as well so do your own homework here.

### TL;DR

Find a tech that focuses on shipping HTML and low-to-no JavaScript that has or has a means towards offering a first-class writer experience without harming the developer experience.

## Case 2: Marketing Sites

Are you building your company’s marketing website or an Ecommerce site? You’re definitely going to need some level of interactive elements. At this point, I’m unquestionably in favor of using [Next.js](https://nextjs.org/) or [Remix](https://remix.run/). [Nuxt.js](https://nuxtjs.org/) absolutely makes this list too but I’m not a Vue developer.

### Why these frameworks?

![Dynamic website architecture diagram showing most of the ecosystem lives inside of the Next or Remix domain area](/blog-assets/20221128-dynamic-website-architecture.webp)

First off, Next.js & Nuxt.js provide a way to build **static** pages, and you can build good content creation experiences for your marketing team using a headless CMS with all three options. However, Next.js & Nuxt.js also provide a means for creating **dynamic** pages allowing you to integrate with your marketing team’s tooling, which Remix does by default. Finally, they all provide **API routes**. This gives you the ability to create those CTA features I mentioned above that Astro didn’t solve so well. With all these pieces combined, it allows you to:

1. Keep all your code in one place
2. Deploy to almost any provider
3. Utilize edge functions and other first-in-class performance APIs
4. Serve lightning fast static content where applicable
5. Load dynamic content in a way that the client doesn’t pay the cost
6. Support SEO and marketing needs

I will also note in the case of Remix, they were just acquired by Shopify to enhance their templating systems so this is maybe a strong signal to consider them especially for Ecommerce.

### Why not use these tools for blogs and docs sites?

![Violet from Willy Wonka getting bloated just like apps do using the wrong tool](https://media.tenor.com/ce2n2yhf6TsAAAAM/violet-beauregarde-blueberry-inflation.gif)

Frankly, you can and you wouldn’t be wrong to do so. They provide a lot of the same function but there’s some gotchas with each.

For Next.js and Nuxt.js, you have to configure them to provide some of those content experiences mentioned earlier and in some cases, configure them to load less JavaScript to the client making them harder to get started with.

For Remix, there’s a bit more to learn with their loader pattern, and deployment and hosting costs are a little higher as it requires serverless functions for any page to load. These costs are very low though and most likely will not significantly impact your monthly bill.

Overall, there’s just a bit more to do here where Astro or 11ty would just work out of the box for your needs.

### TL;DR

Find a solution that offers all the pros of a purely static solution but also provides a means for extending onto the server in a light-weight, zero-server fashion so you can extend features as needed. You’re optimizing for load speed here while managing to keep the developer experience good as your team’s needs grow.

## Case 3: Product Applications

Products cover a lot of different types of applications. You have data rich dashboards like NewRelic. There are CMS products like Contentful. You have marketing platforms like Hubspot or MailChimp. Each of these are unique in their offering and how to achieve the end goal. As such, there are a lot of questions we should be asking ourselves:

- Do we care about SEO?
- Are we building a single page application (SPA) or a multi page application (MPA)?
- Is our product highly interactive? Do we care how much JavaScript is being loaded to the client?
- Is our product data rich? Are we looking to implement data visualization? Is the data just formatted in a way to make it easy for the user to consume?
- Are we building for mobile, desktop, or both? Do we want a progressive web application (PWA) instead of native mobile solution?
- What are we building our API with and how is it structured? Are we looking to have separate technology teams?

These are just some of the starting questions and as we learn more, our decisions are going to be impacted further as things change.

### A Quick Assessment of Node.js

Depending on our answers, we’re going to need to pick the right toolset for our project which is a tough challenge as market conditions for developers are continually changing. At the time of this writing, Node.js with TypeScript and React are arguably the most popular technologies for building applications. I challenge whether that means they’re the right choice though.

In my opinion, the Node ecosystem for building backends is not yet mature enough. I'll defer my full thoughts on this to another article, but this isn’t to say you can’t do it, but there’s not a singular proven set of tooling, and everyone is having to decide on their own stacks. This means teams are spending a lot of time doing technology research just to figure out which is the _right_ tool for the job and then doing a lot of work to ensure they’re still using something maintained and supported. This can sometimes lead to having to migrate to new tech that accomplishes the same end goals because of deprecations or dropped support.

### My Preference

![Rails architecture deployed to AWS Elastic Beanstalk with PostgresQL & Sidekiq Redis](/blog-assets/20221128-rails-architecture.webp)

When I’m building a server solution, I personally grab for Ruby on Rails. It’s not perfect for all situations, but I think Rails has a lot going for it:

- Active Record and Migrations
- Server Side Rendered Content
- The Rails Console (this is super underrated and I wish Node projects had an out of the box solution for this)
- First-class packages for authentication and authorization
- Convention over configuration mentality
- The Rails CLI
- Active Job
- RSpec & Cucumber for testing

The above may not seem like a lot or that significant but considering the current state of the JavaScript ecosystem, replicating some of these features is a multi-day chore. These tools and features definitely come with their own downsides though and there are tradeoffs. That being said, you can opt to just use Rails as your API server, and frankly, that would be enough in my opinion. Rails’ frontend solutions are not ideal in my opinion and leave a lot on the table in terms of what you want especially with their asset management pipeline and their constant resistance to modern JavaScript frameworks.

![Example of Active Record and the Rails Console in action](/blog-assets/20221128-rails-console.webp)

If you’re a .NET or PHP developer, you may be saying, “we have these things, why not us instead? We even solve the frontend problem.” I totally agree and think these are great alternatives. I just personally don’t want to program in C# or PHP, regardless of how good the languages have gotten (and trust me, I’ve tried). But hey - we’ve got something good here.

### So what about the frontend then?

![angular react and vue logos](/blog-assets/20221128-frontend-frameworks.webp)

Use what makes the most sense for your product’s use case and what your team is most comfortable with. I think you need to weigh your priorities again, but I think Angular, React, or Vue are all excellent choices especially when paired with meta frameworks that enhance them for the better. I also recommend these as they are the currently battle-tested solutions.

SolidJS, Svelte, and Qwik are the new kids on the block and are probably going to be viable solutions to explore in this space, but I’ve been bitten by being on the bleeding edge before so I refrain from choosing them for my main projects currently. This will change in the coming months and years as new developments and enhancements are made, but at the time of this writing, I’m just not sure they’re ready for this level of project _yet_.

### “What about serverless? It’s super fast and connects to all my infrastructure services already.”

I’m a big fan of serverless and you can see my attempts on the internet to make serverless a first-class choice. Unfortunately, I’ve learned from experience and seen the downsides to serverless to know I wouldn’t actually recommend it at scale. I think it’s a great tool for singular-focused microservices and ETL APIs. These stacks can handle volume better than most and cost a fraction of the price, but scaling them to larger projects or teams is challenging and the developer experience is just not there yet. I think we’ll see this change in the coming months, but for now, I think [Dax Raad (@thdxr)](https://twitter.com/thdxr) hits a key point with [this tweet](https://twitter.com/thdxr/status/1592917691194802176):

![Tweet from Dax Raad talking about serverless tooling being trick shot demos and not maintainable applications](/blog-assets/20221128-dax-raad-tweet.webp)

Serverless is amazing and when used correctly, is truly amazing, but right now, we’re seeing the wrong trends in the space around the tech. I hope this changes.

### REST, GraphQL, or tRPC?

I can’t answer this question. Each of these options has an extremely valid use case and a purpose. As an organization and development team, you really need to understand what your needs are. I’d guess for a majority of the work you’re doing, GraphQL and tRPC are most likely the best choices, but there’s going to be cases where a simple REST endpoint will be the best fit for the use case. Keep an open mind and discuss things!

### TL;DR

Picking product technology is hard, but look for tools that are mature with a proven track record. If you choose to live on the bleeding edge or try to use the wrong tool for the wrong job, you’re probably going to run into issues or have a bad day along the way. Tread carefully!

## Conclusion

Picking technology is a really hard problem. Just because a solution works 99% of the time on your proof of concepts and side projects does not mean it will work at scale. It doesn’t necessarily mean it won’t either though. I challenge you to discuss your technology choices and really understand the end goal of your product and try to better understand the future you’re building towards. Give yourself options and remember: one size does not fit all.

Special thanks to [Jesse Tomchak](https://twitter.com/jtomchak) for feedback on this post!
