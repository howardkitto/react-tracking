//handle getting user video stream from here
//need to add lots of browser specific stuff and error traps

function gum(callback, video, inputCanvas, outputCanvas){
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    }
        ).then((stream)=>{
            console.log(window.URL.createObjectURL(stream))
            const streamUrl = window.URL.createObjectURL(stream)
            video.src = streamUrl
            callback(video, inputCanvas, outputCanvas)            
         })
        .catch((err) =>{
            console.log("An error occured! " + err);
        });
    }
  

export default gum