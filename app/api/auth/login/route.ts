import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import {SignJWT} from "jose";


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

    if (!user) {
        return NextResponse.json({ status: 400, error: "User not found" });
    }

    const passwordVerify = await bcrypt.compare(password, user.password);
    if (!passwordVerify) {
        return NextResponse.json({ status: 400, error: "Wrong credentials" });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const userToken = await new SignJWT({ email: user.email, id: user.id })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("2d")
        .sign(secret);

    const res = NextResponse.json({ status: 201, message: "Login Successful" });
    res.cookies.set("authToken", userToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 2,
        sameSite: "lax",
        path: "/"
    })
    return res;
}