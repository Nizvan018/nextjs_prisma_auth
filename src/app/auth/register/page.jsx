'use client'; // Los hooks son del lado del cliente

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

function RegisterPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const register_user = handleSubmit(async (data) => {
        if (data.password === data.confirm_password) {
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
            console.log(res_json);
        } else {
            window.alert('Las dos contraseñas no son iguales');
        }
    });

    const back_to_login = (e) => {
        e.preventDefault();
        console.log('hola');
        router.push('/');
    }

    return (
        <div className='flex items-center justify-center w-full max-w-xs min-h-full'>
            <div className='flex flex-col items-center justify-center gap-4 w-full py-8 shadow-xl shadow-black/5 rounded-lg '>
                <Image src={'https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png'} width={50} height={50} alt='Imagen' />
                <h1 className='mb-8'>Crear usuario</h1>

                <form className='flex flex-col w-full gap-1 px-4'>
                    <label className='pl-2 text-gray-600 text-xs font-semibold'>Nombre de usuario:</label>
                    <input { /** Nombre de usuario */
                        ...(register('username', { required: { value: true, message: 'Introduza el nombre de usuario' } }))
                    } type="text" placeholder='Nizvan Monteón Ricárdez' className={errors.username ? 'outline outline-rose-100' : ''} />
                    {errors.username && (
                        <span className='pl-2 text-xs text-rose-500'>{errors.username.message}</span>
                    )}

                    <label htmlFor='email' className='pl-2 text-gray-600 text-xs font-semibold'>Correo electrónico:</label>
                    <input id='email' { /** Correo electrónico */
                        ...(register('email', { required: { value: true, message: 'Introduzca su correo electrónico' } }))
                    } type="email" placeholder='ejemplo@gmail.com' className={errors.email ? 'outline outline-rose-100' : ''} />
                    {errors.email && (
                        <span className='pl-2 text-xs text-rose-500'>{errors.email.message}</span>
                    )}

                    <label className='pl-2 text-gray-600 text-xs font-semibold'>Contraseña:</label>
                    <input {/** Contraseña */
                        ...(register('password', { required: { value: true, message: 'Introduzca su contraseña' } }))
                    } type="password" placeholder='********' className={errors.password ? 'outline outline-rose-100' : ''} />
                    {errors.password && (
                        <span className='pl-2 text-xs text-rose-500'>{errors.password.message}</span>
                    )}

                    <label className='pl-2 text-gray-600 text-xs font-semibold'>Confirmar contraseña:</label>
                    <input { /** Confirmar contraseña */
                        ...(register('confirm_password', { required: { value: true, message: 'Confirme su contraseña' } }))
                    } type="password" placeholder='********' className={errors.confirm_password ? 'outline outline-rose-100' : ''} />
                    {errors.confirm_password && (
                        <span className='pl-2 text-xs text-rose-500'>{errors.confirm_password.message}</span>
                    )}

                    <div className='flex justify-between gap-2 mt-6'>
                        <button type='button' onClick={register_user} className='w-full button-black'>Registrarse</button>
                        <button type='button' onClick={back_to_login} className='w-full button-white'>Tengo cuenta</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage