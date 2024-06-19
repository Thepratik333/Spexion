import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-[86vh] bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-700 mb-6">The page you are looking for does not exist.</p>
        <a 
          href="/" 
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
