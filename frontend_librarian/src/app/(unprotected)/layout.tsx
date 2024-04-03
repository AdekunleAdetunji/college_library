import Navbar from "@/components/navbar";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isSignedIn = false;
  return (
    <div className="w-screen h-screen">
      <div className="h-fit">
        <Navbar />
      </div>
      <div className="h-full">{children}</div>
    </div>
  );
}
