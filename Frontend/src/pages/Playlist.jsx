import React, { useEffect, useState } from 'react';
import API from '../api';
import TrackCard from '../components/TrackCard';

const Playlist = () => {
  const [tracks, setTracks] = useState([]);

  const fetchPlaylist = async () => {
    try {
      const res = await API.get('/'); // Get all saved tracks from the backend
      setTracks(res.data);
    } catch (error) {
      console.error('Error fetching playlist:', error);
    }
  };

  const deleteTrack = async (id) => {
    try {
      await API.delete(`/${id}`);
      fetchPlaylist(); // Refresh the playlist after deleting
    } catch (err) {
      console.error('Error deleting track:', err);
    }
  };

  useEffect(() => {
    fetchPlaylist(); // Fetch playlist when the component is mounted
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-indigo-100 py-12 px-6">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">🎧 My Playlist</h2>
        <div className="text-center mb-4">
            <p className="text-sm text-gray-500">Your saved tracks all in one place 🎶</p>
        </div>

        {tracks.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No tracks in the playlist yet. Start adding some bangers!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tracks.map((track) => (
              <TrackCard key={track._id} track={track} onDelete={deleteTrack} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
};

export default Playlist;
