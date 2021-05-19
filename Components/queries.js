import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { gql } from '@apollo/client';
import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";


let AuthToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGF0bHkiLCJleHAiOjE2MjMxOTM4OTQsImlhdCI6MTYyMDc3NDY5NCwiaXNzIjoiY2hhdGx5IiwianRpIjoiNTQ1Yjg5YzYtMTE0Ni00NmNmLTg3OTctMTY5ODBhNzJjMjUxIiwibmJmIjoxNjIwNzc0NjkzLCJzdWIiOiIxNjE5M2I3ZS03NmQ5LTRiYzQtYWRlNy01YWI4ODIzODAzMDgiLCJ0eXAiOiJhY2Nlc3MifQ.YqR45pVy6NRIW94EC68P8bDZBOMfItFh5lc3gIOVDcnQQSLE-C88I_ZFibSUtcevWcQ0nNcOEO7BIQVy4TLV1g'

export const getRooms = async () => {

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

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })

 const response =  await client.query({
    query: gql`
    {
      usersRooms {
        user {
        email
        firstName
          lastName
          id
          role
        }
       rooms {
        id
        name
      }
    }
    }
    `
  })
 const modifiedResponse = {
   response: response.data.usersRooms.rooms
 }
return modifiedResponse
};

export const getMessages = async ( roomID ) => {

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

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    })

    const response =  await client.query({
      query: gql`
      {
        room (id: "${roomID}"){
         messages {
           id
           body
           insertedAt
           user {
             id
           }
         }
       }
       }
      `
    })

  return response;
};

export const sendMessage = async ( roomID, message ) => {

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


  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })

  const response =  await client.mutate({
    mutation: gql`
    mutation {
      loginUser(email: "ron@mail.com", password:"RonIsCool!123") {
        token
      }
      sendMessage(body:"${message}", roomId:"${roomID}") {
        id
      }
    }
    `
  })

return response;
};

export const receiveMessages = async (roomID) => {

  const phoenixSocket = new PhoenixSocket("wss://chat.thewidlarzgroup.com/socket", {
    params: {token: AuthToken}
  });

const absintheSocket = AbsintheSocket.create(phoenixSocket);

const link = createAbsintheSocketLink(absintheSocket);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

  const response =  await client.subscribe({
    query: gql`
    subscription{
      messageAdded (roomId:"${roomID}") {
        id
        insertedAt
        user {
          id
        }
        body
      }
    }
    `
  })

return response;
};

