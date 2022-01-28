import React from 'react';
import { useContext, useState } from 'react';
import NoteContext from '../contexts/NoteContext';
import { EditNoteModal } from './EditNoteModal';

export const NoteItem = (props) => {
    const { note } = props
    const { deleteNote } = useContext(NoteContext);
       const [active, setactive] = useState(false);

    return <div className='column'>
        <div className="card  has-background-link my-2 has-text-white">
            <div className="card-content">
                <p className="title is-size-4 mb-3">{note.title}</p>
                {note.tag && note.tag.split(",").map((elem, i) => {
                    return <span key={`tag${i}`} className="tag has-text-left is-size-7 mx-1">{elem}</span>

                })}
                <div className="content mt-5 is-size-5">
                    {note.description}
                </div>
            </div>
            <div className='card-footer is-size-7 p-2 has-text-light has-text-right'>
                {/* <span>{new Date(note.updatedOn.$date).toUTCString()}</span> */}
                <button className="button is-small fas fa-edit mx-2 js-modal-trigger"  data-target="editModal" onClick={()=>{setactive(true)}}></button>
                <button className="button is-small fas fa-trash mx-2" onClick={() => { deleteNote(note._id) }}></button>
            </div>
        </div>
        {/* EDIT NOTE MODAL */}
        <EditNoteModal key={note._id} note={note} setModalActive={(val)=>{setactive(val)}} active={active} ></EditNoteModal>
        {/* <div className={`modal${active?'is-active':''} `} id="editModal">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Modal title</p>
                    <button className="delete" aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    Hello This is a modal.
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success">Save changes</button>
                    <button className="button">Cancel</button>
                </footer>
            </div>
        </div> */}
    </div>;
};
