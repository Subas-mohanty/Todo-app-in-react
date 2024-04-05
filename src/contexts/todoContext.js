import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos : [
    {
      id : 0,
      todo : "",
      completed : false,
    }
  ],
  addTodo : ()=>{},
  updateTodo : (id, todo) =>{},
  deleteTodo : (id) =>{},
  toggleCompleted : (id)=>{}
});

export const TodoContextProvider = TodoContext.Provider;

// custom hook which will give us the TodoContext
export function useTodo(){
  return useContext(TodoContext);
}