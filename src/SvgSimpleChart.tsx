
import React, { useState, useEffect, useMemo } from 'react';
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
} from "recharts";

export const SvgSimpleChart = () => {

  interface DataPoint {
    value: number;
    label: string;
  }

  interface ChartComponent {
    name: string;
    val: DataPoint[];
  }

  const [amount, setAmount] = useState("100")
  const [mydata, setMydata] = useState<Array<ChartComponent>>([])

  const createChartComponent = (name: string): ChartComponent => {
    return {
      name: name,
      val: [...new Array(Number(amount))].map((_, index) => ({
        label: `Column - ${(index + 1).toString()}`,
        value: Math.floor(Math.random() * 100) + 1
      }))
    };
  }

  const updateHandler = () => {
    setMydata([createChartComponent('uv'), createChartComponent('pv')])
  }

  useEffect(() => {
    updateHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const lineColor = useMemo(() => { return ["#8884d8", "#82ca9d"] }, []);

  return (
    <>
      <h2><input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} /><button onClick={() => updateHandler()}>Update</button></h2>

      <div className={'container'}>
        <ResponsiveContainer>
          <ComposedChart width={1730} height={550} data={mydata}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" allowDuplicatedCategory={false} />
            <YAxis dataKey='value' />
            <Tooltip />
            <Legend />

            {useMemo(
              () =>
                mydata.map((dataKey, i) => {
                  return <Line
                    dataKey="value"
                    stroke={lineColor[i]}
                    data={dataKey.val}
                    name={dataKey.name}
                    key={`${dataKey.name}-submitted1`}
                    dot={false}
                  />
                }
                ), [mydata, lineColor])}
            {useMemo(
              () =>
                mydata.map((dataKey, l) => {
                  return <Bar
                    dataKey="value"
                    fill={lineColor[l]}
                    data={dataKey.val}
                    name={dataKey.name}
                    key={`${dataKey.name}-delivered2`}
                  />
                }
                ), [mydata, lineColor])}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

    </>
  )
}
