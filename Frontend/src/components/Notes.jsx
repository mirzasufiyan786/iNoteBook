import React, { useContext, useEffect, useRef,useState } from 'react'
import NoteContext from '../context/notes/noteContext'
import Noteitems from './Noteitems';
import Addnotes from './Addnote';

export default function Notes(props) {
    const context = useContext(NoteContext);
    const { notes, getNotes ,editNote} = context;
    useEffect(() => {
        getNotes()
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click();
       
        setNote({id:currentNote._id,etitle: currentNote.title,edescription: currentNote.description,etag: currentNote.tag, })
    }
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id:"", etitle:"",edescription:"", etag:""})
    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handelOnClick = (e)=>{
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();
        e.preventDefault();
        props.showAlert("Updated Successfully ","success")
        
    }
    return (
        <>

            <Addnotes showAlert={props.showAlert} />
            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" 
                                    value={note.etitle} onChange={onChange} id="etitle" name='etitle' aria-describedby="emailHelp" minLength={5} required />
                                    <div id="emailHelp" className="form-text"></div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" onChange={onChange} value={note.edescription} className="form-control" id="edescription" name='edescription' minLength={5} required  />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" onChange={onChange} value={note.etag} className="form-control" id="etag" name='etag' />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handelOnClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <h2>YOUR NOTES</h2>
                <div className="container my-2">
                    {notes.length===0 && 'No notes to display...'}
                </div>
                {notes.map((notes) => {
                    return <Noteitems key={notes._id} updateNote={updateNote} notes={notes} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}
