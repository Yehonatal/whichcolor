import { useEffect, useState } from "react";
import "./App.css";

type Colors = {
    colors: string[];
};

function App() {
    const [score, setScore] = useState<number>(0);
    const [highest, setHighest] = useState<number>(() => {
        const storedHighest = localStorage.getItem("highest");
        return storedHighest ? parseInt(storedHighest) : 0;
    });

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

    const [correct, setCorrect] = useState<boolean>(false);
    const [isWaiting, setIsWaiting] = useState<boolean>(true);
    const [currentChoice, setCurrentChoice] = useState<string>("");

    const handelColorChoice = (colorChoice: string) => {
        setIsWaiting(false);

        if (colorChoice === currentChoice) {
            setCorrect(true);
            chooseThree(colors);
            setScore((prev) => prev + 1);
        } else {
            setCorrect(false);
            if (score > highest) {
                setHighest(score);
                localStorage.setItem("highest", score.toString());
            }
            setScore(0);
        }

        setTimeout(() => {
            setIsWaiting(true);
        }, 5000);
    };

    function chooseThree(options: string[]) {
        const theThree = [];
        const copyOptions = [...options];

        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * copyOptions.length);
            theThree.push(copyOptions[randomIndex]);
            copyOptions.splice(randomIndex, 1);
        }

        setOptions({ colors: theThree });
        chooseOne(theThree);
    }

    function chooseOne(options: string[]) {
        const randomIndex = Math.floor(Math.random() * options.length);
        setCurrentChoice(options[randomIndex]);
    }

    useEffect(() => {
        chooseThree(colors);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="score_board">
                <div>
                    <h4>
                        SCORE: <span className="score">{score}</span>
                    </h4>
                </div>
                <div className="highest">
                    <h4>
                        HIGHEST: <span className="score">{highest}</span>
                    </h4>
                </div>
            </div>
            <div
                className="color_box"
                style={{ backgroundColor: currentChoice.toLowerCase() }}
            >
                <h1>{currentChoice}</h1>
            </div>
            <div className="choice_btn">
                {options.colors.map((choice, key) => (
                    <button key={key} onClick={() => handelColorChoice(choice)}>
                        {choice}
                    </button>
                ))}
            </div>
            {!isWaiting ? (
                <div className="answer_check">
                    {correct && <h3 style={{ color: "lime" }}>CORRECT!</h3>}
                    {!correct && <h3 style={{ color: "tomato" }}>WRONG!</h3>}
                </div>
            ) : (
                <div>
                    <h3>WAITING ...</h3>
                </div>
            )}
        </>
    );
}

export default App;
