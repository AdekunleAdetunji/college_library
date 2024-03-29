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
        <Navbar>
          <ul className="flex items-center justify-around w-full h-fit border-y-2 border-red-400">
            <li className="ml-4">
              <Link href="/" className="text-white active:">
                Home
              </Link>
            </li>
            <li className="ml-4">
              <Link href="/login" className="text-white active:">
                Sign in
              </Link>
            </li>
            <li className="ml-4">
              <Link href="/sign-up" className="text-white active:">
                Sign up
              </Link>
            </li>
          </ul>
        </Navbar>
      </div>
      <div className="h-full">{children}</div>
    </div>
  );
}
