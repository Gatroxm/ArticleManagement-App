import { useState, useEffect } from 'react'
import { useCreateArticle, useArticle, useUpdateArticle } from '../hooks/useArticles'
import { validateArticlePayload } from '../domain/usecases'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../infra/localStorageApi'

export default function ArticleForm({ onCreated }: { onCreated?: () => void }) {
  const { id } = useParams()
  const { data: existing } = useArticle(id)
  const create = useCreateArticle()
  const update = useUpdateArticle()
  const nav = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    api.listCategories().then(setCategories)
    if (existing) {
      setTitle(existing.title)
      setContent(existing.content)
      setCategoryId(existing.categoryId)
    }
  }, [existing])

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const payload = { title, content, categoryId }
    const v = validateArticlePayload(payload)
    if (Object.keys(v).length) return setErrors(v)
    try {
      if (id) await update.mutateAsync({ id, payload })
      else await create.mutateAsync(payload)
      if (onCreated) onCreated()
      else nav('/articles')
    } catch {
      setErrors({ form: 'Error al guardar el artículo' })
    }
  }

  return (
    <form onSubmit={submit} className="card p-4 mx-auto" style={{ maxWidth: 480 }}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label fw-semibold text-primary">Título</label>
        <input id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        {errors.title && <div className="text-danger small mt-1">{errors.title}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label fw-semibold text-primary">Contenido</label>
        <textarea id="content" className="form-control" value={content} onChange={(e) => setContent(e.target.value)} />
        {errors.content && <div className="text-danger small mt-1">{errors.content}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label fw-semibold text-primary">Categoría</label>
        <select id="category" className="form-select" value={categoryId} onChange={e => setCategoryId(e.target.value)}>
          <option value="">Selecciona una categoría</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        {errors.categoryId && <div className="text-danger small mt-1">{errors.categoryId}</div>}
      </div>
      {errors.form && <div className="text-danger small mb-2">{errors.form}</div>}
      <button type="submit" className="btn btn-success">Guardar</button>
    </form>
  )
}
