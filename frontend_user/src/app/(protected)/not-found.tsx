"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center">
        <h2>Resource not found</h2>
        <p>Could not find requested page</p>
        <div className="flex flex-col md:flex-row gap-4 items-center  justify-center mt-6">
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => router.push("/books")
            }
          >
            View books
          </Button>
          <Button
            variant="outline"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => router.push("/dashboard")
            }
          >
            Dashboard
          </Button>
        </div>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}
