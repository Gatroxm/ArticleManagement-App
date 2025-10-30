

import { Link } from 'react-router-dom';

export default function AdminPanel() {
  return (
    <div className="h-auto bg-light d-flex flex-column font-sans">
      {/* Header superior tipo AdminPro */}
      <header className="w-100 bg-white shadow-sm d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
        <div className="d-flex align-items-center gap-3">
          <img src="https://ui-avatars.com/api/?name=Admin&background=4f46e5&color=fff&size=48" alt="Avatar" className="rounded-circle" style={{ width: 48, height: 48 }} />
          <span className="h4 fw-bold text-primary mb-0" style={{ fontFamily: 'Montserrat, sans-serif' }}>User</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="text-secondary small">user@demo.com</span>
        </div>
      </header>
      <div className="d-flex flex-grow-1">
        {/* Menú lateral fijo */}
        <aside className="bg-white border-end shadow-sm d-flex flex-column py-4 px-3" style={{ minWidth: 260 }}>
          <h2 className="h5 fw-bold text-primary mb-4 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>Menú</h2>
          <nav className="nav flex-column gap-2">
            <Link to="/admin" className="nav-link text-dark fw-semibold">Dashboard</Link>
            <Link to="/articles" className="nav-link text-dark fw-semibold">Artículos</Link>
            <Link to="/articles/categories" className="nav-link text-dark fw-semibold">Categorías</Link>
            <Link to="/articles/create" className="nav-link text-dark fw-semibold">Crear Artículo</Link>
          </nav>
        </aside>
        {/* Contenido principal tipo plantilla */}
        <main className="flex-grow-1 container py-5">
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card border-primary h-100 shadow-sm">
                <div className="card-body d-flex flex-column align-items-center">
                  <h3 className="card-title h5 text-primary fw-bold mb-2">Artículos</h3>
                  <p className="card-text text-secondary mb-3 text-center">Ver, crear, editar y eliminar artículos.</p>
                  <Link to="/articles" className="btn btn-primary">Ir a Artículos</Link>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-success h-100 shadow-sm">
                <div className="card-body d-flex flex-column align-items-center">
                  <h3 className="card-title h5 text-success fw-bold mb-2">Categorías</h3>
                  <p className="card-text text-secondary mb-3 text-center">Ver y administrar categorías y subcategorías.</p>
                  <Link to="/articles/categories" className="btn btn-success">Ir a Categorías</Link>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-info h-100 shadow-sm">
                <div className="card-body d-flex flex-column align-items-center">
                  <h3 className="card-title h5 text-info fw-bold mb-2">Crear Artículo</h3>
                  <p className="card-text text-secondary mb-3 text-center">Acceso rápido al formulario de creación.</p>
                  <Link to="/articles/create" className="btn btn-info text-white">Crear Artículo</Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
