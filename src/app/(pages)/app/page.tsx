import { logout } from "@/lib/actions/auth";
import { validateRequest } from "@/lib/authentication";
import { redirect } from "next/navigation";

export default async function App() {
  const { session } = await validateRequest();

  if (!session) redirect("/login");

  return (
    <section className="col-span-9 p-4">
      <div className="prose">
        <h1 className="">App:</h1>
        <p>{session.userId}</p>
        <form action={logout}>
          <button>logout</button>
        </form>
      </div>
    </section>
  );
}
