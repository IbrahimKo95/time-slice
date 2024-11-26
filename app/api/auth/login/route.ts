import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import {SignJWT} from "jose";

export const dynamic = "force-dynamic";
export async function POST(req: Request) {
    const { email, password } = await req.json();
    if (!email || !password) {
        return NextResponse.json({error: "Please fill all fields" }, {status: 400});
    }

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        return NextResponse.json({error: "User not found" }, {status: 400});
    }

    const passwordVerify = await bcrypt.compare(password, user.password);
    if (!passwordVerify) {
        return NextResponse.json({error: "Wrong credentials" }, {status: 400});
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const userToken = await new SignJWT({ email: user.email, id: user.id })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("2d")
        .sign(secret);

    const res = NextResponse.json({message: "Login Successful" }, {status: 201});
    res.cookies.set("authToken", userToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 2,
        sameSite: "lax",
        path: "/"
    })
    return res;
}