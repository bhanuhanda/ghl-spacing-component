import BoxModel from './components/BoxModel';
import './App.css'
import type { BoxModelChange } from './types';

function App() {
  const handleBoxModelChange = (data: BoxModelChange) => {
    console.log('Box Model Changed:', data);
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
          margin: ['left', 'right', 'top', 'bottom'],
          padding: ['left']
        }}>
        <div className="content-box" />
      </BoxModel>
    </div>
  );
}

export default App
