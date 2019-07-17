import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';

const AllTypes = fileLoader(path.join(__dirname, './api/**/*.graphql'));
const AllResolvers = fileLoader(path.join(__dirname, 'api/**/*.js'));
const schema = makeExecutableSchema({
  typeDefs: mergeTypes(AllTypes, { all: true }),
  resolvers: mergeResolvers(AllResolvers)
});

export default schema;
