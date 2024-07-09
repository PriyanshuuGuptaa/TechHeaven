import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductImages = ({ productId }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`/api/product/${productId}/images`);
                setImages(response.data.images);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [productId]);

    return (
        <div>
            <h2>Product Images</h2>
            <div className="image-gallery">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={`data:${image.contentType};base64,${Buffer.from(image.data).toString('base64')}`}
                        alt={`Image ${index}`}

                    />
                ))}
            </div>
        </div>
    );
};

export default ProductImages;
