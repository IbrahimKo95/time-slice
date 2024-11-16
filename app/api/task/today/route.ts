import {NextRequest, NextResponse} from "next/server";
import {jwtVerify} from "jose";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("authToken")?.value;
        if (!token) {
            return NextResponse.json({error: "Unauthorized" }, {status: 401});
        }
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        const userId = payload.id as string;
        const tasks = await prisma.task.findMany({
            where: {
                userId,
                createdAt: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    lt: new Date(new Date().setHours(23, 59, 59, 999))
                }
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        return NextResponse.json({data: tasks }, {status: 200});
    } catch (err) {
        console.log(err)
        return NextResponse.json({error: "Internal Server Error" }, {status: 500});
    }

}