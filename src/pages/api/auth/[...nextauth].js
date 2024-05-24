import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "../../../../models/User";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return (
          profile.email_verified && profile.email.endsWith("@middlebury.edu")
        );
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
};

export default NextAuth({
  ...authOptions,
  callbacks: {
    ...authOptions.callbacks,
    async jwt({ token, user }) {
      if (user) {
        let localUser = await User.query().findOne("googleId", user.id);
        if (!localUser) {
          // Create new user record in the database
          localUser = await User.query().insertAndFetch({
            googleId: user.id,
            username: user.name,
            email: user.email,
          });
        }
        // Add user id to the token
        // eslint-disable-next-line no-param-reassign
        token.id = localUser.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user id to the session
      // eslint-disable-next-line no-param-reassign
      session.user.id = token.id;
      return session;
    },
  },
});
