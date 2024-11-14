import {NextRequest, NextResponse} from "next/server";
import {jwtVerify} from "jose";
import prisma from "@/lib/prisma";


export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get("authToken")?.value;
        if (!token) {
            return NextResponse.json({error: "Unauthorized" }, {status: 401});
        }
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        const userId = payload.id as string;
        const { title, description, type, totalSessions, sessionsDone, isCompleted } = await req.json();
        if (!title || !description || !type || !totalSessions || sessionsDone === undefined || isCompleted === undefined) {
            return NextResponse.json({error: "Please fill all fields" }, {status: 400});
        }
        const task = await prisma.task.create({
            data: {
                title,
                description,
                type,
                totalSessions,
                sessionsDone,
                isCompleted,
                userId
            }
        });
        return NextResponse.json({data: task }, {status: 201});
    } catch (err) {
        console.log(err)
        return NextResponse.json({error: "Internal Server Error" }, {status: 500});
    }
}


export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("authToken")?.value;
        if (!token) {
            return NextResponse.json({ status: 401, error: "Unauthorized" });
        }
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        const userId = payload.id as string;
        const tasks = await prisma.task.findMany({
            where: {
                userId
            }
        });
        return NextResponse.json({ status: 200, data: tasks });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ status: 500, error: "Internal Server Error" });
    }

}