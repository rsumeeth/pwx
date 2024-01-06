import { useState, useRef } from "react";
import StickyNote from "../stickyNote/stickyNote";
import "./Board.css";

const Board = () => {
  const zIndexHighest = useRef(2);

  const [notes, setNotes] = useState([
    { id: 1, content: "To-do", zIndex: 1 },
    { id: 2, content: "Type your text here!", zIndex: 1 },
    // ... other initial notes
  ]);

  const addNote = () => {
    const newNote = {
      id: notes.length + 1,

      content: "Type your text here!",
      x: 20,
      y: 30,
      zIndex: 1,
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

  const onZIndexUpdate = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
  };

  const onZMouseUp = (updatedNote) => {
    zIndexHighest.current = zIndexHighest.current + 1;
    onZIndexUpdate({ ...updatedNote, zIndex: zIndexHighest.current + 1 });
  };

  return (
    <>
      <div className="board">
        <button onClick={addNote} className="addNote">
          Add Note
        </button>
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            onDelete={() => deleteNote(note.id)}
            onUpdate={(updatedNote) => updateNote(updatedNote)}
            onZUpdate={(updatedNote) => onZIndexUpdate(updatedNote)}
            onZUpdateMouseUp={(updatedNote) => onZMouseUp(updatedNote)}
          />
        ))}
      </div>
    </>
  );
};

export default Board;
