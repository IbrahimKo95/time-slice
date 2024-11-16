

export interface Task {
    id: number;
    title: string;
    description: string;
    type: string;
    totalSessions: number;
    sessionsDone: number;
    isCompleted: boolean;
};