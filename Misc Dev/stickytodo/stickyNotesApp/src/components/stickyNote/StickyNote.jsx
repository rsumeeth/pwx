import "./StickyNote.css";
import { useState, useRef, useEffect } from "react";

const StickyNote = ({
  note,
  onDelete,
  onUpdate,
  onZUpdate,
  onZUpdateMouseUp,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [position, setPosition] = useState({ x: note.x, y: note.y });
  const [content, setContent] = useState(note.content);
  const [isPinned, setIsPinned] = useState(false);
  const [isRotated, setIsRotated] = useState(false); // New state for rotation status

  const stickyNoteRef = useRef();

  const handleMouseDown = (e) => {
    if (!isPinned) {
      // Check if the note is not pinned before allowing dragging
      setIsDragging(true);
      const dimensions = stickyNoteRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - dimensions.x, y: e.clientY - dimensions.y });
    }
  };

  useEffect(() => {
    if (isDragging) {
      onZUpdate({ ...note, zIndex: 1000 });
    }
  }, [isDragging]);

  const handleMouseUp = () => {
    setIsDragging(false);
    onZUpdateMouseUp(note);
  };

  const handleMouseMove = (e) => {
    if (isDragging && !isPinned) {
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
    setIsPinned(!isPinned);
    setIsRotated(!isPinned);
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
      style={{ zIndex: note.zIndex }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="mini-header">
        <div>Sticky Note</div>

        <div>
          <button
            onClick={handlePinClick}
            className={`pin ${isRotated ? "rotate-90" : ""}`}
          >
            📌
          </button>

          <button onClick={{}} className="pin">
            ✏️
          </button>
          <button onClick={handleDeleteClick} className="close">
            ❌
          </button>
        </div>
      </div>
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
