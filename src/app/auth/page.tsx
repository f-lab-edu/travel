import AuthForm from "@/components/Forms/AuthForm";

const AuthPage = () => {
  return (
    <div className="flex flex-col mx-auto gap-4 p-8">
      <h1>Not Logged in</h1>
      <AuthForm />
    </div>
  );
};

export default AuthPage;
