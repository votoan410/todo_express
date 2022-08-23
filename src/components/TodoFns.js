import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:4000";
const PATH = "todos";

export default function TodosFn() {
  const [todoList, setTotoList] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [editble, setEditble] = React.useState(false);
  const textInput = React.useRef(null);
  const [id, setId] = React.useState();

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await fetch([API_URL, PATH].join("/"))
      .then((res) => {
        return res.json();
      })
      // .then((data) => console.log(data));
      .then((data) => {
        renderTodos(data);
        // console.log(data);
      });
    // setInput(() => "");
  };

  // DOM structure selector
  const DomSelectors = {
    root: "task__list",
    taskSection: {
      taskContainer: "task__container",
      taskEntry: "task__entry",
      markedTaskEntry: "task__entry-marked",
      title: "task__title",
      edit: "task__edit",
      deleteTask: "task__delete",
    },
  };

  const [value, setValue] = useState("");

  const submit = () => {
    console.log("value inputted: ", value);
  };

  function renderTodos(data) {
    let completedTodos = data?.filter((element) => element.completed === true);
    let newList = data?.filter((element) => !completedTodos.includes(element));
    newList = newList.concat(completedTodos);
    setTotoList(newList);
  }

  function handleChange(event) {
    setInput(event.target.value);
  }

  function deleteTodo(id) {
    fetch([API_URL, PATH, id].join("/"), { method: "DELETE" }).then(() =>
      loadData()
    );
  }

  function addTodo(e) {
    e.preventDefault();
    fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: input,
      }),
    }).then(() => loadData());
  }

  function completedTodo(id, complete) {
    fetch([API_URL, PATH, id].join("/"), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !complete,
      }),
    }).then(() => loadData());
  }

  function editTodo(id) {
    if (textInput.current.tagName.toLowerCase() === "p") {
      setId(() => id);
      setEditble(() => true);
    } else {
      setEditble(() => false);
      fetch([API_URL, PATH, id].join("/"), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: input,
        }),
      }).then(() => loadData());
    }
  }

  return (
    <>
      <header className="header">
        <input
          type="text"
          id="input__box"
          name="create-task"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button
          value="submit"
          id="input__submit"
          name="create-task"
          onClick={submit}
        >
          Submit{" "}
        </button>
      </header>

      <div className="task__list">
        {todoList.map((task) => {
          return (
            <>
              <section
                className={DomSelectors.taskSection.taskEntry}
                //   style={task.completed ? "text-decoration: line-through;" : null}
              >
                <div
                  className={DomSelectors.taskSection.title}
                  id={`div-${task.id}`}
                >
                  <h3
                    id={`title-click-${task.id}`}
                    // style="cursor:grab"
                  >
                    {task.content}
                  </h3>
                </div>
                <div
                  className={DomSelectors.taskSection.edit}
                  // style={task.completed ? "display: none" : null}
                >
                  <svg
                    id={`btn-edit-${task.id}`}
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="EditIcon"
                    aria-label="fontSize small"
                  >
                    <path
                      id={`btn-edit-${task.id}`}
                      fill="#ffffff"
                      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959
                        0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                    ></path>
                  </svg>
                </div>
                <div
                  className={DomSelectors.taskSection.deleteTask}
                  id={`btn-delete-${task.id}`}
                >
                  <svg
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="DeleteIcon"
                    aria-label="fontSize small"
                  >
                    <path
                      id={`btn-delete-${task.id}`}
                      fill="#ffffff"
                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                    ></path>
                  </svg>
                </div>
              </section>
            </>
          );
        })}
      </div>
    </>
  );
}
