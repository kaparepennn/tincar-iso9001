import React from "react";

export default function Sidebar({ sections, onSelect, selected }){
  return (
    <aside className="sidebar">
      <nav>
        {sections.map((s,i)=> (
          <div key={i} className={`side-item ${selected===i ? 'active' : ''}`} onClick={()=>onSelect(i)}>{i+1}. {s}</div>
        ))}
      </nav>
    </aside>
  );
}
