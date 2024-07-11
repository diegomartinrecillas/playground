import { prisma } from "@/db";
import { Heading } from "@/typography/heading";
import { Bookings } from "./bookings";
import { toBooking } from "@/utils/bookings";

export default async function Page() {
  const bookings = await prisma.booking.findMany({
    orderBy: { time_slot: "desc" },
  });

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <Heading>Bookings</Heading>
      <Bookings serverBookings={bookings.map(toBooking)} />
    </div>
  );
}
