import React, { Component } from 'react'

export default class Spinner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: ['#ca7','#7ac','#77c','#aac','#a7c','#ac7', "#caa"], 
            ctx: null, 
            slices : 7,
            sliceDeg : 360 / 7, 
            deg: Math.random() * 360, 
            isStopped: false,
            lock: false,
        }
    }

    getPixelRatio = context => {
        var backingStore =
        context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1;
        
        return (window.devicePixelRatio || 1) / backingStore;
    }

    deg2rad = (deg) => { return deg * Math.PI/180; }

    preanimation = () => {
        this.setState({
            isStopped: false, 
            lock: false
        }, () => {
            this.deg = this.state.deg;
            this.speed = Math.floor(Math.random() * 4) + 3;
            this.anim();
            console.log("Start spinning")
        })
    }

    anim = () => {
        console.log("Animation");
        this.deg += this.speed;
        this.deg %= 360;

        // // Decrement Speed
        if(this.state.isStopped){
            if(!this.state.lock){
                this.setState({ lock: true });
                this.slowDownRand = Math.random() * 0.98;
            } 
            this.speed = this.speed > 0.2 ? this.speed *= this.slowDownRand : 0;
        }
        // Stopped!
        if(this.state.lock && !this.speed){
            var ai = Math.floor(((360 - this.deg - 90) % 360) / this.state.sliceDeg); // deg 2 Array Index
            ai = (this.state.slices+ai) % this.state.slices; // Fix negative index
            console.log(ai);
            return;
            // return alert("You got:\n"+ label[ai] ); // Get Array Item from end Degree
        }

        this.drawImg();
        this.animationid = window.requestAnimationFrame( this.anim );
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.animationid);
    }

    drawImg = () => {
        console.log("Redraw");
        const ctx = this.refs.canvas.getContext("2d");
        let deg = this.deg;
        ctx.clearRect(0, 0, this.state.width, this.state.height);
        for(let i = 0; i < this.state.slices; i++){
            this.drawSlice(ctx, deg, i);
            deg += this.state.sliceDeg;
        }
    }

    drawSlice = (ctx, deg, index) => {
        ctx.beginPath();
        ctx.fillStyle = this.state.color[index];
        ctx.moveTo(this.state.width, this.state.height);
        ctx.arc(this.state.width, this.state.height, this.state.width/2, this.deg2rad(deg), this.deg2rad(deg+this.state.sliceDeg));
        ctx.lineTo(this.state.width/2, this.state.height/2);
        ctx.fill()
    }

    stopSpin = () => {
        this.setState({
            isStopped: true
        })
    }

    componentDidMount() {
        let canvas = this.refs.canvas;
        let context = canvas.getContext("2d");
        let ratio = this.getPixelRatio(context);
        let width = getComputedStyle(canvas)
            .getPropertyValue('width')
            .slice(0, -2);
        let height = getComputedStyle(canvas)
            .getPropertyValue('height')
            .slice(0, -2);
         
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        this.setState({
            width: width,
            height: height
        }, () => {
            this.deg = Math.random() * 360;
            this.drawImg();
        })
    }

    render() {
        return (
            <div>
                <canvas id="canv" ref="canvas" width={600} height={600} />
                <button className="btn spin-btn" onClick={this.preanimation}>
                    Spin!    
                </button>
                <button className="btn spin-btn" onClick={this.stopSpin}>
                    Stop!    
                </button>
            </div>
        )
    }
}
