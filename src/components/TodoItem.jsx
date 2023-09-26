/* eslint-disable react/prop-types */

import { useState } from "react";

const spliceArray = (arr, currentIndex, item) => {
  const filteredArray = [...arr].filter(
    (childItem) => childItem.id !== item.id
  );

  filteredArray.splice(currentIndex, 0, item);
  return filteredArray;
};

export const TodoItem = ({
  item,
  onSetTodos,
  showMoveUp,
  showmMoveDown,
  currentIndex,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [todoItemEdit, setTodoItemEdit] = useState(item.text);
  return (
    <li key={item.id}>
      {editMode ? (
        <>
          <input
            value={todoItemEdit}
            onChange={(event) => setTodoItemEdit(event.target.value)}
            placeholder={`Update todo: ${item.text}`}
          />
          <button
            style={{ marginRight: ".5rem" }}
            type="button"
            onClick={() => {
              if (!todoItemEdit || todoItemEdit?.length === 0) {
                alert("Please enter something");
                return;
              }

              onSetTodos((prev) => {
                return [...prev].map((childItem) => {
                  if (childItem.id === item.id) {
                    return {
                      ...childItem,
                      text: todoItemEdit,
                    };
                  }

                  return childItem;
                });
              });
              setEditMode(false);
            }}
          >
            Update
          </button>
          <button
            type="button"
            style={{ marginRight: ".5rem" }}
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span style={{ marginRight: ".5rem" }}>{item?.text}</span>
          <button
            type="button"
            style={{ marginRight: ".5rem" }}
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
          <button
            style={{ marginRight: ".5rem" }}
            type="button"
            onClick={() =>
              onSetTodos((prev) => [
                ...prev.filter((childItem) => item.id !== childItem?.id),
              ])
            }
          >
            Delete
          </button>

          {showMoveUp && (
            <button
              style={{ marginRight: ".5rem" }}
              type="button"
              onClick={() =>
                onSetTodos((prev) => spliceArray(prev, currentIndex - 1, item))
              }
            >
              Move up
            </button>
          )}
          {showmMoveDown && (
            <button
              type="button"
              onClick={() =>
                onSetTodos((prev) => spliceArray(prev, currentIndex + 1, item))
              }
            >
              Move down
            </button>
          )}
        </>
      )}
    </li>
  );
};
