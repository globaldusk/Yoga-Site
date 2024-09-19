import { useState } from 'react'
import './App.css'
import YogaPose from './components/yogaPose'
import poses from './constants/poses.json'
import routines from './constants/routines.json'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import ToolTip from './components/toolTip'


function App() {
  type Routine = { id: string; name: string; poses: string[] } | null;

  const [paused, setPaused] = useState(false);
  const [poseIndex, setPoseIndex] = useState(0);
  const [currentRoutine, setCurrentRoutine] = useState<Routine>(null);
  const [time, setTime] = useState(0);
  

  const handlePoseComplete = () => {
    setPoseIndex(poseIndex+1);
    console.log("TEST");
  }

  return (
    <div className='global-container'>
      <div className='nav'>
        {routines.map((routine) => 
          <button onClick={() => setCurrentRoutine(routine)}>{routine.name}</button>
        )}
      </div>
      
      <div onClick={() => setPaused(!paused)}>
        <CountdownCircleTimer 
          isPlaying={!paused}
          duration={7}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[7, 5, 2, 0]}
          size={900}
          strokeWidth={30}
          onComplete={() => {
            handlePoseComplete();
            return { shouldRepeat: true, delay: 3 }
          }}
          onUpdate={(newTime) => setTime(newTime)}
        >
          {() => (
            <YogaPose
              image={poses[poseIndex].image}
            />
          )}
        </CountdownCircleTimer>

        <div className='pose-container'>
          <h1 className='pose-header'>
            {poses[poseIndex].title}
          </h1>
          <ToolTip
            className='pose-description'
            open={false}
            title={poses[poseIndex].title}
            description={poses[poseIndex].description}
            onClose={() => setPaused(true)}
            onOpen={() => setPaused(true)}
          />
        </div>

        <div>{time} seconds left</div>

      </div>
    </div>
  )
}

export default App;
