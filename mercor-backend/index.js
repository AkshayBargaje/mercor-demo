const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const DATA_PATH = path.join(__dirname, '../mercor-backend/data/form-submission.json');
const REMOVED_PATH = path.join(__dirname, '../mercor-backend/data/removed.json');

// Helper to read JSON file
function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return [];
  }
}
// Helper to write JSON file
function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Get all candidates
app.get('/candidates', (req, res) => {
  const candidates = readJson(DATA_PATH);
  res.json(candidates);
});

// Get removed candidates
app.get('/removed', (req, res) => {
  const removed = readJson(REMOVED_PATH);
  res.json(removed);
});

// Remove candidate (move to removed.json)
app.post('/remove', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  let candidates = readJson(DATA_PATH);
  let removed = readJson(REMOVED_PATH);
  const idx = candidates.findIndex(c => c.email === email);
  if (idx === -1) return res.status(404).json({ error: 'Candidate not found' });
  removed.push(candidates[idx]);
  candidates.splice(idx, 1);
  writeJson(DATA_PATH, candidates);
  writeJson(REMOVED_PATH, removed);
  res.json({ success: true });
});

// Restore candidate (move from removed.json to candidates)
app.post('/restore', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  let candidates = readJson(DATA_PATH);
  let removed = readJson(REMOVED_PATH);
  const idx = removed.findIndex(c => c.email === email);
  if (idx === -1) return res.status(404).json({ error: 'Candidate not found in removed' });
  candidates.push(removed[idx]);
  removed.splice(idx, 1);
  writeJson(DATA_PATH, candidates);
  writeJson(REMOVED_PATH, removed);
  res.json({ success: true });
});

// Update candidate notes/ratings
app.post('/update', (req, res) => {
  const { email, notes, rating } = req.body;
  let candidates = readJson(DATA_PATH);
  const idx = candidates.findIndex(c => c.email === email);
  if (idx === -1) return res.status(404).json({ error: 'Candidate not found' });
  if (notes !== undefined) candidates[idx].notes = notes;
  if (rating !== undefined) candidates[idx].rating = rating;
  writeJson(DATA_PATH, candidates);
  res.json({ success: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
