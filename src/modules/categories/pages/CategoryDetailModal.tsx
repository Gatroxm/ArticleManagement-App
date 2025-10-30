import { useState } from 'react';
import type { Category } from '../domain/types';
import { api } from '../infra/localStorageApi';

interface Props {
  category: Category;
  allCategories: Category[];
  onClose: () => void;
  onUpdated: () => void;
}

export default function CategoryDetailModal({ category, allCategories, onClose, onUpdated }: Props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(category.name);
  const [parentId, setParentId] = useState(category.parentId || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError('El nombre es obligatorio');
    setLoading(true);
    try {
      // Actualizar categoría
      await api.deleteCategory(category.id);
      await api.createCategory({ name, parentId: parentId || undefined });
      setEditing(false);
      setError('');
      onUpdated();
    } catch {
      setError('Error al actualizar la categoría');
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Seguro que deseas eliminar esta categoría?')) return;
    setLoading(true);
    try {
      await api.deleteCategory(category.id);
      onClose();
      onUpdated();
    } catch {
      setError('Error al eliminar la categoría');
    }
    setLoading(false);
  };

  return (
    <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)' }} tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editing ? 'Editar categoría' : 'Detalle de categoría'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {editing ? (
              <form onSubmit={handleUpdate}>
                <div className="mb-2">
                  <label className="form-label">Nombre</label>
                  <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Categoría padre (opcional)</label>
                  <select className="form-select" value={parentId} onChange={e => setParentId(e.target.value)}>
                    <option value="">Sin categoría padre</option>
                    {allCategories.filter(c => c.id !== category.id).map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                {error && <div className="text-danger small mb-2">{error}</div>}
                <button type="submit" className="btn btn-primary me-2" disabled={loading}>Guardar</button>
                <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)} disabled={loading}>Cancelar</button>
              </form>
            ) : (
              <>
                <h5 className="fw-bold text-primary mb-2">{category.name}</h5>
                {category.parentId && <div className="text-secondary small mb-2">Subcategoría de: {category.parentId}</div>}
                <div className="text-muted small mb-2">ID: {category.id}</div>
                <button className="btn btn-warning me-2" onClick={() => setEditing(true)}>Editar</button>
                <button className="btn btn-danger" onClick={handleDelete} disabled={loading}>Eliminar</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
