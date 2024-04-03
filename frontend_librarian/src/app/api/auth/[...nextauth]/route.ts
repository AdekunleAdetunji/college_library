import { getUser, signIn } from "@/lib/actions";
import { jwtDecode } from "jwt-decode";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        uni_id: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await signIn(
          credentials as { uni_id: string; password: string }
        );
        if (res.isSuccess)
          return { uni_id: credentials?.uni_id, jwt: res.data.access_token };
        throw new Error(res.message);
      },
    }),
  ],
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  session: {
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      // user is only available the first time a user signs in authorized
      if (user) {
        return {
          ...token,
          jwt: user.jwt,
        };
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.jwt = token.jwt;
      }
      const access_token = session.jwt;
      if (access_token) {
        const { sub, exp } = jwtDecode(access_token);
        if (!sub || (exp && exp < Date.now() / 1000)) {
          session.user = {};
          delete session.jwt;
          return session;
        }
        const userData = await getUser(sub, access_token);
        if (!userData.isSuccess) {
          session.user = {};
          session.error = userData.message;
          delete session.jwt;
          return session;
        }
        session.user = userData.data;
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
