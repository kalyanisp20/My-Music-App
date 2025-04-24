import dotenv from 'dotenv';
import axios from 'axios';
import { Track } from '../models/Track.js';

dotenv.config();

const LASTFM_API_URL = 'https://ws.audioscrobbler.com/2.0/';
const API_KEY = process.env.LASTFM_API_KEY;

// Helper: Get the first non-empty image URL from Last.fm's image array
const getValidImage = (images) => {
  if (!images || !Array.isArray(images)) return '';
  const valid = images.find(img => img['#text'] && img['#text'].trim() !== '');
  return valid ? valid['#text'] : '';
};

// 1. Search tracks using Last.fm API
export const searchTracks = async (req, res) => {
  const { track } = req.query;

  if (!track) {
    return res.status(400).json({ message: 'Track name is required' });
  }

  try {
    const response = await axios.get(LASTFM_API_URL, {
      params: {
        method: 'track.search',
        track,
        api_key: API_KEY,
        format: 'json',
      },
    });

    const results = response.data.results.trackmatches.track;

    if (!results || results.length === 0) {
      return res.status(404).json({ message: 'No tracks found' });
    }

    // Append valid image URLs to each track
    const tracksWithImages = results.map((track) => ({
      ...track,
      image: getValidImage(track.image),
    }));

    res.json(tracksWithImages);
  } catch (error) {
    console.error('Error searching tracks:', error.message);
    res.status(500).json({ message: 'Failed to search tracks' });
  }
};

// 2. Get all saved tracks from MongoDB
export const getPlaylist = async (req, res) => {
  try {
    const tracks = await Track.find().sort({ savedAt: -1 });
    res.json(tracks);
  } catch (error) {
    console.error('Error fetching playlist:', error.message);
    res.status(500).json({ message: 'Failed to fetch playlist' });
  }
};

// 3. Save a new track to MongoDB
export const saveTrack = async (req, res) => {
  const { title, artist, image, url } = req.body;

  if (!title || !artist || !url) {
    return res.status(400).json({ message: 'Title, artist, and URL are required' });
  }

  try {
    const existing = await Track.findOne({ title, artist });
    if (existing) {
      return res.status(400).json({ message: 'Track already exists in playlist' });
    }

    const finalImage = image && image.trim() !== '' ? image : '';

    const newTrack = new Track({ title, artist, image: finalImage, url });
    await newTrack.save();
    res.status(201).json(newTrack);
  } catch (error) {
    console.error('Error saving track:', error.message);
    res.status(500).json({ message: 'Failed to save track' });
  }
};

// 4. Delete a track by ID
export const deleteTrack = async (req, res) => {
  try {
    const deleted = await Track.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Track not found' });
    res.json({ message: 'Track removed successfully' });
  } catch (error) {
    console.error('Error deleting track:', error.message);
    res.status(500).json({ message: 'Failed to delete track' });
  }
};
