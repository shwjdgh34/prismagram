export default {
  Query: {
    goodbye: (_, { name }) => `Good bye ${name || 'World'}`
  }
};
