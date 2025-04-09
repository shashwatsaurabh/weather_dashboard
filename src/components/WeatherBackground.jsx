import React, { useEffect, useRef } from 'react';

function WeatherBackground({ weather }) {
  const audioRef = useRef(null);

  const getVideoPath = (weather) => `/assets/videos/${weather}.mp4`;
  const getSoundPath = (weather) => `/assets/sounds/${weather}.mp3`;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play().catch(() => {}); // Avoid autoplay errors
    }
  }, [weather]);

  return (
    <>
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src={getVideoPath(weather)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <audio ref={audioRef} loop>
        <source src={getSoundPath(weather)} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
}

export default WeatherBackground;
