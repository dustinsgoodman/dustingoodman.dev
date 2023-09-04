---
title: Announcing a Serverless Microservices Template with GraphQL
description: >
  I'm excited to announce a new project starter kit template that I've been developing for a while. Let me tour you through the repository and the decisions that have been made.
publishDate: 2022-04-14
heroImage: ./blog-assets/20220414-announcing-serverless-microservices-template.webp
alt: Nx Serverless GraphQL Microservices Template
tags:
  - Serverless Framework
  - GraphQL
  - Microservices
  - Nx
---

For those that know me, they know I love talking about two things more than anything: Serverless Framework and GraphQL. Today, I'm excited to announce a project starter template that I've been developing that allows developers to build serverless microservices with GraphQL. It is built using Nx monorepos and provides a lot of quality of life developer tooling out-of-the-box. I'll discuss what's in the repo and how you can leverage it today for your own projects. If you want to jump into the code, you can [find it on GitHub](https://github.com/dustinsgoodman/serverless-microservices-graphql-template).

## Project Goals

Over the past few years, I've developed multiple serverless projects and they all tend to follow a similar pattern especially when using GraphQL as the primary API Gateway for the entire application. As the applications have grown, the service architecture had to expand and my teams discovered a lot of difficulty maintaining the different services and how to stitch the different services together in a streamlined method. Another issue was orchestrating local development through package.json scripts would cause memory issues and some cause system memory leaks. Every team also had to perform deep function analysis to keep bundle sizes down when deploying. This project sought out to solve these key issues and provide a first-class developer experience (DX) for those wishing to build serverless microservices with GraphQL.

### Managing Service Generation

In each project, we always introduced a root level directory `serverless.common.yml` configuration file that centralized configuration of plugins and acted as a central lookup for ports utilized by the [`serverless-offline plugin`](https://www.serverless.com/plugins/serverless-offline). Prior to Serverless v3 and TypeScript configuration files, we had to configure the ports and inject them into the application. This was troublesome for a number of reasons, but mainly, it created problems when creating new services into the stack. Developers would have to create a new service directory, scaffold the service, and configure the global settings and then when they were ready to implement it, they would have to spell their service's name correctly at invocation time. The biggest issue with this was when two services were created at the same time and cause merge conflicts for port configuration.

With this template, we're leveraging the [Nx monorepo toolchain](https://nx.dev/) which provides us with the ability to create service generators! This project ships with a service generators that quickly solves the issues seen traditionally. You can simply run:

```shell
yarn workspace-generator service <service name>
```

This will:

1. Create a new service directory with the provided name
2. Scaffold the serverless configuration, test suite, linting, typescript, and example lambda function
3. Register the service to the Nx workspace
4. Update the serverless.common.ts file to include the new service name to the service type and port mappings to next available ports based on existing configuration

For example, if you run `yarn workspace-generator service my-service`, you'll see the following changes made for you:

```diff
- export type Service = 'public-api' | 'background-jobs' | 'example-service';
+ export type Service = 'public-api' | 'background-jobs' | 'example-service' | 'my-service';
export const PORTS: PortConfig = {
  'public-api': {
    httpPort: 3000,
    lambdaPort: 3002,
  },
  'background-jobs': {
    httpPort: 3004,
    lambdaPort: 3006,
  },
  'example-service': {
    httpPort: 3008,
    lambdaPort: 3010,
  },
+ 'my-service': {
+   httpPort: 3012,
+   lambdaPort: 3014,
+ },
};
```

This will give you type safety when using the provided `invoke` function when selecting services and identify which local port to use.

The default scaffold attempts to make some reasonable defaults for the serverless configuration. If you don't like the defaults, you can customize them by [editing generator default template](https://github.com/dustinsgoodman/serverless-microservices-graphql-template/blob/main/tools/generators/service/files/serverless.ts__tmpl__).

### Solving Service Orchestration

Most complex backends require a background jobs worker that relies on a service like SQS or require a database to be running. Unfortunately, these are difficult to emulate services in a local environment and require custom setup. Previously, my teams would attempt to extend start scripts to init the required services. However, the node process manager wouldn't manage the processes correctly and would leave services running in the background and cause memory issues for those trying to run services.

Since a majority of services rely on the same system services, we can leverage Docker to start all the needed project services prior running services with the offline command. The template ships with a base `docker-compose.yml` that stands up an instance of [ElasticMQ](https://github.com/softwaremill/elasticmq) to emulate Amazon SQS's API. The Docker image can be extended to include other services like DynamoDB, Redis, or PostgresQL and can be run using `yarn infrastructure:build` or `yarn infrastructure:start` depending on if it's your first run or not.

### Function Analysis

One of the most important aspects of serverless development is keeping an eye on your bundle sizes and to reduce cold start times on Lambda. Keeping this in mind, the template utilizes [`serverless-esbuild`](https://github.com/floydspace/serverless-esbuild) and [`serverless-analyze-bundle-plugin`](https://github.com/adriencaccia/serverless-analyze-bundle-plugin) to provide function analysis out-of-the-box. I opted for `serverless-esbuild` over [`serverless-bundle`](https://github.com/AnomalyInnovations/serverless-bundle) for a few reasons:

1. `serverless-bundle` provides a lot of functionality that we don't need or use out of the box
2. `esbuild` is generally faster than `webpack` for bundling and requires significantly less configuration
3. I personally had issues with `serverless-bundle` in the past with function analysis which you can [read more about here](https://dustinsgoodman.medium.com/resolving-serverless-webpack-issues-efae729e0619) and have been reluctant to use it as a result. The plugin has matured since and provides the functionality I fought with but the analyzer tool they chose isn't my favorite so the benefits just aren't there.

With this project, you can run `yarn analyze <service name> --function=<function name>` to get an analysis of your bundle size. For example, if you run `yarn analyze public-api --function=graphql`, you'll see the following analysis:

![public-api graphql function analysis](/blog-assets/20220414-bundle-analysis.webp)

## Default Services

For the default template, I've shipped with a few services to demonstrate how to utilize the project structure. The default services are:

- public-api: Contains the GraphQL API setup and structure
- background-jobs: Contains SQS setup and Lambda runners
- example-service: Contains examples for resolver functions for cross service communication and a simple SQS message generator

Other projects will have more complexity and this doesn't begin to demonstrate all the different features and functionality you can include in your project. This is solely intended to generate enough of a baseline for you to develop your own applications without having to go through all the verbose setup. If you see a feature that would be useful for others, please drop an issue or pull request on the repo!

## Developer Console

I started my career building Ruby on Rails applications. One of my favorite features was the `rails console` which allows developers to interact with their application code directly which greatly helps with testing and debugging. As such, I wanted to recreate this for this template. You can run `yarn console <library name>` to get an interactive REPL that you can interface with that library's code. I only included this as part of libraries and not services due to the nature of the code structure and the lack of entry points in which you should interact with the Lambda functions in your services. Below you can see how the console can work:

![example utils console](/blog-assets/20220414-console-example.webp)

## What's Next?

Obviously, there is a lot here and I could keep plugging away to continually improve the template and never release but that wouldn't help anyone. I'll continue to iterate on the template and add useful features and cleanup the codebase. If you have any suggestions or want to help, the [repos issues and pull requests are open](https://github.com/dustinsgoodman/serverless-microservices-graphql-template)!

## Thank you!

I want to send a special thank you to the following people for their help in getting this project setup!

- [sudokar](https://github.com/sudokar) for the original Nx template in which this project was branched from. I frankly could not have solved some of the workspace generator issues I faced without this starting point.
- [Jesse Tomchak](https://github.com/jtomchak) for talking through key issues and helping to make some important architectural decisions.
- [Chris Trześniewski](https://github.com/ktrz) for assisting with some critical path AST parsing issues. The `serverless.common.ts` automatic updates wouldn't have been possible without his help.
- [Tápai Balázs](https://github.com/TapaiBalazs) for convincing me to use Nx in the first place. I tried yarn workspaces and frankly, I couldn't make anything work right. Nx was the right call and his suggestion made for a great fit even if I had to modify a lot of their core features!
- [Nacho Vazquez](https://github.com/NachoVazquez) and [Dario Djuric](https://github.com/dariodjuric) for assisting with some Nx structural decisions that I was fighting and helping me come up with a better long term solution for this template.
