

import React, { useState } from "react";

const TodoForm = ({ onAddTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTodo = { id: Date.now(), text };
    onAddTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Enter a new to-do item"
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default TodoForm;
