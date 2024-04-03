"use client";
import Link from "next/link";
import {
  Bell,
  BookDown,
  BookLock,
  BookUserIcon,
  CircleUser,
  Home,
  LucideSwatchBook,
  Menu,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode } from "react";
import CollegeLibraryLogo from "@/assets/images/library logo.jpg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
export function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  function isActive(href: string) {
    const normalStyle =
      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
    const activeStyle =
      "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary";
    return href === pathname ? activeStyle : normalStyle;
  }
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className={"flex items-center gap-2 font-semibold"}>
              <Image src={CollegeLibraryLogo} alt="logo" className="h-6 w-6" />
              <span className="">College Library</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link href="/dashboard" className={isActive("/dashboard")}>
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link href="/books" className={isActive("/books")}>
                <LucideSwatchBook className="h-4 w-4" />
                Books
              </Link>
              <Link
                href="/books/reserved"
                className={isActive("/books/reserved")}
              >
                <BookDown className="h-4 w-4" />
                Reserved Books
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge> */}
              </Link>
              <Link
                href="/books/borrowed"
                className={isActive("/books/borrowed")}
              >
                <BookUserIcon className="h-4 w-4" />
                Borrowed Books
              </Link>
              <Link
                href="/books/blacklist"
                className={isActive("books/blacklist")}
              >
                <BookLock className="h-4 w-4" />
                Blacklisted
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <SheetClose asChild>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Image
                      src={CollegeLibraryLogo}
                      alt="logo"
                      className="h-6 w-6"
                    />
                    <span className="sr-only">College Library</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/dashboard" className={isActive("/dashboard")}>
                    <Home className="h-4 w-4" />
                    Dashboard
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/books" className={isActive("/books")}>
                    <LucideSwatchBook className="h-4 w-4" />
                    Books
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/books/reserved"
                    className={isActive("/books/reserved")}
                  >
                    <BookDown className="h-4 w-4" />
                    Reserved Books
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      6
                    </Badge>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/books/borrowed"
                    className={isActive("/books/borrowed")}
                  >
                    <BookUserIcon className="h-4 w-4" />
                    Borrowed Books
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="books/blacklist"
                    className={isActive("books/blacklist")}
                  >
                    <BookLock className="h-4 w-4" />
                    Blacklisted
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search books..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  variant="link"
                  onClick={() =>
                    signOut({ redirect: true, callbackUrl: "/login" })
                  }
                >
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {children}
      </div>
    </div>
  );
}
