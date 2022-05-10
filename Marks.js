export const Marks = ({data,yScale,xScale,xValue,yValue,tooltipFormat,circleRadius}) => data.map((d) => (
          <circle className ='mark'
            
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={circleRadius}
          >
  
    <title>{tooltipFormat(xValue(d))}</title>
  </circle>
        ))