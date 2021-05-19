import { gql } from '@apollo/client';
import Apclient from './ApolloClient'

export const getRooms = async () => {

 const client = Apclient()

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

  const client = Apclient()

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

  const client = Apclient()

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

const type = "subscribe"
const client = Apclient(type)

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

