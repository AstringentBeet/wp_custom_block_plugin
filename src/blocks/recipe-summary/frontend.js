import Rating from '@mui/material/Rating/index.js';
import { useState, useEffect } from '@wordpress/element'
import { createRoot } from 'react-dom/client';
import apiFetch from '@wordpress/api-fetch';

function RecipeRating(props) {
    const [avgRating, setAvgRating] = useState(props.avgRating);
    const [permission, setPermission] = useState(props.loggedIn);

    useEffect(() => {
        if(props.ratingCount) {
            setPermission(false)
        }
    }, []) 

    // Log initial state
    console.log('Initial avgRating:', props.avgRating);
    console.log('Initial permission (loggedIn):', props.loggedIn);

    return (
        <Rating 
            value={avgRating}
            precision={0.5}
            onChange={async (event, rating) => {
                console.log('Attempting to change rating:', rating);

                if (!permission) {
                    alert("You have already rated this recipe, or you may need to log in.");
                    return;
                }

                setPermission(false);

                try {
                    const response = await apiFetch({
                        path: 'up/v1/rate',
                        method: 'POST',
                        data: {
                            postID: props.postID,
                            rating
                        }
                    });

                    console.log('API response:', response);

                    if (response.status == 2) {
                        setAvgRating(rating);
                    } else {
                        alert("Failed to rate. Please try again.");
                    }
                } catch (error) {
                    console.error('API request error:', error);
                    alert("An error occurred. Please try again.");
                }
            }}
        />
    );
}

document.addEventListener('DOMContentLoaded', event => {
    const block = document.querySelector('#recipe-rating');
    const userID = parseInt(block.dataset.userId);
    const postID = parseInt(block.dataset.postId);
    const avgRating = parseFloat(block.dataset.avgRating);
    const loggedIn = !!block.dataset.loggedIn;
    const ratingCount = !!parseInt(block.dataset.ratingCount);
    const userRating = parseFloat(block.dataset.userRating);


    console.log('DOM Content Loaded');
    console.log('user ID:', userID)
    console.log('postID:', postID);
    console.log('avgRating:', avgRating);
    console.log('loggedIn:', loggedIn);
    console.log('user rating:', userRating)

    const root = createRoot(block);
    root.render(
        <RecipeRating
            postID={postID}
            avgRating={avgRating}
            loggedIn={loggedIn}
            ratingCount={ratingCount}
        />,
        block
    );
});