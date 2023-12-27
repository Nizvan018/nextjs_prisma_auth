import { NextResponse } from "next/server";
import db from '@/libs/db';

export async function POST(request) {
    const data = await request.json();

    // Search the email:
    const email_found = await db.user.findUnique({
        where: { email: data.email }
    });

    if (email_found) {
        return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    // Search the username:
    const username_found = await db.user.findUnique({
        where: { username: data.username }
    });

    if (username_found) {
        return NextResponse.json({ message: 'Username already exists' }, { status: 400 });
    }

    const new_user = await db.user.create({
        data //esto es igual a "data: data"
    });

    return NextResponse.json(new_user);
}