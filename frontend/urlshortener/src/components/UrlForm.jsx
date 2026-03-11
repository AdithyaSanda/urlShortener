import { useState, useRef } from "react"
import axiosPrivate from "../api/axiosPrivate"
import PreviousUrls from "./previousUrls"
import CopyButton from "./CopyButton"
import axiosPublic from "../api/axiosPublic"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Pencil } from 'lucide-react';

const UrlForm = () => {

    const [longUrl, setLongUrl] = useState("")
    const [shortUrl, setShortUrl] = useState()
    const [user, setUser] = useState()
    const [open, setOpen] = useState(false)
    const [newName, setNewName] = useState("")
    const [input, setInput] = useState(false)
    const fileInputRef = useRef(null)
    const boxRef = useRef(null)
    const dropRef = useRef(null)
    const navigate = useNavigate()

    const onInputChange = (e) => {
        setLongUrl(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await axiosPrivate.post(`/api/shorten`, {originalUrl: longUrl})
        setShortUrl(response.data.shortUrl)
    }

    const handleLogout = async () => {
        await axiosPublic.get(`/logout`)
        localStorage.removeItem('token')
        navigate('/login', {replace: true})
    }

    const changeUsername = async (e) => {
        e.preventDefault()
        await axiosPrivate.put('/api/user/update/me', {username: newName})
        setUser((prev) => ({
            ...prev,
            name: newName
        }))
        setInput(false)
    }

    const token = localStorage.getItem('token')
    useEffect(() => {
        const getUserDetails = async () => {
            const response = await axiosPrivate.get("/api/user/me")
            setUser(response.data)
        }

        getUserDetails()
    }, [token])

    useEffect(() => {
        const handleClick = (e) => {
            if(boxRef.current?.contains(e.target) || dropRef.current?.contains(e.target)) {
                return
            }
            setOpen(false)
            setInput(false)
        }

        window.addEventListener('click', handleClick)

        return () => window.removeEventListener('click', handleClick)
    }, [])

    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        if(!file) return

        const imageUrl = URL.createObjectURL(file)

        const formData = new FormData()
        formData.append("avatar", file)

        const response = await axiosPrivate.put('/api/user/pic/me', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        
        setUser((prev) => ({
            ...prev,
            profilePic: response.data.profilePic
        }))
    }

    return (
        <>
            <div className="border-b h-15 p-8 flex items-center justify-between">
                <span className="text-2xl font-bold">UrlShortener</span>
                <div className="flex gap-6">
                    <img 
                        ref={boxRef} 
                        src={user?.profilePic || `https://placehold.co/40/161B22/E6EDF3?text=${user?.name.slice(0,1).toUpperCase()}`} className="rounded-full border border-[#30363D] cursor-pointer w-10 h-10" 
                        onClick={() => setOpen(prev => !prev)}
                    />
                    <button onClick={handleLogout} className="bg-white rounded text-black p-2 px-4 font-bold cursor-pointer">Logout</button>
                </div>
                
                
            </div>

            {open && <div ref={dropRef} className="border rounded w-100 h-29 bg-[#181818] absolute right-10 top-20 p-3">
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <div className="flex absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition      rounded-full w-20 left-2 top-1 justify-center items-center cursor-pointer"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <Pencil/>
                        </div>
        
                        <img 
                            src={user?.profilePic || `https://placehold.co/80/161B22/E6EDF3?text=${user?.name.slice(0,1).toUpperCase()}`} className="rounded-full border border-[#30363D] cursor-pointer mt-1 ml-2 w-20 h-20"
                        />
                        
                        
                    </div>

                    <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleImageChange}/>
                    <div className="flex flex-col gap-y-3 text-lg">
                        <span className="truncate w-55 flex">
                            <span className="mr-4 font-bold ">
                                Name: 
                            </span>
                            {input ? <div>
                                    <form onSubmit={changeUsername}>
                                        <input type="text" value={user.name} className="border w-35 text-sm px-2" onChange={(e) => setNewName(e.target.value)} />
                                    </form>
                                </div> : 
                                    user?.name} 
                            <Pencil height={15} className="ml-2 mt-2 cursor-pointer" 
                                onClick={() => {
                                    setInput(true)
                                }}/>
                        </span>
                        <span className="truncate w-55"><span className="mr-5 font-bold">Email: </span>{user?.email}</span>
                    </div>
                </div>
            </div>}
            <div className="flex flex-col h-dvh items-center mt-50">
                <form onSubmit={handleSubmit} className="inline-flex flex-col border rounded p-5 gap-y-5">
                    <label htmlFor="url" className="text-xl font-bold">Long URL</label>
                    <input type="text" name="url" id="url" placeholder="www.exampleurl.com" className="border rounded p-2 w-100" onChange={onInputChange}/>
                    <button type="submit" className="bg-white text-black p-2 rounded font-bold cursor-pointer">Shorten</button>
                </form>
                {shortUrl && <div className="mt-10 border p-3 pl-5 w-110 rounded flex justify-between">
                    <a href={`${shortUrl}`} target="_blank" className="underline">{shortUrl}</a>
                    <CopyButton shortUrl={shortUrl}/>
                </div>}

                <PreviousUrls />
            </div>
        </>
        
    )
}

export default UrlForm