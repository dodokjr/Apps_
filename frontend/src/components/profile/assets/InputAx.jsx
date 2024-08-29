import React, { useEffect, useState } from "react"


export const InputBio = ({bio}) => {
    const [input, setInput] = useState(bio?? "")

    const handleChange= (e) => {
        setInput(e.target.value)
    }
    return(
        <>
        <input
        type="text"
        placeholder="Your Bio"
        value={input}
        onChange={handleChange}
        className="input input-bordered input-lg w-full max-w-xs" />
        </>
    )
}