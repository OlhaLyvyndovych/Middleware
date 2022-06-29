const { ApolloServer, gql } = require('apollo-server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { applyMiddleware } = require('graphql-middleware');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const posts = require('./data');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});
// ----- MIDDLEWARE FUNCTIONS 
// Making text of 'category' uppercase
const uppercaseCategory = async (resolve, parent, args, context, info) => {
    const result = await resolve(parent, args, context, info)

    return result.toUpperCase();
}
// Append 'category text' to 'title' on the beginning
const postsMiddleware = async(resolve, parent, args, context, info) => {
    const result = await resolve(parent, args, context, info)

    const formatterPosts = result.reduce((formatted, post) => [
        ...formatted,
        {
            ...post,
            title: `${post.category}: ${post.title}`
        }
    ], [])
    return formatterPosts
}
// ---------- MIDDLEWARE ROUTES 
const postMiddleware = {
    Post: {
        category: uppercaseCategory
    },
    Query: {
        posts: postsMiddleware
    }
}

// ---------- ARRAY OF MIDDLEWARE ROUTES
const middleware = [postMiddleware];

const schemaWithMiddleware = applyMiddleware(schema, ...middleware);

const server = new ApolloServer({ schema: schemaWithMiddleware });

server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`)
});