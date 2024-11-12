import {CirclePlus, EllipsisVertical, SearchIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function Home() {
  return (
      <div className="flex justify-center items-center w-full h-full">
          <div className="grid grid-cols-4 w-3/4 h-3/4 gap-x-7">
              <div className="col-span-2 w-full bg-secondary h-full rounded-3xl p-5">
                  <div className="flex justify-between">
                      <h2 className="font-semibold">Tasks List</h2>
                      <div className="flex">
                          <Button variant="ghost" className=""><SearchIcon size={25}/></Button>
                          <Button variant="ghost" className=""><EllipsisVertical size={25}/></Button>
                      </div>
                  </div>
                  <div>
                        <ul>
                            <li>Task 1</li>
                            <li>Task 2</li>
                            <li>Task 3</li>
                            <li>Task 4</li>
                            <li>Task 5</li>
                            <li>Task 6</li>
                            <li>Task 7</li>
                            <li>Task 8</li>
                            <li>Task 9</li>
                            <li>Task 10</li>
                        </ul>
                  </div>
                  <div>

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
