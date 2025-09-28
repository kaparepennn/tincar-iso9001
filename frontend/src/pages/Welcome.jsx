import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome(){
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem('tincar_user') || 'null');

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">TinCar</div>
        <div className="right">
          <span>{user?.firstName} {user?.lastName}</span>
          <button className="btn-ghost" onClick={() => { localStorage.clear(); location.href = '/login'; }}>Salir</button>
        </div>
      </header>

      <main className="welcome-hero">
        <section className="hero-left">
          <h1>Bienvenido a TinCar</h1>
          <p>Plataforma para acompañar la implementación de ISO 9001 en proyectos de software.</p>
          <div className="hero-actions" style={{marginTop:16}}>
            <button className="btn-primary big" onClick={() => nav('/iso9001')}>ISO 9001</button>
            <button className="btn-secondary big" onClick={() => nav('/iso27001')}>ISO 27001</button>
          </div>
        </section>
        <aside className="hero-right">
          <div className="card">Diseño dinámico con la paleta de TinCar</div>
        </aside>
      </main>
    </div>
  );
}
