const Note = require("../models/note");
const test = (req, res) => {
  res.json("test notes is working");
};

const getNotes = async (req, res) => {
  try {
    // 1. Retrieve the token cookie
    const token = req.cookies.token;

    // 2. Check if token exists
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User not authenticated" });
    }

    // 3. Verify the token using JWT library
    const jwt = require("jsonwebtoken"); // Import the library
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // 4. Extract the user ID from decoded data
    const userId = decoded.id;


    const notes = await Note.find({ user: userId });
    console.log(notes);
    if (!notes) {
      return res.json({ error: "No notes found" });
    } else {
      return res.json({ notes });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    // 1. Retrieve the token cookie
    const token = req.cookies.token;

    // 2. Check if token exists
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User not authenticated" });
    }

    // 3. Verify the token using JWT library
    const jwt = require("jsonwebtoken"); // Import the library
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // 4. Extract the user ID from decoded data
    const userId = decoded.id;
    const { title, content } = req.body;

    //Check if user exists
    if (!userId) {
      return res.json({ error: "User not found" });
    }

    // Check if title exists
    if (!title) {
      return res.json({ error: "Title is required" });
    }

    // Create note in DB
    const note = await Note.create({
      title,
      content,
      user: userId,
    });
    console.log("note crée : ", note);
    return res.json({ note });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { test, getNotes, createNote };

// // Find a specific note
// router.get('/notes/:id', authenticateToken ,async (req, res) => {
//     const { id } = req.params;
//     const currentUserId = req.user.id;
//     try {
//         const note = await prisma.note.findUnique({
//             where : {
//                 id: parseInt(id),
//                 userId: currentUserId
//             }
//         });
//         res.status(200).json({ message: 'Note fetched', note});
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch note' });
//     }
// });

// router.put('/notes/:id', authenticateToken ,async (req, res) => {
//     const { id } = req.params;
//     const { titre, contenu } = req.body;
//     const currentUserId = req.user.id;
//     try {
//         const updatedNote = await prisma.note.update({
//             where: {
//                 id: parseInt(id),
//                 userId: currentUserId
//             },
//             data: {
//                 titre: titre,
//                 contenu: contenu
//             }
//         });
//         res.status(200).json({ message: 'Note updated', updatedNote});
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to update note' });
//     }
// });

// router.delete('/notes/:id', authenticateToken, async (req, res) => {
//     const { id } = req.params;
//     try {
//         await prisma.note.delete({
//             where: {
//                 id: parseInt(id),
//                 userId: req.user.id
//             }
//         });
//         res.status(200).json({ message: 'Note deleted' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to delete note' });
//     }
// });

// module.exports = router;
