import React from 'react';

const SkeletonReservas: React.FC = () => {

    return (
        <div role="status" className="h-full w-full min-w-[300px] animate-pulse flex items-center flex-col gap-3">
            <div className="h-[500px] bg-gray-200 dark:bg-gray-500 w-full"></div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default SkeletonReservas