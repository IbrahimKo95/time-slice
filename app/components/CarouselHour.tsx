import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Task } from "@/types/TaskTypes";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CarouselHour() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [tasks, setTasks] = useState<Task[]>([]);

    async function fetchData() {
        try {
            const response = await fetch("/api/task/", {
                method: "GET",
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
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    // Calculer le temps travaillé en heures et minutes
    const calculateTime = (sessions: number) => {
        const totalMinutes = sessions * 25;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    };

    const now = new Date();
    const timeWorked = {
        today: calculateTime(
            tasks
                .filter((task) => {
                    const taskDate = new Date(task.createdAt);
                    return (
                        taskDate.getFullYear() === now.getFullYear() &&
                        taskDate.getMonth() === now.getMonth() &&
                        taskDate.getDate() === now.getDate() &&
                        task.sessionsDone > 0
                    );
                })
                .reduce((sum, task) => sum + task.sessionsDone, 0)
        ),
        week: calculateTime(
            tasks
                .filter((task) => {
                    const taskDate = new Date(task.createdAt);
                    const weekStart = new Date(
                        now.getFullYear(),
                        now.getMonth(),
                        now.getDate() - ((now.getDay() + 6) % 7) // Lundi comme début de semaine
                    );
                    return taskDate >= weekStart && task.sessionsDone > 0;
                })
                .reduce((sum, task) => sum + task.sessionsDone, 0)
        ),
        month: calculateTime(
            tasks
                .filter((task) => {
                    const taskDate = new Date(task.createdAt);
                    return (
                        taskDate.getFullYear() === now.getFullYear() &&
                        taskDate.getMonth() === now.getMonth() &&
                        task.sessionsDone > 0
                    );
                })
                .reduce((sum, task) => sum + task.sessionsDone, 0)
        ),
        year: calculateTime(
            tasks
                .filter((task) => {
                    const taskDate = new Date(task.createdAt);
                    return (
                        taskDate.getFullYear() === now.getFullYear() &&
                        task.sessionsDone > 0
                    );
                })
                .reduce((sum, task) => sum + task.sessionsDone, 0)
        ),
    };

    return (
        <Carousel setApi={setApi} className="col-span-2">
            <CarouselContent className="mb-2">
                <CarouselItem>
                    <Card className="bg-secondary-foreground/20">
                        <CardContent className="p-4">
                            <div className="flex flex-col items-center">
                                <p className="text-3xl xl:text-6xl">{timeWorked.today}</p>
                                <p className="text-lg 2xl:text-2xl mt-3 text-center">Today</p>
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>
                <CarouselItem>
                    <Card className="bg-secondary-foreground/20">
                        <CardContent className="p-4">
                            <div className="flex flex-col items-center">
                                <p className="text-3xl xl:text-6xl">{timeWorked.week}</p>
                                <p className="text-lg 2xl:text-2xl mt-3 text-center">This Week</p>
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>
                <CarouselItem>
                    <Card className="bg-secondary-foreground/20">
                        <CardContent className="p-4">
                            <div className="flex flex-col items-center">
                                <p className="text-3xl xl:text-6xl">{timeWorked.month}</p>
                                <p className="text-lg 2xl:text-2xl mt-3 text-center">This Month</p>
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>
                <CarouselItem>
                    <Card className="bg-secondary-foreground/20">
                        <CardContent className="p-4">
                            <div className="flex flex-col items-center">
                                <p className="text-3xl xl:text-6xl">{timeWorked.year}</p>
                                <p className="text-lg 2xl:text-2xl mt-3 text-center">This Year</p>
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>
            </CarouselContent>
            <div className="flex justify-center gap-x-5">
                <Button
                    variant="outline"
                    onClick={() => api?.scrollTo(current - 1)}
                >
                    <ChevronLeft />
                </Button>
                <Button
                    variant="outline"
                    onClick={() => api?.scrollTo(current + 1)}
                >
                    <ChevronRight />
                </Button>
            </div>
        </Carousel>
    );
}
