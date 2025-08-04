import { Link, useParams } from 'react-router-dom';
import Loading from '../common/loading/loading';
import './Play.css';
import React, { useState, useEffect } from 'react';


interface Show {
    id: string;
    title?: string;
    description?: string;
}

export default function Play() {
    const { showId } = useParams<{ showId: string }>();
    const [show, setShow] = useState<Show | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (showId) {
            fetch(`/rest/shows/${showId}`)
                .then(response => response.json())
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
    return (
        <div className="play">
            <iframe width="100%" height="100%" title='Watch!' src={`https://www.youtube.com/embed/${show.id}?autoplay=1&showinfo=0`}></iframe>
        </div>
    )
}