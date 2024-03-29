import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="h-fit">
        <Navbar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
