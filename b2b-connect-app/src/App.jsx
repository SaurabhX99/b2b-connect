import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Login from './pages/Auth/Login'
import GetStarted from './pages/Auth/GetStarted'
import OtpVerification from './pages/OtpVerification/OtpVerification'
import BusinessProfile from './pages/BusinessProfile/BusinessProfile'
import ProductCatalogue from './pages/ProductCatalogue/ProductCatalogue'
import Requirements from './pages/Requirements/Requirements'
import FindSuppliers from './pages/FindSuppliers/FindSuppliers'
import ForSellers from './pages/ForSellers/ForSellers'
import Pricing from './pages/Pricing/Pricing'
import Contact from './pages/Contact/Contact'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth" element={<GetStarted />} />
      <Route path="/verify" element={<OtpVerification />} />
      <Route path="/onboarding" element={<BusinessProfile />} />
      <Route path="/catalogue" element={<ProductCatalogue />} />
      <Route path="/requirements" element={<Requirements />} />
      <Route path="/find-suppliers" element={<FindSuppliers />} />
      <Route path="/for-sellers" element={<ForSellers />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}

export default App
