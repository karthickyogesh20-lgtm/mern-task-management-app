import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
const blank = { title: '', description: '', dueDate: '', priority: 'Medium', status: 'Pending' };
export default function TaskModal({ open, onClose, onSave, task }) {
  const [form, setForm] = useState(blank); const [error, setError] = useState('');
  useEffect(() => { setForm(task ? { ...blank, ...task, dueDate: task.dueDate ? task.dueDate.slice(0,10) : '' } : blank); setError(''); }, [task, open]);
  if (!open) return null;
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => { e.preventDefault(); if (!form.title.trim()) return setError('Please enter a task title'); try { await onSave({ ...form, title: form.title.trim(), dueDate: form.dueDate || null }); onClose(); } catch (err) { setError(err.response?.data?.message || 'Could not save task'); } };
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><form className="task-modal" onSubmit={submit}>
    <div className="modal-heading"><div><span className="eyebrow">{task ? 'UPDATE DETAILS' : 'NEW ITEM'}</span><h2>{task ? 'Edit task' : 'Create a task'}</h2></div><button type="button" className="icon-button" onClick={onClose}><X size={20}/></button></div>
    <label>Task title<input name="title" value={form.title} onChange={change} placeholder="e.g. Finish project documentation" maxLength="100" required autoFocus/></label>
    <label>Description<textarea name="description" value={form.description} onChange={change} placeholder="Add a few details…" rows="3"/></label>
    <div className="form-grid"><label>Due date<input type="date" name="dueDate" value={form.dueDate} onChange={change}/></label><label>Priority<select name="priority" value={form.priority} onChange={change}><option>Low</option><option>Medium</option><option>High</option></select></label></div>
    <label>Status<select name="status" value={form.status} onChange={change}><option>Pending</option><option>In Progress</option><option>Completed</option></select></label>
    {error && <p className="form-error">{error}</p>}<div className="modal-actions"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button className="btn btn-primary" type="submit">{task ? 'Save changes' : 'Create task'}</button></div>
  </form></div>;
}
