import { deleteProjectMutation, getProjectsOfUserQuery, updateProjectMutation } from './../graphql/index';
import { createProjectMutation, getUserQuery, projectsQuery, createUserMutation, getAllProjectsQuery, getProjectByIdQuery } from "@/graphql";
import { GraphQLClient } from "graphql-request";
import { ProjectForm } from "@/common.types";

const isProduction = process.env.NODE_ENV === "production";
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || "" : "http://127.0.0.1:4000/graphql" ;
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || "" : "letmein";
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_SERVER_URL || "" : "http://localhost:3000";

const clientOptions = {
    headers: {
      'x-api-key': apiKey,
    },
  };
  
  const client = new GraphQLClient(apiUrl, clientOptions);

export const fetchToken = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/auth/token`);
        return response.json();
    } catch (error) {
        console.error("An error occurred during token fetch:", error);
        throw error;
    }
}

const makeGraphQLRequest = async (query: string, variables = {}, headers = {}) => {
    try {
      return await client.request(query, variables, headers);
    } catch (error) {
      throw error;
    }
  };

export const getUser = (email: string) => {
    client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getUserQuery, { email });
}

export const createUser = (name: string, email: string, avatarUrl: string) => {
    client.setHeader("x-api-key", apiKey);
    const variables = {
        input: {
            name, email, avatarUrl
        }
    }

    return makeGraphQLRequest(createUserMutation, variables);
}

export const uploadImage = async (imagePath: string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: "POST",
            body: JSON.stringify({ path: imagePath }),
        });
        
        return response.json();
    } catch (error) {
        console.error("An error occurred during image upload:", error);
        throw error;
    }
};

export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
    const imageUrl = await uploadImage(form.image);
    if (imageUrl.url) {      

      const headers = {
        Authorization: `Bearer ${token}`
      };
      const variables = {
        input: {
          ...form,
          image: imageUrl.url,
          createdBy: {
            link: creatorId
          }
            }
        };

        return makeGraphQLRequest(createProjectMutation, variables, headers);
    }
};

export const fetchAllProjects = (category?: string, endcursor?: string) => {
    client.setHeader('x-api-key', apiKey);
    
    const query = category ? projectsQuery : getAllProjectsQuery;
    const variables = category ? { category, endcursor } : { endcursor };
    
    return makeGraphQLRequest(query, variables);
  };
  
export const getProjectDetails = (id: string) => {
  client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getProjectByIdQuery, { id });
};

export const getUserProjects = (id: string, last?: number) => {
  client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
};

export const deleteProject = (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);
    return makeGraphQLRequest(deleteProjectMutation, { id });
};

export const updateProject = async (form: ProjectForm, projectId: string, token: string) => {

  function isBase64DataUrl(value: string) {
    return /^data:image\/[a-z]+;base64,/.test(value);
  }

  let updatedForm = { ...form };

  const isUploadingNewImage = isBase64DataUrl(form.image);

  if (isUploadingNewImage) {
    const imageUrl = await uploadImage(form.image);

    if (imageUrl.url) {
      updatedForm = {
        ...form,
        image: imageUrl.url,
      };
    }
  }

  const variables = {
    id: projectId,
    input: updatedForm,
  }

  client.setHeader("Authorization", `Bearer ${token}`);
    return makeGraphQLRequest(updateProjectMutation, variables);
};
