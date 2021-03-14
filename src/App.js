import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
      {
          id: 1,
          text: 'Revise FM',
          day: 'Mar 14th',
          reminder: true
      },
      {
          id: 2,
          text: 'Revise React',
          day: 'Mar 14th',
          reminder: true
      },
      {
          id: 3,
          text: 'CP Meeting',
          day: 'Mar 15th',
          reminder: false
      },
  ]);

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = {id, ...task };
    setTasks([...tasks, newTask]);
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ?
    { ...task, reminder: !task.reminder} : task))
  }

  return (
    <Router>
    <div className='container'>
      <Header onAdd={() => setShowAddTask(!showAddTask)} title='Task Tracker' showAdd={showAddTask}/>
      <Route path='/' exact render={(props) => (
        <>
        {showAddTask && <AddTask onAdd={addTask}/>}
        {tasks.length > 0 ? <Tasks tasks={tasks} onToggle={toggleReminder} onDelete={deleteTask}/> : 'No Tasks'}
        </>
      )}/>
      <Route path='/about' component={About} />
      <Footer />
    </div> 
    </Router>
  );
}

export default App;