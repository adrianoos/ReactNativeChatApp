
import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';



const Apclient = (type) => {

    let AuthToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGF0bHkiLCJleHAiOjE2MjMxOTM4OTQsImlhdCI6MTYyMDc3NDY5NCwiaXNzIjoiY2hhdGx5IiwianRpIjoiNTQ1Yjg5YzYtMTE0Ni00NmNmLTg3OTctMTY5ODBhNzJjMjUxIiwibmJmIjoxNjIwNzc0NjkzLCJzdWIiOiIxNjE5M2I3ZS03NmQ5LTRiYzQtYWRlNy01YWI4ODIzODAzMDgiLCJ0eXAiOiJhY2Nlc3MifQ.YqR45pVy6NRIW94EC68P8bDZBOMfItFh5lc3gIOVDcnQQSLE-C88I_ZFibSUtcevWcQ0nNcOEO7BIQVy4TLV1g'

    const httpLink = createHttpLink({
      uri: 'https://chat.thewidlarzgroup.com/api/graphiql',
    });

    const authLink = setContext((_, { headers }) => {
      const token = AuthToken
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${AuthToken}` : "",
        }
      }
    });

    const phoenixSocket = new PhoenixSocket("wss://chat.thewidlarzgroup.com/socket", {
        params: {token: AuthToken}
      });

    const absintheSocket = AbsintheSocket.create(phoenixSocket);

    const link = createAbsintheSocketLink(absintheSocket);

    const client = new ApolloClient({
      link: !type ? authLink.concat(httpLink) : link,
      cache: new InMemoryCache()
    })

    return client
    }

    export default Apclient;