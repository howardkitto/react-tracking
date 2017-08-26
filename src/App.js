import React, { Component } from 'react';
import './App.css';
import analyseVideo from './computerVision/analyseVideo'
import gum from './computerVision/gum'
// import trackVideo from './computerVision/trackVideo'

class App extends Component {

  constructor(props){
    super(props)
    this.state={
        
    }

    this.drawHand = this.drawHand.bind(this);
}

drawHand(){
  var handCanvas = this.refs.handCanvas
  var handCanvasContext = handCanvas.getContext('2d');
  var hand = new Image()
  hand.src= 'hand.png'
  hand.onload = function(){
  handCanvasContext.drawImage(hand, 0, 0)}
}

componentDidMount(){
  
gum(analyseVideo, this.refs.video, this.refs.inputCanvas, this.refs.outputCanvas)
this.drawHand() 

        }     

  render() {
    return (
      <div className="demo-frame">
        <h1>Learning how to analyse video</h1>
    <div className="demo-container">
      <video ref="video" width="640" height="480" hidden preload autoPlay loop muted></video>
      <canvas ref="inputCanvas" width="640" height="480" hidden></canvas>
      <canvas ref="outputCanvas" id="videoLayer" width="640" height="480"></canvas>
      <canvas ref="handCanvas" id="handLayer" width="640" height="480"></canvas>
    </div>
  </div>
    );
  }
}

export default App;