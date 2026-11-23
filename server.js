

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const Project = require('./src/models/Project');
const JoinRequest = require('./src/models/JoinRequest');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/projects', async (req, res) => {
  try {
    const f = {};

    if (req.query.category && req.query.category !== 'All') {
      f.category = req.query.category;
    }

    if (req.query.search) {
      const s = req.query.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      f.$or = [
        { title: { $regex: s, $options: 'i' } },
        { description: { $regex: s, $options: 'i' } },
        { skills: { $regex: s, $options: 'i' } }
      ];
    }

    res.json(await Project.find(f).sort({ createdAt: -1 }));
  } catch (e) {
    res.status(500).json({ message: 'Could not load projects' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const {
      title, description, category, skills,
      teamSize, authorName, authorEmail
    } = req.body;

    if (!title || !description || !authorName || !authorEmail) {
      return res.status(400).json({
        message: 'Complete all required fields.'
      });
    }

    const p = await Project.create({
      title,
      description,
      category,
      skills: Array.isArray(skills)
        ? skills
        : String(skills || '').split(',').map(x => x.trim()).filter(Boolean),
      teamSize: Number(teamSize) || 3,
      authorName,
      authorEmail
    });

    res.status(201).json(p);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const p = await Project.findById(req.params.id);

    if (!p) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({
      project: p,
      requests: await JoinRequest.find({ project: p._id }).sort({ createdAt: -1 })
    });
  } catch (e) {
    res.status(400).json({ message: 'Invalid project ID' });
  }
});

app.patch('/api/projects/:id', async (req, res) => {
  try {
    const p = await Project.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!p) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(p);
  } catch (e) {
    res.status(400).json({ message: 'Update failed' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const p = await Project.findByIdAndDelete(req.params.id);

    if (!p) {
      return res.status(404).json({ message: 'Not found' });
    }

    await JoinRequest.deleteMany({ project: p._id });
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(400).json({ message: 'Delete failed' });
  }
});

// Submit a join request
app.post('/api/projects/:id/requests', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const { studentName, studentEmail, message } = req.body;

    if (!studentName || !studentEmail) {
      return res.status(400).json({
        message: 'Name and email required'
      });
    }

    // Prevent the project creator from joining their own project
    if (
      project.authorEmail.toLowerCase() ===
      studentEmail.trim().toLowerCase()
    ) {
      return res.status(403).json({
        message: 'You cannot join your own project!'
      });
    }

    const request = await JoinRequest.create({
      project: req.params.id,
      studentName,
      studentEmail,
      message
    });

    res.status(201).json(request);
  } catch (e) {
    res.status(e.code === 11000 ? 409 : 400).json({
      message: e.code === 11000
        ? 'You already requested to join.'
        : 'Could not submit request.'
    });
  }
});

app.patch('/api/requests/:id', async (req, res) => {
  try {
    if (!['Pending', 'Accepted', 'Declined'].includes(req.body.status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const r = await JoinRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!r) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(r);
  } catch (e) {
    res.status(400).json({ message: 'Update failed' });
  }
});

async function start() {
  try {
    if (!process.env.MONGODB_URI) {
      throw Error('MONGODB_URI missing: create .env from .env.example');
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log('CollabHub: http://localhost:' + PORT);
    });
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

start();
