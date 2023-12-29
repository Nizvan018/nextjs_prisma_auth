'use client';

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Toaster } from 'sonner';
import { login_user } from '../controller';

function LoginPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const on_submit = handleSubmit(async (data) => {
        const res = await login_user(data);

        if (res.ok) {
            router.push('/dashboard');
        }
    });

    const back_to_register = (e) => {
        e.preventDefault();
        router.push('/auth/register');
    }

    return (
        <>
            <Toaster richColors position='top-center' visibleToasts={1} />
            <div className='flex items-center justify-center w-full max-w-xs min-h-full'>
                <div className='flex flex-col items-center justify-center gap-4 w-full py-8 rounded-lg shadow-xl shadow-black/0 duration-500 hover:shadow-black/5'>
                    <Image src={'https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png'} width={50} height={50} alt='Imagen' quality={100} />
                    <h1 className='mb-8'>Iniciar sesión</h1>

                    <form className='flex flex-col w-full gap-1 px-4'>
                        {/* CORREO ELECTRÓNICO */}
                        <label>Correo electrónico:</label>
                        <input {
                            ...(register('email', {
                                required: {
                                    value: true,
                                    message: 'Introduzca su correo electrónico'
                                },
                                pattern: {
                                    value: /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,4}$/,
                                    message: 'El correo no es válido'
                                }
                            }))
                        } type="email" placeholder='ejemplo@gmail.com' className={errors.email ? 'outline outline-rose-100' : ''} />
                        {errors.email && (
                            <span className='pl-2 text-xs text-rose-500'>{errors.email.message}</span>
                        )}

                        {/* CONTRASEÑA */}
                        <label>Contraseña:</label>
                        <input {
                            ...(register('password', {
                                required: {
                                    value: true,
                                    message: 'Introduzca su contraseña'
                                }
                            }))
                        } type="password" placeholder='********' className={errors.password ? 'outline outline-rose-100' : ''} />
                        {errors.password && (
                            <span className='pl-2 text-xs text-rose-500'>{errors.password.message}</span>
                        )}

                        <div className='flex justify-between gap-2 mt-6'>
                            <button type='button' onClick={on_submit} className='w-full button-black'>Iniciar sesión</button>
                            <button type='button' onClick={back_to_register} className='w-full button-white'>No tengo cuenta</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage