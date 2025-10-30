import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../infra/localStorageApi'
import type { Article } from '../domain/types'

export function useArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: () => api.listArticles(),
  })
}

export function useArticle(id: string | undefined) {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => (id ? api.getArticle(id) : null),
    enabled: !!id,
  })
}

export function useCreateArticle() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Omit<Article, 'id' | 'createdAt'>) => api.createArticle(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['articles'] }),
  })
}

export function useUpdateArticle() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Article> }) => api.updateArticle(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['articles'] }),
  })
}
