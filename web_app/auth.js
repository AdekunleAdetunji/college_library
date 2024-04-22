"use server"

import { SERVER } from "@/lib/utils";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                uni_id: {},
                password: {},
            },
            authorize: async (credentials) => {

                try {
                    const response = await fetch(`${SERVER}/token`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username: credentials.uni_id, password: credentials.password })
                    });

                    const data = await response.json()

                    if (!response.ok) {
                        if (data.detail && data.detail.length > 0) {
                            const errorMessage = data.detail[0].msg;
                            throw new Error(errorMessage);
                        } else {
                            throw new Error('Login failed');
                        }
                    }
                    const accessToken = data.access_token;
                    const tokenType = data.token_type;
                    console.log('Access Token:', accessToken);
                    console.log('Token Type:', tokenType);
                    return { accessToken, tokenType };
                } catch (error) {
                    throw new Error('Login failed');
                }
            }
        }),
    ],
})