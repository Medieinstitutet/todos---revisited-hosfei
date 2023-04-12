import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { TODO_LIST_ABI, TODO_LIST_ADRESS } from "./../config";
import TodoForm from "./todoform";


function TodoList({todoListContract ,account}) {
  
  const [todos, setTodos] = useState([]);



  useEffect(() => {
    
    getTodos();
  }, [todoListContract]);

  async function addTodo(todo) {
    
    if (todoListContract) {
        
      await todoListContract.methods.createTodo(todo).send({ from : account});
      
      getTodos();
    }
  }
  async function getTodos(){
    
    let todoArray = []
        if (todoListContract) {
            let count = await todoListContract.methods.todoCount().call()
            for (let i = 1; i <= count; i++) {
                let todo = await todoListContract.methods.todos(i).call()
                if (todo["id"] > 0) {
                    todoArray.push(todo)
                }
            }
        }
        setTodos([...todoArray])
        
  }


  async function removeTodo(id) {

    await todoListContract.methods.removeTodo(id).send({ from : account});
    getTodos();
  } 
  return (
  <div>
    
    <TodoForm onAddTodo = {addTodo}></TodoForm>
    <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
     </div>);
  
}

export default TodoList;
