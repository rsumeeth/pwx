import "./StickyNote.css";
import { useState, useRef, useEffect } from "react";

const StickyNote = ({ note, onDelete, onUpdate }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [position, setPosition] = useState({ x: note.x, y: note.y });
  const [content, setContent] = useState(note.content);

  const stickyNoteRef = useRef();

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const dimensions = stickyNoteRef.current.getBoundingClientRect();

    setPosition({ x: e.clientX - dimensions.x, y: e.clientY - dimensions.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging && !isEditing) {
      const newX = e.clientX - position.x;
      const newY = e.clientY - position.y;

      stickyNoteRef.current.style.left = newX + "px";
      stickyNoteRef.current.style.top = newY + "px";
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleDeleteClick = () => {
    onDelete();
  };

  const handlePinClick = () => {
    // Logic to toggle pinned status
  };

  const handleHeaderClick = (e) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  const handleBodyClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleUpdateNote = () => {
    onUpdate({ ...note, content });
    setIsEditing(false);
  };

  return (
    <div
      className="sticky-note"
      ref={stickyNoteRef}
      style={{}}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {isDragging.toString()}
      <button onClick={handleDeleteClick}>Delete</button>
      <button onClick={handlePinClick}>Pin</button>
      <div className="sticky-note-body" onClick={handleBodyClick}>
        {isEditing ? (
          <textarea
            value={content}
            onChange={handleInputChange}
            onBlur={handleUpdateNote}
            autoFocus
          />
        ) : (
          <div onClick={handleEditClick}>{note.content}</div>
        )}
      </div>
    </div>
  );
};

export default StickyNote;
