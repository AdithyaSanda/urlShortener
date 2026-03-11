import { useState } from "react"
import axiosPrivate from "../api/axiosPrivate"
import { useEffect } from "react"
import { ArrowDown } from 'lucide-react';
import { ArrowUp } from 'lucide-react';
import { Trash } from 'lucide-react';
import CopyButton from "./CopyButton";

const PreviousUrls = () => {

    const [urls, setUrls] = useState()
    const [urlData, setUrlData] = useState()
    const [hovered, setHovered] = useState()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const getUrls = async () => {
            const response = await axiosPrivate.get(`http://localhost:5000/api/geturls`)
            setUrls(response.data)
            
        }

        getUrls()
    }, [])

    const getAnalytics = async (id) => {
        const response = await axiosPrivate.get(`/api/getAnalytics/${id}`)
        setUrlData(response.data)
    }

    const deleteUrl = async(id) => {
        await axiosPrivate.delete(`/api/deleteUrl/${id}`)
        setUrls((prev) => prev.filter((url) => url._id !== id))
    }

    return (
        <div>
            {urls && <div className="flex flex-col gap-y-10 mt-20 mb-20">
                <span className="text-2xl font-bold">Previous URl's</span>
                {urls.map((url, id) => (
                    <div key={id}>
                        <div key={id} className="flex justify-between border p-5 rounded w-200 pl-15 text-lg" >
                            <a href={`${url.shortUrl}`} target="_blank" className="underline" >{url.shortUrl}</a>
                            <div className="flex gap-8 items-center">
                                <CopyButton shortUrl={url.shortUrl}/>
                                <Trash onClick={() => deleteUrl(url._id)} className="cursor-pointer"/>
                                {open && hovered === id ? <ArrowUp className="cursor-pointer" 
                                    onClick={() => {
                                        setOpen(false)
                                        setHovered(null)
                                }}/> : <ArrowDown className="cursor-pointer" 
                                    onClick={() => {
                                        setOpen(true)
                                        setHovered(id)
                                        getAnalytics(url._id)
                                }}/>}
                            </div>
                            
                            
                            
                        </div>
                        {urlData && open && hovered === id && <div className="flex flex-col font-mono text-sm gap-2 mt-5 ml-15">
                                    <span><span className="text-orange-400">Clicks :</span> {url.clicks}</span>
                                    <span className="truncate w-150"><span className="text-orange-400">Original url :</span> {url.originalUrl}</span>
                                    <span><span className="text-orange-400">Short code :</span> {url.shortCode}</span>
                                    <span><span className="text-orange-400">Created :</span> {url.createdAt.slice(0,10)}</span>
                        </div>}
                    </div>
                    
                ))}    
            </div>}
        </div>
    )
}

export default PreviousUrls