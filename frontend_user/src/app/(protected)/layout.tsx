import { DashboardLayout } from "@/components/layouts/custom-layout";
import Navbar from "@/components/navbar";
import ProtectRoute from "@/components/protect-route";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
