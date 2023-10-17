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