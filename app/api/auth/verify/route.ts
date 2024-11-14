import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    if (!code) return NextResponse.json({ error: "Code is required" }, { status: 400 });

    const verificationCode = await prisma.verificationCode.findFirst({
      where: { code },
    });
    if (!verificationCode) return NextResponse.json({ error: "The code is invalid" }, { status: 400 });

    await prisma.user.update({
      where: {
        id: verificationCode.userId,
      },
      data: {
        verified: true,
      }
    });

    await prisma.verificationCode.delete({
      where: { id: verificationCode.id }
    })

    return NextResponse.redirect(new URL("?verified", req.url));
  } catch (error) {
    console.error("Error when checking the registration confirmation code", error);
    return NextResponse.json({ error: "Error when checking the registration confirmation code" }, { status: 500 });
  };
}