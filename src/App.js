import './App.css';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  Cell
} from "recharts";
import { useState } from 'react'
import { data } from './index'

let tooltip;
const CustomTooltip = ({ active, payload }) => {
  if (!active || !tooltip) return null
  for (const bar of payload)
    if (bar.dataKey === tooltip)
      return <div style={{ background: '#fff', padding: '10px', boxShadow: '0 0 4px 0 rgba(0,0,0,0.4)', borderRadius: '3px' }}>{bar.name}<br />{bar.value.toFixed(2)}</div>
  return null
}

function App() {

  const [focusBar, setFocusBar] = useState(null);

  const CustomDotLabel = (props) => {
    const { filtered, value, y, x, index } = props;
    if (filtered && (data[index].medicalTreatmentInjury || data[index].restrictedWorkInjury || data[index].lostTimeInjury > 0)) {
      return null
    }
    return <text x={x} y={y - 10} fontSize={12} textAnchor={'middle'} >{value}</text>
  }

  return (
    <div className="App">
      <div className={'tt'}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 80,
              bottom: 20,
              left: 20,
            }}
            onMouseMove={(state) => {
              if (state.isTooltipActive) {
                setFocusBar(state.activeTooltipIndex);
              } else {
                setFocusBar(null);
              }
            }}
          >
            <CartesianGrid verticalPoints={0} stroke="#ccc" vertical={false} />

            <XAxis dataKey="month" scale="band" granularityEnabled={true} granularity={1} fontSize={10} />
            <YAxis allowDecimals={false} domain={[0, dataMax => (dataMax + 1)]} fontSize={15} label={{ value: 'Quantity', angle: -90, dx: -20, position: 'center' }} yAxisId="left" orientation='left' axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} tickCount={4} domain={[0, dataMax => ((Math.round(dataMax / 10) * 10))]} fontSize={15} label={{ value: 'Frequency Rate', angle: -90, dx: 20, position: 'center' }} yAxisId="right" orientation='right' axisLine={false} tickLine={false} />

            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Legend />

            <Bar
              name='Lost Time Injury'
              dataKey="lostTimeInjury"
              yAxisId="left"
              maxBarSize={42}
              fill="rgb(152, 167, 0)"
              stackId="a"
              onMouseOver={() => { tooltip = "lostTimeInjury" }}>

              <LabelList
                formatter={(value) => value ? value : null}
                dataKey="lostTimeInjury"
                position="middle"
                fill={'#fff'} />
              {data.map((entry, index) => (
                <Cell key={index}
                  fill={focusBar === index ? "rgb(177, 193, 25)" : "rgb(152, 167, 0)"}
                />
              ))}
            </Bar>

            <Bar
              name='Restricted Work Injury'
              dataKey="restrictedWorkInjury"
              yAxisId="left"
              maxBarSize={42}
              fill="rgb(70, 171, 176)"
              stackId="a"
              onMouseOver={() => tooltip = "restrictedWorkInjury"}>
              <LabelList formatter={(value) => value ? value : null} dataKey="restrictedWorkInjury" position="middle" fill={'#fff'} />
              {data.map((entry, index) => (
                <Cell key={index}
                  fill={focusBar === index ? "rgb(96, 196, 201)" : "rgb(70, 171, 176)"}
                />
              ))}
            </Bar>

            <Bar
              name='Medical Treatment Injury'
              dataKey="medicalTreatmentInjury"
              yAxisId="left"
              maxBarSize={42}
              fill="rgb(0, 71, 83)"
              stackId="a"
              onMouseOver={() => tooltip = "medicalTreatmentInjury"}>
              <LabelList formatter={(value) => value ? value : null} dataKey="medicalTreatmentInjury" position="middle" fill={'#fff'} />
              {data.map((entry, index) => (
                <Cell key={index}
                  fill={focusBar === index ? "rgb(25, 96, 100)" : "rgb(0, 71, 83)"}
                />
              ))}
            </Bar>

            <Line
              name='TRIFR'
              label={<CustomDotLabel filtered />}
              strokeWidth={2}
              yAxisId="right"
              type='linear'
              dataKey="TRIFR"
              stroke="rgb(241, 121, 37)"
              activeDot={{
                onMouseOver: () => tooltip = "TRIFR",
                fill: 'rgb(241, 121, 37)',
                stroke: 'rgba(241, 121, 37, 0.2)',
                strokeWidth: 12,
                r: 6,
                className: "boxShadow"
              }}
              dot={{
                fill: 'rgb(241, 121, 37)',
                stroke: 'transparent',
                strokeWidth: 5,
                r: 4
              }} />

            <Line
              name='Benchmark'
              label={<CustomDotLabel />}
              strokeWidth={2}
              yAxisId="right"
              type='linear'
              dataKey='benchmark'
              stroke='rgb(11, 166, 0)'
              activeDot={{
                onMouseOver: () => { tooltip = "benchmark" },
                fill: 'rgb(11, 166, 0)',
                stroke: 'rgba(11, 166, 0,0.2)',
                strokeWidth: 12,
                r: 6,
                className: "boxShadow"
              }}
              dot={{
                fill: 'rgb(11, 166, 0)',
                stroke: 'transparent',
                strokeWidth: 12,
                r: 4
              }} />

          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;
