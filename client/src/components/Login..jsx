import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Login = ({show,setLogin,setUser}) => {

    const [mobile,setMobile] = useState('')
    const [password,setPassword] = useState('')

    const loginHandle = async(e)=>{
        e.preventDefault()
        console.log(mobile,password)

        if(mobile.toString().trim().length != 10){
            toast.error('Enter a valid mobile number')
        }
        else if(password.trim().length < 8){
            toast.error('Enter a valid password')
        }
        else{
            const res = await axios.post('http://localhost:3000/login',{mobile,password})
            if(res.data == 'userFound'){
                setMobile('')
                setPassword('')
                setLogin(false)
                localStorage.setItem('user', true);
                setUser(true)
                toast.success('Login successfull')
            }
            else if(res.data == 'newUser'){
                setMobile('')
                setPassword('')
                setLogin(false)
                localStorage.setItem('user', true);
                setUser(true)
                toast.success('Signup successfull')
            }
            else if(res.data == 'passwordError'){
                toast.error('Invalid mobile number or password')
            }
        }
    }

    return (
        <>        
            {/* Main modal */}
            <div
                id="authentication-modal"
                tabIndex={-1}
                aria-hidden="true"
                className={`${show ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 bg-gray-900 bg-opacity-50 left-0 z-50 justify-center items-center w-full inset-0 max-h-full`}
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-sm shadow ">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                LOGIN / SIGNUP
                            </h3>
                            <button
                                type="button"
                                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                                data-modal-hide="authentication-modal"
                                onClick={()=>setLogin(false)}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="p-4 md:p-5">
                            <form className="space-y-4" onSubmit={(e)=>loginHandle(e)}>
                                <div>
                                    
                                    <input
                                        type="number"
                                        name="mobile"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-sm outline-none block w-full p-2.5 "
                                        placeholder="Mobile"
                                        value={mobile}
                                        onChange={(e)=>setMobile(e.target.value)}
                                    />
                                </div>
                                <div>
                                    
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-sm outline-none block w-full p-2.5 "
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                    />
                                </div>
                                
                                <button
                                    className="w-full text-white bg-slate-700  focus:outline-non font-bold rounded-sm text-base px-5 py-2.5 text-center "
                                >
                                    Login
                                </button>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default Login
