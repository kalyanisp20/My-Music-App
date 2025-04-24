import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <div className="bg-white max-w-3xl w-full p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-4xl font-bold text-indigo-700 mb-4">🎧 About Music Watchlist</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          This app allows you to search for your favorite tracks using the powerful Last.fm API and save them to a personalized playlist.
          <br /><br />
          The backend is built using <span className="font-semibold text-indigo-600">Node.js</span> and <span className="font-semibold text-indigo-600">MongoDB</span> for fast, scalable playlist management.
          <br /><br />
          Enjoy a smooth music discovery experience with a clean interface and responsive design.
        </p>
      </div>
    </div>
  );
};

export default About;
