import React, { useState, useEffect } from 'react';
import './youtubedesign.css';

const Youtubevideo = ({ width, height }) => {
    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        return () => {
            setIsMounted(true);
        };
    }, []);

    return (
        <div className='videomain'>
            <h4 className='title'>Step by step instructions</h4>
            {isMounted && (
                <div className='videopage'>
                    <iframe
                    className='videoresponsive'
                        width={width}
                        height={height}
                        src="https://www.youtube.com/embed/ktKHT-g-Qco?controls=0"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default Youtubevideo;
