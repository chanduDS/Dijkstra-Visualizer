import React, {Component} from 'react';
import {Button,Dropdown,Menu,Container} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './navbar.css';
import VisualizerComponent from '../VisualizerComponent/VisualizerComponent'



// export let visualizeClicked = false;

class Navbar extends Component  {
    state = { 
                
                stateChange : false,
                speed : 'Fast',
                clearWallsPressed : false,
           }

  //handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    
    handleVisualizeClick()
    {
        
        // executed when dijkstra visualize button is clicked
        this.setState(
            {
                stateChange : true
            }
        )
    }
    clickedFast()
    {
        this.setState({speed : 'Fast',})
    }
    clickedAverage()
    {
        this.setState({speed : 'Average',})
    }
    clickedSlow()
    {
        this.setState({speed : 'Slow',})
    }
    
    clearWallsClicked(){
        // if Clear board is clicked thiss will get executed 
        this.setState({clearWallsPressed : !this.state.clearWallsPressed,})
    }

    render() {
        // const {  stateChange} = this.state;
        return (
            <>
            <div className = 'navbar'>
                
            <Menu inverted borderless size='huge'>
            <Menu.Item >
             <img size ='mini' src='dijkstra_logo' />
            </Menu.Item>
            <Menu.Item header className = 'title' >Dijkstra Visualizer</Menu.Item>
            
            
            <Menu.Item className = "dijkstra-button" position = 'center'>
            <Button positive onClick ={() => this.handleVisualizeClick()}>Visualize Dijkstra!</Button>
            </Menu.Item>

            
            <div className = "clear-board"><Button color='teal' onClick = {() => this.clearWallsClicked()} >Clear Board</Button></div>

            <div className = "clear-walls"><Button color='teal' onClick = {() => this.clearWallsClicked()} >Clear Walls</Button></div>
            
            
            
            <Menu.Menu position='right' className ="dropdown">
            <Menu.Item
              name='Speed'
              className = 'SpeedButton'
              size='huge'
              
            />
            
              <Dropdown item text={this.state.speed} >
                <Dropdown.Menu >
                  <Dropdown.Item onClick = {() => this.clickedFast()} >Fast</Dropdown.Item>
                  <Dropdown.Item onClick = {() => this.clickedAverage()}>Average</Dropdown.Item>
                  <Dropdown.Item onClick = {() => this.clickedSlow()}>Slow</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
             
              
            </Menu.Menu>
            </Menu>
            </div>
            <VisualizerComponent
              Visualize = {this.state.stateChange}
              speed = {this.state.speed}
              clearWalls = {this.state.clearWallsPressed} 
            />
            </>
    
        );
    }
    
}

// Props sent to Visualizer component 
/*
1. state of the visualize button is sent i.e if pressed the value of the props change and the dom gets re-rendered
2. state of speed is also sent if the value of speed is changed then the props gets updated and the dom gets re-rendered 
3. state of clearBoard button is also sent   

*/

export default Navbar;
