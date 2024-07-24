import './note.css';

// eslint-disable-next-line react/prop-types
function Note({ data }) {
  // eslint-disable-next-line react/prop-types
  const notes = data?.notes; // Use optional chaining

  return (
    <ul>
      {notes?.length > 0 ? ( // Check if notes exist and have elements
        notes.map((note) => (
          <li key={note._id} className="note-container">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
          </li>
        ))
      ) : (
        <div>No notes found.</div> // Or a loading indicator
      )}
    </ul>
  );
}

export default Note;
