const user = {
    _id: '1',
    name: 'Name',
    email: 'email@example.com'
}

module.exports = {
    Query: {
        me: () => user
    }
}