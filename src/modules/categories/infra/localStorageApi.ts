import type { Category } from '../domain/types';

const CAT_KEY = 'ama:categories_v1';

export function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Error al leer de localStorage', e);
    return null;
  }
}

function write<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error al escribir en localStorage', e);
  }
}

export const seedCategories = () => {
  const cats = read<Category[]>(CAT_KEY);
  if (!cats) {
    const defaultCats: Category[] = [
      { id: 'cat-1', name: 'Tecnología' },
      { id: 'cat-2', name: 'Vida' },
      { id: 'cat-3', name: 'Ciencia', parentId: 'cat-1' },
      { id: 'cat-4', name: 'Salud' },
      { id: 'cat-5', name: 'Educación' },
      { id: 'cat-6', name: 'Deportes' },
      { id: 'cat-7', name: 'Arte' },
      { id: 'cat-8', name: 'Música', parentId: 'cat-7' },
      { id: 'cat-9', name: 'Cine', parentId: 'cat-7' },
      { id: 'cat-10', name: 'Literatura', parentId: 'cat-7' },
      { id: 'cat-11', name: 'Negocios' },
      { id: 'cat-12', name: 'Finanzas', parentId: 'cat-11' },
      { id: 'cat-13', name: 'Emprendimiento', parentId: 'cat-11' },
      { id: 'cat-14', name: 'Viajes' },
      { id: 'cat-15', name: 'Gastronomía' },
      { id: 'cat-16', name: 'Política' },
      { id: 'cat-17', name: 'Historia' },
      { id: 'cat-18', name: 'Psicología' },
      { id: 'cat-19', name: 'Filosofía' },
      { id: 'cat-20', name: 'Ingeniería', parentId: 'cat-1' },
      { id: 'cat-21', name: 'Programación', parentId: 'cat-1' },
      { id: 'cat-22', name: 'Robótica', parentId: 'cat-1' },
      { id: 'cat-23', name: 'Astronomía', parentId: 'cat-3' },
      { id: 'cat-24', name: 'Biología', parentId: 'cat-3' },
      { id: 'cat-25', name: 'Química', parentId: 'cat-3' },
      { id: 'cat-26', name: 'Física', parentId: 'cat-3' },
      { id: 'cat-27', name: 'Matemáticas', parentId: 'cat-3' },
      { id: 'cat-28', name: 'Ecología', parentId: 'cat-3' },
      { id: 'cat-29', name: 'Medicina', parentId: 'cat-4' },
      { id: 'cat-30', name: 'Nutrición', parentId: 'cat-4' },
      { id: 'cat-31', name: 'Fitness', parentId: 'cat-6' },
      { id: 'cat-32', name: 'Fútbol', parentId: 'cat-6' },
      { id: 'cat-33', name: 'Baloncesto', parentId: 'cat-6' },
      { id: 'cat-34', name: 'Tenis', parentId: 'cat-6' },
      { id: 'cat-35', name: 'Natación', parentId: 'cat-6' },
      { id: 'cat-36', name: 'Ciclismo', parentId: 'cat-6' },
      { id: 'cat-37', name: 'Boxeo', parentId: 'cat-6' },
      { id: 'cat-38', name: 'Automovilismo', parentId: 'cat-6' },
      { id: 'cat-39', name: 'Voleibol', parentId: 'cat-6' },
      { id: 'cat-40', name: 'Golf', parentId: 'cat-6' },
    ];
    write(CAT_KEY, defaultCats);
  }
}

export const api = {
  listCategories: async (): Promise<Category[]> => {
    await delay(100);
    return read<Category[]>(CAT_KEY) || [];
  },
  createCategory: async (payload: Omit<Category, 'id'>) => {
    await delay(100);
    const all = read<Category[]>(CAT_KEY) || [];
    const newCat: Category = { ...payload, id: `cat-${Date.now()}` };
    all.push(newCat);
    write(CAT_KEY, all);
    return newCat;
  },
  deleteCategory: async (id: string) => {
    await delay(100);
    const all = read<Category[]>(CAT_KEY) || [];
    const next = all.filter((c) => c.id !== id);
    write(CAT_KEY, next);
    return true;
  },
};

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
