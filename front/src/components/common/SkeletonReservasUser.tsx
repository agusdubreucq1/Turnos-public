import React from 'react';

const SkeletonReservasUser: React.FC = () => {
    const array = [1, 2, 3, 4, 5, 6]
    return (
        <div role="status" className="max-w-sm h-full min-w-[300px] animate-pulse flex items-center flex-col gap-3">
            {
                array.map((i) =>
                    <div key={i} className="h-14 bg-gray-200 rounded-md dark:bg-gray-400 w-full"></div>
                )
            }
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default SkeletonReservasUser