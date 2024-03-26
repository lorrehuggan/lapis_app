import { Google, generateCodeVerifier, generateState } from "arctic";
import { Lucia, Session, User } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import { dbAdapter } from "../db";
import type { Session as S, User as U } from "../db/schema/user";
import { env } from "../env";

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  env.REDIRECT_URI,
);

export const auth = new Lucia(dbAdapter, {
  sessionCookie: {
    name: "lapis_session",
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: async (user) => {
    return {
      email: user.email,
      name: user.name,
      id: user.id,
    };
  },

  getSessionAttributes: async (session) => {
    return {
      id: session.id,
      userId: session.userId,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    };
  },
});

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(auth.sessionCookieName)?.value;

    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await auth.validateSession(sessionId);

    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = auth.createSessionCookie(result.session.id);

        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }

      if (!result.session) {
        const sessionCookie = auth.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch (e) {
      console.log(e);
    }

    return result;
  },
);

export const validateSession = async () => {
  const { session } = await validateRequest();

  if (!session) {
    console.log("Unauthorized");
    return {
      error: "Unauthorized",
    };
  }

  return session;
};

export const state = generateState();
export const codeVerifier = generateCodeVerifier();

declare module "lucia" {
  interface Register {
    Lucia: typeof auth;
    DatabaseUserAttributes: U;
    DatabaseSessionAttributes: S;
  }
}
