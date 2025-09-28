import React from "react";
import { Link } from "react-router-dom";

export default function ISO27001(){
  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">TinCar</div>
        <div className="right">
          <Link to="/">Volver</Link>
        </div>
      </header>
      <main className="center card">
        <h2>ISO 27001 — En construcción</h2>
        <p>Estamos trabajando en el contenido para ISO 27001. Pronto tendrás las mismas funcionalidades que para ISO 9001.</p>
      </main>
    </div>
  );
}
