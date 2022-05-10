import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import { useData } from './useData';
import { AxisBottom } from './axisBottom';
import { AxisLeft } from './axisLeft';
import { Marks } from './Marks';
import {
  csv,
  scaleLinear,
  max,
  format,
  extent,
} from 'd3';
import ReactDropdown from 'react-dropdown'
import { Dropdown } from './Dropdown';
const width = window.innerWidth;
const height = window.innerHeight;
const margin = {
  top: 20,
  bottom: 120,
  right: 30,
  left: 100,
};
const options = [
  { value: 'goldfish', label: 'goldfish' },
  { value: 'dog', label: 'dog' },
  { value: 'cat', label: 'cat' },
  { value: 'parrot', label: 'parrot' },
];
const App = () => {
  const data = useData();
  
    const initialXAttribute = 'petal_length';
  const [xAttribute, setXAttribute] = useState(
    initialXAttribute
  );
  const xValue = (d) => d[xAttribute];
  const xAxisLabel = 'Petal length';
  
const initialYAttribute = 'sepal_width';
  const [yAttribute, setYAttribute] = useState(
    initialYAttribute
  );

  const yValue = (d) => d[yAttribute];
  const yAxisLabel = 'Sepal width';
  
  if (!data) {
    return <pre>loading..</pre>;
  }
  console.log(data.columns)
  
  let attributes = []
  data.columns.map((item)=>{
                     
   attributes = [...attributes,{value:item,label:item}]
                   }
  )
  console.log(attributes)
  


  const innerHeight =
    height - margin.top - margin.bottom;
  const innerWidth =
    width - margin.right - margin.left;

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);

  const siFormat = format('.2s');
  const xAxisTickFormat = (tickValue) =>
    siFormat(tickValue).replace('G', 'B');
  const tooltipFormat = (tickValue) =>
    format(',.2r')(tickValue).replace('G', 'B');

  return (
    <>
      <label for="x-select">X:</label>
      <Dropdown
        options={attributes}
        selectedValue={xAttribute}
        setSelectedValue={setXAttribute}
        id="x-select"
      />
      <label for="y-select">Y:</label>
      <Dropdown
        options={attributes}
        selectedValue={yAttribute}
        setSelectedValue={setYAttribute}
        id="y-select"
      />
      <svg width={width} height={height}>
        <g
          transform={`translate(${margin.left},${margin.top})`}
        >
          <AxisBottom
            innerHeight={innerHeight}
            xScale={xScale}
            tickFormat={xAxisTickFormat}
          />
          <AxisLeft
            yScale={yScale}
            innerWidth={innerWidth}
          />
          <text
            className="label"
            textAnchor="middle"
            x={innerWidth / 2}
            y={height - margin.bottom /1.3}
          >
            {xAttribute}
          </text>
          <text
            className="label"
            textAnchor="middle"
            transform={`translate(${
              -margin.left / 2
            },${innerHeight / 2}) rotate(-90)`}
          >
            {yAttribute}
          </text>
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={tooltipFormat}
            circleRadius={10}
          />
        </g>
      </svg>
    </>
  );
};

const rootElement = document.getElementById(
  'root'
);
ReactDOM.render(<App />, rootElement);
