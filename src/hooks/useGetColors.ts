import { useState } from "react";

export type Colors = {
    colors: string[];
};
export const useGetColors = () => {
    const colors = [
        "#C90F57",
        "#C2F78C",
        "#16D505",
        "#00FF00",
        "#FFFF00",
        "#FF6347",
        "#FF1493",
        "#FFA500",
        "#8A2BE2",
        "#FF00FF",
        "#00CED1",
        "#7CFC00",
        "#FFD700",
        "#FF4500",
        "#008080",
        "#4B0082",
        "#FF69B4",
        "#FFB6C1",
        "#7FFF00",
        "#00FFFF",
    ];

    const [options, setOptions] = useState<Colors>({
        colors,
    });
    const [currentChoice, setCurrentChoice] = useState<string>("");

    const chooseThree = (options: string[]) => {
        const theThree = [];
        const copyOptions = [...options];

        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * copyOptions.length);
            theThree.push(copyOptions[randomIndex]);
            copyOptions.splice(randomIndex, 1);
        }

        setOptions({ colors: theThree });
        chooseOne(theThree);
    };

    const chooseOne = (options: string[]) => {
        const randomIndex = Math.floor(Math.random() * options.length);
        setCurrentChoice(options[randomIndex]);
    };

    return {
        options,
        chooseThree,
        currentChoice,
        colors,
    };
};
