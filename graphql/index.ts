export const getUserQuery = `
    query GetUser($email: String!) {
        user(buy: { email: $email }) {
            id
            name
            email
            avatarUrl
            description
            githubUrl
            linkedinUrl 
    }
`

export const createUserMutation = `
    mutation CreateUser($input: UserCreateInput!) {
        userCreate(input: $input) {
            id
            name
            email
            avatarUrl
            description
            githubUrl
            linkedinUrl
        }
    }
`