import { useState, useEffect } from 'react';
import './App.css';
import YogaPose from './components/yogaPose';
import posesData from './constants/poses.json';
import routines from './constants/routines.json';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import ToolTip from './components/toolTip';

function App() {
  type Routine = { id: string; name: string; poses: string[] } | null;

  const [paused, setPaused] = useState(false);
  const [poseIndex, setPoseIndex] = useState(0);
  const [currentRoutine, setCurrentRoutine] = useState<Routine>(null);
  const [currentPoses, setCurrentPoses] = useState<any[]>([]);
  const [time, setTime] = useState(0);
  const [timerKey, setTimerKey] = useState(0); // Key to force timer reset

  // Format time for the timer display
  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return m + ":" + (s < 10 ? "0" + s : s);
  };

  // Handle pose completion and move to the next pose
  const handlePoseComplete = () => {
    setPoseIndex((prevIndex) => (prevIndex + 1) % currentPoses.length); // Loop over poses
  };

  // Update current poses and reset timer whenever a new routine is selected
  useEffect(() => {
    if (currentRoutine) {
      // Find poses based on the IDs in the selected routine
      const routinePoses = currentRoutine.poses.map((poseId) =>
        posesData.find((pose) => pose.id === poseId)
      );
      setCurrentPoses(routinePoses);
      setPoseIndex(0); // Reset pose index when a new routine is selected
      setTimerKey((prevKey) => prevKey + 1); // Reset timer by updating key
    }
  }, [currentRoutine]);

  return (
    <div className={paused ? 'global-container pulse' : 'global-container'}>
      <div className="nav">
        {/* Display routine selection buttons */}
        {routines.map((routine) => (
          <button className='routine-button' key={routine.id} onClick={() => setCurrentRoutine(routine)}>
            {routine.name}
          </button>
        ))}
      </div>

      {currentPoses.length > 0 && (
        <div>
          <CountdownCircleTimer
            key={timerKey} // Key to reset the timer
            isPlaying={!paused}
            duration={7}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            size={900}
            strokeWidth={30}
            onComplete={() => {
              handlePoseComplete();
              return { shouldRepeat: true, delay: 3 }; // Delay between poses
            }}
            onUpdate={(newTime) => setTime(newTime)}
          >
            {() => (
              <YogaPose onClick={() => setPaused(!paused)}
                image={currentPoses[poseIndex]?.image}
              />
            )}
          </CountdownCircleTimer>

          <div className="pose-container">
            <h1 className="pose-header">
              {currentPoses[poseIndex]?.title}
            </h1>
            <ToolTip
              className="pose-description"
              open={false}
              title={currentPoses[poseIndex]?.title}
              description={currentPoses[poseIndex]?.description}
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
