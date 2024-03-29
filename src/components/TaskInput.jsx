import React, { useRef, useState } from 'react'
import './taskinput.css'
import { useDispatch } from 'react-redux'
import { addTask } from '../redux/slice'
export default function TaskInput() {
  // State to toggle showing the input line
  let [showLine, setShowLine] = useState(false);
    
 
  let dispatch = useDispatch();
  let input = useRef();

  // Function to handle adding a task
  function handleAddTask() {
      // Check if input value is empty
      if (input.current.value === "") {
          return;
      }
      // Dispatch action to add task
      dispatch(addTask({ task: input.current.value }));
      // Clear input field
      input.current.value = "";
  }

  return (
    <div className='search'>
       <div style={{display:"flex",flexDirection:"column"}}> <input placeholder='Enter Task To Add' ref={input} className='input' onBlur={()=>setShowLine(false)} onFocus={()=>setShowLine(true)}></input>
        <span className={`${showLine?"input-line":""}`}></span>
        </div><button className='submitbutton' onClick={handleAddTask}>Submit</button>
    </div>
  )
}
