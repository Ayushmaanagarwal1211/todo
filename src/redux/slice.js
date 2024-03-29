import { createSlice } from "@reduxjs/toolkit";

// Asynchronous function to get tasks from local storage
async function getTasksFromLocalStorage() {
    // Retrieve data from local storage
    const storedData = localStorage.getItem('tasks');
    let data;
    // If data exists in local storage, parse it
    if (storedData) {
        data = await JSON.parse(storedData);
    }
    // Log retrieved data
    console.log("Data from Local Storage:", data);
    // Return parsed data if available, otherwise an empty array
    return storedData ? data : [];
}

// Create counter slice
export const counterSlice = createSlice({
    name: "Task",
    initialState: {
        // Set initial state with tasks obtained from local storage
        task: await getTasksFromLocalStorage()
    },
    reducers: {
        // Reducer for adding tasks
        addTask: (state, action) => {
            // Add new task to the task array
            state.task.push({ index: String(state.task.length), ele: action.payload.task, status: "pending" });
            // Store updated array to local storage
            localStorage.setItem('tasks', JSON.stringify(state.task));
        },
        // Reducer for deleting tasks
        deleteTask: (state, action) => {
            let index = 0;
            // Filter out task with specified index
            state.task = state.task.filter((data) => {
                if (data.index !== action.payload) {
                    data.index = String(index++);
                    return data;
                }
            });
            // Store updated array to local storage
            localStorage.setItem('tasks', JSON.stringify(state.task));
        },
        // Reducer for setting task status
        setStatus: (state, action) => {
            // Map through tasks and update status of task with specified index
            state.task = state.task.map((data) => {
                if (action.payload.index == data.index) {
                    if (action.payload.value) {
                        data.status = "Completed";
                    } else {
                        data.status = "Pending";
                    }
                }
                return data;
            });
            // Store updated array to local storage
            localStorage.setItem('tasks', JSON.stringify(state.task));
        }
    }
});

// Export action creators
export const { addTask, deleteTask, setStatus } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
