import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-6">
        <h1 className="text-4xl font-bold mb-4">
          🎵 Welcome to Music Watchlist
        </h1>
        <p className="text-lg text-gray-200 mb-6">
          Search your favorite tracks and save them in your playlist!
        </p>
        <button
          onClick={() => navigate("/search")}
          className="bg-red-600 hover:bg-red-300 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300"
        >
          Search
        </button>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-center py-4 text-sm">
        © {new Date().getFullYear()} Music Watchlist. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
