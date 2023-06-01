import React, { useState, useRef, useEffect } from "react";
import "./Todo.css";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { IoMdDoneAll } from "react-icons/io";

function Todo() {
  const [todo, setTodo] = useState(""); //catching typing input
  const [todos, setTodos] = useState([]); //for storing todo
  const[editId,setEditId]=useState(0)

  const addTodo = () => {
    if(todo !==''){
        //setTodos([...todos, todo]); 
        setTodos([...todos, {list:todo, id:Date.now()}]); //here creating object in array and we passing the objects
        setTodo("");
    }
    //setTodos([...todos, todo]);
    // console.log(todos);
    //setTodo("");

    if(editId){
      const editTodo = todos.find((todo)=>todo.id===editId)
      const updateTodo= todos.map((to)=>to.id===editTodo.id
      ? (to= {id:to.id, list:todo})
      : (to= {id:to.id , list:to.list}))
      setTodos(updateTodo)
      setEditId(0)
      setTodo('')
      
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const deletTodo =(id)=>{
    // todos.filter((to)=> to.id !==id)
    setTodos(todos.filter((to)=> to.id !==id))

  }

  const onEdit = (id)=>{
    //todos.find((to)=>to.id === id)
    const editTodo = todos.find((to)=>to.id === id)  //this is consider as an object
    // console.log('edit id',editTodo.list);
    setTodo(editTodo.list)
    setEditId(editTodo.id)
  }

  return (
    <div className="container">
      <h1>Todo App</h1>

        <form action="" className="form-group" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your todo"
            className="form-control"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            ref={inputRef}
          />
          <button onClick={addTodo}>{editId ? 'Edit' :'Add'}</button>
        </form>

        <div className="list">
          <ul>
            {todos.map((data) => (
              <li className="form-control list-items">
                {/* {data} */}
                {data.list}
                <span>
                  {/* <IoMdDoneAll className="icons" id="complete" title="complete" /> */}
                  <AiFillEdit onClick={()=>onEdit(data.id)} className="icons" id="edit" title="Edit" />
                  <MdDelete onClick={()=>deletTodo(data.id)} className="icons" id="delete" title="Delete" />
                </span>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}

export default Todo;
