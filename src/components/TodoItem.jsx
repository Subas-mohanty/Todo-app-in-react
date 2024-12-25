import { useState } from "react";
import { useTodo } from "../contexts";
import DateFormat from "./DateFormat";

function TodoItem({ todo, setTodoPriority }) {

  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  let showDate = "hidden md:block";

  const {updateTodo, deleteTodo, toggleCompleted} = useTodo();

  function editTodo(){
    updateTodo(todo.id, {...todo, todo : todoMsg})
    setIsTodoEditable(false);
  }
  function toggle(){
    toggleCompleted(todo.id);
  }
  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggle}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />

      {/* Creation Date */}
      <div className={`px-1 mr-2 h-full items-center ${showDate}`}><DateFormat todo={todo}/></div>

      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>

        {/* Set Priority Button */}
        <select 
          className=" px-2 inline-flex w-20 rounded-lg text-sm border border-gray-300 justify-center items-center bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          name="priority"
          value={todo.priority}
          onChange={(e) => setTodoPriority(todo.id, parseInt(e.target.value, 10))}
        >
          <option className="p-2 px-1 text-sm text-gray-800 bg-gray-50 hover:bg-gray-200 rounded-lg" value="1">Urgent</option>
          <option className="p-2 px-1 text-sm text-gray-800 bg-gray-50 hover:bg-gray-200 rounded-lg" value="2">Important</option>
          <option className="p-2 px-1 text-sm text-gray-800 bg-gray-50 hover:bg-gray-200 rounded-lg" value="3">Not important</option>
        </select>


      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;