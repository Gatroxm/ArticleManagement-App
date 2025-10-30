import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPanel from '../../modules/articles/pages/AdminPanel';
// Importa tus páginas aquí
import ArticlesList from '../../modules/articles/pages/ArticlesList';
import ArticleDetail from '../../modules/articles/pages/ArticleDetail';
import ArticleForm from '../../modules/articles/pages/ArticleForm';
import CategoriesList from '../../modules/categories/pages/CategoriesList';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/articles" element={<ArticlesList />} />
      <Route path="/articles/:id" element={<ArticleDetail />} />
      <Route path="/articles/categories" element={<CategoriesList />} />
      <Route path="/articles/create" element={<ArticleForm />} />
      <Route path="/articles/edit/:id" element={<ArticleForm />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
