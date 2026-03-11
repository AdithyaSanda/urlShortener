import { Copy } from 'lucide-react';
import { SquareCheckBig } from 'lucide-react';
import { useState } from 'react';
const CopyButton = ({shortUrl}) => {

    const [copied, setCopied] = useState(false)

    const handleCopy = (shortUrl) => {
        navigator.clipboard.writeText(shortUrl)
        setCopied(true)
    }

    return (
        <div onClick={() => handleCopy(shortUrl)} className='cursor-pointer'>
            {copied ? <SquareCheckBig /> : <Copy />}
        </div>
    )
}

export default CopyButton