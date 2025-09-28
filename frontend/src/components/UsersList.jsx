import React, { useEffect, useState } from "react";
import API from "../api";

export default function UsersList(){
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', firstName: '', lastName: '', password: '', isAdmin: false });

  async function load(){
    try{ const res = await API.get('/users'); setUsers(res.data); } catch(err){ console.error(err) }
  }

  useEffect(()=>{ load() }, []);

  async function create(e){
    e.preventDefault();
    await API.post('/users', form);
    setForm({ username: '', firstName: '', lastName: '', password: '', isAdmin: false });
    load();
  }

  async function remove(id){ if(!confirm('Eliminar usuario?')) return; await API.delete(`/users/${id}`); load(); }

  return (
    <div>
      <div className="card">
        <h3>Crear usuario</h3>
        <form onSubmit={create} className="form-inline">
          <input placeholder="usuario" value={form.username} onChange={e=>setForm({...form, username: e.target.value})} />
          <input placeholder="nombre" value={form.firstName} onChange={e=>setForm({...form, firstName: e.target.value})} />
          <input placeholder="apellido" value={form.lastName} onChange={e=>setForm({...form, lastName: e.target.value})} />
          <input placeholder="password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} />
          <label style={{display:'inline-flex', alignItems:'center', gap:6}}><input type="checkbox" checked={form.isAdmin} onChange={e=>setForm({...form, isAdmin: e.target.checked})} /> admin</label>
          <button className="btn-primary">Crear</button>
        </form>
      </div>

      <div className="card">
        <h3>Usuarios</h3>
        <table className="mini-table">
          <thead><tr><th>Usuario</th><th>Nombre</th><th>Admin</th><th>Acciones</th></tr></thead>
          <tbody>
            {users.map(u=> (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.firstName} {u.lastName}</td>
                <td>{u.isAdmin ? 'Sí' : 'No'}</td>
                <td><button className="btn-danger" onClick={()=>remove(u.id)}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
