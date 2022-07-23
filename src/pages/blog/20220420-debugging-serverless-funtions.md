---
title: Debugging Node Serverless Functions on AWS Lambda
description: >
  Writing and testing functions for serverless locally can be a breeze especially with the Serverless Framework and serverless-offline plugin. However, once you get to real infrastructure, sometimes debugging your functions can be really challenging. Let's talk about some debugging tips and tricks.
publishDate: Apr 20, 2022
heroImage: /blog-assets/20220420-debugging-serverless-functions.webp
alt: Debugging Node Serverless Functions
layout: '@/layouts/blog.astro'
tags:
  - Serverless Framework
  - AWS Lambda
  - Debugging
  - Node.js
---

How many times have you written a function locally, tested it, and had it working only for it to fail when you deployed it to AWS? This is probably more common than you realize and it's usually caused by a misunderstanding of Node or an issue with lambda configuration. In this post, I'll cover some of the most common debugging problems you'll encounter when writing serverless functions and how to fix them.

## Improper Use of `async/await`

When I first started writing serverless functions in Node.js, I had a misconception about how asynchronous functions behave. I was under the impression that you could run an asynchronous function as a background process and it would run on its own thread. However, this is not the case. Asynchronous functions are executed in the context of the Node.js event loop and are not run in the background. This means that if you try to run an asynchronous function in the background, it will block the event loop and the function may possibly never run. For example:

```javascript
const randomBackgroundFunction = async () => {
  console.log('This function may never run');
};

export const handler = async () => {
  // do some stuff ...

  randomBackgroundFunction(); // <-- this most likely won't run without an await
  await randomBackgroundFunction(); // <-- this function will definitely run

  return goodResponse;
};
```

I say "may" because if no other code is running and the event loop is idle, the function will run, but once your handler returns, it's a race against the CPU clock. The AWS Lambda implementation tries to shutdown the Lambda once the response has executed or the Lambda's timeout has been reached (more to come on this topic!). So it's possible, your invocation may run before the shutdown process beings and you'll get lucky that it ran.

Now you may be asking, "Dustin, how do I run my function in the background and ensure execution?" Luckily, there are 2 great solutions: asynchronous Lambda invocations or AWS's Simple Queuing Service (SQS).

### Asynchronous Lambda Invocations

AWS built Lambda to have [asynchronous invocations](https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html) as an out-of-the-box feature. This means you can invoke a Lambda from your primary handler and have it run on its own thread and not block your main instance. So you can rewrite our example from above like this:

```javascript
// background.js
export const handler = async () => {
  // do our background stuff like we may have before
  console.log('This function will definitely run');
};

// main.js
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

export const handler = async () => {
  // do some stuff ...
  const client = new LambdaClient(config);
  const command = new InvokeCommand({
    FunctionName: 'background',
    InvocationType: 'Event', // default here is 'RequestResponse'
  });

  await client.send(command); // this acts as a fire and forget

  return resp;
};
```

See the [AWS SDK v3 Docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-lambda/classes/invokecommand.html) for more details about the API in use. What we're doing is utilizing the `'Event'` invocation type to tell Lambda to just trigger this function and not wait for a response. From [Lambda's docs](https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html):

> Lambda manages the function's asynchronous event queue and attempts to retry on errors. If the function returns an error, Lambda attempts to run it two more times, with a one-minute wait between the first two attempts, and two minutes between the second and third attempts. Function errors include errors returned by the function's code and errors returned by the function's runtime, such as timeouts.

With this, we get the benefit of the event queue without having to set it up and manage it ourselves. The downside is we have to use Lambda's default retry behavior to handle errors giving us less flexibility.

### AWS SQS

Similar to invoking via another Lambda, we can utilize SQS to send a message to a queue and have it run our function instead. Like with the above example, we can generate a message in an inconsequential amount of time and send it to the queue. With this, we get the benefit of configurable retry behavior, but it comes at a cost of having to manage the queue ourselves. It also means our Lambda needs to know how to flexibly read event data from the SQS stream instead of being able to parse the Payload.

## Lambda Timeouts

Lambda's default timeout settings are the next major hurdle. If your Lambda needs to run for a while or process a lot of data, you might see your function just quit suddenly and not reach a later moment in your code. **By default, Lambda has a 6 second timeout.** If you're waiting on additional services, long running queries, or a Lambda to start cold, this could prove problematic. A quick way to check your Lambda's timeout is to load up the AWS Console and at the Lambda's general configuration at the bottom of page. In the screenshot below, you'll see the Lambda I'm inspecting has a 5 minute timeout.

![Lambda Console Configuration Tab](/blog-assets/20220420-lambda-configuration.webp)

Lambda timeouts can be configured in second intervals up to 15 minutes. When I use the Serverless Framwork, I typically set my Lambdas attached to API Gateway triggers to 29 seconds and SQS triggers to 15 minutes via the configuration file. I choose 29 seconds because API Gateway's maximum timeout is 30 seconds and due to latency between the API Gateway and the Lambda, AWS warns when the timeout is equal to 30 seconds as it's not truly 30 seconds. Use your deployment configurations method of choice for setting timeouts but confirm they are what you set them to be.

## Other Things to Look out for

These were two of the larger problems I've faced with relatively easy fixes. The following are some smaller problems that are either easy to fix but specific to your utilization of Lambda or are things I haven't experimented with yet but am aware of:

- Ensure your Lambda has access to all the resources it interfaces with. You'll need to check the IAM Role attached to your function via the console to see what permissions it has. If you're using the Serverless Framework, you can set the IAM permissions in your serverless configuration file.

- Verify your environment variables are set correctly. A Lambda keeps a copy of the environment variables that it accesses and you can verify it via the AWS console. Make sure your values match what you're expecting from your configuration.

- If you're doing File I/O or large data operations, make sure you're not running out of memory. If you are, look into utilizing Lambda's new emphermeral storage feature.

## Conclusion

I hope you've found these tips and tricks helpful and they save you time down the road!
