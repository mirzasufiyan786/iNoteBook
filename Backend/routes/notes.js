const express = require("express");
var fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
// --------------------
// ROUTE 1: Get all the notes usin : get "/api/notes/fetchallnotes"" .login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
// ------------------------
// ROUTE 2: Add a new note usin : post "/api/notes/addnote"" . login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description ust be atleast 10 characters").isLength({
      min: 10,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //   if there are errore return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();

      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);
                // ------------------------
// ROUTE 3: Update existing note usin : put "/api/notes/updatenote"" . login required
router.put(
    "/updatenote/:id",
    fetchuser, async (req, res) => {
        const {title , description , tag} =req.body;
        try {
        // create a new note obj
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        // Find the note to be ubdated and update it
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found")
        }
        //   Allow deletion only if the user owns this note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allow") 
        }

        note = await Note.findByIdAndUpdate(req.params.id , {$set : newNote}, {new:true})
 res.json({note});
 
            
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
    });
                // -------------------------
    // ROUTE 4: Delete existing note usin : delete "/api/notes/deletenote"" . login required
router.delete(
    "/deletenote/:id",
    fetchuser, async (req, res) => {
        // const {title , description , tag} =req.body;
        try { 
            // Find the note to be ubdated and update it
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found")
        }
        //   Allow deletion only if the user owns this note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allow") 
        }

        note = await Note.findByIdAndDelete(req.params.id )
 res.json({"Success":"note has been deleted" , note : note});
 
            
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
    });
module.exports = router;
