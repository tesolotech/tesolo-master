module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/api/notes', notes.create);

    // Create a new Note in Bulk
    app.post('/api/notesInBulk', notes.createInBulk);

    // Retrieve all Notes
    app.get('/api/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/api/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/api/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/api/notes/:noteId', notes.delete);
}

