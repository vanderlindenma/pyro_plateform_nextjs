import LoginForm from "@/components/loginForm";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <header className="w-full flex justify-between items-center h-14 px-2 bg-primary">
      <div className="flex items-center py-2">
        <img 
          src="/logo_yellow.png" 
          alt="Pyronear Logo" 
          className="h-8"
        />
      </div>
      </header>
      <div className="mt-6 w-64">
        <LoginForm />
      </div>
    </div>
  );
}
