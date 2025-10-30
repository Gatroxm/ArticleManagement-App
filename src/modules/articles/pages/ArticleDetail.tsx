import { useParams, Link, useNavigate } from 'react-router-dom'
import { useArticle } from '../hooks/useArticles'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../../core/store'
import { toggleFavorite, setRating } from '../store/favoritesSlice'

export default function ArticleDetail() {
  const { id } = useParams()
  const { data: article, isLoading } = useArticle(id)
  const favorites = useSelector((s: RootState) => s.favorites.favorites)
  const ratings = useSelector((s: RootState) => s.favorites.ratings)
  const dispatch = useDispatch()
  const nav = useNavigate()

  if (isLoading) return <div className="card p-4 text-center h5">Cargando...</div>
  if (!article) return <div className="card p-4 text-center h5">Artículo no encontrado</div>

  return (
    <div className="card p-4">
      <button className="btn btn-secondary mb-3" onClick={() => nav(-1)}>Atrás</button>
      <h2 className="h4 fw-bold text-primary mb-2">{article.title}</h2>
      <p className="mb-4 text-secondary">{article.content}</p>
      <div className="mb-4 d-flex align-items-center gap-3">
        <button className={`btn ${favorites.includes(article.id) ? 'btn-danger' : 'btn-outline-secondary'} fw-semibold`} onClick={() => dispatch(toggleFavorite(article.id))}>
          {favorites.includes(article.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </button>
        <div className="d-flex align-items-center gap-2">
          <span className="fw-semibold">Calificación:</span> {ratings[article.id] || 0}
          {[1,2,3].map(r => (
            <button key={r} className="btn btn-sm btn-primary ms-1" onClick={() => dispatch(setRating({ id: article.id, rating: r }))}>{r}</button>
          ))}
        </div>
      </div>
      <Link to={`/articles/edit/${article.id}`} className="btn btn-success">Editar</Link>
    </div>
  )
}
