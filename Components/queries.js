import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { gql } from '@apollo/client';


let AuthToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGF0bHkiLCJleHAiOjE2MjMxOTM4OTQsImlhdCI6MTYyMDc3NDY5NCwiaXNzIjoiY2hhdGx5IiwianRpIjoiNTQ1Yjg5YzYtMTE0Ni00NmNmLTg3OTctMTY5ODBhNzJjMjUxIiwibmJmIjoxNjIwNzc0NjkzLCJzdWIiOiIxNjE5M2I3ZS03NmQ5LTRiYzQtYWRlNy01YWI4ODIzODAzMDgiLCJ0eXAiOiJhY2Nlc3MifQ.YqR45pVy6NRIW94EC68P8bDZBOMfItFh5lc3gIOVDcnQQSLE-C88I_ZFibSUtcevWcQ0nNcOEO7BIQVy4TLV1g'
//const AuthToken = process.env.REACT_APP_AUTHTOKEN

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

export const getRoom = async ( roomID ) => {

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
         }
       }
       }
      `
    })
   const modifiedResponse = {
     response: response.data.room.messages,
   }
  return modifiedResponse


};


//1d824729-5c45-437f-8ca6-6e0595eea315