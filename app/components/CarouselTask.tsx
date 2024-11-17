import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Task } from "@/types/TaskTypes";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CarouselTask() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [tasks, setTasks] = useState<Task[]>([]);

    async function fetchData() {
        try {
            const response = await fetch('/api/task/', {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setTasks(data.data);
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap());
        api.on('select', () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    // Calculer les tâches terminées pour différentes périodes
    const now = new Date();
    const completedTasks = {
        today: tasks.filter(task => {
            const taskDate = new Date(task.createdAt);
            return (
                task.isCompleted &&
                taskDate.getFullYear() === now.getFullYear() &&
                taskDate.getMonth() === now.getMonth() &&
                taskDate.getDate() === now.getDate()
            );
        }).length,
        week: tasks.filter(task => {
            const taskDate = new Date(task.createdAt);
            const weekStart = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate() - ((now.getDay() + 6) % 7) // Lundi comme début de semaine
            );
            return task.isCompleted && taskDate >= weekStart;
        }).length,
        month: tasks.filter(task => {
            const taskDate = new Date(task.createdAt);
            return (
                task.isCompleted &&
                taskDate.getFullYear() === now.getFullYear() &&
                taskDate.getMonth() === now.getMonth()
            );
        }).length,
        year: tasks.filter(task => {
            const taskDate = new Date(task.createdAt);
            return (
                task.isCompleted &&
                taskDate.getFullYear() === now.getFullYear()
            );
        }).length,
    };

    return (
        <Carousel setApi={setApi} className="w-full max-w-xs">
            <CarouselContent className="mb-2">
                <CarouselItem>
                    <Card className="bg-secondary-foreground/20">
                        <CardContent className="p-4">
                            <div className="flex flex-col items-center">
                                <p className="text-6xl">{completedTasks.today}</p>
                                <p className="text-2xl mt-3">Today</p>
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>
                <CarouselItem>
                    <Card className="bg-secondary-foreground/20">
                        <CardContent className="p-4">
                            <div className="flex flex-col items-center">
                                <p className="text-6xl">{completedTasks.week}</p>
                                <p className="text-2xl mt-3">This Week</p>
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>
                <CarouselItem>
                    <Card className="bg-secondary-foreground/20">
                        <CardContent className="p-4">
                            <div className="flex flex-col items-center">
                                <p className="text-6xl">{completedTasks.month}</p>
                                <p className="text-2xl mt-3">This Month</p>
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>
                <CarouselItem>
                    <Card className="bg-secondary-foreground/20">
                        <CardContent className="p-4">
                            <div className="flex flex-col items-center">
                                <p className="text-6xl">{completedTasks.year}</p>
                                <p className="text-2xl mt-3">This Year</p>
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>
            </CarouselContent>
            <div className="flex justify-center gap-x-5">
                <Button variant='outline' onClick={() => api?.scrollTo(current - 1)}><ChevronLeft /></Button>
                <Button variant='outline' onClick={() => api?.scrollTo(current + 1)}><ChevronRight /></Button>
            </div>
        </Carousel>
    );
}
