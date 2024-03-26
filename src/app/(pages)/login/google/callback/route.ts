import { auth, google } from "@/lib/authentication";
import { db } from "@/lib/db";
import { userTable } from "@/lib/db/schema/user";
import { GoogleUser } from "@/types";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);

  const code = url.searchParams.get("code");
  const storedState = cookies().get("google_oauth_state")?.value;
  const codeVerifierCookie = cookies().get("google_auth_code_verifier")?.value;

  if (!code || !storedState || !codeVerifierCookie) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      codeVerifierCookie,
    );
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
    const user = (await response.json()) as unknown as GoogleUser;

    if (!user.email) {
      return new Response(null, {
        status: 400,
      });
    }

    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, user.email));

    if (existingUser.length > 0) {
      const sessionId = generateId(16);

      const session = await auth.createSession(
        user.sub,
        {
          id: sessionId,
          userId: existingUser[0].id,
          fresh: tokens.accessTokenExpiresAt < new Date(),
          expiresAt: new Date(tokens.accessTokenExpiresAt),
          userEmail: user.email ?? "",
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
        {
          sessionId: sessionId,
        },
      );

      const sessionCookie = auth.createSessionCookie(session.id);

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return new Response(null, {
        status: 302,
        headers: {
          Location: "/app",
        },
      });
    }

    const userData = {
      id: uuidv4(),
      email: user.email,
      name: user.name,
    };

    const newUser = await db.insert(userTable).values(userData).returning({
      id: userTable.id,
      email: userTable.email,
    });

    const sessionId = generateId(16);

    const session = await auth.createSession(
      newUser[0].id,
      {
        id: sessionId,
        userId: newUser[0].id,
        fresh: tokens.accessTokenExpiresAt < new Date(),
        expiresAt: new Date(tokens.accessTokenExpiresAt),
        userEmail: newUser[0].email ?? "",
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
      {
        sessionId: sessionId,
      },
    );

    const sessionCookie = auth.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/app",
      },
    });
  } catch (e) {
    console.log(e);
    return new Response(null, {
      status: 500,
      headers: {
        Location: "/login",
      },
    });
  }
}
