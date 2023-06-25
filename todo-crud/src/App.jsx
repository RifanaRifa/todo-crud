import React, { useState } from 'react';
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false, // Add the 'completed' property
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
    setEditingTodo(null);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const editTodo = (todo) => {
    setEditingTodo(todo);
  };

  return (
    <div className="todo-app">
      <h1> Todo List</h1>
      <div className="add-todo">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`${editingTodo && editingTodo.id === todo.id ? 'editing' : ''} ${todo.completed ? 'completed' : ''}`}
          >
            {editingTodo && editingTodo.id === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingTodo.text}
                  onChange={(e) =>
                    setEditingTodo({
                      ...editingTodo,
                      text: e.target.value,
                    })
                  }
                  className="edit-input"
                />
                <button onClick={() => updateTodo(editingTodo.id, editingTodo.text)}>Update</button>
                <button onClick={() => setEditingTodo(null)}>Cancel</button>
              </>
            ) : (
              <>
                <div className="todo-text" style={todo.completed ? { textDecoration: 'line-through' } : {}}>
                  {todo.text}
                </div>
                <div className="todo-actions">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                  />
                  <button onClick={() => editTodo(todo)} className="edit-button">Edit</button>
                  <button onClick={() => deleteTodo(todo.id)} className="delete-button">Delete</button>

                </div>
              </>
            )}

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;