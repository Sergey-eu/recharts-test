import React from 'react';
import { CanvasChart } from './CanvasChart'
import { SvgCustomChart } from './SvgCustomChart'
import { SvgSimpleChart } from './SvgSimpleChart'

const App = () => {
  return (
    <div className="App">
      <div className="half-container">
        <h1>Custom Chart</h1>
        <SvgCustomChart />
      </div>

      <div className="half-container">
        <h1>Simple Chart 1</h1>
        <SvgSimpleChart />
      </div>

      <div className="half-container">
        <h1>Simple Chart 2 (copy)</h1>
        <SvgSimpleChart />
      </div>

      <div className="half-container">
        <h1>Simple Chart 3 (copy)</h1>
        <SvgSimpleChart />
      </div>

      <div className="half-container">
        <h1>Simple Chart 4 (copy)</h1>
        <SvgSimpleChart />
      </div>

      <div className="half-container">
        <h1>Simple Chart 5 (copy)</h1>
        <SvgSimpleChart />
      </div>

      <div className="full-container">
        <h1>Canvas chart</h1>
        <CanvasChart />
      </div>
    </div >
  );
}

export default App;
