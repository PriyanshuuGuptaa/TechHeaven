import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductImages = ({ productId, index }) => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                // Fetch the image metadata from the server
                const response = await axios.get(`https://techheaven-backend.onrender.com/api/v1/products/${productId}/images`);
                const imageMetadata = response.data.images;
                // Fetch each image's binary data using its ID
                const fetchedImages = await Promise.all(imageMetadata.map(async (imageMeta) => {
                    const imageResponse = await axios.get(imageMeta.url, { responseType: 'arraybuffer' });
                    const imageBlob = new Blob([imageResponse.data], { type: imageMeta.contentType });
                    const imageUrl = URL.createObjectURL(imageBlob);
                    return { ...imageMeta, src: imageUrl };
                }));

                setImages(fetchedImages);
            } catch (error) {
                console.error('Error fetching images:', error);
                setError('Failed to fetch images.');
            }
        };

        fetchImages();
    }, [productId]);

    return (
        <div>
            {error && <p>{error}</p>}
            {images.length > 0 && images[index] ? (
                <img
                    src={images[index].src}
                    alt={`Image ${index}`}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};


export default ProductImages;
