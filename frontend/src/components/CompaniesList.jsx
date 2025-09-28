import React, { useEffect, useState } from "react";
import API from "../api";

export default function CompaniesList(){
  const [list, setList] = useState([]);

  async function load(){ const res = await API.get('/companies'); setList(res.data); }

  useEffect(()=>{ load() }, []);

  async function remove(id){ if(!confirm('Eliminar empresa?')) return; await API.delete(`/companies/${id}`); load(); }

  return (
    <div className="card">
      <h3>Empresas registradas</h3>
      <table className="mini-table">
        <thead><tr><th>Razón social</th><th>NIT</th><th>Dueño</th><th>Acciones</th></tr></thead>
        <tbody>
          {list.map(c=> (
            <tr key={c.id}>
              <td>{c.businessName}</td>
              <td>{c.nit}</td>
              <td>{c.owner?.username}</td>
              <td><button className="btn-danger" onClick={()=>remove(c.id)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
