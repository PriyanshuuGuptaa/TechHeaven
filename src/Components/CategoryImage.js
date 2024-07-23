import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryImage = ({ categoryId }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`https://techheaven-backend.onrender.com/api/v1/category/category-image/${categoryId}`);
                if (response.data.success) {
                    setImageUrl(response.data.url);
                } else {
                    setError('Failed to fetch image.');
                }
            } catch (error) {
                console.error('Error fetching image:', error);
                setError('Failed to fetch image.');
            }
        };

        fetchImage();
    }, [categoryId]);

    return (
        <div>
            {error && <p>{error}</p>}
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={`Category ${categoryId}`}
                    style={{ width: '100%', height: '100%' }}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default CategoryImage;
