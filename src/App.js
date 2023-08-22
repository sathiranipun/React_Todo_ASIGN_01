import React from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./Contexts/TodoContext";

function App() {
  return (
    <div align="center">
      <TodoProvider>
        <Header />
        <hr width="80%" />
        <div>
          <TodoForm />
        </div>
        <div>
          <TodoList />
        </div>
      </TodoProvider>
    </div>
  );
}

export default App;
