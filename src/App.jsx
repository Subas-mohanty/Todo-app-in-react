import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm.jsx";
import TodoItem from "./components/TodoItem.jsx";
import { TodoContextProvider } from "./contexts";

function App() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredTodos, setFilteredTodos] = useState([]); 
  
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((currTodo) => currTodo.id === id ? todo : currTodo));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = (id) => {
    setTodos((prev) => 
      prev.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    );
  };

  const setTodoPriority = (id, priority) => {
    setTodos((prev) => 
      prev.map((todo) => todo.id === id ? { ...todo, priority} : todo)
    );
  }
  
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos && savedTodos.length > 0) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  useEffect(() => {
    if (searchTerm) {
      setFilteredTodos(
        todos.filter(todo => 
          todo?.todo?.toLowerCase().includes(searchTerm?.toLowerCase())
        ).sort((a, b) => a.priority - b.priority)
      );
    } else {
      setFilteredTodos(todos);
    }

  }, [searchTerm, todos]);

  const sortedTodos = (searchTerm ? filteredTodos : todos).sort((a, b) => a.priority - b.priority);

  return (
    <TodoContextProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleCompleted, setTodoPriority}}>
      <div className="bg-[rgb(23,40,66)] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm todos={todos} setTodos={setTodos} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {sortedTodos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} setTodoPriority={setTodoPriority} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
