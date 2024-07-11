"use client";
import { BookingT, toTimeSlot } from "@/utils/bookings";
import { useState } from "react";

const defaultNewBooking: BookingT = {
  id: 0,
  name: "",
  timeSlot: "",
  email: "",
};

export function Bookings({ serverBookings }: { serverBookings: BookingT[] }) {
  const [bookings, setBookings] = useState(serverBookings);
  const [newBooking, setNewBooking] = useState<{
    name: string;
    email: string;
  }>(defaultNewBooking);

  const deleteBooking = async (id: number) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
    await fetch(`/api/bookings?id=${id}`, { method: "DELETE" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBooking({ ...newBooking, [e.target.name]: e.target.value });
  };

  const handleAddBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    // Optimistic update on the client
    setNewBooking(defaultNewBooking);
    setBookings([
      {
        id: bookings.length + 1,
        name: newBooking.name,
        email: newBooking.email,
        timeSlot: toTimeSlot(new Date()),
      },
      ...bookings,
    ]);

    // Real update on the server
    await fetch("/api/bookings", {
      method: "POST",
      body: JSON.stringify(newBooking),
    });
  };

  return (
    <ul style={{ width: 400 }} className="grid gap-10 p-10">
      <form onSubmit={handleAddBooking} className="grid gap-3">
        <div className="font-bold">Add new booking</div>
        <input
          name="name"
          className="border border-gray-400 p-2 text-black rounded-lg"
          type="text"
          placeholder="Name"
          required
          onChange={handleInputChange}
        />
        <input
          name="email"
          className="border border-gray-400 p-2 text-black rounded-lg"
          type="text"
          placeholder="Email"
          required
          onChange={handleInputChange}
        />

        <button
          disabled={newBooking.name === "" || newBooking.email === ""}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-4 rounded-lg disabled:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add booking
        </button>
      </form>

      <div className="grid gap-6">
        {bookings.map((booking) => (
          <li key={booking.id} className="grid gap-0.5">
            <div className="font-bold">{booking.name}</div>
            <div>{booking.email}</div>
            <div>{booking.timeSlot}</div>
            <button
              onClick={() => {
                deleteBooking(booking.id);
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mt-2"
            >
              Delete
            </button>
          </li>
        ))}
      </div>
    </ul>
  );
}
