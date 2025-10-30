import { useEffect, useState } from 'react';
import { read } from '../infra/localStorageApi';
import CategoryForm from './CategoryForm';
import type { Category } from '../domain/types';

export default function CategoriesList() {
  const [categories, setCategories] = useState<Category[]>([]);

  const reload = () => {
    const cats = read<Category[]>('ama:categories_v1') || [];
    setCategories(cats);
  };
  useEffect(reload, []);

  const [showModal, setShowModal] = useState(false)

  return (
    <div className="container py-4">
      <h2 className="h3 fw-bold text-primary mb-4">Categorías de artículos</h2>
      <button className="btn btn-success mb-3" onClick={() => setShowModal(true)}>Crear categoría</button>
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)' }} tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Crear categoría</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <CategoryForm onCreated={() => { setShowModal(false); reload(); }} />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="row g-3">
        {categories.length === 0 && (
          <div className="col-12 text-center text-secondary">No hay categorías disponibles.</div>
        )}
        {categories.map(cat => (
          <div key={cat.id} className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title fw-bold text-primary">{cat.name}</h5>
                {cat.parentId && <div className="text-secondary small">Subcategoría de: {cat.parentId}</div>}
                <div className="text-muted small">ID: {cat.id}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
