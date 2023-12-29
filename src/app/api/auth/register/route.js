import { NextResponse } from "next/server";
import db from '@/libs/db';
import bcrypt from 'bcrypt';

export async function POST(request) {
    try { // Si la petición se realiza correctamente:
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

        const hashed_password = await bcrypt.hash(data.password, 10);
        data.password = hashed_password;

        const new_user = await db.user.create({
            data //esto es igual a "data: data"
        });

        return NextResponse.json(new_user, { status: 201 });
    } catch (error) { // En caso de algún error no considerado:
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}