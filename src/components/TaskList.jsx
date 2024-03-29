import React from 'react';
import './tasklist.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { lime, cyan } from '@mui/material/colors';
import { deleteTask, setStatus } from '../redux/slice';
import { useDispatch, useSelector } from 'react-redux';

// Create a custom MUI theme
const theme = createTheme({
    palette: {
        primary: lime,
        secondary: cyan
    },
});

export default function TaskList() {
    let dispatch = useDispatch();
    let tasks = useSelector((state) => state.counter.task);

    // Function to handle task deletion
    let handleDelete = (index) => {
        dispatch(deleteTask(String(index)));
    };

    // Function to handle status change (Completed/Pending)
    let handleStatusChange = (e, index) => {
        dispatch(setStatus({ value: e.target.checked, index: index }));
    };

    return (
        <div className='list'>
            <table className='table'>
                {/* Display message if no tasks are available */}
                {tasks.length === 0 && <h1 style={{ textAlign: "center" }}>Please Add Task First</h1>}
                {/* Render table headers if tasks are available */}
                {tasks.length > 0 && 
                <thead className='t-head'>
                    <tr>
                        <td className='column'>Count</td>
                        <td className='column' style={{ width: "5%" }}>Count</td>
                        <td className='column'>Task</td>
                        <td className='column'>Status</td>
                        <td className='column' style={{ width: "20%" }}>Action</td>
                    </tr>
                </thead>}
                <tbody className='body'>
                    {/* Map through tasks and render table rows */}
                    {tasks.map((data, index) => (
                        <tr className={`data`} key={index + "t"} id={data.index}>
                            <td className='td'>{Number(data.index) + 1}</td>
                            {/* Checkbox to toggle task status */}
                            <td className='td'>
                                <input
                                    type='checkbox'
                                    onClick={(e) => handleStatusChange(e, data.index)}
                                    checked={data.status == "Completed"}
                                    style={{ marginRight: "20px", height: "20px", width: "20px" }}
                                />
                            </td>
                            {/* Task description */}
                            <td className='td' style={{ textDecoration: data.status == "Completed" ? "line-through" : "none" }}>{data.ele}</td>
                            {/* Task status */}
                            <td className='td' style={{ color: data.status == "Completed" ? "#8ce78c" : "red" }}>{data.status}</td>
                            {/* Delete button */}
                            <td className='td' onClick={() => handleDelete(data.index)}>
                                {/* Apply custom theme to IconButton */}
                                <ThemeProvider theme={theme}>
                                    <IconButton color="secondary" aria-label="delete" size="large">
                                        <DeleteIcon fontSize="inherit" color="secondary" />
                                    </IconButton>
                                </ThemeProvider>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
