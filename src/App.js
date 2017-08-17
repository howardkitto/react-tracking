import React, { Component } from 'react';
import './App.css';

class App extends Component {

  //Clumsy to stuff all this into componentDidMount but good enough for now!
  
  componentDidMount(){
    const tracking = window.tracking;
    var video = this.refs.video
    var canvas = this.refs.canvas
    var context = canvas.getContext('2d');

    var tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    tracking.track(video, tracker, { camera: true });

    tracking.track(video, tracker, { camera: true });
    tracker.on('track', function(event) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      event.data.forEach(function(rect) {
        context.strokeStyle = '#a64ceb';
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = '11px Helvetica';
        context.fillStyle = "#fff";
        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      });
    });
  }

  render() {
    return (
      <div className="demo-frame">
        <h1>Basic Implementation of Tracking.js using Create-React-App</h1>
    <div className="demo-container">
      <video ref="video" width="320" height="240" preload autoPlay loop muted></video>
      <canvas ref="canvas" width="320" height="240"></canvas>
    </div>
  </div>
    );
  }
}

export default App;
