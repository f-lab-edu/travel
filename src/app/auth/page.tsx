import AuthForm from "@/components/Forms/AuthForm";
import styles from "./auth.module.scss";
import Image from "next/image";

const AuthPage = () => {
  return (
    <div className={styles.authContainer}>
      <Image
        src="/icons/logo.png" // public/logo.png 에 저장했다고 가정
        alt="TripPick Logo"
        width={80} // 원하는 크기로 조절 가능!
        height={80}
        className={styles.logoImage} // 스타일 주고 싶으면 SCSS 클래스 추가!
        priority // (선택) 처음 페이지면 priority 주면 좋음
      />
      <h1 className={styles.projectName}>TripPick</h1>
      <p className={styles.welcomeMessage}>환영합니다!</p>
      <AuthForm />
    </div>
  );
};

export default AuthPage;
