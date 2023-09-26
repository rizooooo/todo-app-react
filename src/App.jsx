import { useEffect, useState } from "react";
import { TodoItem } from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);
  const [currentInput, setCurrentInput] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://dummyjson.com/posts?limit=3`);

      const results = await response?.json();

      setTodos(
        results?.posts?.map((item) => ({
          id: item.id,
          text: item.title,
        }))
      );
      // console.log(results, "@results");
    }
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1>Todo App</h1>
        <input
          type="text"
          onChange={(event) => setCurrentInput(event?.target?.value)}
          placeholder="add todo"
          value={currentInput}
        />
        <button
          type="button"
          onClick={() => {
            if (currentInput?.length > 0) {
              setTodos((prev) => [
                {
                  id: `${new Date().getMilliseconds()}${new Date().getSeconds()}`,
                  text: currentInput,
                },
                ...prev,
              ]);

              setCurrentInput("");
            } else {
              alert("Enter item");
            }
          }}
        >
          Add todo
        </button>
        <ul>
          {todos?.map((item, currentIndex) => (
            <TodoItem
              onSetTodos={setTodos}
              item={item}
              key={item.id}
              showMoveUp={currentIndex !== 0}
              showmMoveDown={currentIndex < todos?.length - 1}
              currentIndex={currentIndex}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
