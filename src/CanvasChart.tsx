
import React, { useEffect, useRef, useState } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import ChartDataLabels, { Context} from 'chartjs-plugin-datalabels';
import { customTooltip } from './canvas-plugins/custom-tooltip'

interface DataPoint {
  label: string,
  lineValue: number,
  barValue1: number,
  barValue2: number,
  barValue3: number,
}
declare module 'chartjs-plugin-datalabels' {
  interface Context {
    value?: number;
  }
}

const createChartComponent = (amount: string): DataPoint[] =>
  [...new Array(parseInt(amount))].map((_, index) => ({
    label: `Jun 202${(index + 1).toString()}`,
    lineValue: Math.floor(Math.random() * 100) + 1,
    barValue1: Math.floor(Math.random() * 100) + 1,
    barValue2: Math.floor(Math.random() * 100) + 1,
    barValue3: Math.floor(Math.random() * 100) + 1,
  }))

export const CanvasChart = () => {

  const chartContainer = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<any>();
  const [amount, setAmount] = useState('10')
  const mydata: DataPoint[] = createChartComponent(amount);

  // Default label config
  const customLabelConfig: {} = {
    color: 'white',
    labels: {
      title: {
        font: {
          weight: 'bold'
        }
      }
    },
    rotation: (ctx: Context) => ctx.value || 0,
    listeners: {
      click: (ctx: Context) => {
        if (ctx.value) {
          ctx.value += (ctx.value || 0) + 10;
        }
        return true;
      }
    }
  }

  // Default Chart config
  const chartConfig: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: mydata.map(item => item.label),
      datasets: [
        {
          type: 'line',
          label: 'Line Data',
          data: mydata.map(item => item.lineValue),
          borderColor: "#F00",
          hoverBackgroundColor: '#dbdb8b',
          hoverBorderColor: "#800",
          pointHoverBackgroundColor: "#fff",
          tension: 0.4,
          datalabels: {
            color: 'blueviolet',
            align: 'top'
          }
        }, {
          type: 'bar',
          label: 'Bar Data 1.1',
          data: mydata.map(item => item.barValue1),
          backgroundColor: [
            'rgba(151, 167, 0, 1)',
          ],
          stack: 'Stack 1',
          borderWidth: 1,
        }, {
          type: 'bar',
          label: 'Bar Data 1.1',
          data: mydata.map(item => item.barValue2),
          backgroundColor: [
            'rgba(151, 193, 25, 1)',
          ],
          stack: 'Stack 1',
          borderWidth: 1
        }, {
          type: 'bar',
          label: 'Bar Data 2',
          data: mydata.map(item => item.barValue3),
          backgroundColor: [
            'rgba(96, 155, 255, 1)',
          ],
          borderColor: [
            'rgba(96, 196, 201, 1)',
          ],
          stack: 'Stack 2',
          borderWidth: 1
        }
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      hover: {
        // mode: 'dataset',
        // intersect: false,
      },
      plugins: {
        tooltip: {
          enabled: false,
          position: 'nearest',
          external: customTooltip
        },
        datalabels: customLabelConfig
      }
    }
  };

  // Chart init
  useEffect(() => {
    if( customLabelVisibility ) {
      Chart.register(ChartDataLabels);
    }
    if (chartInstance) {
      chartInstance.destroy()
    }
    if (chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Chart update
  const updateDataHandler = (newData: DataPoint[]) => {
    chartInstance.data.datasets[0].data = newData.map(item => item.barValue1);
    chartInstance.data.datasets[1].data = newData.map(item => item.barValue2);
    chartInstance.data.datasets[2].data = newData.map(item => item.barValue3);
    chartInstance.data.datasets[3].data = newData.map(item => item.lineValue);
    chartInstance.data.labels = newData.map(item => item.label);
    chartInstance.update();
  }

  // Custom Labels
  const [customLabelVisibility, setCustomLabelVisibility] = useState(true)
  const toggleLabelsHandler = (labelState: boolean) => {
    setCustomLabelVisibility(labelState)
    labelState
    ? Chart.register(ChartDataLabels)
    : Chart.unregister(ChartDataLabels)
    chartInstance.update();
  }

  return (
    <>
      <h2>
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={() => updateDataHandler(createChartComponent(amount))}>Update</button>
        <button onClick={() => toggleLabelsHandler(!customLabelVisibility)}>{customLabelVisibility ? 'Disable labels' : 'Enable labels'}</button>
      </h2>
      <div style={{ padding: '20px 50px' }}>
        <canvas ref={chartContainer} height="90%" />
      </div>
    </>
  )
}
