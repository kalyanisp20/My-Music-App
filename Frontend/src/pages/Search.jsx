import React, { useState } from 'react';
import axios from 'axios';
import API, { addTrack } from '../api';
import TrackCard from '../components/TrackCard';
import { useNavigate } from 'react-router-dom';  // Updated for React Router v6

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Updated to useNavigate for React Router v6

  const searchTracks = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/music/search?track=${query}`);
      setResults(res.data);
    } catch (error) {
      console.error('Error searching tracks:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTrack = async (track) => {
    // Ensure image exists and select a medium-sized image if available
    const image = Array.isArray(track.image) 
      ? track.image.find(img => img.size === 'medium')?.['#text'] 
      : 'https://via.placeholder.com/150';

    try {
      await addTrack({  // Directly call addTrack without saving its result
        title: track.name,
        artist: typeof track.artist === 'object' ? track.artist.name : track.artist,
        image,
        url: track.url,
      });
      alert('Track Saved!');
      navigate('/playlist'); // Use navigate to redirect after saving
    } catch (err) {
      console.error('Save error:', err);
      alert('Error saving track');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-blue-50 to-indigo-100 py-12 px-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Search for Music</h2>
  
        <div className="flex justify-center items-center mb-6">
          <input
            type="text"
            placeholder="Enter track name..."
            className="border border-gray-300 p-3 w-full md:w-1/2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={searchTracks}
            className="ml-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.length > 0 ? (
            results.map((track, idx) => (
              <TrackCard key={idx} track={track} onSave={saveTrack} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-4">No results found. Try searching for a track.</p>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default Search;
