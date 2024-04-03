"use client"; // Error components must be Client Components
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="w-full h-full flex items-center justify-center text-center">
      <div>
        <h2>Something went wrong!</h2>
        <p>Details: {error.message}</p>
        <div className="flex flex-col md:flex-row gap-4 items-center  justify-center mt-6">
          <Button
            variant="outline"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
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
      </div>
    </div>
  );
}
