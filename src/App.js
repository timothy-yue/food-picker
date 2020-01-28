import React, { useState } from 'react';
import Picker from './components/Picker';
import './App.css';

function App() {

  const [data, setData] = useState([]);
  const [input, setInput] = useState('');
  const [spinDeg, setSpinDeg] = useState(0);
  const [isSpinning, setSpinning] = useState(false);


  const handleChange = (e) => {
    console.log(e.keyCode);
    if(e.key === 'Enter') {
      if(data.length > 7) {
        return;
      } else {
        let newEntry = {
          date: data.length, 
          value: 1, 
          food: input
        }
        setData([...data, newEntry])
        setInput('');
      }
    }
  } 

  const handleSpin = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 5000 )
    const newSpinDeg = spinDeg + (5 * 360) + Math.ceil(Math.random() * 360);
    setSpinDeg(newSpinDeg);
  }

  return (
    <div className="App">
      <h1> FOOD PICKER </h1>
      <Picker 
        data={data} 
        endDeg={spinDeg} 
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <input type="text" 
        placeholder="Enter food item here.." 
        onKeyDown={(e) => handleChange(e)}
        onChange={(e) => setInput(e.target.value)}
        value={input}  
      />
      <button onClick={handleSpin} disabled={isSpinning} >
        SPIN
      </button>
    </div>
  );
}

export default App;
