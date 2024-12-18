import prisma from "@/db";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function GET() {
  try {
    const users = await prisma.user.deleteMany();

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: User = await req.json();

    const existingUser = await prisma.user.findUnique({ where: { email: body.email } });
    if (existingUser) return NextResponse.json(
      { error: 'User already exists' }, { status: 409 }
    );

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const data = Object.assign(body, { password: hashedPassword });
    const user = await prisma.user.create({ data });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the user' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: String(id) },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await prisma.user.delete({
      where: { id: String(id) },
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'An error occurred while deleting the user' },
      { status: 500 }
    );
  }
}