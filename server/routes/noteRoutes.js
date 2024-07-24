const express = require("express");
const router = express.Router();
const cors = require("cors");
// const { createNote, getNotes, updateNote, deleteNote } = require("../controllers/noteController");
const { test, getNotes, createNote } = require("../controllers/noteController");

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
);


router.get('/', getNotes);
router.post('/create', createNote)
// router.put('/update', updateNote);
// router.delete('/delete', deleteNote);

module.exports = router