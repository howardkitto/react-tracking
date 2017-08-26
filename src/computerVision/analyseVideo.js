//Learning how to analyse and return video

const width = 640;
const height = 480;
const imageArrayMaxLength = 20
var imageArray = [];
//no idea why I hav to decalre this
var i;
var sensitivity = 75;


function computeFrame(frameBuffer){

//write the frame to an array

var clampedArray = new Uint8ClampedArray(frameBuffer);

  //write the current image array to an array of images
  imageArray.push(clampedArray)

  //make sure the array doesn't get too big
  if(imageArray.length >= imageArrayMaxLength)
    imageArray.shift();

    //get the previous image
    let currentImageIndex = imageArray.length - 1

    //make sure that there are two images to compare
    if(currentImageIndex > 0){

        //create a new array to store the processed image
        var derivedImage = new Uint8ClampedArray(imageArray[currentImageIndex])
        
        //loop through the values
        for(i=0; i < derivedImage.length; i++){

          //has the pixel changed?
          let pixelDifference = imageArray[currentImageIndex][i] - imageArray[currentImageIndex-1][i]

          //Don't measure the alpha
          if(i % 4 !== 3){

            //see if the RGB value has changed more than the sensitivty threshold
            if(pixelDifference < sensitivity){

            // change value to black 
            derivedImage[i] = 256
            } else {
            derivedImage[i] = 0
            }
          } 
        }
        //return the new image
        return derivedImage
      }
      else {
        //If its the first frame in the video return original image
        return imageArray[currentImageIndex] 
      }  
  }

function analyseVideo(video, inputCanvas, outputCanvas){
  
  const inputCtx = inputCanvas.getContext('2d');
  const outputCtx = outputCanvas.getContext('2d');
  
  window.setInterval(function(){

    //create the start canvas
    
    inputCtx.drawImage(video, 0, 0, width, height);

    //get the data from the start canvas as a buffer

    var frameBuffer = inputCtx.getImageData(0,0,width,height).data.buffer;

    var processedImage = computeFrame(frameBuffer)

    var outputImage = new ImageData(processedImage, width, height)
    
    outputCtx.putImageData(outputImage,0 ,0);
    
},20
)

}

export default analyseVideo