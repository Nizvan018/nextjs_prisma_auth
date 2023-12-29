import { toast } from "sonner";
import { signIn } from 'next-auth/react';

/** Método para realizar el fetch para registrar usuarios en la base de datos */
export const register_user = async (data) => {
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password
        })
    });

    const res_json = await res.json();
    const res_status = res.status;

    if (res_status == 400) {
        toast.error(res_json.message);
    }

    return res;
}

/** Método para realizar el iniciar sesión */
export const login_user = async (data) => {
    const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
    });

    if (!res.ok) {
        toast.error(res.error);
    }

    return res;
}