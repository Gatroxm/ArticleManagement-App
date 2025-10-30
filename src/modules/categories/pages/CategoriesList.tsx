import { useEffect, useState } from 'react';
import { read, api } from '../infra/localStorageApi';
import CategoryForm from './CategoryForm';
import CategoryDetailModal from './CategoryDetailModal';
import type { Category } from '../domain/types';

export default function CategoriesList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [flatCategories, setFlatCategories] = useState<Category[]>([]);

  const reload = async () => {
    const cats = await api.listCategories();
    setFlatCategories(cats);
    // Agrupar en árbol
    const tree: Category[] = cats.filter(c => !c.parentId);
    tree.forEach(parent => {
      (parent as any).children = cats.filter(c => c.parentId === parent.id);
    });
    setCategories(tree);
  };
  useEffect(() => { reload(); }, []);

  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category|null>(null);

  // Paginador simple
  // Paginador para categorías raíz
  const [rootPage, setRootPage] = useState(1);
  const rootPageSize = 5;
  const rootCategories = flatCategories.filter(cat => !cat.parentId);
  const rootTotalPages = Math.ceil(rootCategories.length / rootPageSize);
  const pagedRootCategories = rootCategories.slice((rootPage - 1) * rootPageSize, rootPage * rootPageSize);

  // Paginador para subcategorías
  const [subPage, setSubPage] = useState(1);
  const subPageSize = 5;
  const subCategories = flatCategories.filter(cat => !!cat.parentId);
  const subTotalPages = Math.ceil(subCategories.length / subPageSize);
  const pagedSubCategories = subCategories.slice((subPage - 1) * subPageSize, subPage * subPageSize);

  // Modal control
  const [showRootModal, setShowRootModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);

  return (
    <div className="container py-4">
      <h2 className="h3 fw-bold text-primary mb-4">Categorías de artículos</h2>
      <div className="mb-3 d-flex gap-2">
        <button className="btn btn-success" onClick={() => setShowRootModal(true)}>Crear categoría raíz</button>
        <button className="btn btn-secondary" onClick={() => setShowSubModal(true)}>Crear subcategoría</button>
      </div>
      {showRootModal && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)' }} tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Crear categoría raíz</h5>
                <button type="button" className="btn-close" onClick={() => setShowRootModal(false)}></button>
              </div>
              <div className="modal-body">
                <CategoryForm onCreated={() => { setShowRootModal(false); reload(); }} />
              </div>
            </div>
          </div>
        </div>
      )}
      {showSubModal && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)' }} tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Crear subcategoría</h5>
                <button type="button" className="btn-close" onClick={() => setShowSubModal(false)}></button>
              </div>
              <div className="modal-body">
                <CategoryForm
                  onCreated={() => { setShowSubModal(false); reload(); }}
                  parentOptions={rootCategories}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="table-responsive mb-3">
        <h4 className="h5 fw-bold text-primary">Categorías raíz</h4>
        <table className="table table-bordered table-striped mb-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagedRootCategories.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-secondary">No hay categorías raíz disponibles.</td>
              </tr>
            )}
            {pagedRootCategories.map((cat, idx) => (
              <tr key={cat.id}>
                <td>{(rootPage - 1) * rootPageSize + idx + 1}</td>
                <td>{cat.name}</td>
                <td>{cat.id}</td>
                <td>
                  <button className="btn btn-sm btn-primary" onClick={() => setSelectedCategory(cat)}>Ver/Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item${rootPage === 1 ? ' disabled' : ''}`}>
              <button className="page-link" onClick={() => setRootPage(rootPage - 1)} disabled={rootPage === 1}>Anterior</button>
            </li>
            {Array.from({ length: rootTotalPages }, (_, i) => (
              <li key={i + 1} className={`page-item${rootPage === i + 1 ? ' active' : ''}`}>
                <button className="page-link" onClick={() => setRootPage(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item${rootPage === rootTotalPages ? ' disabled' : ''}`}>
              <button className="page-link" onClick={() => setRootPage(rootPage + 1)} disabled={rootPage === rootTotalPages}>Siguiente</button>
            </li>
          </ul>
        </nav>

        <h4 className="h5 fw-bold text-secondary">Subcategorías</h4>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>ID</th>
              <th>Padre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagedSubCategories.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-secondary">No hay subcategorías disponibles.</td>
              </tr>
            )}
            {pagedSubCategories.map((cat, idx) => (
              <tr key={cat.id}>
                <td>{(subPage - 1) * subPageSize + idx + 1}</td>
                <td>{cat.name}</td>
                <td>{cat.id}</td>
                <td>{flatCategories.find(c => c.id === cat.parentId)?.name || cat.parentId}</td>
                <td>
                  <button className="btn btn-sm btn-primary" onClick={() => setSelectedCategory(cat)}>Ver/Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item${subPage === 1 ? ' disabled' : ''}`}>
              <button className="page-link" onClick={() => setSubPage(subPage - 1)} disabled={subPage === 1}>Anterior</button>
            </li>
            {Array.from({ length: subTotalPages }, (_, i) => (
              <li key={i + 1} className={`page-item${subPage === i + 1 ? ' active' : ''}`}>
                <button className="page-link" onClick={() => setSubPage(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item${subPage === subTotalPages ? ' disabled' : ''}`}>
              <button className="page-link" onClick={() => setSubPage(subPage + 1)} disabled={subPage === subTotalPages}>Siguiente</button>
            </li>
          </ul>
        </nav>
      </div>
      {/* Paginador antiguo eliminado, solo se usan los de raíz y subcategorías */}

      {selectedCategory && (
        <CategoryDetailModal
          category={selectedCategory}
          allCategories={flatCategories}
          onClose={() => setSelectedCategory(null)}
          onUpdated={() => { setSelectedCategory(null); reload(); }}
        />
      )}
    </div>
  );
}
