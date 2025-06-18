// server/routes/assistanceRequests.js
const express = require('express');
const router = express.Router();
const AssistanceRequest = require('../models/AssistanceRequest');

// Create a new assistance request
router.post('/', async (req, res) => {
  try {
    const { name, email, mobile, projectId, addDocumentation, comments } = req.body;
    
    // In a real app, you would fetch the project from a database
    // For this example, we'll use a hardcoded project from the frontend data
    const project = req.body.project || {
      id: projectId,
      title: 'Sample Project',
      description: 'Sample Description',
      price: 1000
    };

    const documentationPrice = addDocumentation ? 400 : 0;
    const totalPrice = project.price + documentationPrice;

    const newRequest = new AssistanceRequest({
      name,
      email,
      mobile,
      project,
      addDocumentation,
      documentationPrice,
      totalPrice,
      comments
    });

    const savedRequest = await newRequest.save();
    
    res.status(201).json({
      success: true,
      data: savedRequest,
      message: 'Assistance request submitted successfully'
    });
  } catch (err) {
    console.error('Error submitting request:', err);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: err.message
    });
  }
});

// Get all assistance requests (for admin dashboard)
router.get('/', async (req, res) => {
  try {
    const requests = await AssistanceRequest.find().sort({ submittedAt: -1 });
    res.json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (err) {
    console.error('Error fetching requests:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// Get a single request by ID
router.get('/:id', async (req, res) => {
  try {
    const request = await AssistanceRequest.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Request not found'
      });
    }
    
    res.json({
      success: true,
      data: request
    });
  } catch (err) {
    console.error('Error fetching request:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// Update request status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    const request = await AssistanceRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Request not found'
      });
    }
    
    res.json({
      success: true,
      data: request
    });
  } catch (err) {
    console.error('Error updating request:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

module.exports = router;