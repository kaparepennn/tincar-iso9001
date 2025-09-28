import React from "react";
import { Link } from "react-router-dom";

export default function Topbar(){
  const user = JSON.parse(localStorage.getItem('tincar_user') || 'null');
  return (
    <header className="topbar">
      <div className="brand">TinCar</div>
      <div className="right">
        <span>{user?.firstName} {user?.lastName}</span>
        <Link to="/">Inicio</Link>
        <button className="btn-ghost" onClick={() => { localStorage.clear(); location.href = '/login'} }>Salir</button>
      </div>
    </header>
  );
}
