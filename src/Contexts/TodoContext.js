import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddTodo = async () => {
    if (input.trim() !== "") {
      try {
        const response = await axios.post(
          "api/v1/task",
          [{ title: input, completed: false }],
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer jkGLoBbld4Xzvzm6JBzlgwoVrUEj-OiPrHl4kqCpU-Rw8XvzZw",
            },
          }
        );

        setTodos([...todos, response.data.items[0]]);
        console.log("New Task Added:", response.data.items[0].title);
        setInput("");
      } catch (error) {
        console.error("Error Adding Task:", error);
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("api/v1/task", {
        headers: {
          Authorization:
            "Bearer jkGLoBbld4Xzvzm6JBzlgwoVrUEj-OiPrHl4kqCpU-Rw8XvzZw",
        },
      });
      setTodos(response.data.items);
      console.log("Fetched Tasks:", response.data.items);
    } catch (error) {
      console.error("Error Fetching Tasks:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setTodos]);

  const handleComplete = async (todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      
      const response = await axios.put(
        `api/v1/task/${todo._uuid}`,
        { ...updatedTodo },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer jkGLoBbld4Xzvzm6JBzlgwoVrUEj-OiPrHl4kqCpU-Rw8XvzZw'
          }
        }
      );
  
      const updatedTask = response.data;
      console.log('Updated Task:', response.data);
      setTodos(todos.map(item => (item._uuid === updatedTask._uuid ? updatedTask : item)));
    } catch (error) {
        console.error('Error updating task:', error.message);
    }
  };
  

  const handleDelete = async (todo) => {
    try {
      await axios.delete(`api/v1/task/${todo._uuid}`, {
        headers: {
          Authorization:
            "Bearer jkGLoBbld4Xzvzm6JBzlgwoVrUEj-OiPrHl4kqCpU-Rw8XvzZw",
        },
      });

      setTodos(todos.filter((item) => item._uuid !== todo._uuid));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        input,
        setInput,
        todos,
        handleAddTodo,
        handleComplete,
        handleDelete,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
