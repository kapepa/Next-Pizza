import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

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

    const products = await prisma.product.findMany({
      where: whereCondition,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}