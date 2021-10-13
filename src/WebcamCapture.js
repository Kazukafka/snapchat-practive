import React from "react";
import { useRef, useCallback } from 'react';
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useDispatch } from "react-redux";
import { setCameraImage } from './features/cameraSlice';
import { useHistory } from 'react-router-dom';
import "./WebcamCapture.css";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

function WebcamCapture() {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  //BEN naming 
  const history = useHistory();

  //same value of the previous function
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    history.push('./preview');
  }, [webcamRef])

  return <div className='webcamCapture'>
    <Webcam
      audio={false}
      height={videoConstraints.height}
      ref={webcamRef}
      screenshotFormat='image/jpeg'
      width={videoConstraints.width}
      videoConstraints={videoConstraints}
    />

    <RadioButtonUncheckedIcon
      className='webcamCapture__button'
      onClick={capture}
    />

  </div>
}

export default WebcamCapture;
