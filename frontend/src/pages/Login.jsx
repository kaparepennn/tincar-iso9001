import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      const res = await API.post('/auth/login', { username, password });
      // guarda token y user
      localStorage.setItem('tincar_token', res.data.token);
      localStorage.setItem('tincar_user', JSON.stringify(res.data.user));
      nav('/');
    }catch(err){
      setError(err?.response?.data?.message || 'Credenciales inválidas');
    }
  }

  return (
    <div className="login-hero">
      <div className="login-box">
        <h2>TinCar</h2>
        <p style={{marginBottom:12}}>Ingresa con tu usuario (sin mayúsculas ni tildes)</p>
        <form onSubmit={submit}>
          <input placeholder="usuario" value={username} onChange={e=>setUsername(e.target.value)} />
          <input placeholder="contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="btn-primary" type="submit">Entrar</button>
        </form>
        {error && <div className="error">{error}</div>}
        <div className="muted" style={{marginTop:12}}>Usuarios seed: edgar.mojica, karen.palacios, cristian.rincon, diego.hernandez, santiago.becerra (pwd: tincar123)</div>
      </div>
    </div>
  );
}
