import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    const { email, password } = await req.json();
    if (!email || !password) {
        return NextResponse.json({ status: 400, error: "Please fill all fields" });
    }

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (user) {
        return NextResponse.json({ status: 400, error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
    });

    return NextResponse.json({ status: 201, message: "User created successfully", user: newUser });
}