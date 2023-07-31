import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    // Retrieve todo items from localStorage on component mount
    const storedTodoList = JSON.parse(localStorage.getItem('todoList'));
    if (storedTodoList) {
      setTodoList(storedTodoList);
    }
  }, []);

  useEffect(() => {
    // Save todo items to localStorage whenever the todoList changes
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAddButton = () => {
    const newTodoItem = {
      title: title,
      description: description,
      completed: false,
    };

    setTodoList([...todoList, newTodoItem]);

    // Clear the input fields after adding a new todo item
    setTitle('');
    setDescription('');
    setIsButtonDisabled(true);
  };

  useEffect(() => {
    // Check if both title and description are not empty
    setIsButtonDisabled(!(title.trim() !== '' && description.trim() !== ''));
  }, [title, description]);

  const handleCheckboxChange = (index) => {
    // Create a copy of the todoList array to avoid directly modifying the state
    const updatedTodoList = [...todoList];
    updatedTodoList[index].completed = !updatedTodoList[index].completed;
    setTodoList(updatedTodoList);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>

      <div className='app-wrapper'>
        <div className='app-input'>
          <div className='app-input-item'>
            <label>Titulo</label>
            <input type="text" placeholder="Qué vas a hacer hoy?" value={title} onChange={handleTitleChange} />
          </div>
          <div className='app-input-item'>
            <label>Descripción</label>
            <input type="text" placeholder="Añade una descripción" value={description} onChange={handleDescriptionChange} />
          </div>
          <div className='app-input-item'>
            <button type="button" className="primaryBtn" onClick={handleAddButton} disabled={isButtonDisabled}>Add</button>
          </div>
        </div>
      </div>

      <div className='todo-list'>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Completado</th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((item, index) => (
              <tr key={index} className={item.completed ? 'completed' : ''}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
