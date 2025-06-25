import UserSetting from "@/components/Setting/Setting";
import { createClientForServer } from "@/utils/supabase/server";
import { findUserById } from "../../app/api/userRepo";

export default async function SettingPage() {
  const supabase = await createClientForServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  const userData = await findUserById(user.id);
  return (
    <UserSetting
      email={userData?.email}
      profile_url={userData?.profile_image_url}
      name={userData?.name}
    />
  );
}
