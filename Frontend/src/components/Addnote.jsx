import React, { useContext,useState } from 'react'
import NoteContext from '../context/notes/noteContext'
export default function Addnote(props) {
    const context = useContext(NoteContext);
    const {addNote } = context;

    const [note, setNote] = useState({title:"",description:"", tag:""})

    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handelOnClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description,note.tag);
        setNote({title:"",description:"", tag:""})
        props.showAlert("Added Successfully ","success")
    }
  return (
    <div>
      <div className="container my-4">
    <h2>ADD NOTES</h2>
    <form>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" value={note.title} onChange={onChange} minLength={5} required  id="title" name='title' aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text" ></div>
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" onChange={onChange} minLength={5} required   className="form-control" value={note.description} id="description" name='description' />
        </div>
        <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" onChange={onChange} minLength={5} required   className="form-control" value={note.tag} id="tag" name='tag' />
        </div>
        
        <button type="submit" disabled={note.title.length<5 || note.description.length<5} onClick={handelOnClick} className="btn btn-primary">Add Note</button>
    </form>
</div>
    </div>
  )
}
