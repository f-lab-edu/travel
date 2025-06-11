import { signOut } from "@/utils/supabase/actions";
import { createClientForServer } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClientForServer();

  const session = await supabase.auth.getUser();

  if (!session.data.user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-4xl font-bold">Not Authenticated</h1>
        <Link className="border rounded px-2.5 py-2" href="/auth">
          Sign in
        </Link>
      </div>
    );
  }

  const {
    data: {
      user: { user_metadata, app_metadata },
    },
  } = session;

  const { email } = user_metadata;

  const Email = email ? `${email}` : "email Not Set";

  console.log(session);
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl">Email: {Email}</p>

      <form action={signOut}>
        <button className="border rounded px-2.5 py-2" type="submit">
          Sign Out
        </button>
      </form>
    </div>
  );
}
