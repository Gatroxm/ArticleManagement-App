import { useState, useEffect } from 'react';
import type { Article, Category } from '../domain/types';
import { api } from '../infra/localStorageApi';

interface Props {
  article: Article;
  onClose: () => void;
  onUpdated: () => void;
}

export default function ArticleDetailModal({ article, onClose, onUpdated }: Props) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const [categoryId, setCategoryId] = useState(article.categoryId || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.listCategories().then(setCategories);
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return setError('El título es obligatorio');
    if (!content.trim()) return setError('El contenido es obligatorio');
    setLoading(true);
    try {
      await api.deleteArticle(article.id);
      await api.createArticle({ title, content, categoryId });
      setEditing(false);
      setError('');
      onUpdated();
    } catch (e) {
      setError('Error al actualizar el artículo');
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Seguro que deseas eliminar este artículo?')) return;
    setLoading(true);
    try {
      await api.deleteArticle(article.id);
      onClose();
      onUpdated();
    } catch (e) {
      setError('Error al eliminar el artículo');
    }
    setLoading(false);
  };

  return (
    <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)' }} tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editing ? 'Editar artículo' : 'Detalle de artículo'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="text-muted small mb-2">Creado: {new Date(article.createdAt).toLocaleString()}</div>
          <div className="modal-body">
            {editing ? (
              <form onSubmit={handleUpdate}>
                <div className="mb-2">
                  <label className="form-label">Título</label>
                  <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Contenido</label>
                  <textarea className="form-control" value={content} onChange={e => setContent(e.target.value)} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Categoría</label>
                  <select className="form-select" value={categoryId} onChange={e => setCategoryId(e.target.value)}>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                {error && <div className="text-danger small mb-2">{error}</div>}
                <button type="submit" className="btn btn-primary me-2" disabled={loading}>Guardar</button>
                <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)} disabled={loading}>Cancelar</button>
              </form>
            ) : (
              <div>
                <h5 className="fw-bold text-primary mb-2">{article.title}</h5>
                <div className="mb-2">{article.content}</div>
                <div className="text-secondary small mb-2">Categoría: {article.categoryId}</div>
                <div className="text-muted small mb-2">ID: {article.id}</div>
                <button className="btn btn-warning me-2" onClick={() => setEditing(true)}>Editar</button>
                <button className="btn btn-danger" onClick={handleDelete} disabled={loading}>Eliminar</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
