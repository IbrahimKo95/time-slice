import {BookIcon, CheckIcon} from "lucide-react";
import {Task} from "@/types/TaskTypes";


export default function TaskCard(task: Task) {
    return (
        <div className="flex items-center gap-x-3 py-3 hover:bg-secondary-foreground/20">
            <div className="pl-7 pr-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckIcon size={15}/>
                </div>
            </div>
            <div>
                <div className="w-12 h-12 rounded-xl p-2 bg-secondary-foreground/20 flex items-center justify-center">
                    <BookIcon/>
                </div>
            </div>
            <div className="flex flex-col gap-y-1">
                <p className={task.isCompleted ? "line-through" : ""}>{task.title}</p>
                <p className="text-xs text-muted-foreground">{task.isCompleted ? "Done" : "Session " + task.sessionsDone + "/" + task.totalSessions}</p>
            </div>
        </div>
    )
}