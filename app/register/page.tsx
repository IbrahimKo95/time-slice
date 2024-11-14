"use client";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";

export default function Home() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(email === "" || password === "") {
            console.log("Please fill all fields")
            return
        }
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            console.log(response)
            if(response.ok) {
                const data = await response.json();
                console.log(data)
            }
        } catch (e) {
            console.error(e)
        }

    }

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <form className="flex flex-col bg-secondary px-5 py-7 rounded-lg max-w-lg w-full gap-y-5">
                <div className="flex justify-center">
                    <h1 className="text-3xl font-bold mb-3">Register</h1>
                </div>
                <div className="flex flex-col gap-y-2">
                    <label className="font-semibold text-sm">Email</label>
                    <Input required={true} value={email} onChange={(e) => setEmail(e.target.value)} type="email"/>
                </div>
                <div className="flex flex-col gap-y-2">
                    <label className="font-semibold text-sm">Password</label>
                    <Input required={true} value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
                </div>
                <Button onClick={handleSubmit} type="submit">Register</Button>
                <p className="text-sm">You already have an account ? <a className="text-primary" href="/">Login</a></p>
            </form>
        </div>

    )
}
