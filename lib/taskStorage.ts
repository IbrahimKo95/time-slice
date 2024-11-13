import {Task} from "@/types/TaskTypes";


async function getTask() : Promise<[Task]> {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

async function addTask(task : Task) {
    const tasks = await getTask();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


export {getTask, addTask};