import { gql } from "@apollo/client";

const USER_LOGIN = gql`
  mutation Mutation($login: LoginInput!) {
    login(login: $login) {
      userid
      token
      username
      email
      role
      firsttimelogin
    }
  }
`;
const FORGOT_PASSWORD = gql`
  mutation ($forgot: ForgotDto!) {
    forgotpassword(forgot: $forgot) {
      userid
    }
  }
`;

const USER_TOKEN = gql`
  query Query($userId: String!) {
    user(id: $userId) {
      usertoken
      firsttimelogin
    }
  }
`;

const UPDATE_PASSWORD = gql`
  mutation ($updateUserInput: UpdateUserInput!) {
    updatePassword(updateUserInput: $updateUserInput) {
      __typename
    }
  }
`;

const USER = gql`
  query User($userId: String!) {
    user(id: $userId) {
      userid
      email
      username
      mobile
      isactive
      userrole {
        role {
          id
          role
          description
        }
      }
    }
  }
`;
const CREATE_USER = gql`
  mutation ($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      userid
    }
  }
`;
const ALL_USERS = gql`
  query Alluser {
    alluser {
      userid
      email
      username
      mobile
      isactive
      userrole {
        role {
          role
          description
        }
      }
    }
  }
`;

const UPDATE_USER = gql`
  mutation ($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      __typename
    }
  }
`;
const USER_SERVICE = {
  USER_LOGIN,
  FORGOT_PASSWORD,
  USER_TOKEN,
  UPDATE_PASSWORD,
  USER,
  CREATE_USER,
  ALL_USERS,
  UPDATE_USER,
};
export default USER_SERVICE;
