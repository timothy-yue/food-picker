import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from 'styled-components';
import * as d3 from "d3";

// Create the spin keyframes animation
// @oldDeg - the angle of the previous spin, so there is no animation jump
// @endDeg - the angle the wheel ends at
const spin = (oldDeg, endDeg) => keyframes`
    0% {
        transform: rotate(${oldDeg}deg);
    }
    100% {
        transform: rotate(${endDeg}deg);
    }
`

// Styled component to render the svg
// Initially, the oldAngle and endDeg are at 0, so the animation won't run, visually
const PieSVG = styled.svg`
    animation: ${props => spin(props.oldAngle, props.endDeg)} 5s ease-in-out 1
`

// Create arc function to render the slices and label of the slices
const Arc = ({ data, index, createArc, colors, oldAngle }) => (
  <g key={index} className="arc">
    <path className="arc" d={createArc(data)} fill={colors(index)} />
    <text
      transform={`translate(${createArc.centroid(data)}) rotate(-${oldAngle})`}
      textAnchor="middle"
      alignmentBaseline="middle"
      fill="white"
      fontSize="10"
    >
     {data.data.food}
    </text>
  </g>
);

export default function Pie( props ) {

    console.log("Pie rendered");
    console.log("End degree: ", props.endDeg)
    const [oldAngle, setOldAngle] = useState(0);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setOldAngle(props.endDeg);
    //     }, 5500)

    // }, [props.endDeg])

    const createPie = d3
        .pie()
        .value(d => d.value)
        .sort(null);
    const createArc = d3
        .arc()
        .innerRadius(props.innerRadius)
        .outerRadius(props.outerRadius);
    const colors = d3.scaleOrdinal(d3.schemeCategory10);
    const data = createPie(props.data);

    return (
        <PieSVG 
            className="svg-pie" 
            width={props.width} 
            height={props.height}
            endDeg={props.endDeg}
            oldAngle={oldAngle}
            style={{ "transform": `rotate(${oldAngle}deg)`}}
            onAnimationEnd={() => setOldAngle(props.endDeg)}
        >
        <g transform={`translate(${props.outerRadius} ${props.outerRadius})`}>
            {data.map((d, i) => (
            <Arc
                key={i}
                data={d}
                index={i}
                createArc={createArc}
                colors={colors}
                oldAngle={oldAngle}
            />
            ))}
        </g>
        </PieSVG>
    );
};

