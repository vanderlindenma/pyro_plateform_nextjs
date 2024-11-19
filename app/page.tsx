import LoginForm from "@/components/loginForm";

export default function Page() {
  return (
    <div className="flex flex-col p-4 lg:w-1/3">
      <div className="mt-6">
        <LoginForm />
      </div>
    </div>
  );
}
