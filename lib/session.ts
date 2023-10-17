import { getServerSession } from "next-auth";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    /*
    jwt: {
        encode: ({ secret, token}) => {

        },
        encode: async ({ secret, token}) => {
            
        },
    },
    */
    theme: {
        colorScheme: "auto",
        logo: "/logo.png",
    },
    callbacks: {
        async session({ session }) {
            return session;
        },
        async signIn({ user }: { user: User | AdapterUser }) {
            try {
                    // get the user if they exists
                    // if they don't exist, create them

                return true;
            } catch (error: any) {
                console.log(error);
                return false;
            }
        }   
    }
}
