import React, { useEffect, useState } from 'react'
import { TfiReload } from "react-icons/tfi";
import { FaCopy, FaLock, FaExclamation } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { SiAdguard, SiTaobao } from "react-icons/si";
import './Home.css'
import toast, { Toaster } from 'react-hot-toast';
import { FaUserShield } from "react-icons/fa";
import Login from '../../components/login.';
import Passwords from '../../components/Passwords';
import { IoLogOut } from "react-icons/io5";
import axios from 'axios'

const Home = () => {

    const [range, setRange] = useState(8)
    const [options, setOptions] = useState({
        letters: true,
        mixed: false,
        numbers: false,
        numerics: false
    })

    const [password, setPassword] = useState()
    const [reset, setReset] = useState(true)
    const [strength, setStrength] = useState('strong')
    const [icon, setIcon] = useState(<TiTick />)
    const [color, setColor] = useState('bg-orange-500')
    const [disableLetter, setDisableLetter] = useState(true)

    const [user, setUser] = useState(false)
    const [passwordModal, setPasswordModal] = useState(false)
    const [loginModal, setLoginModal] = useState(false)

    const [key,setKey] = useState('')


    useEffect(() => {
        const userLoggedIn = localStorage.getItem('user')
        setUser(userLoggedIn)
    }, [])


    useEffect(() => {
        console.log(color)
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const numerics = '0123456789';
        const symbols = '#$+&!-';
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

        let characters = '';

        if (options.letters) {
            characters += lower;
        }
        if (options.numbers) {
            characters += numerics;
        }
        if (options.numerics) {
            characters += symbols;
        }
        if (options.mixed) {
            characters += lower + upper
        }


        let password = '';
        for (let i = 0; i < range; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters.charAt(randomIndex);
        }
        setPassword(password)
    }, [range, options, reset])

    const handleCheckboxChange = (option) => {

        if (option === 'letters' && !options.letters) {
            setOptions((prevOptions) => ({
                ...prevOptions,
                mixed: false,
                [option]: !prevOptions[option],
            }));
        } else if ((option === 'numbers' || option === 'numerics') && (((!options.numbers && options.numerics) || (options.numbers && !options.numerics)))) {
            console.log('here')
            setOptions((prevOptions) => ({
                ...prevOptions,
                letters: true,
                [option]: !prevOptions[option],
            }));
            setDisableLetter(true)
        }else if(option === 'mixed'){
            setOptions((prevOptions) => ({
                ...prevOptions,
                mixed: !option.mixed,
                [option]: !prevOptions[option],
            }));
            if(!option.mixed){
                setDisableLetter(true)
            }
        }
        
        else {
            setOptions((prevOptions) => ({
                ...prevOptions,
                [option]: !prevOptions[option],
            }))
            setDisableLetter(false)
        }
        console.log(options);
    };


    const handleLengthChange = (e) => {
        // console.log(color)
        setRange(e.target.value)
        if (range <= 8) {
            setStrength('Weak')
            setIcon(<FaExclamation />)
            setColor('bg-red-500')
        }
        else if (range <= 18) {
            setStrength('Strong')
            setIcon(<TiTick />)
            setColor('bg-orange-500')
        }
        else {
            setStrength('Very Strong')
            setIcon(<FaLock />)
            setColor('bg-green-500')
        }

    }


    const handleCopyClick = () => {
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


    const modalShow = () => {
        if (user) {
            setPasswordModal(true)
        }
        else {
            setLoginModal(true)
        }
    }

    const passwordSave = async()=>{
        if(key.trim().length == 0){
            return toast.error('Enter the password key')
        }
        else if(key.trim().length > 4){
            return toast.error('Key length must be less than 5')
        }

        const res = await axios.post('http://localhost:3000/savePassword',{key,password})
        console.log(res)
        if(res.data){
            toast.success('Password saved')
            setKey('')
        }
    }


    const logoutHandle = () => {
        localStorage.removeItem('user')
        setUser(false)
        toast('Logged out succesfully')
    }

    return (
        <>
            <div className='flex justify-center items-center' style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                backgroundImage: `url("https://res.cloudinary.com/practicaldev/image/fetch/s--YtxZHNsY--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/f5tzpogltw730jx3lb56.jpg")`
            }}>
                <div className='text-white w-2/4'>
                    <div className='bg-white text-gray-700 p-3 flex justify-between items-center'>
                        <div className='text-2xl font-bold flex items-center gap-2'>
                            <h1><SiAdguard /></h1>
                            <h1>Password Generator</h1>
                        </div>
                        <div className='flex items-center gap-2'>
                            <h1 className='text-3xl cursor-pointer' onClick={modalShow}><FaUserShield /></h1>
                            {user && <h1 className='text-4xl cursor-pointer' onClick={logoutHandle}><IoLogOut /></h1>}
                        </div>
                    </div>
                    <div className={`${color} bg-opacity-80 px-16 py-10`}>
                        <div className='flex items-center justify-between border-b-2 py-1 px-2'>
                            <h1 className={range <= 25 ? `text-4xl` : range <= 35 ? 'text-3xl' : 'text-xl'}>{password}</h1>
                            <div className='flex gap-5'>
                                <h1 className='font-bold text-3xl cursor-pointer' onClick={() => setReset(!reset)}><TfiReload /></h1>
                                <h1 className='font-bold text-3xl cursor-copy' onClick={handleCopyClick}><FaCopy /></h1>
                            </div>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='mt-2 flex items-center gap-1'>
                                <h1 className='text-base text-gray-500 text-opacity-60 p-0.5 rounded-full bg-white bg-opacity-60'>{icon}</h1>
                                <h1 className='text-white text-opacity-60'>{strength} password</h1>
                            </div>
                            {user && <div className='mt-1'>
                                <input type="text" className='outline-none bg-transparent border p-1 text-sm w-24' placeholder='Password key' value={key} onChange={(e)=>setKey(e.target.value)}/>
                                <button className='px-2 py-1 bg-green-700 font-bold ms-1' onClick={passwordSave}>SAVE</button>
                            </div>}
                        </div>
                    </div>
                    <div className='bg-white bg-opacity-80 px-16 py-10 text-black'>
                        <div className='mb-4 text-lg'>
                            <h1>Use the slider to select password length (4-50)</h1>
                            <div className="slidecontainer mt-1">
                                <input type="range" min="4" max="50" value={range} className="slider" onChange={(e) => handleLengthChange(e)} />
                                <h1>Length : {range}</h1>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-lg'>Select the options below</h1>

                            <div className='text-lg flex gap-3'>
                                <label htmlFor="" className='flex gap-1'>
                                    <input
                                        type="checkbox"
                                        className='w-4'
                                        checked={options.letters}
                                        disabled={disableLetter}
                                        onChange={() => !disableLetter && handleCheckboxChange('letters')}
                                    />
                                    <h1>Letters</h1>
                                </label>
                                <label htmlFor="" className='flex gap-1'>
                                    <input
                                        type="checkbox"
                                        className='w-4'
                                        checked={options.mixed}
                                        onChange={() => handleCheckboxChange('mixed')}
                                        disabled={!options.letters} // Disable if 'Letters' is unchecked
                                    />
                                    <h1>Mixed Case</h1>
                                </label>
                                <label htmlFor="" className='flex gap-1'>
                                    <input
                                        type="checkbox"
                                        className='w-4'
                                        checked={options.numbers}
                                        onChange={() => handleCheckboxChange('numbers')}
                                    />
                                    <h1>Numbers</h1>
                                </label>
                                <label htmlFor="" className='flex gap-1'>
                                    <input
                                        type="checkbox"
                                        className='w-4'
                                        checked={options.numerics}
                                        onChange={() => handleCheckboxChange('numerics')}
                                    />
                                    <h1>Symbols</h1>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Login show={loginModal} setLogin={setLoginModal} setUser={setUser} />
            <Passwords show={passwordModal} setPassword={setPasswordModal} />
        </>
    )
}

export default Home
