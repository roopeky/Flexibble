import { createProjectMutation, getUserQuery, projectsQuery, createUserMutation, getAllProjectsQuery } from "@/graphql";
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
        // Handle the error here or rethrow it
        console.error("An error occurred during image upload:", error);
        throw error; // Rethrow the error if you want to handle it further up the call stack
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
  
  