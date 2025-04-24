import express from 'express';
import {
  searchTracks,       // Search from Last.fm API
  getPlaylist,        // Get all saved tracks from MongoDB
  saveTrack,          // Save a track to MongoDB
  deleteTrack         // Delete a track from MongoDB
} from '../controllers/musicController.js';

const router = express.Router();

// ✅ Search music from Last.fm
router.get('/search', searchTracks);

// ✅ Playlist CRUD routes
router.get('/', getPlaylist);
router.post('/', saveTrack);
router.delete('/:id', deleteTrack);

export default router;


// backend routes/musicRoutes.js (or similar)
router.post('/', async (req, res) => {
  try {
    const { title, artist, image, url } = req.body;
    const newTrack = new Track({ title, artist, image, url });
    await newTrack.save();
    res.status(201).json(newTrack);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save track', error: err });
  }
});
// Fetch all saved tracks
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find(); // Fetch all tracks from the database
    res.json(tracks);
  } catch (err) {
    console.error('Error fetching tracks:', err);
    res.status(500).send('Error fetching tracks');
  }
});

// Delete a track
router.delete('/:id', async (req, res) => {
  try {
    await Track.findByIdAndDelete(req.params.id);
    res.status(200).send('Track deleted');
  } catch (err) {
    console.error('Error deleting track:', err);
    res.status(500).send('Error deleting track');
  }
});

// router.get('/search', async (req, res) => {