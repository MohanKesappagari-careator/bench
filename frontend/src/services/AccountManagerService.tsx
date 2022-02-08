import { gql } from "@apollo/client";
import axios from "axios";
import CONSTANTS from "../constants";

const ALL_RESOURCES = gql`
  query Allresources {
    allresources {
      firstname
      middlename
      lastname
      id
      skills
      briefintro
      personalemail
      careatoremail
      phone
      education
      totalexperience
      projectreleasedate
      location
      billrate
      releasereason
      statuscode
      comments
      isactive
      createdby
      resumeid
    }
  }
`;

const RESOURES = gql`
  query Resource($resourceId: Int!) {
    resource(id: $resourceId) {
      firstname
      middlename
      lastname
      id
      skills
      briefintro
      personalemail
      careatoremail
      phone
      education
      totalexperience
      projectreleasedate
      location
      billrate
      releasereason
      statuscode
      comments
      isactive
      createdby
    }
  }
`;

const UPDATE_RESOURCE = gql`
  mutation UpdateResource($updateResourceInput: UpdateResourceInput!) {
    updateResource(updateResourceInput: $updateResourceInput) {
      __typename
    }
  }
`;

const CREATE_RESOURCE = gql`
  mutation CreateResource($createResourceInput: CreateResourceInput!) {
    createResource(createResourceInput: $createResourceInput) {
      id
    }
  }
`;
const A_COUNT = gql`
  query {
    findACount
  }
`;
const V_COUNT = gql`
  query {
    findVCount
  }
`;
const B_COUNT = gql`
  query {
    findBCount
  }
`;
const L_COUNT = gql`
  query {
    findLCount
  }
`;
const UPLOAD_DOCUMENT = async (docfile: any, id: any) => {
  const url = `${CONSTANTS.DATABASE_URL}/document/resource/${id}`;
  return await axios.post(url, docfile);
};

const ACCOUNT_MANAGER_SERVICE = {
  ALL_RESOURCES,
  RESOURES,
  UPDATE_RESOURCE,
  CREATE_RESOURCE,
  A_COUNT,
  V_COUNT,
  B_COUNT,
  L_COUNT,
  UPLOAD_DOCUMENT,
};

export default ACCOUNT_MANAGER_SERVICE;
