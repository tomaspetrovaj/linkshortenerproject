import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";
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

const steps = [
  "Paste the long URL you want to shorten",
  "Customize your short link (optional)",
  "Share it anywhere and track every click",
];

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-8">
               <div className="space-y-5">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  A simple link shortener for links people actually want to click.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                  Create short, polished URLs, keep them organized in one
                  account, and give every shared link a more professional look.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <SignUpButton mode="modal">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start shortening links
                    <ArrowRight className="size-4" />
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Sign in to your workspace
                  </Button>
                </SignInButton>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="text-sm text-muted-foreground">Built for</p>
                  <p className="mt-2 text-2xl font-semibold">Fast sharing</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="text-sm text-muted-foreground">Designed for</p>
                  <p className="mt-2 text-2xl font-semibold">Clean branding</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="text-sm text-muted-foreground">Protected with</p>
                  <p className="mt-2 text-2xl font-semibold">Secure access</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="rounded-2xl border border-border bg-background p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Share-ready links
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      A better way to organize the URLs you send every day.
                    </p>
                  </div>
                  <ShieldCheck className="size-9 text-primary" />
                </div>
                <div className="mt-6 space-y-3">
                  {steps.map((step, index) => (
                    <div
                      key={step}
                      className="flex items-start gap-3 rounded-2xl bg-muted/60 p-4"
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                        {index + 1}
                      </div>
                      <p className="pt-1 text-sm text-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <section
            id="features"
            className="grid gap-6 md:grid-cols-3"
            aria-label="Application features"
          >
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-3xl border border-border bg-card p-6 shadow-sm"
                >
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-foreground">
                    {feature.title}
                  </h2>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </section>

          <section className="rounded-3xl border border-border bg-muted/40 px-6 py-10 text-center sm:px-10">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Ready to make every link easier to share?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Create an account, open your dashboard, and start turning long
              URLs into short links that look better everywhere.
            </p>
            <div className="mt-6 flex justify-center">
              <SignUpButton mode="modal">
                <Button size="lg">Create your account</Button>
              </SignUpButton>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
