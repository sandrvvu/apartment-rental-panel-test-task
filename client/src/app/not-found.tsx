"use client";

import { Button } from "@/components/ui";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col justify-center items-center text-center mx-6 px-5">
        <h1 className="text-[5rem] md:text-[7rem] font-gravitas font-extrabold mb-4 drop-shadow-lg">
          404
        </h1>
        <p className="text-lg md:text-4xl font-semibold mb-4">
          Oops! Nothing Found Here
        </p>
        <Link href="/">
          <Button
            variant="outline"
            className="border-2 text-md md:text-xl px-4 py-2 rounded-xl transition"
          >
            Go back to the homepage
          </Button>
        </Link>
      </div>
    </main>
  );
}
