import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Navbar from "@/components/navbar";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if ((session as any)?.jwt) return redirect("/books");
  const isSignedIn = false;
  return <div className="h-full w-full">{children}</div>;
}
