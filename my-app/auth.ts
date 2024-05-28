import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { connectToMongoDB } from "@/lib/db";
import { User } from "@/models/userModels";
import google from "next-auth/providers/google";
import { availableParallelism } from "os";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session }) {
      try {
        await connectToMongoDB();
        if (session.user) {
          const user = await User.findOne({ email: session.user.email });
          if (user) {
            session.user._id = user._id;
            return session;
          } else {
            throw new Error("User not found");
          }
        } else {
          throw new Error("Invalid session");
        }
      } catch (error) {
        console.log(error);
        throw new Error("Invalid session");
      }
    },
    
    async signIn({ account, profile }) {
      console.log(profile);
      console.log(account);
      if (account?.provider === "github" || account?.provider === "google") {
        await connectToMongoDB();

        try {
          // const UserModel =
          //   account.provider === "google" ? GoogleUser : GitHubUser;
          const user = await User.findOne({ email: profile?.email });

          // profile picture attribute is different for google and github
          const avatarImage =
            account.provider === "google"
              ? profile?.picture
              : profile?.avatar_url;

          if (!user) {
            const newUser = await User.create({
              username: profile?.email?.split("@")[0],
              email: profile?.email,
              fullName: profile?.name,
              avatar: avatarImage,
            });
            await newUser.save();
          }

          return true; // indicate successful sign in
        } catch (error) {
          console.log((error as Error).message);
        }
      }

      return false; // indicate failed sign in
    },
  },
});
