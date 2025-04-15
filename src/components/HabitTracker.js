import React, { useState, useEffect, useRef } from 'react';
import './style.css';

function HabitTracker() {
  // State for all dashboard data
  const [habits, setHabits] = useState([
    { id: '1', name: 'Waking up at 6am', days: [true, true, true, true, true, true, false] },
    { id: '2', name: 'Hydrating Myself', days: [true, true, true, true, true, true, true] },
    { id: '3', name: '1hr Reading', days: [true, true, true, true, true, true, true] },
    { id: '4', name: 'Done my workout', days: [true, true, true, true, true, true, false] },
    { id: '5', name: 'Meditated', days: [true, true, true, true, true, true, true] },
  ]);

  const [notes, setNotes] = useState([
    { id: '1', text: 'Call the dentist on Monday to reschedule appointment' },
    { id: '2', text: 'Buy groceries for weekend dinner party' },
    { id: '3', text: 'Submit quarterly tax documents by Friday' },
    { id: '4', text: 'Reserve tickets for concert next month' },
    { id: '5', text: 'Schedule car maintenance before road trip' },
    { id: '6', text: 'Follow up on email' },
  ]);

  const [priorities, setPriorities] = useState([
    { id: '1', text: 'Complete the Upcoming Assignments', completed: true },
    { id: '2', text: 'Plan my meals for the week', completed: false },
    { id: '3', text: 'Rearrange my reading room', completed: false },
    { id: '4', text: 'Study for CAT-2', completed: false },
    { id: '5', text: 'Fix the ceiling fan', completed: false },
  ]);

  const [tasks, setTasks] = useState([
    { 
      id: '1', 
      name: 'Repair my ceiling', 
      status: 'not-started', 
      category: 'personal', 
      dueDate: '2025-04-01', 
      completed: false 
    },
    { 
      id: '2', 
      name: "Fix my phone's screen", 
      status: 'in-progress', 
      category: 'personal', 
      dueDate: '2025-03-24', 
      completed: false 
    },
    { 
      id: '3', 
      name: 'Buy fruits for the week', 
      status: 'done', 
      category: 'health-wellness', 
      dueDate: '2025-03-26', 
      completed: true 
    },
    { 
      id: '4', 
      name: 'Report my presentation', 
      status: 'in-progress', 
      category: 'work-school', 
      dueDate: '2025-03-26', 
      completed: false 
    },
    { 
      id: '5', 
      name: 'Buy new skincare products', 
      status: 'done', 
      category: 'personal', 
      dueDate: '2025-03-22', 
      completed: true 
    },
    { 
      id: '6', 
      name: 'Clean the room', 
      status: 'not-started', 
      category: 'personal', 
      dueDate: '2025-03-18', 
      completed: false 
    },
  ]);

  const [progressData, setProgressData] = useState({
    day: 75,
    week: 83,
    month: 91,
    quarter: 77,
    year: 65,
    life: 5
  });

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTaskForm, setNewTaskForm] = useState({
    name: '',
    status: 'not-started',
    category: 'personal',
    dueDate: new Date().toISOString().split('T')[0]
  });
  
  const [newHabit, setNewHabit] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newPriority, setNewPriority] = useState('');
  const [time, setTime] = useState(new Date());
  
  const hourHandRef = useRef(null);
  const minuteHandRef = useRef(null);
  const secondHandRef = useRef(null);

  // Load data from localStorage when component mounts
  useEffect(() => {
    const storedHabits = localStorage.getItem('habits');
    const storedNotes = localStorage.getItem('notes');
    const storedPriorities = localStorage.getItem('priorities');
    const storedTasks = localStorage.getItem('tasks');
    const storedProgressData = localStorage.getItem('progressData');
    
    if (storedHabits) setHabits(JSON.parse(storedHabits));
    if (storedNotes) setNotes(JSON.parse(storedNotes));
    if (storedPriorities) setPriorities(JSON.parse(storedPriorities));
    if (storedTasks) setTasks(JSON.parse(storedTasks));
    if (storedProgressData) setProgressData(JSON.parse(storedProgressData));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('priorities', JSON.stringify(priorities));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('progressData', JSON.stringify(progressData));
  }, [habits, notes, priorities, tasks, progressData]);

  // Update clock every second
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(clockInterval);
  }, []);

  // Update clock hands
  useEffect(() => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    
    const secondAngle = seconds * 6; // 360 degrees / 60 seconds = 6 degrees per second
    const minuteAngle = minutes * 6 + seconds * 0.1; // 360 degrees / 60 minutes = 6 degrees per minute + slight movement from seconds
    const hourAngle = (hours % 12) * 30 + minutes * 0.5; // 360 degrees / 12 hours = 30 degrees per hour + slight movement from minutes
    
    if (secondHandRef.current) {
      secondHandRef.current.style.transform = `rotate(${secondAngle}deg)`;
    }
    if (minuteHandRef.current) {
      minuteHandRef.current.style.transform = `rotate(${minuteAngle}deg)`;
    }
    if (hourHandRef.current) {
      hourHandRef.current.style.transform = `rotate(${hourAngle}deg)`;
    }
  }, [time]);

  // Calculate progress based on habits completed
  const calculateProgress = () => {
    if (habits.length === 0) return;

    const totalDays = habits.length * 7;
    const completedDays = habits.reduce((total, habit) => {
      return total + habit.days.filter(Boolean).length;
    }, 0);
    
    const dayPercentage = Math.round((completedDays / totalDays) * 100);
    progressData.day=dayPercentage;
    setProgressData(prev => ({
      ...prev,
      day: dayPercentage
    }))
  };

  // Habit functions
  const addHabit = () => {
    if (newHabit.trim() === '') return;
    
    const newHabitItem = {
      id: Date.now().toString(),
      name: newHabit,
      days: Array(7).fill(false),
    };
    
    setHabits(prev => [...prev, newHabitItem]);
    setNewHabit('');
  };

  const toggleHabitDay = (habitId, dayIndex) => {
    setHabits(prev => 
      prev.map(habit => {
        if (habit.id === habitId) {
          const newDays = [...habit.days];
          newDays[dayIndex] = !newDays[dayIndex];
          return { ...habit, days: newDays };
        }
        return habit;
      })
    );
    
    // Update progress after changing habit status
    setTimeout(calculateProgress, 0);
  };

  // Note functions
  const addNote = () => {
    if (newNote.trim() === '') return;
    
    const newNoteItem = {
      id: Date.now().toString(),
      text: newNote,
    };
    
    setNotes(prev => [...prev, newNoteItem]);
    setNewNote('');
  };

  const deleteNote = (noteId) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  // Priority functions
  const addPriority = () => {
    if (newPriority.trim() === '') return;
    
    const newPriorityItem = {
      id: Date.now().toString(),
      text: newPriority,
      completed: false,
    };
    
    setPriorities(prev => [...prev, newPriorityItem]);
    setNewPriority('');
  };

  const togglePriority = (priorityId) => {
    setPriorities(prev => 
      prev.map(priority => {
        if (priority.id === priorityId) {
          return { ...priority, completed: !priority.completed };
        }
        return priority;
      })
    );
  };

  const deletePriority = (priorityId) => {
    setPriorities(prev => prev.filter(priority => priority.id !== priorityId));
  };

  // Task functions
  const addTask = () => {
    if (newTaskForm.name.trim() === '') return;
    
    const newTaskItem = {
      id: Date.now().toString(),
      name: newTaskForm.name,
      status: newTaskForm.status,
      category: newTaskForm.category,
      dueDate: newTaskForm.dueDate,
      completed: newTaskForm.status === 'done',
    };
    
    setTasks(prev => [...prev, newTaskItem]);
    
    // Reset form
    setNewTaskForm({
      name: '',
      status: 'not-started',
      category: 'personal',
      dueDate: new Date().toISOString().split('T')[0]
    });
    
    // Close modal
    setShowTaskModal(false);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(prev => 
      prev.map(task => {
        if (task.id === taskId) {
          const completed = !task.completed;
          const status = completed ? 'done' : 'not-started';
          return { ...task, completed, status };
        }
        return task;
      })
    );
  };

  // Utility functions
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysLeft = (dueDateString) => {
    const dueDate = new Date(dueDateString);
    const today = new Date();
    
    // Reset time part to get accurate day difference
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const differenceMs = dueDate - today;
    return Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'not-started':
        return 'Not started';
      case 'in-progress':
        return 'In progress';
      case 'done':
        return 'Done';
      default:
        return '';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'personal':
        return 'Personal';
      case 'work-school':
        return 'Work/School';
      case 'health-wellness':
        return 'Health & Wellness';
      default:
        return '';
    }
  };

  const getFormattedTime = () => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const secondsStr = seconds < 10 ? '0' + seconds : seconds;
    
    return `${hours12}:${minutesStr}:${secondsStr} ${ampm}`;
  };

  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setNewTaskForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <div className="wave-header">
      </div>
      
      <div className="container">
        <h1 className="title">Simple Life Dashboard</h1>
        
        <div className="dashboard-grid">
          {/* Left Column */}
          <div className="dashboard-column">
            {/* Habit Tracker */}
            <div className="card" id="habit-tracker">
              <div className="card-header">
                <h2>Habit Tracker</h2>
              </div>
              
              <div className="habit-table-container">
                <table id="habits-table">
                  <thead>
                    <tr>
                      <th className="habit-name">Habits</th>
                      <th>Monday</th>
                      <th>Tuesday</th>
                      <th>Wednesday</th>
                      <th>Thursday</th>
                      <th>Friday</th>
                      <th>Saturday</th>
                      <th>Sunday</th>
                    </tr>
                  </thead>
                  <tbody>
                    {habits.map(habit => (
                      <tr key={habit.id}>
                        <td className="habit-name">{habit.name}</td>
                        {habit.days.map((checked, dayIndex) => (
                          <td key={dayIndex}>
                            <input
                              type="checkbox"
                              className="checkbox-custom"
                              checked={checked}
                              onChange={() => toggleHabitDay(habit.id, dayIndex)}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="input-group">
                <input
                  type="text"
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  placeholder="Add new habit..."
                  onKeyPress={(e) => e.key === 'Enter' && addHabit()}
                />
                <button className="btn-add" onClick={addHabit}>Add habit</button>
              </div>
            </div>
            
            {/* Progress Bars */}
            <div className="card" id="progress-bars">
              <div className="progress-container">
                <div className="progress-item">
                  <div className="progress-label">
                    <span>Day:</span>
                    <span id="day-percent">{progressData.day}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-value"
                      style={{ width: `${progressData.day}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="progress-item">
                  <div className="progress-label">
                    <span>Week:</span>
                    <span id="week-percent">{progressData.week}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-value"
                      style={{ width: `${progressData.week}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="progress-item">
                  <div className="progress-label">
                    <span>Month:</span>
                    <span id="month-percent">{progressData.month}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-value"
                      style={{ width: `${progressData.month}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="progress-item">
                  <div className="progress-label">
                    <span>Quarter:</span>
                    <span id="quarter-percent">{progressData.quarter}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-value"
                      style={{ width: `${progressData.quarter}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="progress-item">
                  <div className="progress-label">
                    <span>Year:</span>
                    <span id="year-percent">{progressData.year}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-value"
                      style={{ width: `${progressData.year}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="progress-item">
                  <div className="progress-label">
                    <span>Life:</span>
                    <span id="life-percent">{progressData.life}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-value"
                      style={{ width: `${progressData.life}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Priorities (Weekly) */}
            <div className="card" id="priorities">
              <div className="card-header">
                <h2>Priorities (Weekly)</h2>
              </div>
              
              <ul className="checklist">
                {priorities.map(priority => (
                  <li key={priority.id}>
                    <div className="checklist-item">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={priority.completed}
                        onChange={() => togglePriority(priority.id)}
                      />
                      <span className={`priority-label ${priority.completed ? 'completed' : ''}`}>
                        {priority.text}
                      </span>
                    </div>
                    <button className="delete-btn" onClick={() => deletePriority(priority.id)}>
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="input-group">
                <input
                  type="text"
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  placeholder="Add new priority..."
                  onKeyPress={(e) => e.key === 'Enter' && addPriority()}
                />
                <button className="btn-icon" onClick={addPriority}>+</button>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="dashboard-column">
            {/* Important Notes */}
            <div className="card" id="important-notes">
              <div className="card-header">
                <h2>Important Notes</h2>
              </div>
              
              <ul className="bullet-list">
                {notes.map(note => (
                  <li key={note.id}>
                    {note.text}
                    <button className="delete-btn" onClick={() => deleteNote(note.id)}>
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="input-group">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add new note..."
                  onKeyPress={(e) => e.key === 'Enter' && addNote()}
                />
                <button className="btn-icon" onClick={addNote}>+</button>
              </div>
            </div>
            
            {/* Clock Widget */}
            <div className="card" id="clock-widget">
              <div className="clock-container">
                <div className="hand hour-hand" ref={hourHandRef}></div>
                <div className="hand minute-hand" ref={minuteHandRef}></div>
                <div className="hand second-hand" ref={secondHandRef}></div>
                <div className="center-dot"></div>
                {[...Array(12)].map((_, i) => {
                  const angle = i * 30;
                  const radian = (angle - 90) * (Math.PI / 180);
                  const x = 50 + 40 * Math.cos(radian);
                  const y = 50 + 40 * Math.sin(radian);
                  return (
                    <div 
                      key={i}
                      className="number"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`
                      }}
                    >
                      {i === 0 ? 12 : i}
                    </div>
                  );
                })}
              </div>
              <div className="digital-time">{getFormattedTime()}</div>
            </div>
            
            {/* Weekly Tasks */}
            <div className="card" id="weekly-tasks">
              <div className="card-header">
                <h2>Weekly Tasks</h2>
              </div>
              
              <div className="section-label">Main Focus</div>
              
              <div className="tasks-table-container">
                <table id="tasks-table">
                  <thead>
                    <tr>
                      <th>To-Item</th>
                      <th>Status</th>
                      <th>Category</th>
                      <th>Due Date</th>
                      <th>Time Left</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map(task => (
                      <tr key={task.id}>
                        <td>
                          <div className={`task-name ${task.completed ? 'completed' : ''}`}>
                            <input
                              type="checkbox"
                              className="task-checkbox"
                              checked={task.completed}
                              onChange={() => toggleTaskCompletion(task.id)}
                            />
                            {task.name}
                          </div>
                        </td>
                        <td>
                          <span className={`status-badge ${task.status}`}>
                            {getStatusLabel(task.status)}
                          </span>
                        </td>
                        <td className={`category-${task.category}`}>
                          {getCategoryLabel(task.category)}
                        </td>
                        <td>{formatDate(task.dueDate)}</td>
                        <td>{getDaysLeft(task.dueDate)} days</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="action-section">
                <button className="btn-add-sm" onClick={() => setShowTaskModal(true)}>
                  New task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Task Modal */}
      {showTaskModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Task</h3>
              <span className="close-modal" onClick={() => setShowTaskModal(false)}>&times;</span>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="task-name">Task Name</label>
                <input
                  type="text"
                  id="task-name"
                  name="name"
                  value={newTaskForm.name}
                  onChange={handleTaskFormChange}
                  placeholder="Enter task name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="task-status">Status</label>
                <select
                  id="task-status"
                  name="status"
                  value={newTaskForm.status}
                  onChange={handleTaskFormChange}
                >
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="task-category">Category</label>
                <select
                  id="task-category"
                  name="category"
                  value={newTaskForm.category}
                  onChange={handleTaskFormChange}
                >
                  <option value="personal">Personal</option>
                  <option value="work-school">Work/School</option>
                  <option value="health-wellness">Health & Wellness</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="task-due-date">Due Date</label>
                <input
                  type="date"
                  id="task-due-date"
                  name="dueDate"
                  value={newTaskForm.dueDate}
                  onChange={handleTaskFormChange}
                />
              </div>
              <button className="btn-primary" onClick={addTask}>Add Task</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HabitTracker;