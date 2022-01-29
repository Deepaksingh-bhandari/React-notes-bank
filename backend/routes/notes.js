const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

// ROUTE1: API to fetch all notes
router.get('/fetchallnotes', fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id })
  res.status(200).json({ status: "success", data: notes })
})

// ROUTE2: API to add new notes
let noteValidation = [body('title', "Title Required").exists(), body('description').exists()]
router.post('/addNote', fetchUser, noteValidation, async (req, res) => {
  let errors = validationResult(req)
  const { title, description, tag } = req.body
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "failed", msg: errors.array() })
  }

  // Creating Notes once user is verified via JWT token - & addin user id to the notes
  Notes.create({
    title, description, tag, user: req.user.id
  }).then(() => {
    res.status(200).json({ status: "success", data: "Note Added" })
  }).catch((err) => {
    res.status(400).json({ status: "failed", data: "Some error occured while creating note" })
  })

})

// ROUTE3: API to add notes
router.put('/updatenote/:id', fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;

  // Content of updatedNote
  const newNote={};
  if(newNote){newNote.title=title}
  if(description){newNote.description=description}
  if(tag){newNote.tag=tag}
  console.log("new NOTE",newNote)
  try {
     const note =await Notes.findById(req.params.id)
    if(!note){
      return res.status(404).json({status:"failed",data:"Note not found"})
    }
    console.log(note)
    if(note.user.toString()!==req.user.id){
      return res.status(401).json({status:"failed",data:"Not authorized "})
    }
    
    await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    return res.status(200).json({status:"success",data:"Note Updated "})
    
  } catch (error) {
    return res.status(500).json({status:"failed",data:"Some internal server error occured "})
    
  }
  
})
// ROUTE4: API to delete notes
router.delete('/deletenote/:id', fetchUser, async (req, res) => {

  try {
    const note =await Notes.findById(req.params.id)
    if(!note){
      return res.status(404).json({status:"failed",data:"Note not found"})
    }
    if(note.user.toString()!==req.user.id){
      return res.status(401).json({status:"failed",data:"Not authorized "})
    }
    
    await Notes.findByIdAndDelete(req.params.id)
    return res.status(200).json({status:"success",data:"Note Deleted "})
  }
   catch (error) {
    return res.status(500).json({status:"failed",data:"Some internal server error occured "})
    
  }  
  

})

module.exports = router