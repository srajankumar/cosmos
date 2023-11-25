import AuthForm from "../auth-form";
const page = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h2 className="text-2xl font-bold">Verify your identity</h2>
      <AuthForm />
    </div>
  );
};

export default page;
