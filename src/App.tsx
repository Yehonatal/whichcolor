import { useEffect, useState } from "react";
import "./App.css";

import { useGetColors } from "./hooks/useGetColors";
import { useGetHistory } from "./hooks/useGetHistory";

function App() {
    const { options, chooseThree, currentChoice, colors } = useGetColors();
    const { score, setScore, setHighest, highest } = useGetHistory();

    const [correct, setCorrect] = useState<boolean>(false);
    const [isWaiting, setIsWaiting] = useState<boolean>(true);

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
