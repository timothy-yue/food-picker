import React, { Component } from 'react';
import PureCanvas from './PureCanvas';

export default class Canvas extends Component {

    componentDidMount() {
        this.drawImg(0);
    }
    
    saveContext = (ctx) => {
        this.ctx = ctx;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
        this.center = this.width / 2;
    }

    deg2rad = (deg) => {
        return (deg * Math.PI ) / 180;
    }

    drawSlice = (deg, color) => {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.moveTo(150, 150);
        this.ctx.arc(150, 150, 150, this.deg2rad(deg), this.deg2rad(deg + this.props.choices.sliceDeg));
        this.ctx.lineTo(150, 150);
        this.ctx.fill();
    }

    drawImg = (angle) => {
        this.ctx.save();
        this.ctx.clearRect(0, 0, this.width, this.width);
        for(var i = 0; i < this.props.choices.slice; i++){
          this.drawSlice(angle, this.props.color[i]);
          angle += this.props.choices.sliceDeg;
        }
        this.ctx.restore();
    }

    componentDidUpdate() {
        const { angle } = this.props;
        this.drawImg(angle);
    }

    render() {
        return (
            <PureCanvas contextRef={this.saveContext}/>
        )
    }
}



    // drawRect = (angle) => {
    //     this.ctx.beginPath();
    //     this.ctx.clearRect(0, 0, this.width, this.height);
    //     this.ctx.translate(this.width / 2, this.height / 2);
    //     this.ctx.rotate((angle * Math.PI) / 180);
    //     this.ctx.fillStyle = '#4397AC';
    //     this.ctx.fillRect(
    //         -this.width / 4, 
    //         -this.height / 4,
    //         this.width / 2,
    //         this.height / 2
    //     );
    // }
