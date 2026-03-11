import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axiosPublic from "../api/axiosPublic"

const Signup = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        
        const response = await axiosPublic.post(`/user/signup`, formData)
        navigate("/login", {replace: true})

    }

    return (
        <div>
            <div className="border-b h-15 p-8 flex items-center justify-between">
                <span className="text-2xl font-bold">UrlShortener</span>
            </div>
            <div onSubmit={handleSignup} className="flex justify-center h-screen mt-8">
                <form className="inline-flex flex-col border p-10 gap-y-5 rounded h-140">
                    <span className="text-3xl font-bold">Signup</span>
                    <label htmlFor="name" className="text-xl">Name</label>
                    <input type="text" placeholder="John Doe" name="name" id="name" className="w-100 h-10 rounded border p-2" onChange={handleInputChange}/>
                    <label htmlFor="name" className="text-xl">Email</label>
                    <input type="email" placeholder="example@mail.com" name="email" id="email" className="w-100 h-10 rounded border p-2" onChange={handleInputChange}/>
                    <label htmlFor="name" className="text-xl">Password</label>
                    <input type="password" placeholder="Password" name="password" id="password" className="w-100 h-10 rounded border p-2" onChange={handleInputChange}/>
                    <button type="submit" className="bg-white text-black p-2 rounded mt-5 font-bold cursor-pointer">Signup</button>
                    <span>Already a user? <Link to={"/login"} className="underline font-bold">Login</Link></span>
                </form>
            </div>
        </div>
        
    )
}

export default Signup