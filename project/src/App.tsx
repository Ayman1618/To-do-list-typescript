import React, { useState } from 'react';
import { PlusCircle, Trash2, CheckCircle, Circle } from 'lucide-react';
import { Todo } from './types';
import styles from './App.module.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo: Todo = {
        id: crypto.randomUUID(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          Todo List
        </h1>

        <form onSubmit={handleAddTodo} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className={styles.input}
            />
            <button
              type="submit"
              className={styles.addButton}
            >
              <PlusCircle size={20} />
              Add
            </button>
          </div>
        </form>

        <div className={styles.todoList}>
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={styles.todoItem}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={styles.toggleButton}
              >
                {todo.completed ? (
                  <CheckCircle color="#22c55e" size={24} />
                ) : (
                  <Circle size={24} />
                )}
              </button>
              <span
                className={`${styles.todoText} ${
                  todo.completed ? styles.completed : ''
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className={styles.deleteButton}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          {todos.length === 0 && (
            <div className={styles.emptyState}>
              No todos yet. Add one above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;