import { Link, useLocation, Routes, Route } from 'react-router-dom';
import AdminPanel from './modules/articles/pages/AdminPanel';
import ArticlesList from './modules/articles/pages/ArticlesList';
import CategoriesList from './modules/categories/pages/CategoriesList';

const tabs = [
  { name: 'Panel de Administración', path: '/admin' },
  { name: 'Artículos', path: '/articles' },
  { name: 'Categorías', path: '/articles/categories' },
];

export default function App() {
  const location = useLocation();
  return (
    <div className="bg-light d-flex flex-column align-items-center justify-content-start font-sans">
      <div className="w-100">
        <div className="card shadow-lg">
          <h1 className="display-4 fw-bold text-primary mb-4 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>Article Management App</h1>
          <nav className="mb-4">
            <div className="nav nav-pills justify-content-center">
              {tabs.map(tab => (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`nav-link px-4 py-2 mx-2 ${location.pathname.startsWith(tab.path) ? 'active' : ''}`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {tab.name}
                </Link>
              ))}
            </div>
          </nav>
          <div>
            <Routes>
              <Route path="/admin/*" element={<AdminPanel />} />
              <Route path="/articles/*" element={<ArticlesList />} />
              <Route path="/articles/categories" element={<CategoriesList />} />
              <Route path="*" element={<ArticlesList />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
