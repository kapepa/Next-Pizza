import prisma from "@/db";
import { getUserSession } from "@/lib/get-user-session"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getUserSession();
    if (!user) return NextResponse.json({ error: "User not authorized" }, { status: 401 });

    const data = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        name: true,
        email: true,
        password: false,
      }
    })

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error personal data", error)
    return NextResponse.json({ error: "Error personal data" }, { status: 500 })
  }
}