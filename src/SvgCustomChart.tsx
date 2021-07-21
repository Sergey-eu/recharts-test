
import React, { useState } from 'react';
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
import { data } from './data'

export const SvgCustomChart = () => {
  const [focusBar, setFocusBar] = useState(null);
  const [amount, setAmount] = useState(data.length.toString())
  const [mydata, setMydata] = useState(data)

  let tooltip: string;
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !tooltip) return null
    for (const bar of payload)
      if (bar.dataKey === tooltip)
        return <div style={{ background: '#fff', padding: '10px', boxShadow: '0 0 4px 0 rgba(0,0,0,0.4)', borderRadius: '3px' }}><code>Custom tooltip</code><br />{bar.name}<br />{bar.value.toFixed(2)}</div>
    return null
  }

  // const CustomDotLabel = (props: any): any => {
  //   const { filtered, value, y, x, index } = props;
  //   if (filtered && (data[index].medicalTreatmentInjury || data[index].restrictedWorkInjury || data[index].lostTimeInjury > 0)) {
  //     return <g></g>
  //   }
  //   return <text x={x} y={y - 10} fontSize={12} textAnchor={'middle'} >{value}</text>
  // }


  interface DataPoint {
    month: string,
    lostTimeInjury: number,
    medicalTreatmentInjury: number,
    restrictedWorkInjury: number,
    benchmark: number,
    TRIFR: number,
  }

  const createChartComponent = (): DataPoint[] => {
    const dataItem = [...new Array(parseInt(amount))].map((_, index) => ({
      month: `Jun 202${(index + 1).toString()}`,
      lostTimeInjury: Math.round((Math.random() * 10)),
      medicalTreatmentInjury: Math.round(Math.random() * 10),
      restrictedWorkInjury: Math.round(Math.random() * 10),
      benchmark: 25,
      TRIFR: Math.round(Math.random() * 10),
    }))
    return dataItem
  }

  return (
    <>
      <h2>
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={() => setMydata(createChartComponent())}>Update</button>
      </h2>
      <div className={'container'}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={400}
            data={mydata}
            margin={{
              top: 20,
              right: 80,
              bottom: 20,
              left: 20,
            }}
            onMouseMove={(state: any) => {
              if (state.isTooltipActive) {
                setFocusBar(state.activeTooltipIndex);
              } else {
                setFocusBar(null);
              }
            }}
          >
            <CartesianGrid stroke="#ccc" vertical={false} />

            <XAxis dataKey="month" scale="band" fontSize={10} />
            <YAxis allowDecimals={false} domain={[0, (dataMax: number) => (dataMax + 1)]} fontSize={15} label={{ value: 'Quantity', angle: -90, dx: -20, position: 'center' }} yAxisId="left" orientation='left' axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} tickCount={4} domain={[0, (dataMax: number) => ((Math.round(dataMax / 10) * 10))]} fontSize={15} label={{ value: 'Frequency Rate', angle: -90, dx: 20, position: 'center' }} yAxisId="right" orientation='right' axisLine={false} tickLine={false} />

            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Legend />

            <Bar
              name='Lost Time Injury'
              dataKey="lostTimeInjury"
              yAxisId="left"
              maxBarSize={42}
              fill="rgb(152, 167, 0)"
              stackId="a"
              onMouseOver={() => { tooltip = "lostTimeInjury" }}
            >

              <LabelList
                formatter={(value: number) => value ? value : null}
                dataKey="lostTimeInjury"
                position="middle"
                fill={'#fff'}/>
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
              onMouseOver={() => tooltip = "restrictedWorkInjury"}
            >
              <LabelList formatter={(value: number) => value ? value : null} dataKey="restrictedWorkInjury" position="middle" fill={'#fff'} />
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
              onMouseOver={() => tooltip = "medicalTreatmentInjury"}
            >
              <LabelList formatter={(value: number) => value ? value : null} dataKey="medicalTreatmentInjury" position="middle" fill={'#fff'} />
              {data.map((entry, index) => (
                <Cell key={index}
                  fill={focusBar === index ? "rgb(25, 96, 100)" : "rgb(0, 71, 83)"}
                />
              ))}
            </Bar>

            <Line
              name='TRIFR'
              // label={<CustomDotLabel filtered />}
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
              // label={<CustomDotLabel />}
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
    </>
  )
}
