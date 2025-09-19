import React, { useState } from 'react';
import './AccessibleTaskList.css';

export default function AccessibleTaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Write documentation', completed: false },
    { id: 2, text: 'Fix bugs', completed: true },
  ]);
  const [input, setInput] = useState('');

  function toggleComplete(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  function addTask() {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input.trim(), completed: false }]);
      setInput('');
    }
  }

  return (
    <main className="tasklist-container">
      <h1>Accessible Task List</h1>
      <section aria-label="Task list" role="list" className="tasklist">
        {tasks.map(task => (
          <div key={task.id} role="listitem" className="task-item">
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                aria-checked={task.completed}
              />
              <span className={task.completed ? 'completed' : ''}>
                {task.text}
              </span>
            </label>
          </div>
        ))}
      </section>
      <div className="task-input">
        <input
          type="text"
          aria-label="New task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
    </main>
  );
}
