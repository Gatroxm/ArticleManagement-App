import React from 'react';

import { useState } from 'react';

type Report = {
  id: number;
  nombre: string;
  tipo: string;
  fecha: string;
};

const initialReports: Report[] = [
  { id: 1, nombre: 'Reporte de Artículos', tipo: 'Artículos', fecha: '2025-10-29' },
  { id: 2, nombre: 'Reporte de Categorías', tipo: 'Categorías', fecha: '2025-10-28' },
  { id: 3, nombre: 'Reporte de Usuarios', tipo: 'Usuarios', fecha: '2025-10-27' },
];

export default function Reports() {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [editingId, setEditingId] = useState<number|null>(null);
  const [form, setForm] = useState<Partial<Report>>({});

  // Crear nuevo reporte
  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.nombre || !form.tipo || !form.fecha) return;
    setReports([...reports, { id: Date.now(), nombre: form.nombre, tipo: form.tipo, fecha: form.fecha }]);
    setForm({});
  };


  // Editar reporte
  const handleEdit = (id: number) => {
    const r = reports.find(r => r.id === id);
    if (r) {
      setEditingId(id);
      setForm(r);
    }
  };
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReports(reports.map(r => r.id === editingId ? { ...r, ...form } : r));
    setEditingId(null);
    setForm({});
  };


  // Eliminar reporte
  const handleDelete = (id: number) => {
    setReports(reports.filter(r => r.id !== id));
  };

  // Ver detalles
  const handleDetails = (id: number) => {
    const r = reports.find(r => r.id === id);
    if (r) alert(`Detalles del reporte:\nNombre: ${r.nombre}\nTipo: ${r.tipo}\nFecha: ${r.fecha}`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Reportes</h2>
      <p className="text-gray-700 mb-4">CRUD de reportes de ejemplo.</p>

      {/* Formulario de creación/edición */}
      <form onSubmit={editingId ? handleUpdate : handleCreate} className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm font-semibold mb-1">Nombre</label>
          <input className="w-full px-2 py-1 border rounded" value={form.nombre || ''} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Tipo</label>
          <input className="w-full px-2 py-1 border rounded" value={form.tipo || ''} onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))} required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Fecha</label>
          <input type="date" className="w-full px-2 py-1 border rounded" value={form.fecha || ''} onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))} required />
        </div>
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
          {editingId ? 'Actualizar' : 'Crear'}
        </button>
      </form>

      {/* Tabla de reportes */}
      <table className="w-full border rounded overflow-hidden">
        <thead className="bg-indigo-100">
          <tr>
            <th className="py-2 px-4 text-left">Nombre</th>
            <th className="py-2 px-4 text-left">Tipo</th>
            <th className="py-2 px-4 text-left">Fecha</th>
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(r => (
            <tr key={r.id} className="border-t">
              <td className="py-2 px-4">{r.nombre}</td>
              <td className="py-2 px-4">{r.tipo}</td>
              <td className="py-2 px-4">{r.fecha}</td>
              <td className="py-2 px-4 flex gap-2">
                <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 text-sm" onClick={() => handleDetails(r.id)}>Ver</button>
                <button className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 text-sm" onClick={() => handleEdit(r.id)}>Editar</button>
                <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 text-sm" onClick={() => handleDelete(r.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
