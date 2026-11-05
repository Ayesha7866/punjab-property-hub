import { getSessionUser } from "@/lib/session";
import { SiteHeader } from "@/components/layout/site-header";

export async function HeaderAuth() {
  const user = await getSessionUser();
  return (
    <SiteHeader
      user={
        user
          ? { name: user.name, role: user.role }
          : null
      }
    />
  );
}
