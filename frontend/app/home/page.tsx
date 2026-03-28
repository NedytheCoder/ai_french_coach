"use client"
import { useState } from "react"
export default function Home() {
    const [message, setMessage] = useState("")
    async function getData() {
        const res = await fetch("http://127.0.0.1:8000")
        const data = await res.json()
        // console.log(data)
        setMessage(data.message)
    }

    return (
        <div>
            <h1 onClick={getData}>Home {message}</h1>
        </div>
    );
}