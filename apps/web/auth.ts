import fs from "node:fs";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

function getGoogleCredentials() {
  const credentialsPath = process.env.GOOGLE_OAUTH_CREDENTIALS_FILE;

  if (credentialsPath && fs.existsSync(credentialsPath)) {
    const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8")) as {
      web?: { client_id?: string; client_secret?: string };
      installed?: { client_id?: string; client_secret?: string };
    };
    const client = credentials.web || credentials.installed;

    return {
      clientId: client?.client_id,
      clientSecret: client?.client_secret,
    };
  }

  return {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}

const googleCredentials = getGoogleCredentials();

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET || "autiko-local-development-secret-change-in-production",
  providers: [Google(googleCredentials)],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.googleAccessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = "BUYER";
        if (typeof token.googleAccessToken === "string") {
          session.user.accessToken = typeof token.googleAccessToken === "string" ? token.googleAccessToken : undefined;
        }
      }

      return session;
    },
  },
});
