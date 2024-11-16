import Work from "@/app/icons/Work";
import Learn from "@/app/icons/Learn";
import Sport from "@/app/icons/Sport";
import Food from "@/app/icons/Food";
import Play from "@/app/icons/Play";
import {Task} from "@/types/TaskTypes";

interface TimerTaskCardProps {
    task: Task;
    index: number | undefined;
}

export default function TimerTaskCard(props: TimerTaskCardProps) {
    return (
        <div className="font-semibold text-sm flex flex-row items-center bg-secondary-foreground/20 rounded-xl p-3 gap-x-2">
            {props.task.type == "Work" && <Work size={30}/>}
            {props.task.type == "Learn" && <Learn size={30}/>}
            {props.task.type == "Sport" && <Sport size={30}/>}
            {props.task.type == "Food" && <Food size={30}/>}
            {props.task.type == "Play" && <Play size={30}/>}
            <p>#{props.index}</p>
            <p>-</p>
            <p>{props.task.title}</p>
        </div>
    )
}