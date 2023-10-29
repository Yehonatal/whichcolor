import { useState } from "react";

export const useGetHistory = () => {
    const [score, setScore] = useState<number>(0);
    const [highest, setHighest] = useState<number>(() => {
        const storedHighest = localStorage.getItem("highest");
        return storedHighest ? parseInt(storedHighest) : 0;
    });

    return { score, setScore, setHighest, highest };
};
