export type Category = {
  id: string
  name: string
  parentId?: string | null
}

export type Article = {
  id: string
  title: string
  content: string
  categoryId: string
  createdAt: string
}
