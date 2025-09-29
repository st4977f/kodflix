import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Loading from '../common/loading/loading';
import fetchData from '../common/fetch'; 
import './Play.css';

interface Show {
    id: string;
    title?: string;
    description?: string;
    trailerId?: string; 
}

export default function Play() {
    const { showId } = useParams<{ showId: string }>();
    const [show, setShow] = useState<Show | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (showId) {
            fetchData(`/kodflix/rest/shows/${showId}`)
                .then(show => {
                    setShow(show);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching show:', error);
                    setLoading(false);
                });
        }
    }, [showId]);

    if (loading) {
        return <Loading />;
    }

    if (!show || !show.id) {
        return <Link to="/not-found" replace />;
    }

    return <PlayContent show={show} />;
}

function PlayContent({ show }: { show: Show }) {
    const videoId = show.trailerId || show.id;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    
    return (
        <div className="play">
            <ReactPlayer
                src={videoUrl}
                playing={true}
                controls={true}
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0 }}
            />
        </div>
    )
}