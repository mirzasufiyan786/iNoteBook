import React,{useContext} from 'react'
import NoteContext from '../context/notes/noteContext'

export default function Noteitems(props) {
  const context = useContext(NoteContext);
const { deleteNote} = context;
    const {notes,updateNote}=props;
  return (
    <div className='col-md-3 my-3'>
      <div className="card" >
  <div className="card-body">
    <h5 className="card-title">{notes.title}</h5>
    <p className="card-text">{notes.description}</p>
    <i className="fa-regular fa-trash-can mx-1" onClick={()=>{deleteNote(notes._id);props.showAlert("Deleted Successfully ","success")}}></i>
    <i className="fa-sharp fa-regular fa-pen-to-square mx-1" onClick={()=>{updateNote(notes)}}></i>
  </div>
</div>
    </div>
  )
}
