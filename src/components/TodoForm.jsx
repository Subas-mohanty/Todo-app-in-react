import { useState } from "react";
import { useTodo } from "../contexts";

function TodoForm({todos, setTodos, setSearchTerm, searchTerm}) {

  const [todo, setTodo] = useState("");
  const {addTodo} = useTodo();
  const [priority, setPriority] = useState(0);

  // console.log(todo);

  function add(e){
    e.preventDefault();
    if(!todo) return;
    addTodo({todo, completed : false, priority})
    setTodo("") // after adding one todo we are making todo = "", so that next time the if statement doesn't fail
    setPriority(0);
  }

  function hadleDeleteAll(){
    setTodos([])
  }

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={(e)=> setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>

      {todos.length > 0 && (
        <>
          <input
            type="text"
            placeholder="Search for a todo"
            className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 ml-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <button
            type="submit"
            className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
          >
            Add
          </button> */}
          <button 
          type="submit"
          className="rounded-lg ml-2 px-3 py-1 bg-green-600 text-white shrink-0"
          onClick={hadleDeleteAll} >Delete All</button>
        </>
      )}

    </form>
  );
}

export default TodoForm;