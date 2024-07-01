import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import CSS for skeleton if needed

const SkeletonProductCard = () => {
    return (
        <div className="skeleton-product-card">
            <Skeleton height={200} width={200} />  {/* Placeholder for product image */}
            <Skeleton height={20} width={`80%`} style={{ marginTop: '10px' }} />  {/* Placeholder for title */}
            <Skeleton height={20} width={`60%`} style={{ marginTop: '10px' }} />  {/* Placeholder for price */}
        </div>
    );
};

export default SkeletonProductCard;
