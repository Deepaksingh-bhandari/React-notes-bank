import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import NoteContext from '../contexts/NoteContext';

export const AddNote = () => {

  const [note, setnote] = useState({ title: "", description: "", tag: "" });
  const {addNote} = useContext(NoteContext);
  // Function to update the notes on loosing focus 
  const noteUpdate = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
    // setnote({ ...note, newObj })
  }
  const handleNoteSubmit=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setnote({title: "", description: "", tag: ""})
  }
  
  const handleReset=()=>{
    setnote({title: "", description: "", tag: ""})
  }

  return (
    <div className='section '>
      <h2 className='title is-3'>Add a Note</h2>
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input className="input" id="title" name="title" value={note.title} type="text" onChange={noteUpdate} placeholder="e.g Shopping List" />
        </div>
      </div>

      <div className="field">
        <label className="label">Description</label>
        <div className="control">
          <textarea className="textarea" id="description" value={note.description} name="description" type="text" onChange={noteUpdate} placeholder="e.g. Notes Description here" ></textarea>
        </div>
      </div>
      <div className="field">
        <label className="label">Tag</label>
        <div className="control">
          <textarea className="input" id="tag" value={note.tag} name="tag" type="text" onChange={noteUpdate} placeholder="e.g. Notes Description here" ></textarea>
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" onClick={handleNoteSubmit}>Save Note</button>
        </div>
        <div className="control">
          <button className="button is-link is-light" onClick={handleReset}>Reset</button>
        </div>
      </div>

    </div>
  );
};
