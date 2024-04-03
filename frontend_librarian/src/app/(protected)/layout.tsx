import { DashboardLayout } from "@/components/layouts/custom-layout";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession(authOptions);

  // if (!(session as any).jwt) return redirect("/login");
  return (
    <DashboardLayout>
      <main className="w-full h-full px-10 py-14">{children}</main>
    </DashboardLayout>
  );
}
