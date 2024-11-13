"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter, DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {CirclePlus, Minus, Plus, ShoppingBagIcon} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import {addTask} from "@/lib/taskStorage";

export default function NewTaskMenu() {
    const [isMounted, setIsMounted] = useState(false);
    const [totalSessions, setTotalSessions] = useState(1);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("")

    function changeSessionNumber(number: number) {
        setTotalSessions(number);
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    function createTask() {
        console.log(title, description, totalSessions, type)
        const task = {
            title: title,
            description: description,
            type: type,
            totalSessions: totalSessions,
            sessionsDone: 0,
            isCompleted: false
        }
        addTask(task)
    }

    return (
        <Dialog>
            <DialogTrigger className="w-full">
                <Button className="w-full rounded-t-none rounded-b-3xl h-full py-5 bg-secondary-foreground/20">
                    <CirclePlus size={30}/> Add Task
                </Button>
            </DialogTrigger>
            <DialogContent className="!rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="w-full">
                        <input onChange={(e) => setTitle(e.target.value)} className="bg-transparent border-none focus:border-none outline-none w-full " autoFocus={true} placeholder="Write here the title of your task"/>
                    </DialogTitle>
                    <DialogDescription>
                        <div className="mt-7">
                            <h2 className="mb-3 text-sm">Select Category</h2>
                            <div className="flex gap-4">
                                <label htmlFor="work"
                                       className="border-[1px] peer-checked:border-green-500 py-2 px-4 rounded-lg cursor-pointer flex flex-col items-center w-16 gap-y-2">
                                    <input onClick={() => setType("Work")} type="radio" id="work" name="category" className="hidden peer"/>
                                    <ShoppingBagIcon/>
                                    <span className="peer-checked:text-white">Work</span>
                                </label>
                                <label htmlFor="play"
                                       className="border-[1px] peer-checked:border-green-500 py-2 px-4 rounded-lg cursor-pointer flex flex-col items-center w-16 gap-y-2">
                                    <input onClick={() => setType("Play")} type="radio" id="play" name="category" className="hidden peer"/>
                                    <ShoppingBagIcon/>
                                    <span className="peer-checked:text-white">Play</span>
                                </label>
                                <label htmlFor="food"
                                       className="border-[1px] peer-checked:border-green-500 py-2 px-4 rounded-lg cursor-pointer flex flex-col items-center w-16 gap-y-2">
                                    <input onClick={() => setType("Food")} type="radio" id="food" name="category" className="hidden peer"/>
                                    <ShoppingBagIcon/>
                                    <span className="peer-checked:text-white">Food</span>
                                </label>
                                <label htmlFor="learn"
                                       className="border-[1px] peer-checked:border-green-500 py-2 px-4 rounded-lg cursor-pointer flex flex-col items-center w-16 gap-y-2">
                                    <input onClick={() => setType("Learn")} type="radio" id="learn" name="category" className="hidden peer"/>
                                    <ShoppingBagIcon/>
                                    <span className="peer-checked:text-white">Learn</span>
                                </label>
                                <label htmlFor="sport"
                                       className="border-[1px] peer-checked:border-green-500 py-2 px-4 rounded-lg cursor-pointer flex flex-col items-center w-16 gap-y-2">
                                    <input onClick={() => setType("Sport")} type="radio" id="sport" name="category" className="hidden peer"/>
                                    <ShoppingBagIcon/>
                                    <span className="peer-checked:text-white">Sport</span>
                                </label>
                                <label htmlFor="others"
                                       className="border-[1px] peer-checked:border-green-500 py-2 px-4 rounded-lg cursor-pointer flex flex-col items-center w-16 gap-y-2">
                                    <input onClick={() => setType("Others")} type="radio" id="others" name="category" className="hidden peer"/>
                                    <ShoppingBagIcon/>
                                    <span className="peer-checked:text-white">Others</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-between items-center h-20">
                            <h2 className="text-sm">Total Sessions</h2>
                            <div className="flex justify-between w-auto h-10 items-center bg-gray-800 gap-x-3 rounded-l-full rounded-r-full">
                                <button className="bg-transparent border-none focus:border-none outline-none pl-5" disabled={totalSessions == 1} onClick={() => changeSessionNumber(totalSessions-1)}><Minus size={15}/></button>
                                <span className="px-4 h-full w-10 bg-gray-600 rounded-full flex justify-center items-center text-white">{totalSessions}</span>
                                <button className="bg-transparent border-none focus:border-none outline-none pr-5 text-green-500" onClick={() => changeSessionNumber(totalSessions+1)}><Plus size={15}/></button>
                            </div>
                        </div>
                        <div className="mt-3">
                            <Textarea onChange={(e) => setDescription(e.target.value)} placeholder="Write here the description of your task" rows={7}/>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="py-5 flex justify-center">
                    <DialogClose asChild>
                        <Button type="submit" className="rounded-l-full rounded-r-full p-6 bg-gray-800">Cancel</Button>
                    </DialogClose>
                    <Button onClick={() => createTask()} type="submit" className="rounded-l-full rounded-r-full p-6 bg-green-600">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
