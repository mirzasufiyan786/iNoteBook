import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes)

     // ------------------------------
    // get note
const getNotes = async ()=>{
    // note API todo
    const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method: "GET", 
       
        headers: {
          "Content-Type": "application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmE4ZTNkOWZhYWZjNThjMGJhYzdkNSIsImlhdCI6MTcxODI3MTcxOH0.UXvTX46hk1aAqEYb62VGLFeU_-M2VE79h4TSED4-XoM"
        },
        
      });
    
 const json = await response.json()
 console.log (json)
 setNotes(json)
}

    // ------------------------------
    // Add note
const addNote = async (title,description,tag)=>{
    // note API todo
    const response = await fetch(`${host}/api/notes/addnote`,{
        method: "POST", 
       
        headers: {
          "Content-Type": "application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmE4ZTNkOWZhYWZjNThjMGJhYzdkNSIsImlhdCI6MTcxODI3MTcxOH0.UXvTX46hk1aAqEYb62VGLFeU_-M2VE79h4TSED4-XoM"
        },
        body: JSON.stringify({title,description,tag}), 
      });

      const note = await response.json()
      setNotes(notes.concat(note))
}
    // ------------------------------
    // delete note
    const deleteNote = async (id)=>{
    // CALL API
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", 
       
        headers: {
          "Content-Type": "application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmE4ZTNkOWZhYWZjNThjMGJhYzdkNSIsImlhdCI6MTcxODI3MTcxOH0.UXvTX46hk1aAqEYb62VGLFeU_-M2VE79h4TSED4-XoM"
        }
      });
      const json =  response.json(); 
      setNotes(json)


  const newNotes = notes.filter((note)=>{return note._id!==id})  
  setNotes(newNotes)
}
    // ------------------------------
    // Edit a note
    const editNote = async (id, title, description,tag)=>{

    // call API
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", 
       
        headers: {
          "Content-Type": "application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmE4ZTNkOWZhYWZjNThjMGJhYzdkNSIsImlhdCI6MTcxODI3MTcxOH0.UXvTX46hk1aAqEYb62VGLFeU_-M2VE79h4TSED4-XoM"
        },
        body: JSON.stringify({title,description,tag}), 
      });
      const json =  response.json(); 
       console.log(json)
    const newNotes= JSON.parse(JSON.stringify(notes))
    // logic to edit on clinet
    for (let index = 0; index <newNotes.length; index++) {
        const element =newNotes[index];
        if(element._id===id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
        break;
        }
    }
    setNotes(newNotes)
    }
    return (
        <NoteContext.Provider value={{ notes, addNote,deleteNote,editNote,getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;

