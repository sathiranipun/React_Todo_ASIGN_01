import React, { useContext, useState } from "react";
import { TodoContext } from "../Contexts/TodoContext";
import './TodoList.css'

const TodoList = () => {
  const { todos, handleComplete, handleDelete } = useContext(TodoContext);
  const [deletingTodo, setDeletingTodo] = useState(null);

  const handleDeleteWithLoading = async (todo) => {
    setDeletingTodo(todo._uuid);
    await handleDelete(todo);
    setDeletingTodo(null);
  };

  return (
    <div className="mt-2">
      {todos.map((todo) => (
        <div className="input-group mb-2 w-75" key={todo.id}>
          <div className="input-group-text ">
            <input
              type="checkbox"
              className={`form-check-input mt-0 p-2 me-3 ${
                todo.completed ? "complete" : "incomplete"
              }`}
              onChange={() => handleComplete(todo)}
              checked={todo.completed}
            />
            <input
              type="text"
              className={`form-control ${
                todo.completed ? "complete" : "incomplete"
              }`}
              value={todo.title}
              disabled
            />
          </div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDeleteWithLoading(todo)}
          >
            {deletingTodo === todo._uuid ? (
              <div class="spinner-border" role="status">
              </div>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
