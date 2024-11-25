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
            },
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
            return NextResponse.json({error: "Unauthorized" }, {status: 401});
        }
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        const userId = payload.id as string;
        const tasks = await prisma.task.findMany({
            where: {
                userId
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

export async function PUT(req: NextRequest) {
    try {
        const token = req.cookies.get("authToken")?.value;
        if (!token) {
            return NextResponse.json({error: "Unauthorized" }, {status: 401});
        }
        console.log("here")
        const { id, title, description, type, totalSessions, sessionsDone, isCompleted } = await req.json();
        if (!id || !title || !description || !type || !totalSessions || sessionsDone === undefined || isCompleted === undefined) {
            return NextResponse.json({error: "Please fill all fields" }, {status: 400});
        }
        const task = await prisma.task.update({
            where: {
                id
            },
            data: {
                title,
                description,
                type,
                totalSessions,
                sessionsDone,
                isCompleted
            }
        });
        return NextResponse.json({data: task }, {status: 200});
    } catch (err) {
        console.log(err)
        return NextResponse.json({ status: 500, error: "Internal Server Error" }, {status: 500});
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const token = req.cookies.get("authToken")?.value;
        if (!token) {
            return NextResponse.json({error: "Unauthorized" }, {status: 401});
        }
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({error: "Please provide an id" }, {status: 400});
        }
        await prisma.task.delete({
            where: {
                id
            }
        });
        return NextResponse.json({message: "Task deleted" }, {status: 200});
    } catch (err) {
        console.log(err)
        return NextResponse.json({error: "Internal Server Error" }, {status: 500});
    }
}