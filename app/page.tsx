import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignUpButton } from "@clerk/nextjs";
import { LinkIcon, BarChart2Icon, ShieldCheckIcon, ZapIcon } from "lucide-react";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: LinkIcon,
    title: "Shorten Any URL",
    description:
      "Turn long, unwieldy links into clean, memorable short URLs in seconds.",
  },
  {
    icon: BarChart2Icon,
    title: "Track Click Analytics",
    description:
      "See how many times your links are clicked and understand your audience.",
  },
  {
    icon: ZapIcon,
    title: "Instant Redirects",
    description:
      "Lightning-fast redirects ensure your visitors reach their destination without delay.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure & Reliable",
    description:
      "Your links are protected and always available whenever you need them.",
  },
];

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col flex-1">
      <Header />

      {/* Hero */}
      <section className="flex flex-col items-center justify-center gap-6 px-6 py-24 text-center">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Shorten links. Share smarter.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Create short, branded links in seconds. Track every click and share
          with confidence — all in one simple dashboard.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <SignUpButton mode="modal">
            <Button size="lg" className="px-8">
              Get started for free
            </Button>
          </SignUpButton>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/40 border-t border-border">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 py-20 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="size-5 text-primary" />
              </div>
              <h2 className="font-semibold">{title}</h2>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center gap-4 px-6 py-20 text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Ready to simplify your links?
        </h2>
        <p className="text-muted-foreground">
          Sign up free and start shortening in under a minute.
        </p>
        <SignUpButton mode="modal">
          <Button size="lg" className="px-8">
            Create your free account
          </Button>
        </SignUpButton>
      </section>
    </div>
  );
}
