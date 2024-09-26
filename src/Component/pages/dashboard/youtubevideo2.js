import React from 'react'
import "./youtubedesign.css"

const Youtubevideo2 = () => {
    return (
        <div> 
       <div style={{margin:'4%'}}>
        <iframe
        className='vieoiframe'
          width="460"
          height="315"
          mute="1"
          src="https://www.youtube.com/embed/pkgatvUKSbM?autoplay=1&controls=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        </div>
      </div>
      );

}
export default Youtubevideo2  