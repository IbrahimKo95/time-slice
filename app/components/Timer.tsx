import React, {useMemo} from 'react';
import { useTimer } from 'react-timer-hook';
import {Progress} from "@/components/ui/progress";
import {Button} from "@/components/ui/button";
import {Pause, Play, RefreshCw, SkipForward} from "lucide-react";

interface TimerProps {
    expiryTimestamp: Date;
    setMode: () => void;
}
export default function Timer({ expiryTimestamp, setMode }: TimerProps) {

    const {
        seconds,
        minutes,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp,
        autoStart: false,
        onExpire: () => setMode()
    })

    const totalDuration = useMemo(() => Number(expiryTimestamp) - Date.now(), [expiryTimestamp]);
    const remainingTime = (minutes * 60 + seconds) * 1000;

    // Calcul du pourcentage de progression
    const progress = ((totalDuration - remainingTime) / totalDuration) * 100;


    return (
        <div className="text-center flex flex-col justify-between h-full">
            <div className="text-7xl flex flex-col items-center">
                <div>
                    <span>{String(minutes).padStart(2, "0")}</span>:
                    <span>{String(seconds).padStart(2, "0")}</span>
                </div>
                <Progress value={progress} className="mt-7 w-2/4"/>
            </div>
            <div className="mt-32">
                {!isRunning ? (
                    <Button className="rounded-l-full rounded-r-full bg-green-500 hover:bg-green-600 px-7 py-5" onClick={start}><Play/>Start</Button>
                ) : (
                    <div className="inline-flex gap-x-3">
                        <Button className="rounded-full bg-secondary-foreground/20 h-10 w-10" onClick={() => {restart(expiryTimestamp, false)}}><RefreshCw/></Button>
                        <Button className="inline-flex rounded-l-full rounded-r-full bg-green-500 hover:bg-green-600 px-7 py-5" onClick={pause}><Pause/>Pause</Button>
                        <Button className="rounded-full bg-secondary-foreground/20 h-10 w-10" onClick={() => {restart(expiryTimestamp, false)}}><SkipForward/></Button>
                    </div>
                )}
            </div>
        </div>
    )
        ;
}