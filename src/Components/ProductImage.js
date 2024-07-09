import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';

const ProductImages = ({ productId, index }) => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/products/${productId}/images`);
                if (response.data && response.data.images) {
                    setImages(response.data.images);
                } else {
                    setError('No images found.');
                }
            } catch (error) {
                console.error('Error fetching images:', error);
                setError('Failed to fetch images.');
            }
        };

        fetchImages();
    }, [productId]);

    return (
        <div>
            <div >
                {error && <p>{error}</p>}
                {!error && images.length > 0 && images[index] && images[index].image && images[index].image.data ? (
                    <img
                        src={`data:${images[index].image.contentType};base64,${Buffer.from(images[index].image.data).toString('base64')}`}
                        alt={`Image ${index}`}
                    />
                ) : (""
                )}
            </div>
        </div>
    );
};

export default ProductImages;
