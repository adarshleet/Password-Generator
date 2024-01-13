import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js';
import { MdDelete } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import toast from 'react-hot-toast'

const Passwords = ({ show, setPassword }) => {

    const [passwords, setPasswords] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3000/getPasswords')
                console.log(res.data)
                setPasswords(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])


    const handleCopyClick = (password) => {
        // Create a temporary textarea element to hold the text
        const textArea = document.createElement('textarea');
        textArea.value = password;
        document.body.appendChild(textArea);

        // Select the text in the textarea
        textArea.select();
        document.execCommand('copy');

        // Remove the temporary textarea from the DOM
        document.body.removeChild(textArea);
        toast('Copied to clipboard');
    };


    const deletePassword = async(id)=>{
        console.log(id)
        const res = await axios.put(`http://localhost:3000/deletePassword?id=${id}`)
        if(res.data){
            const updatedPasswords = passwords.filter(password => password._id !== id);
            setPasswords(updatedPasswords);
            toast('Password deleted')
        }
    }




    return (
        <>
            {/* Main modal */}
            <div
                id="select-modal"
                tabIndex={-1}
                aria-hidden="true"
                className={`${show ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-sm shadow ">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                            <h3 className="text-lg font-semibold text-gray-900 ">
                                SAVED PASSWORDS
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center "
                                data-modal-toggle="select-modal"
                                onClick={() => setPassword(false)}
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
                        <div className="p-4 md:p-5 max-h-96 overflow-y-scroll">
                            {passwords.length == 0 ?
                                <h1>No Saved Passwords</h1>
                                :
                                <ul className="space-y-4 mb-4">
                                    {passwords.map((password, index) => (
                                        <li key={index}>
                                            <input
                                                type="radio"
                                                id="job-1"
                                                name="job"
                                                defaultValue="job-1"
                                                className="hidden peer"
                                                required=""
                                            />
                                            <label
                                                htmlFor="job-1"
                                                className="inline-flex items-center justify-between w-full p-3 text-gray-900 bg-white border border-gray-200 rounded-sm cursor-pointer"
                                            >
                                                <div className="block w-full">
                                                    <div className="w-full text-lg font-semibold flex justify-between">
                                                        <div>
                                                            {password.key}
                                                        </div>
                                                        <div className='flex gap-1 items-center'>
                                                            <h1 onClick={()=>deletePassword(password._id)} className='text-xl'><MdDelete/></h1>
                                                            <h1 onClick={()=>handleCopyClick(password.password)}><FaCopy/></h1>
                                                        </div>
                                                    </div>
                                                    <div className="text-gray-500 max-w-[150px] w-full whitespace-normal">
                                                        {password.password}
                                                    </div>
                                                </div>

                                            </label>
                                        </li>
                                    ))}

                                </ul>

                            }


                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Passwords
