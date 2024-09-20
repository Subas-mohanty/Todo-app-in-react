import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { TodoContextProvider } from "./contexts";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo)=>{
    setTodos((prev)=>{
      return [{id : Date.now(), ...todo}, ...prev]
    })
  }

  const updateTodo = (id, todo)=>{
    setTodos((prev) => prev.map((currTodo)=> currTodo.id == id ? todo : currTodo));
  }
  const deleteTodo = (id) =>{
    // filter returns a new array where all the todos are present whose id != the given id
    setTodos((prev)=> prev.filter((todo)=> todo.id != id));
  }
  const toggleCompleted = (id)=>{
    setTodos((prev)=> prev.map((todo)=> todo.id == id ? {...todo, completed : !todo.completed}: todo))
  }

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"));
    if(todos && todos.length > 0){
      setTodos(todos);
    }
  }, [])

  // we can do this thing inside the first useEffect as well but when our todos will change it will getItem from the local storage again and again and we don't want that so we are using another useEffect
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])


  return (
    <TodoContextProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleCompleted}}>
      <div className="bg-[rgb(23,40,66)] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo)=>(
              <div key={todo.id} className="w-full">
                <TodoItem todo = {todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );

}

export default App;
