import {BookIcon, CheckIcon} from "lucide-react";


export default function TaskCard(task: any) {
    return (
        <div className="flex items-center gap-x-3 py-3 hover:bg-green-500">
            <div className="p-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckIcon size={15}/>
                </div>
            </div>
            <div>
                <div className="w-12 h-12 rounded-xl p-2 bg-gray-700 flex items-center justify-center">
                    <BookIcon/>
                </div>
            </div>
            <div>
                <p>Task</p>
                <p className="text-xs">Done</p>
            </div>
        </div>
    )
}