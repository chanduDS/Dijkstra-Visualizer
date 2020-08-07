import React, {Component} from 'react';

import './style.css';
import Cell from '../Cell/Cell';
import {dijkstra, getNodesInShortestPathOrder} from '../dijkstra_Algorithm';

import Navbar from '../Navbar/Navbar';

let StartCellRow = 10;
let StartCellCol = 15;
let FinishCellRow = 10;
let FinishCellCol = 35;

class VisualizerComponent extends Component {
    
    constructor() {
        super();
        this.state = {
          grid: [],
          mouseIsPressed: false,
          startPressed : false,
          finishPressed : false,
          Visualizing : false,
          speed : 'Fast',
          time : 10,
          clearWalls : false,
        };
      }
    
    
    componentDidMount = () => {
        console.log("came bhere !!!")
        const grid = GridFormation();
        this.setState({grid});
      }

      handleMouseDown(row, col) {
        if(row===StartCellRow&&col === StartCellCol)
        {
          this.state.startPressed = true;
          const newGrid  = getNewStartNode(this.state.grid, row, col);
          this.setState({grid: newGrid, mouseIsPressed: true});
          return;
        }
        else if(row===FinishCellRow&&col === FinishCellCol){
          this.state.finishPressed = true;
          const newGrid  = getNewFinishNode(this.state.grid, row, col);
          this.setState({grid: newGrid, mouseIsPressed: true});
          return;
        }
        //if(row === StartCellRow && col === StartCellCol)
        //return grid;
        else{
          const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
          this.setState({grid: newGrid, mouseIsPressed: true});
        }
        
      }
    
      handleMouseEnter(row, col) {
        if(this.state.startPressed)
        {
          this.state.grid[StartCellRow][StartCellCol].isStart = false;
          StartCellRow = row;
          StartCellCol = col;
          const newGrid = getNewStartNode(this.state.grid, row, col);
          this.setState({grid: newGrid});
          return ;
        }
        else if(this.state.finishPressed)
        {
          this.state.grid[FinishCellRow][FinishCellCol].isFinish = false;
          FinishCellRow = row;
          FinishCellCol = col;
          const newGrid = getNewFinishNode(this.state.grid, row, col);
          this.setState({grid: newGrid});
          return ;
        }
        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid});
      }
    
      handleMouseUp() {
        
        this.setState({mouseIsPressed: false,startPressed: false, finishPressed : false});
      }

      animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              this.animateShortestPath(nodesInShortestPathOrder);
            }, this.state.time * i);
            return;
          }
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`cell-${node.row}-${node.col}`).className =
              'cell cell-visited';
          }, this.state.time * i);
        }
      }
    
      animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`cell-${node.row}-${node.col}`).className =
              'cell cell-shortest-path';
          }, 50 * i);
        }
      }
    
      visualizeDijkstra() {
        if(this.state.Visualizing===false)
        {
          this.setState({
            Visualizing : true,
          })
        }
        else 
        return;
        const {grid} = this.state;
        const startNode = grid[StartCellRow][StartCellCol];
        const finishNode = grid[FinishCellRow][FinishCellCol];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
        
      }

      changeSpeed()
      {
        if(this.props.speed==='Fast')
         {this.setState(
          {speed : 'Fast',
            time : 10,}
        )} 
        else if(this.props.speed==='Average')
        {this.setState(
         {speed : 'Average',
           time : 20,}
       )} 
       else
        {this.setState(
         {speed : 'Slow',
           time : 30,}
       )} 
      }

      handleClearWalls()
      {
        if(this.state.Visualizing)
        return;
        // Handling Clear Board when clear board is pressed 
        this.setState({
          clearWalls : !this.state.clearWalls
        })
        this.componentDidMount();

      }

    render() {

        const {grid, mouseIsPressed} = this.state;

        return(
          <>
          
        <div>{this.props.speed===this.state.speed ? null : this.changeSpeed()}</div>  
        <div>{this.props.Visualize ? this.visualizeDijkstra() : null}</div>
        <div>{this.state.clearWalls === this.props.clearWalls ? this.handleClearWalls() : null}</div>
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
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                    >
                    </Cell>
                  );
                })}
              </div>
            );
          })}
        </div>
        </>
        );
    }
    
}

const GridFormation = () => {
    const grid = []; // empty grid
    for (let row = 0; row < 23; row++) {
      const currentRow = [];
      for (let col = 0; col <55; col++) {
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
      isStart: row === StartCellRow && col === StartCellCol,
      isFinish: row === FinishCellRow && col === FinishCellCol,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      hasWeight : false,
      previousNode: null,
    };
  };

  const getNewStartNode = (grid, row, col) => {
   
    const newGrid = grid.slice();
      const node = newGrid[row][col];
      const newNode = {
        ...node,
        isStart: true,
      };
      newGrid[row][col] = newNode;
      return newGrid;

  }

  const getNewFinishNode = (grid, row, col) => {

    const newGrid = grid.slice();
      const node = newGrid[row][col];
      const newNode = {
        ...node,
        isFinish: true,
      };
      newGrid[row][col] = newNode;
      return newGrid;
  }

  const getNewGridWithWallToggled = (grid, row, col) => {
    
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

export default VisualizerComponent;