import React,{ useRef, useState, useCallback } from 'react';
import logo from './logo.svg';
import Webcam from "react-webcam";
import './App.css';

const videoConstraints = {
  width: 500,
  height: 500,
  facingMode: "user"
};

function App() {

  const webcamRef = useRef(null);
  const [screenShot, setScreenShot] = useState(null)
  const [isShowVideo, setIsShowVideo] = useState(false)

  const capture = useCallback(
    () => {
      setScreenShot(webcamRef.current.getScreenshot())
    },
    [webcamRef]
  );

  const setCamera = () => {
    setIsShowVideo(!isShowVideo)
  }

  const isRenderWeb = () => {
    if(isShowVideo) {
      return (
        <div className="App-camera-container" >
          <Webcam
            className="App-camera"
            audio={false}
            height={500}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={500}
            videoConstraints={videoConstraints}
          />
          <p className="App-link" onClick={capture} > Capture </p>
        </div>
      )
    } else {
      return (
        <p className="App-link" onClick={setCamera} > Yes </p>
      )
    }
  }

  const isCaptured = () => {
    if(screenShot ) {
      return (
        <div>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Screenshots
          </p>
          
          <div className="App-camera-container" >
            <img src={screenShot} className="App-screenshot" alt="logo" />
            <p className="App-link" onClick={() => setScreenShot(null)} > Change </p>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Do you want some screenshots ?
          </p>
          
          {isRenderWeb()}
        </div>
      )
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {isCaptured()}
      </header>
    </div>
  );
}

export default App;
