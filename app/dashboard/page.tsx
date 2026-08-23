import { auth } from "@clerk/nextjs/server";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { getLinksForUser } from "@/data/links";

import { CreateLinkDialog } from "./create-link-dialog";
import { DeleteLinkDialog } from "./delete-link-dialog";
import { EditLinkDialog } from "./edit-link-dialog";

export default async function DashboardPage() {
  const { userId } = await auth();
  const userLinks = userId ? await getLinksForUser(userId) : [];

  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex flex-col gap-4 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1>My Links</h1>
          <CreateLinkDialog />
        </div>
        {userLinks.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            You haven&apos;t created any links yet.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {userLinks.map((link) => (
              <Card
                key={link.id}
                className="flex-row items-center justify-between gap-4 px-4"
              >
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="font-medium">/{link.slug}</span>
                  <span className="truncate text-sm text-muted-foreground">
                    {link.url}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {link.createdAt.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <EditLinkDialog link={link} />
                  <DeleteLinkDialog linkId={link.id} slug={link.slug} />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
