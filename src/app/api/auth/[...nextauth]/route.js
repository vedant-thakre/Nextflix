import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session?.user?.username
        .split(" ")
        .join(" ")
        .toLocaleLowerCase();

      session.user.uid = token.sub;

      return session;
    },
  },
  secret: process.env.SECRET_KEY,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
