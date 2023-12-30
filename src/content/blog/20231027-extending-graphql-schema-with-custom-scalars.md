---
title: 'Extending GraphQL Schemas with Custom Scalars'
description: >
  Out-of-the-box GraphQL is extremely powerful in allowing us to define the shape of our data and allow others to consume it. But what if we could give more guidance and clarity at the field level for consumers? In this post, we'll dive into custom scalars and how you can do just that.
publishDate: 2023-10-27
heroImage: ./blog-assets/20231027-extending-graphql-schema-with-custom-scalars.png
alt: Extending GraphQL Schemas with Custom Scalars
tags:
  - GraphQL
  - Architecture
---

[Scalars in GraphQL](https://graphql.org/learn/schema/#scalar-types) are how we define leaf nodes in our responses will be resolved. Out of the box, GraphQL provides the following types:

- `Int`: signed 32-bit integer
- `Float`: signed double-precision floating point value
- `String`: UTF-8 character sequence
- `Boolean`: `true` or `false`
- `ID`: unique identifier serialized as a string

These are sufficient for providing any data interface layer, but they don't always tell us about details about the data itself. This is where custom scalars come in.

## What are Custom Scalars?

Custom Scalars allow us to create more explicit rules for leaf node data. For example, let's say we're trying to track inventory for an item in our store's inventory management system. Out of the box, we'd probably define our schema as follows:

```graphql
type Product {
	"Unique product identifier - UUID format"
	id: ID!
	"Product's display name"
	name: String!
	"How many of this item do we have in stock"
	itemsInStock: Int!
}
```

At a first glance, you can tell that `itemsInStock` is a number. When we start to think about this from a real world perspective though, the `Int` type allows us to set `itemsInStock` to a negative number but this doesn't make since and should not be allowed in our API. This is where custom scalars step in. We can define a new scalar called `NonNegativeInt` and define it to only allow for a value of 0 or more. This gives our API more depth and further clarifies the data of these fields.

This can be for more than just numbers. We can do custom string or date types. In my example above, I stated in the doc string that the ID field would be a UUID type. [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) has a defined structure that we can validate. So I can also create a UUID type and now, my schema can be redefined to be:

```graphql
type Product {
	"Unique product identifier"
	id: UUID!
	"Product's display name"
	name: String!
	"How many of this item do we have in stock"
	itemsInStock: NonNegativeInt!
}
```

This is much clearer to consumers and allows them to more strongly model their data. So how do I create a custom scalar?

## Creating Custom Scalars

Custom scalars, like other type definitions, require 2 things: (1) the type definition and (2) the resolver. For the type definition, it's as simple as in your SDL exporting a name using the `scalar` keyword. Using our `NonNegativeInt` example, we would do the following:

```graphql
scalar NonNegativeInt
```

This gives us the scalar but doesn't define how it works. This is where the resolver comes in. The resolver is defined differently than other GraphQL resolvers and needs to be defined using the `GraphQLScalarType` class from the `graphql` library and then then included into our server configuration. This code looks like:

```javascript
export const NonNegativeIntResolver = new GraphQLScalarType({
	name: 'NonNegativeInt',
	description: 'Integers that will have a value of 0 or more.',
	serialize(value) {
		return processValue(value);
	},
	parseValue(value) {
		return processValue(value);
	},
	parseLiteral(ast) {
		if (ast.kind !== Kind.INT) {
			throw createGraphQLError(
				`Can only validate integers as non-negative integers but got a: ${ast.kind}`,
				{
					nodes: ast,
				}
			);
		}
		return processValue(ast.value, 'NonNegativeInt');
	},
});

function processValue(value) {
	const parsedValued = parseInt(value, 10);
	if (!Number.isInteger(parsedValued)) {
		throw createGraphQLError(`Value is not an integer: ${parsedValued}`);
	}
	if (parsedValued < 0) {
		throw createGraphQLError(`${parsedValue} is less than 0`);
	}
	return parsedValue;
}
```

Let's break this down to understand the different pieces. First, we have the `name` field which is the display name for this scalar type. It should match the scalar type we defined in our SDL. The `description` is our documentation for the type that will appear in our schema explorer when we look deeper. Then we have 3 key functions: `serialize`, `parseValue`, and `parseLiteral` that are required for every scalar type definition.

`serialize` takes the value provided by our backend and coerces it into a JSON-compatible format so it can appear in the response. So looking at our example, if the value is passed into our GraphQL as `'1'`, serialize will coerce it into the integer value `1` making it compatible with our schema and with JSON.

`parseValue` is for handling inbound data from the frontend and making it valid on the backend. This is how resolver arguments get parsed on the server. So again looking at our example, if we provided a valid encoded integer as an integer or string to the server, the server could parse that value for the server to use and process.

`parseLiteral` takes hard-coded values from an operation document's abstract syntax tree (AST) and handles parsing it as validation. So in our example, if we ran an operation like:

```graphql
query MyQuery {
	products(itemsInStock: "1") {
		id
		name
		itemsInStock
	}
}
```

the `parseLiteral` function would receive an AST node with kind of `Kind.STRING` and value `"1"`. This is not valid with our function because we're expecting the kind to be `Kind.INT` and so this isn't a valid value.

As you can see, we also created a `processValue` function that parsed and validated our value that was reusable in all 3 functions. This example allowed for reusability but other cases, like a Date scalar, might require different validation and steps. You should check out [the example in the Apollo docs](https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/#example-the-date-scalar) for how they dealt with that specific case.

## Conclusion

We now know how to enhance our API schema using custom scalars and how we can create them. Before we go though, The Guild has made an awesome library of reusable scalars called [`graphql-scalars`](https://github.com/Urigo/graphql-scalars). This library has over 50 commonly used custom scalars. When you're first building your GraphQL API, I strongly recommend and encourage you to start with these scalars rather than building your own. Eventually, you may find you want to build your own to handle localization or handle certain cases slightly differently and that's okay! But, when you're first starting out to build your schema, it's faster to just borrow these.

Also, not all scalar types need this much validation. These are a tool to help for well-defined, well-structured scalar types. If you're just looking to validate the values of a field, I'd recommend just writing validation code into your resolver and adding a docstring comment on the field so people understand what's expected for that field.
