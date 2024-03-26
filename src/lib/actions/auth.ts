import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth, validateRequest } from "../authentication";

interface ActionResult {
  error: string | null;
}

export async function logout(): Promise<ActionResult> {
  "use server";

  const { session } = await validateRequest();

  if (!session) {
    console.log("Unauthorized");
    return {
      error: "Unauthorized",
    };
  }

  console.log("Invalidating session");

  await auth.invalidateSession(session.id);
  const sessionCookie = auth.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  console.log("Session invalidated redirecting to /login");

  return redirect("/login");
}
