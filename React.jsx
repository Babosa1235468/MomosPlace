import React, { useState, useEffect, useRef } from "react";
import './App.css';
function App() {
    const [timeleft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);
    const [input, setInputTime] = useState(25);
    const [mode, setMode] = useState('work');
    const formatTime = (seconds) => {
        const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        var tempoFormatado = minutes + ":" + secs;
        return tempoFormatado;
    }
    const handleStartPause = () => {
        setIsRunning(!isRunning);
    }
    const handleReset = () => {
        setIsRunning(false);
        // if (mode ==='work'){
        //     inputTime = 60;
        //     setTimeLeft(inputTime);
        // } else{
        //     setTimeLeft(5*60);
        // }
        setTimeLeft(mode === 'work' ? inputTime = 60 : 5 * 60);
        clearInterval(intervalRef.current);
    }
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev === 0) {
                        clearInterval(intervalRef.current);

                        if (mode === 'work') {
                            setMode('break');
                            setTimeLeft(5 * 60);
                            setIsRunning(true);
                        } else {
                            setMode('work');
                            setTimeLeft(inputTime * 60);
                            setIsRunning(false);
                        }
                        return 0;
                    }
                    return prev-1
                });
                
            }, 1000);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning, mode]);
    useEffect(() => {
        if (!isRunning){
            setTimeLeft(inputTime * 60);
        }
    }, [inputTime]);
    return (
        <div className="App">
            <h1>PomoSimski</h1>
            <div className="middle">
                <div className="timer">
                <h2 className="mode">(mode === 'work' ? 'WorkTime' : 'BreakTime')</h2>
                <h2>{formatTime(timeleft)}</h2>
            </div>
            <img
            src={
                process.env.PUBLIC_URL + (mode==='WORK' ? '/worksmiski.png' : '/chillsmiski.png')
            }
            alt = "EU SOU UM FOFO"
            />
            </div>
            <label>
                Chose Duration:
                <select
                value={inputTime}
                onChange={(e) => setInputTime(Number(e.target.value))}
                disabled={isRunning}>
                    <option value={15}>15 Minutos</option>
                    <option value={20}>20 Minutos</option>
                    <option value={25}>25 Minutos</option>
                    <option value={30}>30 Minutos</option>
                </select>
            </label>
            <div className="buttons">
                <button onClick={handleStartPause}>
                    <img
                        src={process.env.PUBLIC_URL + (isRunning ? '/pause.png' : '/start.png')}
                        alt = {isRunning ? 'Pause' : 'Start?'}
                    />
                </button>
                <button onClick={handleReset}>
                    <img
                        src={process.env.PUBLIC_URL + "/reset.png"}
                        alt = 'Reset'
                    />
                </button>
            </div>
        </div>
        
    );
}

export default App;