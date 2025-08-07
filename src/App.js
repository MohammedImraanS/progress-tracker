import React, { useState, useEffect} from 'react';
import "./App.css";

function ProgressTracker(){
  const[tasks, setTasks] = useState([]);
  const[input, setInput] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks));
  }, [tasks]);

  const addTask = ()=> {
    if(input.trim()) {
      const newTask = {id:Date.now(),name: input, completed: false};
      setTasks([...tasks, newTask]);
      setInput("");
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? {...task, completed: !task.completed} :task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const progress = tasks.length ? Math.round((completedCount / tasks.length)*100) : 0;

  return(
    <div className='container'>
      <h1>📈 Progress Forge 🎯</h1>
      <p className='subtitle'>Set your goals.Finish them strong.Track your wins - Imraan</p>
      <div className='input-section'>
        <input type='text' value={input} placeholder='Enter your task'
        onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTask()} />
        <button onClick={addTask}>Add</button>
      </div>

      <u1>
        {tasks.map((task) => (
          <li key={task.id}
          className={task.completed ? 'done' :""}>
             <input type='checkbox' checked={task.completed} onChange={() => toggleTask(task.id)}/>
             {task.name}
             <button className='delete' onClick={() => deleteTask(task.id)}>🚮 delete</button>
          </li>
        ))}
      </u1>

      <div className='progress-bar'>
        <div className='fill' style={{ width: `${progress}%`}}></div>
      </div>
      <p>Progress: {progress}%</p>

      {progress === 0 && <h2>Let's get started.</h2>}
      {progress >0 && progress <50 && <h2>Keep it up! You're making progress.</h2>}
      {progress >=50 && progress <75 && <h2>You're halfway through!💪</h2>}
      {progress >=75 && progress <100 && <h2>Keep going-almost there!🚀</h2>}
      {progress === 100 && <h2>🎉 Congratulations! All Tasks Completed.</h2>}
    </div>
  );
}

export default ProgressTracker;