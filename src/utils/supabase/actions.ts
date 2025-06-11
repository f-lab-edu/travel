"use server";

import { Provider } from "@supabase/supabase-js";
import { createClientForServer } from "./server";
import { redirect } from "next/navigation";

const signInWith = (provider: Provider) => async () => {
  const supabase = await createClientForServer();

  const auth_callback_url = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`;
  console.log("");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  });

  console.log(data);

  if (error) {
    console.log(error);
  }

  redirect(data.url as string);
};
const signOut = async () => {
  const supabase = await createClientForServer();
  await supabase.auth.signOut();
};
const signInWithGoogle = signInWith("google");

export { signInWithGoogle, signOut };
