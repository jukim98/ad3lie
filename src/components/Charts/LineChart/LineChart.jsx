import React, { useState, useEffect, useMemo, Fragment} from 'react';
import * as d3 from 'd3';
import PropTypes from "prop-types"
import Chart from '../../ChartComponents/JSX/Chart'
import Line from '../../ChartComponents/JSX/Line'
import Axis from '../../ChartComponents/JSX/Axis'
import { useChartDimensions, accessorPropsType } from '../../../utils/utils.js';

const formatDate = d3.timeFormat("%-b %-d")

const LineChart = ({ data, xKey, yKey, xAxisLabel, yAxisLabel, height, width}) => {
  // const xAccessor = useMemo(() => (data) => data[xKey]);
  const xAccessor = useMemo(() =>(data) => new Date(data[xKey]));
  const yAccessor = useMemo(() => (data) => data[yKey]);
  
  // const [ref, dimensions] = useChartDimensions()
  const [ref, dimensions] = useChartDimensions({
    height: height,
    width: width, 
  })

  // For date data on x-scale.
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, xAccessor))
    .range([0, dimensions.boundedWidth])

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice()

  const xAccessorScaled = d => xScale(xAccessor(d))
  const yAccessorScaled = d => yScale(yAccessor(d))
  const y0AccessorScaled = yScale(yScale.domain()[0])

  return (
    <div className="LineChart" ref={ref}>
      <Chart dimensions={dimensions}>
        <Axis
          dimensions={dimensions}
          dimension="x"
          scale={xScale}
          label={xAxisLabel}
        />
        <Axis
          dimensions={dimensions}
          dimension="y"
          scale={yScale}
          label={yAxisLabel}
          />
        <Line
          data={data}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
        />
      </Chart>
    </div>
  )
}

// LineChart.propTypes = {
//     xAccessor: accessorPropsType,
//     yAccessor: accessorPropsType,
//     label: PropTypes.string,
// }

// LineChart.defaultProps = {
//     xAccessor: d => d.x,
//     yAccessor: d => d.y,
// }
export default LineChart