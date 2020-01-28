import React, { Component } from 'react';
import Canvas from './Canvas';

export default class Animation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: 0, 
            stop: false,
            colorA: ["red", "blue", "green", "orange"], 
            color: ['#fbc','#f88','#fbc','#f88','#fbc','#f88', "#fbc", "#f67"], 
            choices: {
                slice: 8,
                sliceDeg: 360/8
            },
            speed: 0
        }
    }

    // componentDidMount() {
    //     this.rAF = requestAnimationFrame(this.updateAnimationFrame);
    // }

    updateAnimationFrame = () => {
        console.log("Running");
        let stop = false;
        this.setState(prevState => {
            let { speed } = prevState;
            if(prevState.stop) {
                speed = speed > 0.2 ? speed *= 0.995 : 0;
            }
            if(!speed) {
                stop = true;
            }
            return { 
                angle: prevState.angle + speed ,
                speed
            }
        });
        if(!stop){
            this.rAF = requestAnimationFrame(this.updateAnimationFrame);
        }
    }

    handleStop =() => {
        this.setState(prevState => ({ stop: !prevState.stop }))
    }

    handleStart = () => {
        this.setState({ speed: 3 }, () => {
            this.rAF = requestAnimationFrame(this.updateAnimationFrame);
        })
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rAF);
    }

    render() {
        return (
            <>
                <Canvas angle={this.state.angle} color={this.state.color} choices={this.state.choices}/>
                <button onClick={this.handleStop}>STOP</button>
                <button onClick={this.handleStart}>START</button>
            </>
        )
    }
}
