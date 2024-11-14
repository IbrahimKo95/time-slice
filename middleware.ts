import {NextRequest, NextResponse} from "next/server";
import {jwtVerify} from "jose";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("authToken")?.value;
    if(!token) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    const user = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    if(!user) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard']
}