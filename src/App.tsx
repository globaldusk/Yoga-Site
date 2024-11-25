import { useState } from 'react';
import './App.css';
import YogaPose from './components/YogaPose';
import posesData from './constants/poses.json';
import routines from './constants/routines.json';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import ToolTip from './components/ToolTip';
import { Pose, Routine } from './types';  // Import the types

function App() {
  const [paused, setPaused] = useState(false);
  const [poseIndex, setPoseIndex] = useState(0);
  const [currentRoutine, setCurrentRoutine] = useState<Routine | null>(null);
  const [currentPoses, setCurrentPoses] = useState<Pose[]>([]);
  const [time, setTime] = useState(0);
  const [timerKey, setTimerKey] = useState(0); // Key to force timer reset
  const [isDelayed, setIsDelayed] = useState(false); // Delay state

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getRoutineTotalTime = (routine: Routine) => {
    let totalTime = 0;
    routine.poses.forEach((pose) => { 
      if (pose.time) {
        totalTime += pose.time;
      }
    });
    return Math.round(totalTime / 60);
  };
  
  //TODO: add complete screen, download images, maybe delay on routine start, display delay countdown maybe?

  const handlePoseComplete = () => {
    if (poseIndex + 1 === currentPoses.length) {
      console.log('Routine completed!');
    } else {
      setPoseIndex((prevIndex) => prevIndex + 1); // Move to the next pose
      setTimerKey((prevKey) => prevKey + 1); // Reset timer
      setIsDelayed(true); // Start delay
      setTimeout(() => {
        setIsDelayed(false); // End delay after 3 seconds
      }, 3000); // 3-second delay
    }
  };  

  const handleRoutineSelect = (routine: Routine) => {
    setCurrentRoutine(routine);

    const routinePoses = routine.poses
      .map((poseItem) => posesData.find((pose) => pose.id === poseItem.id))
      .filter(Boolean) as Pose[];

    setCurrentPoses(routinePoses);
    setPoseIndex(0);
    setTimerKey((prevKey) => prevKey + 1);
  };

  return (
    <div className={paused ? 'global-container pulse' : 'global-container'}>
      <div className="nav">
        {routines.map((routine) => (
          <button
            className="routine-button"
            key={routine.id}
            onClick={() => handleRoutineSelect(routine)}
          >
            {routine.name + ` (${getRoutineTotalTime(routine)}m)`}
          </button>
        ))}
      </div>

      {currentPoses.length > 0 && (
        <div className="timer-container">
          <CountdownCircleTimer
            key={timerKey}
            isPlaying={!paused && !isDelayed} // Play only after the delay ends
            duration={currentRoutine?.poses[poseIndex]?.time || 30}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            size={Math.min(window.innerWidth, window.innerHeight) * 0.5}
            strokeWidth={30}
            onComplete={() => handlePoseComplete()}
            onUpdate={(newTime) => setTime(newTime)}
          >
            {() => (
              <YogaPose
                onClick={() => setPaused(!paused)}
                image={currentPoses[poseIndex]?.image || ''}
              />
            )}
          </CountdownCircleTimer>

          <div className="pose-container">
            <h1 className="pose-header">
              {currentPoses[poseIndex]?.title || 'Unknown Pose'}
            </h1>
            <ToolTip
              className="pose-description"
              open={false}
              title={currentPoses[poseIndex]?.title || ''}
              description={currentPoses[poseIndex]?.description || ''}
              onClose={() => setPaused(true)}
              onOpen={() => setPaused(true)}
            />
          </div>

          <h2 className="timer">{formatTime(time)}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
