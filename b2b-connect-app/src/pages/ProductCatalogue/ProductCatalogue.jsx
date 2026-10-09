import Navbar from '../../components/Navbar/Navbar'
import './ProductCatalogue.css'

function ProductCatalogue() {
  return (
    <div className="catalogue-page">
      <Navbar />
      <main className="catalogue-page__body">
        <div className="catalogue-page__hero">
          <div className="catalogue-page__icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <h1>Product Catalogue</h1>
          <p>Manage your products and services here. This page will be available soon.</p>
          <div className="catalogue-page__placeholder">
            <div className="catalogue-page__card-skeleton" />
            <div className="catalogue-page__card-skeleton" />
            <div className="catalogue-page__card-skeleton" />
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductCatalogue
