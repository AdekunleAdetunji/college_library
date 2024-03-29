import Navbar from "@/components/navbar";
import ProtectRoute from "@/components/protect-route";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectRoute>
      <div className="w-screen h-screen flex flex-col">
        <div className="h-fit">
          <Navbar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </ProtectRoute>
  );
}
