import React from 'react';
import styles from './videos.module.css';

const Videos = () => {
  return (
    <div>
      <div className={styles.header}>Habit Tracker - Video Section</div>
      <div className={styles.container}>
        <h3>Recommended Habit Management Videos</h3>
        <div className={styles.videoContainer}>
          <iframe
            src="https://www.youtube.com/embed/Wcs2PFz5q6g"
            allowFullScreen
            title="video1"
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/fH7N9YRxMYc"
            allowFullScreen
            title="video2"
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/Hu4Yvq-g7_Y"
            allowFullScreen
            title="video3"
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/QTB1YiWxxKU"
            allowFullScreen
            title="video4"
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/fH7N9YRxMYc"
            allowFullScreen
            title="video5"
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/iONDebHX9qk"
            allowFullScreen
            title="video6"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Videos;
