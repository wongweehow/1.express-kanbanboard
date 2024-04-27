const express = require('express');
const router = express.Router();
const Task = require('../model/task.model');


// C - CRUD
// Create new task
router.post('/', async (req, res) => {
  console.log(req.body)
  try {
    await Task.create({
      title: req.body.title,
      description: req.body.description,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      kanbanStatus: req.body.kanbanStatus
    });
    console.log('item created');
    res.redirect('/');
  } catch (error) {
    res.json({ message: error.message })
  }
});

// R - CRUD
// Loads all kanban cards onto homepage
router.get('/', async (req, res) => {
  try {
    const today = new Date();
    const allTasks = await Task.find();
    allTasks.forEach((task) => {
      task.days = Math.floor(( new Date(task.dateEnd) - today ) / 86400000);
    });
    res.render('index', { allTasks });
  } catch (error) {
    res.json({ message: error.message });
  }
});
// Loads kanban card onto modal
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      res.json(task);
    } else {
      throw new Error('no such task');
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

// U - CRUD 
// Updates the new kanban card content into database
router.put('/:id', async (req, res) => {
  try {
    await Task.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        description: req.body.description,
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd,
        kanbanStatus: req.body.kanbanStatus
      }
    )
    console.log('task updated');
    res.json({ message: 'task updated' });
  } catch (error) {
    res.json({ message: error.message });
  }
});
  
  
// D - CRUD
router.delete('/:id', async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id });
    console.log('task deleted');
    res.json({ message: 'task deleted' });
  } catch (error) {
    res.json({ message: error.message });
  }
});


module.exports = router;