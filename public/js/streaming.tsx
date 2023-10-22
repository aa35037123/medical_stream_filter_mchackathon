import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

const webcamRef = useRef<Webcam>(null);
const [isLoaded, setIsLoaded] = useState<boolean>(false);

const loadModels = async () => {
    const MODEL_URL = `/models`;
    await Promise.all([
      faceapi.nets.tinyFaceDetector.load(MODEL_URL),
      faceapi.nets.faceExpressionNet.load(MODEL_URL),
    ]);
};
  function scoreExpression(expressions, scores){
    //console.log(scores);
    const max = Math.max.apply(null, scores);
    if(scores[0] == max)
    {
      const neutral = scores.shift();
      const second = Math.max.apply(null, scores);
      if(max/second > 2 && second != 0)
        return expressions[0];
      else
        return expressions[scores.findIndex((score) => score === second)]
    }
    else{
      const index = scores.findIndex((score) => score === max);
      return expressions[index];
    }

  }
  const faceDetectHandler = async () => {
    await loadModels();
    //await handleLoadWaiting();
    if (webcamRef.current) {
      setIsLoaded(true);
      const webcam = webcamRef.current.video as HTMLVideoElement;
      webcam.width = webcam.videoWidth;
      webcam.height = webcam.videoHeight;
      const video = webcamRef.current.video;
      (async function detect() {
        const detectionsWithExpressions = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();
        if (detectionsWithExpressions.length > 0) {
          for (let i = 0; i < detectionsWithExpressions.length ; i++) {
            const Array = Object.entries(detectionsWithExpressions[i].expressions);
            const expressionsArray = Array.map((j) => j[0]);
            const scoresArray = Array.map((i) => i[1]);
            const max = Math.max.apply(null, scoresArray);
            const index = scoresArray.findIndex((score) => score === max);
            const expression = scoreExpression(expressionsArray, scoresArray);
            // const log = scoresArray.map((element, index)=>{
            //   return `${expressionsArray[index]} : ${element}`
            //});
            console.log(expression);
        }
        }
      })();
    }
 };

useEffect(() => {
    faceDetectHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);