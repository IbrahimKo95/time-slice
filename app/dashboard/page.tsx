"use client"
import {Coffee, EllipsisVertical, SearchIcon, TimerIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import TaskCard from "@/app/components/TaskCard";
import {Badge} from "@/components/ui/badge";
import {useEffect, useState} from "react";
import {Task} from "@/types/TaskTypes";
import NewTaskMenu from "@/app/components/NewTaskMenu";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Timer from "@/app/components/Timer";

export default function Dashboard() {
    const [date, setDate] = useState("")
    const [tasks, setTasks] = useState<Task[]>([]);
    const [mode, setMode] = useState("ongoing")
    useEffect(() => {
        const date = new Date();
        setDate(date.toDateString() +  ' - ' + date.toLocaleTimeString());
    }, []);

    async function fetchData() {
        try {
            const response = await fetch('/api/task/today', {
                method: 'GET',
            });
            if(response.ok) {
                const data = await response.json();
                setTasks(data.data)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="grid grid-cols-4 w-3/4 max-h-[75vh] gap-x-7">
                <div className="col-span-2 w-full bg-secondary max-h-[75vh] min-h-[75vh] rounded-3xl flex justify-between flex-col">
                    <div className="flex justify-between py-5 px-7">
                        <h2 className="font-semibold text-lg">Tasks List <span className="font-normal text-sm ml-1">{tasks.length > 0 ? "(" + tasks.length + " Tasks)" : ""}</span></h2>
                        <div className="flex">
                            <Button variant="ghost" className=""><SearchIcon size={25}/></Button>
                            <Button variant="ghost" className=""><EllipsisVertical size={25}/></Button>
                        </div>
                    </div>
                    <div className="overflow-y-scroll flex-1">
                        {tasks.length >= 1 ? tasks.map((task, index) => (
                            <TaskCard key={index} {...task}/>
                        )) : (
                            <p className="text-white text-lg font-semibold">No tasks founds</p>
                        )}
                    </div>
                    <div className="">
                        <NewTaskMenu refreshData={fetchData}/>
                    </div>
                </div>
                <div className="col-span-2 w-full h-full rounded-xl grid grid-rows-3 gap-y-7">
                    <div className="bg-secondary h-full rounded-3xl row-span-1 p-5">
                        <h2 className="font-semibold text-lg">Daily Progress</h2>
                        <div className="flex items-center justify-between h-full">
                            <div className="flex flex-col gap-y-3">
                                <div className="flex gap-x-3">
                                    <Badge className="rounded-full">3/10</Badge>
                                    <p className="text-sm">Tasks was done today</p>
                                </div>
                                <div>
                                    <p>{date}</p>
                                </div>
                            </div>
                            <div className="">
                            </div>
                        </div>
                    </div>
                    <div className="bg-secondary h-full rounded-3xl row-span-2 p-5">
                        <Tabs value={mode} onValueChange={(value) => setMode(value)} className="w-full">
                            <TabsList className="w-full justify-between rounded-l-full rounded-r-full h-14 gap-x-10">
                                <TabsTrigger disabled={mode !== "ongoing"} className="w-full h-full rounded-l-full rounded-r-full flex items-center gap-x-1" value="ongoing"><TimerIcon size={20}/> Ongoing</TabsTrigger>
                                <TabsTrigger disabled={mode !== "break"} className="w-full h-full rounded-l-full rounded-r-full flex items-center gap-x-1" value="break">Break <Coffee size={20}/></TabsTrigger>
                            </TabsList>
                            <TabsContent value="ongoing">
                                <div className="mt-10">
                                    {mode === "ongoing" && (
                                        <Timer expiryTimestamp={new Date(Date.now() + 10 * 1000)} setMode={() => setMode("break")}/>
                                    )}
                                </div>
                            </TabsContent>
                            <TabsContent value="break">
                                <div className="mt-10">
                                    {mode === "break" && (
                                        <Timer expiryTimestamp={new Date(Date.now() + 15 * 1000)} setMode={() => setMode("ongoing")}/>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}
