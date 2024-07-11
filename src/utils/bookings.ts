import type { Booking } from "@prisma/client";

export interface BookingT {
  id: number;
  name: string;
  email: string;
  timeSlot: string;
}

export function toBooking(booking: Booking): BookingT {
  return {
    id: booking.id,
    name: booking.name,
    email: booking.email,
    timeSlot: toTimeSlot(booking.time_slot),
  };
}

export function toTimeSlot(date: Date): string {
  return date.toLocaleDateString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
