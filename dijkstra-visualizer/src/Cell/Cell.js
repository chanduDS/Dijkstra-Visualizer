import React, {Component} from 'react';

import './Cell.css';

class Cell extends Component {
    
    render() {
        const {
            col,
            isFinish,
            isStart,
            isWall,
            hasWeight,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
            row,
          } = this.props;
          const class2 = isFinish
                ? 'finish-cell'
                : isStart
                ? 'start-cell'
                : isWall
                ? 'cell-wall'
                : hasWeight
                ? 'cell-weight'
                : '';
        return(

            <div className = 'cell'
            id={`cell-${row}-${col}`}
            className={`cell ${class2}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}>

            </div>

        );
    }
    
}
export default Cell;