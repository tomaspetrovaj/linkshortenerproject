import { SignOutButton } from "@clerk/nextjs";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex items-center justify-between px-6 py-4">
        <h1>Dashboard</h1>
        <SignOutButton redirectUrl="/">
          <Button variant="outline">Sign out</Button>
        </SignOutButton>
      </div>
    </div>
  );
}
