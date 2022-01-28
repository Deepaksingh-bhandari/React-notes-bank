import React, { useRef } from 'react';
import { useContext,useState } from 'react';
import NoteContext from '../contexts/NoteContext';

export const EditNoteModal = (props,key) => {

    const refClose = useRef(null);
    const {editNote}=useContext(NoteContext)
    let {note,active,setModalActive} = props

    const [noteData, setnoteData] = useState({title:note.title, description:note.description, tag:note.tag});

    const noteUpdate=(e)=>{
        // console.log("Update Note called",e.target.name,":",e.target.value);
        setnoteData({...noteData,[e.target.name]:e.target.value})
    }

    const saveUpdatedNote=()=>{
    editNote(note._id,noteData);
    // closeModal();
    // ALTERNATE WAY BY USING REF
    refClose.current.click();
    }
    const closeModal=()=>{
        setModalActive(false)
    }
    

    return (<>
        <div id={`editModal${key}`} className={`modal ${active?'is-active':''}` }>
            <div className="modal-background"></div>
            <div className="modal-content">
                <div className='box '>
                    <h2 className='title is-3'>Edit Note</h2>
                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input className="input" id="edittitle" name="title" type="text" value={noteData.title} onChange={noteUpdate} placeholder="e.g Shopping List" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Description</label>
                        <div className="control">
                            <textarea className="textarea" id="editdescription" name="description" type="text"  value={noteData.description} onChange={noteUpdate} placeholder="e.g. Notes Description here" ></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Tag</label>
                        <div className="control">
                            <textarea className="input" id="edittag" name="tag" type="text" value={noteData.tag}  onChange={noteUpdate} placeholder="e.g. Notes Description here" ></textarea>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link" onClick={saveUpdatedNote}>Update Note</button>
                        </div>
                        <div className="control">
                            <button className="button is-link is-light" onClick={closeModal}>Discard</button>
                        </div>
                    </div>

                </div>
            </div>
            <button ref={refClose} className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
        </div>
    </>);
};
