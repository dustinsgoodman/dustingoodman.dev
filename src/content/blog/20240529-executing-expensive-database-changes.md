---
title: Executing Expensive Database Changes
description: >
  One of my engineers asked me a question regarding how to properly roll out a change to a database
  operation that involved an expensive query in an ecosystem that was poorly documented and had a
  lack of consistency among deployment environments. This post is a summary of my response.
date: 2024-05-29
heroImage: ./blog-assets/20240529-executing-expensive-database-changes.png
alt: Executing Expensive Database Changes
tags:
  - Architecture
  - DevOps
---

## The Situation

One of the engineers on my team brought me a question the other regarding a change they were making and were curious how to effectively roll it out. They had built, tested, and validated a new operation that appeared like it would fix the underlying data problem that was reported. However, once it hit production, the operation was taking too long and negatively impacting the databases performance when ran so they reverted the change until they could devise a better solution.

In this particular situation, the operation was an aggregation on a MongoDB database that was joining data across multiple collections. We won't talk about the merits of SQL vs. NoSQL today, but the strategy I advised my colleague towards would apply regardless of the underlying database engine.

Another important piece of information is that the database was deployed to 4 environments: development, staging, pre-production, and production. None of the environments shared reflected each other in terms of configuration or dataset size. We'll understand why this is important as we walk through the strategy.

## Step 1: Understanding the Problem

Database performance is impacted by a variety of different factors varying from the underlying engine, the hardware it's running on, the size of the dataset, the indexes that are present, and so on. The first step to understanding why the operation was slow is to understand how the database is executing the query. Most (if not all) databases provide a function to inspect, or `explain`, how the query will be run. I'll refer you to the manual for your specific database engine, but when you run this operation, you can learn some key insights into how the database will operate. You should see things like:

- The indexes that are being used
- The number of documents being scanned
- The number of documents being returned
- The time it took to execute the query

Each piece of information will tell you a different piece of the story. For example, if you see the database is scanning the entire table/collection to find the records you want, you may be missing an index that would reduce the number of items scanned.

This is why it is important to ensure that all your databases are configured the same. Without the same configuration, you can't guarantee that the query will perform the same across all environments. This is why it's important to have a consistent deployment strategy for your databases. This is why it's the first step in the strategy because without knowing your expected query plan, you can't effectively tune the query.

## Step 2: Planning How to Tune Your Collection

Going back to our developers situation, it turns out that in production the collection was at least 10x larger than any other database they had access to for testing and did not have the same indexes. At this point, you may just be thinking "oh well, just go add the index and move on". Unfortunately, this can have negative ramifications downstream as indexes can be large and take up a lot of disk space and can slow down write operations. Additionally, you could accidentally take your database offline by locking up the table/collection while the index is being built.

First things first is ensuring all your indexes are aligned across environments. I'd recommend ensuring all the environments match production first and find any indexes that aren't present in production across the remaining environments. Any index that is present in more than one environment should be further investigated to ensure it's necessary. If it's not, it should be removed.

Then, if possible, I would create a replica of the production database for testing purposes. This is where you can test your query against a comparable dataset. However, if you can't do this, you can try to generate a dataset that is similar in size to production.

## Step 3: Testing Your Query

Now with this, you can run your query and see how it performs. If it's still slow, you can try to add an index and see if that improves the performance. Rinse and repeat this process until you have a query that performs well.

## Step 4: Deploying Your Changes to Production

Now, it's time to roll out your changes. Before the change is deployed, ensure that you have a rollback plan in place. This could be as simple as a script that removes the index you added. This is important because if the query doesn't perform as expected, you can quickly revert the change.

You'll want to apply your indexes in the background. Most databases offer this feature, but it's important to understand how it works. For example, in MongoDB, you can add an index in the background, but it will still lock the table for writes. This is important to understand because if you have a high write volume, you could potentially lock up your database. Having analytics available to understand when your site is under low volume can help you understand when the best time to apply the index is given these other constraints.

After the index is in place, you can roll out your code changes and start leveraging the new query. Be sure to monitor your database performance after the change is rolled out to ensure that the change is having the desired effect.

## Conclusion

Effectively rolling out a complex database operation change involves a detailed, step-by-step approach to ensure performance and stability. First, understand the query's performance by using database tools to inspect execution plans and identify issues like missing indexes. Ensure that all environments mirror production in terms of configuration and data size to provide consistent testing grounds. Align indexes across environments, create or simulate a production-sized dataset for testing, and iteratively refine the query. Before deploying changes, have a rollback plan and schedule updates during low traffic periods to minimize impact. Finally, monitor the database post-deployment to confirm the improvement.

Following these general guidelines can help you avoid critical failures during high traffic periods and ensure that your database operations are optimized for performance and stability. Best of luck as you explore your own roll out!
