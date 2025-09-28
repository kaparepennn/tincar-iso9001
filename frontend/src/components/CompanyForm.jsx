import React, { useState } from "react";
import API from "../api";

export default function CompanyForm(){
  const [form, setForm] = useState({ businessName: '', companyNumber: '', nit: '', email: '', legalRepresentative: '', website: '', economicSector: '', companyType: '', address: '', socialNetworks: '' });

  async function submit(e){
    e.preventDefault();
    const data = { ...form, socialNetworks: form.socialNetworks ? form.socialNetworks.split(',').map(s=>s.trim()) : [] };
    await API.post('/companies', data);
    alert('Empresa creada');
    setForm({ businessName: '', companyNumber: '', nit: '', email: '', legalRepresentative: '', website: '', economicSector: '', companyType: '', address: '', socialNetworks: '' });
  }

  return (
    <div className="card">
      <h3>Registrar empresa</h3>
      <form onSubmit={submit} className="form-grid">
        <input placeholder="Razón social" value={form.businessName} onChange={e=>setForm({...form, businessName: e.target.value})} required />
        <input placeholder="Número de empresa" value={form.companyNumber} onChange={e=>setForm({...form, companyNumber: e.target.value})} />
        <input placeholder="NIT" value={form.nit} onChange={e=>setForm({...form, nit: e.target.value})} />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
        <input placeholder="Representante legal" value={form.legalRepresentative} onChange={e=>setForm({...form, legalRepresentative: e.target.value})} />
        <input placeholder="Página web" value={form.website} onChange={e=>setForm({...form, website: e.target.value})} />
        <input placeholder="Sector económico" value={form.economicSector} onChange={e=>setForm({...form, economicSector: e.target.value})} />
        <input placeholder="Tipo de empresa" value={form.companyType} onChange={e=>setForm({...form, companyType: e.target.value})} />
        <input placeholder="Dirección" value={form.address} onChange={e=>setForm({...form, address: e.target.value})} />
        <input placeholder="Redes sociales (separadas por coma)" value={form.socialNetworks} onChange={e=>setForm({...form, socialNetworks: e.target.value})} />
        <div />
        <button className="btn-primary">Guardar empresa</button>
      </form>
    </div>
  );
}
