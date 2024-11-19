import {BookIcon, CheckIcon, EllipsisVertical, EyeIcon, PencilIcon, Trash2Icon} from "lucide-react";
import {Task} from "@/types/TaskTypes";
import Learn from "@/app/icons/Learn";
import Work from "@/app/icons/Work";
import Sport from "@/app/icons/Sport";
import Food from "@/app/icons/Food";
import Play from "@/app/icons/Play";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Dialog, DialogTitle} from "@/components/ui/dialog";


export default function TaskCard(task: Task) {
    return (
        <div className="flex items-center gap-x-3 py-3 hover:bg-secondary-foreground/20 group pr-3">
            <div className="pl-7 pr-2">
                <div className={`w-5 h-5 ${task.isCompleted ? "bg-green-500" : "bg-secondary-foreground/20 group-hover:border-2 group-hover:border-green-500"} rounded-full flex items-center justify-center`}>
                    {task.isCompleted && (
                        <CheckIcon size={15}/>
                    )}
                </div>
            </div>
            <div>
                <div className="w-12 h-12 rounded-xl p-2 bg-secondary-foreground/20 flex items-center justify-center">
                    {task.type == "Work" && <Work size={30}/>}
                    {task.type == "Learn" && <Learn size={30}/>}
                    {task.type == "Sport" && <Sport size={30}/>}
                    {task.type == "Food" && <Food size={30}/>}
                    {task.type == "Play" && <Play size={30}/>}
                </div>
            </div>
            <div className="flex flex-col gap-y-1">
                <p className={task.isCompleted ? "line-through" : ""}>{task.title}</p>
                <p className="text-xs text-muted-foreground">{task.isCompleted ? "Done" : "Session " + task.sessionsDone + "/" + task.totalSessions}</p>
            </div>
            <div className="ml-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="invisible group-hover:visible group-hover:opacity-100 opacity-0 transition-opacity"
                        >
                            <EllipsisVertical
                                size={20}
                                className="text-secondary-foreground/60 group-hover:text-secondary-foreground/100"
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="end" className="rounded-xl p-2">
                        <DropdownMenuItem className="rounded-lg px-3 py-2"><EyeIcon/> Task Detail</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg px-3 py-2"><PencilIcon/> Edit Task</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg px-3 py-2"><Trash2Icon/> Delete Task</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}