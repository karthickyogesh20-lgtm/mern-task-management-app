import { NavLink, useNavigate } from 'react-router-dom';
import { CheckSquare, LayoutDashboard, ListTodo, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
export default function Layout({ children }) {
  const { user, logout } = useAuth(); const navigate = useNavigate();
  const signOut = () => { logout(); navigate('/login'); };
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-icon"><CheckSquare size={21}/></span><span>taskflow<span className="brand-dot">.</span></span></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="side-nav">
        <NavLink to="/" end><LayoutDashboard size={18}/> Overview</NavLink>
        <NavLink to="/tasks"><ListTodo size={18}/> My tasks</NavLink>
      </nav>
      <div className="sidebar-bottom"><div className="avatar">{user?.name?.[0]?.toUpperCase()}</div><div className="user-meta"><strong>{user?.name}</strong><span>{user?.email}</span></div><button className="icon-button logout" title="Log out" onClick={signOut}><LogOut size={18}/></button></div>
    </aside>
    <main className="main-area"><header className="topbar"><div className="mobile-brand"><CheckSquare size={20}/> taskflow<span>.</span></div><div className="topbar-right"><span className="online-dot"></span> Your personal workspace</div></header>{children}</main>
  </div>;
}
