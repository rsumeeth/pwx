// Board.js
import { useState } from "react";
import StickyNote from "../stickyNote/stickyNote";
import "./Board.css";

// Board.js

const Board = () => {
  const [notes, setNotes] = useState([
    { id: 1, content: "Note 1" },
    { id: 2, content: "Note 2" },
    // ... other initial notes
  ]);

  const addNote = () => {
    const newNote = {
      id: notes.length + 1,
      content: "New Note",
      x: 20,
      y: 30,
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
  };

  return (
    <>
      <div className="board">
        <button onClick={addNote}>Add Note</button>
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            onDelete={() => deleteNote(note.id)}
            onUpdate={(updatedNote) => updateNote(updatedNote)}
          />
        ))}
      </div>
    </>
  );
};

export default Board;
