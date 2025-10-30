import { Link } from 'react-router-dom';
import ArticleForm from './ArticleForm';
import { useArticles } from '../hooks/useArticles';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../core/store';
import { toggleFavorite } from '../store/favoritesSlice';
import { useEffect, useState } from 'react';
import { api } from '../infra/localStorageApi';



export default function ArticlesList() {
  const { data: articles, isLoading } = useArticles()
  const favorites = useSelector((s: RootState) => s.favorites.favorites)
  const dispatch = useDispatch()

  // Filtro por categoría
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [categoryId, setCategoryId] = useState('')
  const [search, setSearch] = useState('')
  useEffect(() => {
    api.listCategories().then(setCategories)
  }, [])

  // Modal para crear artículo
  const [showModal, setShowModal] = useState(false)

  // Paginación y búsqueda
  const [page, setPage] = useState(1)
  const pageSize = 10
  type Article = { id: string; title: string; content: string; categoryId: string }
  let filtered = categoryId ? articles?.filter((a: Article) => a.categoryId === categoryId) : articles
  if (search.trim()) {
    filtered = filtered?.filter((a: Article) => a.title.toLowerCase().includes(search.toLowerCase()) || a.content.toLowerCase().includes(search.toLowerCase()))
  }
  const total = filtered?.length || 0
  const totalPages = Math.ceil(total / pageSize)
  const paginated = filtered?.slice((page - 1) * pageSize, page * pageSize) || []

  if (isLoading) return (
    <div className="d-flex justify-content-center align-items-center min-vh-50 bg-light">
      <div className="bg-white rounded shadow p-5 text-center h4 text-primary">Cargando...</div>
    </div>
  )

  return (
    <div className="d-flex justify-content-center align-items-center bg-light py-5">
      <div className="w-100" style={{ maxWidth: 900 }}>
        <div className="card shadow mb-4">
          <div className="card-body">
            <h2 className="h2 fw-bold text-primary mb-3 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>Artículos</h2>
            <p className="lead text-secondary mb-4 text-center">Explora, gestiona y marca tus artículos favoritos. ¡Hay más de 40 para probar!</p>
            <div className="d-flex justify-content-between mb-4 align-items-center gap-3">
              <div className="d-flex gap-2 align-items-center">
                <select className="form-select" style={{ minWidth: 200 }} value={categoryId} onChange={e => { setCategoryId(e.target.value); setPage(1); }}>
                  <option value="">Todas las categorías</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <input type="text" className="form-control" style={{ minWidth: 200 }} placeholder="Buscar artículo..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
              </div>
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>Crear artículo</button>
            </div>
            <div className="row g-3">
                {paginated.map((a) => (
                  <div key={a.id} className="col-12">

                  <div className="card border-0 shadow-sm d-flex flex-row align-items-center justify-content-between p-3">
                    <div>
                      <Link to={`/articles/${a.id}`} className="h5 fw-bold text-primary text-decoration-none" style={{ fontFamily: 'Montserrat, sans-serif' }}>{a.title}</Link>
                      <p className="text-secondary small mb-0">{a.content.slice(0, 60)}...</p>
                    </div>
                    <button className={`btn ${favorites.includes(a.id) ? 'btn-danger' : 'btn-outline-secondary'} ms-3 fw-semibold`} onClick={() => dispatch(toggleFavorite(a.id))}>
                      {favorites.includes(a.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Modal para crear artículo */}
            {showModal && (
              <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)' }} tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Crear artículo</h5>
                      <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                      <ArticleForm onCreated={() => setShowModal(false)} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Paginación Bootstrap */}
            {totalPages > 1 && (
              <nav className="mt-4">
                <ul className="pagination justify-content-center">
                  <li className={`page-item${page === 1 ? ' disabled' : ''}`}>
                    <button className="page-link" onClick={() => setPage(page - 1)} disabled={page === 1}>&laquo;</button>
                  </li>
                  {[...Array(totalPages)].map((_, i) => (
                    <li key={i} className={`page-item${page === i + 1 ? ' active' : ''}`}>
                      <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item${page === totalPages ? ' disabled' : ''}`}>
                    <button className="page-link" onClick={() => setPage(page + 1)} disabled={page === totalPages}>&raquo;</button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
