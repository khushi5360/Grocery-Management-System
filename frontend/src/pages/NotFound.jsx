import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl mb-4">😕</div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Page Not Found!
        </h2>
        <p className="text-gray-500 mb-8">
          Aapne jo page dhundha wo exist nahi karta!
        </p>
        <Link
          to="/"
          className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition"
        >
          🏠 Go to Home
        </Link>
      </div>
    </div>
  )
}