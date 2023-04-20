import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql"
import { configureWunderGraphServer } from "@wundergraph/sdk/server"
import type { HooksConfig } from "./generated/wundergraph.hooks"
import type { InternalClient } from "./generated/wundergraph.internal.client"

export default configureWunderGraphServer<HooksConfig, InternalClient>(() => ({
  hooks: {
    queries: {
      Dragons: {
        preResolve: async (stuff) => {
          console.log("Before Resolve ...", stuff.clientRequest.headers)
        }
      }
    },
    mutations: {},
    authentication: {
      postAuthentication: async (stuff) => {
        console.log("Hello there", stuff)
      }
    }
  },
  graphqlServers: []
}))
