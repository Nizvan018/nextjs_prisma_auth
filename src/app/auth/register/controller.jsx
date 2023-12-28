import { toast } from "sonner";

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
}
