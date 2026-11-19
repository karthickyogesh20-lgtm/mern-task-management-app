import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, CheckCircle2, Circle, Clock3, ListTodo, Plus, Search, CalendarDays } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import Layout from '../components/Layout';
import TaskModal from '../components/TaskModal';
const dateLabel = (d) => d ? new Date(d).toLocaleDateString(undefined,{month:'short',day:'numeric'}) : 'No due date';
function TaskRow({ task, onEdit, onDelete, onStatus }) { return <div className="task-row"><button className={`status-check ${task.status==='Completed'?'checked':''}`} title="Mark completed" onClick={()=>onStatus(task,task.status==='Completed'?'Pending':'Completed')}>{task.status==='Completed'?<CheckCircle2 size={19}/>:<Circle size={19}/>}</button><div className="task-main"><strong className={task.status==='Completed'?'completed-text':''}>{task.title}</strong><span>{task.description || 'No description added'}</span></div><span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span><span className={`status-pill status-${task.status.toLowerCase().replace(' ','-')}`}>{task.status}</span><span className="due-date"><CalendarDays size={14}/>{dateLabel(task.dueDate)}</span><div className="row-actions"><button onClick={()=>onEdit(task)}>Edit</button><button onClick={()=>onDelete(task._id)}>Delete</button></div></div>; }
export default function Dashboard() {
 const { user }=useAuth(); const [tasks,setTasks]=useState([]); const [loading,setLoading]=useState(true); const [error,setError]=useState(''); const [modal,setModal]=useState(false); const [editing,setEditing]=useState(null); const [filter,setFilter]=useState('All'); const [search,setSearch]=useState('');
 const load=async()=>{try{setError('');const {data}=await api.get('/tasks');setTasks(data.tasks);}catch(err){setError(err.response?.data?.message||'Could not load tasks');}finally{setLoading(false);}};
 useEffect(()=>{load();},[]);
 const counts=useMemo(()=>({total:tasks.length,pending:tasks.filter(t=>t.status==='Pending').length,progress:tasks.filter(t=>t.status==='In Progress').length,completed:tasks.filter(t=>t.status==='Completed').length}),[tasks]);
 const visible=tasks.filter(t=>(filter==='All'||t.status===filter)&&`${t.title} ${t.description}`.toLowerCase().includes(search.toLowerCase()));
 const save=async(payload)=>{if(editing){const {data}=await api.put(`/tasks/${editing._id}`,payload);setTasks(ts=>ts.map(t=>t._id===editing._id?data.task:t));}else{const {data}=await api.post('/tasks',payload);setTasks(ts=>[data.task,...ts]);}};
 const remove=async(id)=>{if(!confirm('Delete this task? This cannot be undone.'))return;try{await api.delete(`/tasks/${id}`);setTasks(ts=>ts.filter(t=>t._id!==id));}catch(err){setError(err.response?.data?.message||'Could not delete task');}};
 const status=async(task,next)=>{try{const {data}=await api.put(`/tasks/${task._id}`,{status:next});setTasks(ts=>ts.map(t=>t._id===task._id?data.task:t));}catch(err){setError(err.response?.data?.message||'Could not update task');}};
 const openNew=()=>{setEditing(null);setModal(true);}; const openEdit=(t)=>{setEditing(t);setModal(true);};
 const today=new Date().toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'});
 return <Layout><div className="page-content"><div className="page-heading"><div><span className="eyebrow">{today.toUpperCase()}</span><h1>Good day, {user?.name?.split(' ')[0]} <span className="wave">✦</span></h1><p className="muted">A little progress each day adds up.</p></div><button className="btn btn-primary" onClick={openNew}><Plus size={18}/> Add new task</button></div>
 {error&&<div className="alert-error">{error}</div>}
 <section className="stats-grid">
 <div className="stat-card"><div className="stat-icon icon-purple"><ListTodo size={19}/></div><span>Total tasks</span><strong>{counts.total}</strong><small>Across your workspace</small></div>
 <div className="stat-card"><div className="stat-icon icon-amber"><Clock3 size={19}/></div><span>Pending</span><strong>{counts.pending}</strong><small>Waiting to be started</small></div>
 <div className="stat-card"><div className="stat-icon icon-blue"><ArrowUpRight size={19}/></div><span>In progress</span><strong>{counts.progress}</strong><small>Currently underway</small></div>
 <div className="stat-card"><div className="stat-icon icon-green"><CheckCircle2 size={19}/></div><span>Completed</span><strong>{counts.completed}</strong><small>Things you've finished</small></div>
 </section>
 <section className="tasks-section"><div className="section-heading"><div><h2>Your tasks</h2><p className="muted">Keep your priorities moving forward.</p></div><div className="task-tools"><div className="search-box"><Search size={16}/><input placeholder="Search tasks…" value={search} onChange={e=>setSearch(e.target.value)}/></div></div></div>
 <div className="filter-tabs">{['All','Pending','In Progress','Completed'].map(f=><button key={f} className={filter===f?'active':''} onClick={()=>setFilter(f)}>{f}<span>{f==='All'?counts.total:f==='Pending'?counts.pending:f==='In Progress'?counts.progress:counts.completed}</span></button>)}</div>
 {loading?<div className="empty-state">Loading your tasks…</div>:visible.length?<div className="task-list">{visible.map(t=><TaskRow key={t._id} task={t} onEdit={openEdit} onDelete={remove} onStatus={status}/>)}</div>:<div className="empty-state"><div className="empty-icon"><CheckSquareFallback/></div><h3>{search||filter!=='All'?'No matching tasks':'Your list is clear'}</h3><p>{search||filter!=='All'?'Try another search or filter.':'Add a task to turn your plans into progress.'}</p>{!search&&filter==='All'&&<button className="btn btn-primary" onClick={openNew}><Plus size={17}/> Create your first task</button>}</div>}
 </section><footer className="page-footer">Made for focused days <span>·</span> TaskFlow</footer></div>
 <TaskModal open={modal} task={editing} onClose={()=>setModal(false)} onSave={save}/></Layout>;
}
function CheckSquareFallback(){return <ListTodo size={25}/>}
