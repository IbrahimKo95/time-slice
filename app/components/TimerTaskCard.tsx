import Work from "@/app/icons/Work";
import Learn from "@/app/icons/Learn";
import Sport from "@/app/icons/Sport";
import Food from "@/app/icons/Food";
import Play from "@/app/icons/Play";
import {Task} from "@/types/TaskTypes";


export default function TimerTaskCard(task: Task, index: number) {
    return (
        <div className="flex flex-row bg-secondary-foreground/20">
            {task.type == "Work" && <Work size={30}/>}
            {task.type == "Learn" && <Learn size={30}/>}
            {task.type == "Sport" && <Sport size={30}/>}
            {task.type == "Food" && <Food size={30}/>}
            {task.type == "Play" && <Play size={30}/>}
            <p>#{index}</p>
            <p>{task.title}</p>
        </div>
    )
}