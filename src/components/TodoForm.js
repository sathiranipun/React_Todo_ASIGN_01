import React, { useContext, useState } from "react";
import { TodoContext } from "../Contexts/TodoContext";

const TodoForm = () => {
  const { input, setInput, handleAddTodo } = useContext(TodoContext);
  const [ addingTodo, setAddingTodo] = useState(false);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onTodoSubmit = async (event) => {
    event.preventDefault();
    if (input.trim() !== "") {
      setAddingTodo(true);
      await handleAddTodo();
      setAddingTodo(false);
      setInput("");
    } else {
      alert("Entered value is empty!!!");
    }
  };

  return (
    <form onSubmit={onTodoSubmit} className="text-center">
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add New Task
      </button>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="col-auto">
                <input
                  type="text"
                  value={input}
                  className="form-control"
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                {addingTodo ? (
                  <div class="spinner-border text-light" role="status"></div>
                ) : (
                  "Add Task"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TodoForm;
