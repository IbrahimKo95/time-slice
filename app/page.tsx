import {CirclePlus, EllipsisVertical, SearchIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import TaskCard from "@/app/components/TaskCard";

export default function Home() {
  return (
      <div className="flex justify-center items-center w-full h-screen">
          <div className="grid grid-cols-4 w-3/4 max-h-[75vh] gap-x-7">
              <div className="col-span-2 w-full bg-secondary max-h-[75vh] rounded-3xl flex justify-between flex-col">
                  <div className="flex justify-between p-5">
                      <h2 className="font-semibold">Tasks List</h2>
                      <div className="flex">
                          <Button variant="ghost" className=""><SearchIcon size={25}/></Button>
                          <Button variant="ghost" className=""><EllipsisVertical size={25}/></Button>
                      </div>
                  </div>
                  <div className="overflow-y-scroll px-5 flex-1">
                      <TaskCard/>
                      <TaskCard/>
                      <TaskCard/>
                      <TaskCard/>
                      <TaskCard/>
                      <TaskCard/>
                      <TaskCard/>
                      <TaskCard/>
                      <TaskCard/>
                      <TaskCard/>

                  </div>
                  <div className="">
                      <Button className="w-full rounded-t-none py-5"><CirclePlus size={30}/> Add Task</Button>
                  </div>
              </div>
              <div className="col-span-2 w-full h-full rounded-xl grid grid-rows-3 gap-y-7">
                  <div className="bg-secondary h-full rounded-3xl row-span-1 p-5">
                      <h2 className="font-semibold">Daily Progress</h2>
                  </div>
                  <div className="bg-secondary h-full rounded-3xl row-span-2 p-5">
                      <h2 className="font-semibold">Timer</h2>
                  </div>
              </div>
          </div>
      </div>
  )
}
