const user = {
    _id: '1',
    name: 'Name',
    email: 'email@example.com'
}

export const resolvers = {
    Query: {
        me: () => user
    }
}