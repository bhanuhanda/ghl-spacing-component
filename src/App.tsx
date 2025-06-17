import BoxModel from './components/BoxModel';
import './App.css'
import type { BoxModelChange } from './types';

function App() {
  const handleBoxModelChange = (data: BoxModelChange) => {
    console.log('Box Model Changed:', data);
  };
  return (
    <div className="app">
      <BoxModel onValueChange={handleBoxModelChange}>
        <div className="content-box" />
      </BoxModel>
    </div>
  );
}

export default App
