import { useState } from 'react';
import BoxModel from './components/BoxModel';
import './App.css'
import type { BoxModelChange, BoxModelState } from './types';

function App() {
  const [boxModelValues, setBoxModelValues] = useState<BoxModelState>({
    margin: { top: '', right: '', bottom: '', left: '' },
    padding: { top: '', right: '', bottom: '', left: '' }
  });

  const handleBoxModelChange = (data: BoxModelChange) => {
    console.log('Box Model Changed:', data);
    setBoxModelValues(data.value);
  };

  const contentBoxStyle = {
    marginTop: boxModelValues.margin.top,
    marginRight: boxModelValues.margin.right,
    marginBottom: boxModelValues.margin.bottom,
    marginLeft: boxModelValues.margin.left,
    paddingTop: boxModelValues.padding.top,
    paddingRight: boxModelValues.padding.right,
    paddingBottom: boxModelValues.padding.bottom,
    paddingLeft: boxModelValues.padding.left
  };

  return (
    <div className="app">
      <BoxModel
        defaultValue='20px'
        onValueChange={handleBoxModelChange}
        customSuggestions={[
          {
            label: "Set this value to 50px",
            value: "50px",
            applyTo: "single"
          }
        ]}
        disabledInputs={{
          padding: ['left']
        }}>
        <div className="content-box" style={contentBoxStyle}>Content</div>
      </BoxModel>
    </div>
  );
}

export default App
