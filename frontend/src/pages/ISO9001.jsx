import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import UsersList from "../components/UsersList";
import CompanyForm from "../components/CompanyForm";
import CompaniesList from "../components/CompaniesList";

const sections = [
  "Análisis de la Situación Actual",
  "Elaboración del Mapa de Procesos",
  "Documentación de la Política y el Plan de Calidad",
  "Elaboración del Manual de Calidad",
  "Capacitación",
  "Implementación ISO 9001",
  "Auditoría Interna",
  "Revisión General de la Implementación ISO 9001",
  "Definición de Acciones Correctivas y Preventivas",
  "Análisis para la Mejora Continua",
  "Auditoría Externa",
  "Usuarios y roles",
  "Registro de empresas"
];

export default function ISO9001(){
  const [sel, setSel] = useState(0);
  const user = JSON.parse(localStorage.getItem('tincar_user') || 'null');

  return (
    <div className="page layout">
      <Topbar />
      <Sidebar sections={sections} onSelect={(i)=>setSel(i)} selected={sel} />

      <main className="content">
        <h2>{sections[sel]}</h2>

        {sel === 11 ? (
          user?.isAdmin ? <UsersList /> : <div className="card">Acceso denegado. Solo administradores pueden ver esta sección.</div>
        ) : sel === 12 ? (
          <>
            <CompanyForm />
            <CompaniesList />
          </>
        ) : (
          <div className="card">Contenido para <strong>{sections[sel]}</strong>. Aquí puedes agregar formularios, checklists y plantillas.</div>
        )}
      </main>
    </div>
  );
}
