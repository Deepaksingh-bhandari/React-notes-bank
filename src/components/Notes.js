import React from 'react';
import { useContext } from 'react';
import NoteContext from '../contexts/NoteContext';
import { NoteItem } from './NoteItem';
export const Notes = () => {
  let {notes} = useContext(NoteContext)

  return (
    <div className='section'>
    <h2 className='title is-3'> Your notes </h2>
    <div className='columns'>
      {notes.length==0 && <div className='column has-text-centered'>No Notes to display</div>}
      {notes.map((note, i) => { return <NoteItem key={`note${i}`} note={note}></NoteItem> }
      )}
    </div>
  </div>
  );
};
