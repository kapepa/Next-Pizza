import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());

    const whereCondition = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [
        key,
        { contains: value, mode: 'insensitive' }
      ])
    );

    const ingredients = await prisma.ingredient.findMany({
      where: whereCondition,
    });

    return NextResponse.json(ingredients);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return NextResponse.json({ error: "Failed to fetch ingredients" }, { status: 500 });
  }
}