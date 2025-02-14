import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID ?? "",
      clientSecret: process.env.FACEBOOK_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // In a real app, you would validate against your database
        if (credentials?.email === "test@example.com" && credentials?.password === "test123") {
          return {
            id: "1",
            email: credentials.email,
            name: "Test User"
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/signin',
    // signUp: '/signup',
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };