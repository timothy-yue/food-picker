import React, { useState, useEffect } from 'react';
import Pie from './Pie';

function Picker(props) {

    const [width, setWidth] = useState(0);

    useEffect(() => {
        let newWidth = (props.width) / 2;
        setWidth(newWidth);
    }, [props.width])
    

    return (
        <div className="picker">
            <hr />
            <svg className="pointer">
                <polygon points={` ${width/2 - 10},0 ${ width/2 },20 ${width/2 + 10},0` }
                    style={{ 
                        "fill":"black",
                        "stroke":"darkgrey",
                        "strokeWidth":"1" 
                    }}  
                />
            </svg>
            <Pie
                data={props.data}
                width={width}
                height={width}
                innerRadius={0}
                outerRadius={width / 2}
                spin={false}
                endDeg={props.endDeg}
            />
        </div>
    );
}

export default Picker;
