 function trackVideo(video, canvas){
    const tracking = window.tracking;
    // var video = this.refs.video
    // var videoCanvas = this.refs.videoCanvas
    var videoCanvasContext = canvas.getContext('2d');

    var tracker = new tracking.FingerTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    tracking.track(video, tracker, { camera: true });

    tracking.track(video, tracker, { camera: true });
    tracker.on('track', function(event) {
      videoCanvasContext.clearRect(0, 0, canvas.width, canvas.height);
      event.data.forEach(function(rect) {
        videoCanvasContext.strokeStyle = '#a64ceb';
        videoCanvasContext.strokeRect(rect.x, rect.y, rect.width, rect.height);
        videoCanvasContext.font = '11px Helvetica';
        videoCanvasContext.fillStyle = "#fff";
        videoCanvasContext.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        videoCanvasContext.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      });
    });
  }

  export default trackVideo