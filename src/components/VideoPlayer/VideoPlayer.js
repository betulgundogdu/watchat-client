import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import {
  BiFullscreen, BiPlayCircle, BiPauseCircle, BiVolumeMute, BiVolumeFull,
} from 'react-icons/bi';
import Duration from './Duration';

import './VideoPlayer.css';

const VideoPlayer = ({
  url, seeking, setSeeking, setPlayed, played, playing, setPlaying,
}) => {
  const player = useRef(null);
  const [duration, setDuration] = useState(0);
  const makeScreenfull = () => {
    const elem = document.getElementById('player');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  const changePlayed = (e) => {
    setPlayed(parseFloat(e.currentTarget.value));
    setSeeking(false);
    player.current.seekTo(parseFloat(e.currentTarget.value));
  };

  const handleProgress = (state) => {
    if (!seeking) {
      const range = document.getElementById('range');
      setDuration(player.current.getDuration());
      setPlayed(player.current.played);
      const playedGradient = (state.playedSeconds / duration) * 100;
      const loadedGradient = (state.loadedSeconds / duration) * 100;
      range.style.background = `linear-gradient(to right,
        #709fb0 0%, #709fb0 ${playedGradient}%,
        #4a4d4a ${playedGradient}%, #4a4d4a ${loadedGradient}%,
        #1b1b1b ${loadedGradient}%, #1b1b1b 100%)`;
    }
  };

  const setIsShown = (show) => {
    const toolbar = document.getElementById('videoToolbar');
    if (show) {
      toolbar.style.display = 'flex';
    } else {
      toolbar.style.display = 'none';
    }
  };

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  return (
    <div className="playerContainer" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
      <div className="playerSection">
        <ReactPlayer
          ref={player}
          id="player"
          className="player"
          url={url}
          onProgress={handleProgress}
          playing={playing}
          onPlay={handlePlay}
          onPause={handlePause}
        />
      </div>

      <div className="toolbar" id="videoToolbar">
        <div className="wrap">
          <input
            id="range"
            className="range"
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onMouseDown={() => { setSeeking(true); }}
            onChange={changePlayed}
            onMouseUp={() => { setSeeking(false); }}
          />
        </div>
        <div className="controls">
          <button className="play control button" type="button" onClick={handlePlayPause}>
            {playing === true ? <BiPauseCircle className="control icon" />
              : <BiPlayCircle className="control icon" />}
          </button>
          <Duration seconds={duration} className="duration" />
          <button className="volume control button" type="button">
            <BiVolumeFull className="control icon" />
          </button>
          <button type="button" className="fullscreen control button" onClick={makeScreenfull}><BiFullscreen className="control icon" /></button>
        </div>
        {/* <div className="layer" /> */}
      </div>
      {/* <div className="playerSetting">
        <p>Paste your link</p>
        <input type
        ="text" onChange={setUrl} />
      </div> */}
    </div>
  );
};

export default VideoPlayer;
