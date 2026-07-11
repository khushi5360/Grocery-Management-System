import { useState, useEffect } from 'react'
import { FiPlus, FiEdit, FiTrash2, FiSearch } from 'react-icons/fi'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products')
      const data = await res.json()
      if (data.success) setProducts(data.products)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
    try {
      const token = localStorage.getItem('token')
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchProducts()
    } catch (error) {
      console.log(error)
    }
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="text-center py-20">Loading...</div>

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <div className="text-sm text-gray-500">{products.length} total</div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Product</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Category</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Price</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Stock</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {product.category?.name === 'Fruits' ? '🍎' :
                       product.category?.name === 'Vegetables' ? '🥦' :
                       product.category?.name === 'Dairy' ? '🥛' : '🛒'}
                    </span>
                    <div>
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.unit}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full">
                    {product.category?.name}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-800">₹{product.price}</p>
                  <p className="text-xs text-gray-400 line-through">₹{product.originalPrice}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-medium ${product.stock < 20 ? 'text-red-500' : 'text-green-600'}`}>
                    {product.stock} units
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition">
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}