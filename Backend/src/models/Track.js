import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Typically a medium/large-sized image URL
    required: true,
  },
  url: {
    type: String, // Last.fm track URL
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
  // Optional: Add isFavorite later if needed
  // isFavorite: {
  //   type: Boolean,
  //   default: false
  // }
});

export const Track = mongoose.model('Track', trackSchema);
