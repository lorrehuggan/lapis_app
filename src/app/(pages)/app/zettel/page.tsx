import { validateRequest } from "@/lib/authentication";
import { db } from "@/lib/db";
import { zettelTable } from "@/lib/db/schema/note";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Page() {
  const { session } = await validateRequest();
  if (!session) redirect("/login");
  const zettels = await db
    .select()
    .from(zettelTable)
    .where(eq(zettelTable.user, session.userId));

  return (
    <section className="col-span-9">
      {zettels.map((zettel) => {
        return (
          <div key={zettel.id}>
            <h1>{zettel.key}</h1>
          </div>
        );
      })}
    </section>
  );
}
