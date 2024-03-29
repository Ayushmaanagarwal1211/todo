import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
function App() {
  
  return (
    <>
    <div className='main'>
      {/* contains the center content */}
        <div className='container'>
        <img style={{margin:"auto" , marginTop:"10px",marginBottom:"10px"}}
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                    alt="Check"
                    width="60"
                  />
          <h1 className='text'>TODO LIST</h1>
          {/* Component for Taking input */}
          <TaskInput/>
          {/* Component for Showing Tasks */}
          <TaskList/>
        </div>
    </div>
                     
    </>
  );
}

export default App;
