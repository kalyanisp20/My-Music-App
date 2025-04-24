import React from 'react';
import { FaPlay, FaSave, FaTrashAlt } from 'react-icons/fa';

const TrackCard = ({ track, onSave, onDelete }) => {
  const { title, artist, image, url, name } = track;

  return (
    <div className="bg-indigo-50 shadow-md rounded-2xl p-6 flex flex-col items-center text-center transition-all hover:shadow-lg hover:scale-105">
      <img
        src={image || 'https://via.placeholder.com/150'}
        alt={title || name}
        className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-md mb-4"
      />
      <h3 className="text-xl font-bold text-indigo-700">{title || name}</h3>
      <p className="text-gray-600 mb-2 text-sm italic">
        {artist?.name || artist}
      </p>

      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 text-indigo-500 hover:underline text-sm mb-3"
      >
        <FaPlay /> Listen
      </a>

      {onSave && (
        <button
          onClick={() => onSave(track)}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm transition"
        >
          <FaSave /> Save
        </button>
      )}

      {onDelete && (
        <button
          onClick={() => onDelete(track._id)}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm mt-2 transition"
        >
          <FaTrashAlt /> Delete
        </button>
      )}
    </div>
  );
};

export default TrackCard;
