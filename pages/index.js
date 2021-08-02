import 'tailwindcss/tailwind.css'; 
import React from 'react';

export default function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: "Wash dishes", done: false },
    { id: 2, text: "Do laundry", done: false },
    { id: 3, text: "Take shower", done: false }
  ]);

  return (
    <div class="flex items-center justify-center h-auto p-5">
      <div class="container">
      <div class="flex justify-center">
      <div class="bg-white shadow-2xl rounded-lg w-1/2 m-2">
      <h1  class="text-6xl font-normal leading-normal m-2 text-purple-800">
        Todo List</h1>
      <TodoList setTodos={setTodos} todos={todos} />
      <AddTodo setTodos={setTodos} />
    </div>
    </div>
    </div>
    </div>
  );
}

function TodoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? {
            ...t,
            done: !t.done
          }
        : t
    );
    setTodos(updatedTodos);
  }

  if (!todos.length) {
    return <p>No todos left!</p>;
  }

  return (
   
    <ul class="divide-y divide-gray-300 list-disc list-inside ">
      {todos.map((todo) => (
        <li class="p-4 hover:bg-gray-50 cursor-pointer"
          onDoubleClick={() => handleToggleTodo(todo)}
          style={{
            textDecoration: todo.done ? "line-through" : ""
          }}
          key={todo.id}
        >
          {todo.text}
          <DeleteTodo todo={todo} setTodos={setTodos} />
        </li>
      ))}
    </ul>
  );
}

function DeleteTodo({todo, setTodos})
{
  function handleDeleteTodo() {
    const confirmed = window.confirm("Do you want to delete this?");
    if (confirmed) {
      setTodos((prevTodos) => {
      return prevTodos.filter((t) => t.id !== todo.id);})
    }
  }
  return (
    <span
    onClick={handleDeleteTodo} 
    role="button"
    class="text-red-500 font-black pl-5" 
    >X</span>
  )
}

function AddTodo({ setTodos }) {
  const inputRef = React.useRef();

  function handleAddTodo(event) {
    event.preventDefault();
    const text = event.target.elements.addTodo.value;
    const todo = {
      id: Math.random(),
      text,
      done: false
    };
    setTodos((prevTodos) => {
      return prevTodos.concat(todo);
    });
    inputRef.current.value = "";
  }

  return (
    <div class="relative m-2">
    <form onSubmit={handleAddTodo}>
      <input ref={inputRef} name="addTodo" placeholder="Add todo" 
          class="w-full h-10 pl-3 pr-8 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"      
          ></input>
          <button type="submit"
          class="absolute inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-purple-800 rounded-r-lg hover:bg-indigo-500 focus:bg-indigo-700"
          >Submit</button>
    </form>
    </div>
  );
}
