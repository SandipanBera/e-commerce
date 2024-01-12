import React from 'react';

const LoadingSkeleton = () => {
 return (
    <div className="flex flex-col gap-2 pt-4">
      <div
        className="w-3/5 h-7 bg-gray-300 rounded-2xl animate-pulse"
        style={{ animationDelay: '0.2s' }}
      ></div>
      <div
        className="w-5/6 h-7 bg-gray-300 rounded-2xl animate-pulse"
        style={{ animationDelay: '0.25s' }}
      ></div>
      <div
        className="w-3/4 h-7 bg-gray-300 rounded-2xl animate-pulse"
        style={{ animationDelay: '0.3s' }}
      ></div>
      <div
        className="w-full h-7 bg-gray-300 rounded-2xl animate-pulse"
        style={{ animationDelay: '0.35s' }}
      ></div>
      <div
        className="w-3/5 h-7 bg-gray-300 rounded-2xl animate-pulse"
        style={{ animationDelay: '0.4s' }}
      ></div>
      <div
        className="w-3/4 h-7 bg-gray-300 rounded-2xl animate-pulse"
        style={{ animationDelay: '0.45s' }}
      ></div>
      <div
        className="w-full h-7 bg-gray-300 rounded-2xl animate-pulse"
        style={{ animationDelay: '0.5s' }}
      ></div>
      <div
        className="w-11/12 h-7 bg-gray-300 rounded-2xl animate-pulse"
        style={{ animationDelay: '0.55s' }}
      ></div>
    </div>
 );
};

export default LoadingSkeleton;