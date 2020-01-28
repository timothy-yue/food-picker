import React, { Component } from 'react'

export default class PureCanvas extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <canvas
                width="300"
                height="300"
                id="canvas"
                ref={node => 
                    node ? this.props.contextRef(node.getContext("2d")) : null
                }
            />
        )
    }
}
