import { prisma } from "@/db";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    await prisma.booking.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    return Response.json({ message: "Error removing entry" }, { status: 500 });
  }

  return Response.json({ message: `Entry ${id} removed` }, { status: 200 });
}

export async function POST(request: Request) {
  const { name, email } = await request.json();

  try {
    await prisma.booking.create({
      data: {
        name,
        email,
      },
    });
  } catch (error) {
    return Response.json({ message: "Error creating entry" }, { status: 500 });
  }

  return Response.json({ message: "Entry created" }, { status: 200 });
}
