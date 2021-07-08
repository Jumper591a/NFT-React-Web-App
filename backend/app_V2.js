//? Es6 imports => requires node version 12.2 and above I believe (Check bookmarked links in slack for a future solution to upgrading node easily).
// import { ApolloServer, gql } from 'apollo-server-express';
// import * as app from `express`

//! require imports for express, apollo server, and http.
const { ApolloServer, gql } = require("apollo-server-express");
const http = require("http");
const app = require("express")();
//! require imports for custom module for configuring MongoDB.
const { initMongo, M } = require("./mongo");

//*=============================================================================
//!                 || STARTS UP MONGODB INTEGRATION ||
//*=============================================================================

//* Establishes Connection with MongoDB server and Configures MongoDB schemas.
initMongo();

//* Returns Model Objects for us to use.
const Departments = M("departments");
const Employees = M("employees");
const Companies = M("companies");

//*============================================================================
//!                     DEFINING THE TYPEDEFS AND RESOLVERS
//*============================================================================
//!!!!!!!!!!!!!!!!!!!! -- Last place I left off.
const typeDefs = gql`
  type Department {
    name: String
    location: String
  }
`;

//*============================================================================
//? (production level pec-compliant GraphQL server that's compatible with any
//? GraphQL client, including Apollo Client)
//!                      || STARTS UP APOLLO SERVER ||
//*============================================================================

const server = new ApolloServer({ typeDefs, resolvers });
//* Apply our express app into the middleware
server.applyMiddleware({ app });

// await Companys.find().populate({
//   path: "employees",
//   model: "Employee",
//   populate: { path: "department", model: "Department" },
// }),

//*========================================================================
//!   || NEEDED FOR OUR APPLICATION TO LISTEN TO THE CORRECT PORT ||
//*========================================================================

//* Creates a http server from our express app
const httpServer = http.createServer(app);

//* Makes the server listen for the right port to read the response
httpServer.listen({ port: 3050 }, () => {
  //? Path for the Rest Endpoint
  console.log(`🚀  Server ready at http://0.0.0.0:3050:${server.graphqlPath}`);
  //? Path for the Web Service (Websockets).
  console.log(
    `🚀  Server ready at http://0.0.0.0:3050:${server.subscriptionsPath}`
  );
});
