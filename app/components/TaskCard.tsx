import {CheckIcon, CircleCheckBigIcon, EllipsisVertical, EyeIcon, PencilIcon, Trash2Icon} from "lucide-react";
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
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";


export default function TaskCard(props : {task: Task, fetchData: () => void}) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

    async function deleteTask() {
        const body = {
            id: props.task.id
        }
        const response = await fetch('/api/task', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if(response.ok) {
            setIsDeleteDialogOpen(false)
            props.fetchData()
        }
    }
    return (
        <div className="flex items-center gap-x-3 py-3 hover:bg-secondary-foreground/20 group pr-3">
            <div className="pl-7 pr-2">
                <div className={`w-5 h-5 ${props.task.isCompleted ? "bg-green-500" : "bg-secondary-foreground/20 group-hover:border-2 group-hover:border-green-500"} rounded-full flex items-center justify-center`}>
                    {props.task.isCompleted && (
                        <CheckIcon size={15}/>
                    )}
                </div>
            </div>
            <div>
                <div className="w-12 h-12 rounded-xl p-2 bg-secondary-foreground/20 flex items-center justify-center">
                    {props.task.type == "Work" && <Work size={30}/>}
                    {props.task.type == "Learn" && <Learn size={30}/>}
                    {props.task.type == "Sport" && <Sport size={30}/>}
                    {props.task.type == "Food" && <Food size={30}/>}
                    {props.task.type == "Play" && <Play size={30}/>}
                </div>
            </div>
            <div className="flex flex-col gap-y-1">
                <p className={props.task.isCompleted ? "line-through" : ""}>{props.task.title}</p>
                <p className="text-xs text-muted-foreground">{props.task.isCompleted ? "Done" : "Session " + props.task.sessionsDone + "/" + props.task.totalSessions}</p>
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
                        <DropdownMenuItem className="rounded-lg px-3 py-2" onClick={() => setIsDetailDialogOpen(true)} ><EyeIcon/> Task Detail</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg px-3 py-2" onClick={() => setIsEditDialogOpen(true)}><PencilIcon/> Edit Task</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg px-3 py-2" onClick={() => setIsDeleteDialogOpen(true)}><Trash2Icon/> Delete Task</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>My Dialog</DialogTitle>
                    </DialogHeader>
                    <p>This is a dialog opened from the dropdown menu.</p>
                    <DialogFooter>
                        <Button onClick={() => setIsEditDialogOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="!rounded-3xl">
                    <DialogTitle>Delete Task</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete this task.
                    </DialogDescription>
                    <DialogFooter>
                        <Button className="rounded-l-full rounded-r-full" variant="secondary" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                        <Button className="rounded-l-full rounded-r-full" variant="destructive" onClick={() => deleteTask()}>Yes, Delete it</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
                <DialogContent className="!rounded-3xl">
                    <DialogHeader className="flex flex-row items-center gap-x-6">
                        <div className="bg-secondary-foreground/10 rounded-xl p-2">
                            {props.task.type == "Work" && <Work size={40}/>}
                            {props.task.type == "Learn" && <Learn size={30}/>}
                            {props.task.type == "Sport" && <Sport size={30}/>}
                            {props.task.type == "Food" && <Food size={30}/>}
                            {props.task.type == "Play" && <Play size={30}/>}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h2 className="text-xl">{props.task.title}</h2>
                            <p className="text-muted-foreground text-sm inline-flex items-center gap-x-1"><CircleCheckBigIcon size={17}/>{props.task.isCompleted ? "Done" : "Session " + props.task.sessionsDone + "/" + props.task.totalSessions}</p>
                        </div>
                    </DialogHeader>
                    <div className="bg-secondary-foreground/10 p-4 rounded-xl overflow-y-auto min-h-36 max-h-36">
                        <p>{props.task.description}</p>
                    </div>
                    <DialogFooter>
                        <Button className="rounded-l-full rounded-r-full bg-green-500 hover:bg-green-600 px-7" onClick={() => setIsDetailDialogOpen(false)}>OK</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}