const express = require('express');
const router = express.Router();

let PROJECTS = [
  { id: 1, title: "Community Health Management System", description: "A system to manage patient records and appointments for community health centers", price: 1200 },
  { id: 2, title: "Agricultural Market Platform", description: "An online platform connecting farmers directly to consumers and businesses", price: 1500 },
  { id: 3, title: "E-Learning Platform for Rural Schools", description: "A platform providing educational resources and virtual classrooms for schools in rural areas", price: 1800 },
  { id: 4, title: "Waste Management Tracking System", description: "IoT-based system to optimize waste collection routes and schedules", price: 2200 },
  { id: 5, title: "Disaster Response Coordination System", description: "Platform for coordinating resources during natural disasters and emergencies", price: 2500 },
  { id: 6, title: "Renewable Energy Monitoring System", description: "Real-time monitoring of solar/wind installations for communities", price: 2000 },
  { id: 7, title: "Local Tourism Promotion Platform", description: "App to showcase local attractions, cultural events, and small businesses", price: 1600 },
  { id: 8, title: "Water Quality Monitoring Network", description: "IoT sensors and dashboard for tracking water quality in community sources", price: 2300 },
  { id: 9, title: "Digital Literacy Training Portal", description: "Interactive platform for teaching digital skills to underserved communities", price: 1700 },
  { id: 10, title: "Small Business Inventory System", description: "Inventory management solution for local shops and vendors", price: 1400 },
  { id: 11, title: "Community Transportation App", description: "Ride-sharing platform for community-based transportation", price: 1900 },
  { id: 12, title: "Crop Disease Detection System", description: "AI-powered app to identify crop diseases using smartphone cameras", price: 2100 },
  { id: 13, title: "Local News Aggregator", description: "Platform for hyperlocal news and community announcements", price: 1300 },
  { id: 14, title: "Energy Consumption Tracker", description: "System to help households monitor and reduce energy usage", price: 1500 },
  { id: 15, title: "Digital Library for Rural Areas", description: "E-book and educational resource platform accessible offline", price: 1700 },
];

// GET all projects
router.get('/', (req, res) => {
  res.json(PROJECTS);
});

// POST a new project
router.post('/', (req, res) => {
  const { title, description, price } = req.body;
  if (!title || !description || !price) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const newProject = {
    id: PROJECTS.length ? PROJECTS[PROJECTS.length - 1].id + 1 : 1,
    title,
    description,
    price,
  };
  PROJECTS.push(newProject);
  res.status(201).json(newProject);
});

module.exports = router;