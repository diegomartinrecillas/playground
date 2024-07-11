import { Heading } from "@/typography/heading";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Heading>Home</Heading>
      <Link
        className="text-2xl underline hover:text-blue-300 p-10"
        href="/bookings"
      >
        Bookings
      </Link>
    </main>
  );
}
