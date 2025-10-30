import { useState } from 'react';
import { api } from '../infra/localStorageApi';

export default function CategoryForm({ onCreated }: { onCreated?: () => void }) {
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: any) => {
    e.preventDefault();
    if (!name.trim()) return setError('El nombre es obligatorio');
    setLoading(true);
    try {
      await api.createCategory({ name, parentId: parentId || undefined });
      setName('');
      setParentId('');
      setError('');
    if (onCreated) onCreated();
    } catch {
      setError('Error al crear la categoría');
    }
    setLoading(false);
  };

  return (
    <form className="card p-3 mb-4"  onSubmit={submit}>
      <div className="mb-2">
        <label className="form-label">Nombre</label>
        <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className="mb-2">
        <label className="form-label">ID de categoría padre (opcional)</label>
        <input className="form-control" value={parentId} onChange={e => setParentId(e.target.value)} />
      </div>
      {error && <div className="text-danger small mb-2">{error}</div>}
      <button type="submit" className="btn btn-success" disabled={loading}>Crear</button>
    </form>
  );
}
