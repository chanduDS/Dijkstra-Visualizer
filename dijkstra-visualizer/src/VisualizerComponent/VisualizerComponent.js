import React, {Component} from 'react';

import './style.css';
import Cell from '../Cell/Cell';


class VisualizerComponent extends Component {
    
    constructor() {
        super();
        this.state = {
          grid: [],
          mouseIsPressed: false,
        };
      }
    
    
    componentDidMount = () => {
        const grid = GridFormation();
        this.setState({grid});
      }

    render() {

        const {grid, mouseIsPressed} = this.state;

        return(

        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Cell
                      key={nodeIdx}
                      col={col}
                      row={row}
                    >
                    </Cell>
                  );
                })}
              </div>
            );
          })}
        </div>

        );
    }
    
}

const GridFormation = () => {
    const grid = []; // empty grid
    for (let row = 0; row < 25; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };
  const createNode = (col, row) => {
    return {
      col,
      row,
      // isStart: row === START_NODE_ROW && col === START_NODE_COL,
      // isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };
export default VisualizerComponent;