import React, { useState } from 'react'
import logo from "../../assets/logo.png"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Login, signup } from './loginSlice';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
function Auth() {
    const [isLogin, setIsLogin] = useState(false)
const { isLoading,  } = useSelector(state => state.loginReducer);

    const navigate = useNavigate();
    const schema = yup.object({
        name: yup.string().required("Name is required"),
        email: yup.string().email().required("Email is Required"),
        name: yup.mixed().when('isLogin', {
            then: () => yup.string().notRequired(),
            otherwise: () => yup.string().required('name is Required')
        }),
        password: yup.string().required('Password is required').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.'
        ),
    })
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();
    const handleLogin = (data) => {
        if (!isLogin) {
            dispatch(Login(data)).unwrap()
                .then((res) => {
                    localStorage.setItem('token', res.token);
                    navigate('/dashboard')
                    toast.success("success")
                    reset();
                }).catch((error) => {
                    toast.success("fail")
                })
        }
        else {
            dispatch(signup(data)).unwrap()
            .then((res) => {
                toast.success("success")
                navigate('/dashboard')
                localStorage.setItem('token', res.token);
                reset();
            }).catch((error) => {
                toast.success("fail")
            })
        }
    }
    return (
        <>
                    {isLoading && <Loader/>}

            {isLogin && (

                <section class="bg-gray-50 dark:bg-gray-900">
                    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <img className="w-16 h-8 mr-2" src={logo} alt="logo" />
                            Manage IT !
                        </a>
                        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Create an account
                                </h1>
                                <form class="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                        <input type="name" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Joye" required=""  {...register('name')} />
                                        {errors?.name && (
                                            <div className="text-red-700">{errors?.name?.message}</div>
                                        )}
                                    </div>

                                    <div>
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""  {...register('email')} />
                                        {errors?.email && (
                                            <div className="text-red-700">{errors?.email?.message}</div>
                                        )}
                                    </div>

                                    <div>
                                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register('password')} />
                                        {errors?.password && (
                                            <div className="text-red-700">{errors?.password?.message}</div>
                                        )}
                                    </div>
                                    <div>
                                        <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                        <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <button class="w-full text-white bg-primary-600 bg-purple-950  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleSubmit(handleLogin)}>Create an account</button>
                                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account? <span onClick={() => { setIsLogin(prevState => !prevState); reset(); }} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</span>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            ) || (
                    <section className="bg-gray-50 dark:bg-gray-900">
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                <img className="w-16 h-8 mr-2" src={logo} alt="logo" />
                                Manage IT !
                            </a>
                            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                        Sign in to your account
                                    </h1>
                                    <form className="space-y-4 md:space-y-6" action="#">
                                        <div>
                                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"  {...register('email')} />
                                            {errors?.email && (
                                                <div className="text-red-700">{errors?.email?.message}</div>
                                            )}
                                        </div>
                                        <div>
                                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register('password')} />
                                            {errors?.password && (
                                                <div className="text-red-700">{errors?.password?.message}</div>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">

                                            <a href="#" className="text-sm font-medium text-primary-100 hover:underline dark:text-primary-100">Forgot password?</a>
                                        </div>
                                        <button className="w-full text-white bg-primary-900 bg-purple-950 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleSubmit(handleLogin)}>Sign in</button>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-100">
                                            Don’t have an account yet? <span onClick={() => { setIsLogin(prevState => !prevState); reset(); }} className="font-medium text-primary-100 hover:underline dark:text-primary-500">Sign up</span>
                                        </p>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-100" onClick={navigate('/dashboard')}>
                                            Join As Guest
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>

                )
            }
        </>

    )
}

export default Auth
