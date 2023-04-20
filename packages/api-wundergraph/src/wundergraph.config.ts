import {
  authProviders,
  configureWunderGraphApplication,
  cors,
  introspect,
  templates
} from "@wundergraph/sdk"
import server from "./wundergraph.server"
import operations from "./wundergraph.operations"

const countries = introspect.graphql({
  apiNamespace: "countries",
  url: "https://countries.trevorblades.com/"
})

const spaceX = introspect.graphql({
  apiNamespace: "spacex",
  url: "https://spacex-api.fly.dev/graphql/"
})

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
  apis: [countries, spaceX],
  server,
  operations,
  codeGenerators: [
    {
      templates: [...templates.typescript.all]
    }
  ],
  cors: {
    ...cors.allowAll,
    allowedOrigins: process.env.NODE_ENV === "production" ? ["https://*"] : ["http://*"]
    /**
     * Please configure CORS carefully to make sure that your users are protected.
     * Allowing all origins is usually the worst possible configuration.
     *
     * @docs https://docs.wundergraph.com/docs/wundergraph-config-ts-reference/configure-cors
     */
    // allowedOrigins: process.env.NODE_ENV === 'production' ? ['http://your.app'] : ['http://localhost:3000'],
  },
  authentication: {
    tokenBased: {
      providers: [
        {
          // userInfoEndpoint: "https://climbing-gecko-40.clerk.accounts.dev", // Enabling this will cause a silent error T_T
          jwksURL: "https://climbing-gecko-40.clerk.accounts.dev/.well-known/jwks.json"
        }
      ]
    }
  },
  security: {
    enableGraphQLEndpoint:
      process.env.NODE_ENV !== "production" || process.env.GITPOD_WORKSPACE_ID !== undefined
  }
})
