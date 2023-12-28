'use client'; // Los hooks son del lado del cliente

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Toaster } from 'sonner';
import { register_user } from './controller';

function RegisterPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const on_submit = handleSubmit(async (data) => {
        await register_user(data);
    });

    const back_to_login = (e) => {
        e.preventDefault();
        router.push('/');
    }

    return (
        <>
            <Toaster richColors position='top-center' visibleToasts={1} />

            <div className='flex items-center justify-center w-full max-w-xs min-h-full'>
                <div className='flex flex-col items-center justify-center gap-4 w-full py-8 rounded-lg shadow-xl shadow-black/0 duration-500 hover:shadow-black/5'>
                    <Image src={'https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png'} width={50} height={50} alt='Imagen' quality={100} />
                    <h1 className='mb-8'>Crear usuario</h1>

                    <form className='flex flex-col w-full gap-1 px-4'>
                        {/* NOMBRE DE USUARIO */}
                        <label>Nombre de usuario:</label>
                        <input {
                            ...(register('username', {
                                required: {
                                    value: true,
                                    message: 'Introduza el nombre de usuario'
                                },
                                minLength: {
                                    value: 3,
                                    message: 'El nombre de usuario es muy corto'
                                },
                                maxLength: {
                                    value: 30,
                                    message: 'El nombre de usuario es muy largo'
                                }
                            }))
                        } type="text" placeholder='Nizvan Monteón Ricárdez' className={errors.username ? 'outline outline-rose-100' : ''} />
                        {errors.username && (
                            <span className='pl-2 text-xs text-rose-500'>{errors.username.message}</span>
                        )}

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
                                },
                                minLength: {
                                    value: 8,
                                    message: 'La contraseña debe ser mayor a 8 caracteres'
                                },
                                maxLength: {
                                    value: 40,
                                    message: 'La contraseña es muy larga'
                                }
                            }))
                        } type="password" placeholder='********' className={errors.password ? 'outline outline-rose-100' : ''} />
                        {errors.password && (
                            <span className='pl-2 text-xs text-rose-500'>{errors.password.message}</span>
                        )}

                        {/* CONFIRMAR CONTRASEÑA */}
                        <label>Confirmar contraseña:</label>
                        <input { /** Confirmar contraseña */
                            ...(register('confirm_password', {
                                required: {
                                    value: true,
                                    message: 'Confirme su contraseña'
                                },
                                validate: value => value === watch('password') || 'La contraseña no coincide'
                            }))
                        } type="password" placeholder='********' className={errors.confirm_password ? 'outline outline-rose-100' : ''} />
                        {errors.confirm_password && (
                            <span className='pl-2 text-xs text-rose-500'>{errors.confirm_password.message}</span>
                        )}

                        <div className='flex justify-between gap-2 mt-6'>
                            <button type='button' onClick={on_submit} className='w-full button-black'>Registrarse</button>
                            <button type='button' onClick={back_to_login} className='w-full button-white'>Tengo cuenta</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterPage