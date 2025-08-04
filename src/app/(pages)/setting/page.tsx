import UserSetting from "@/components/pages/Settings/Setting";
import { createClientForServer } from "@/lib/supabase/server";
import { findUserById } from "../../api/userRepo";
import { MESSAGES } from "@/constants/messages";

export default async function SettingPage() {
  const supabase = await createClientForServer();

  // 유저 인증 정보 조회
  const authResult = await supabase.auth.getUser();
  const user = authResult.data.user;

  // 유저가 없는 경우 - 로그인 필요 메시지 출력
  if (!user) {
    return <div>{MESSAGES.error.UNAUTHORIZED}</div>;
  }

  // 유저 정보 조회
  const userData = await findUserById(user.id);

  return (
    <UserSetting
      email={userData?.email}
      profile_url={userData?.profile_image_url}
      name={userData?.name}
    />
  );
}
