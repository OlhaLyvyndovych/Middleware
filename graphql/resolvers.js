const generateId = () => Math.floor(Math.random() * 100);

const posts = [
    {
        id: generateId(),
        title: 'GraphQL Middleware',
        body: 'Something about middleware',
        category: 'Tutorial'
    }
]

const resolvers = {
    Query: {
        posts: () => posts
    },

    Mutation: {
        createPost: (parent, args) => ({
            id: generateId(),
            ...args
        })
    }
};

module.exports = resolvers; 