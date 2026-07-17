import { useState, useEffect } from 'react'
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiX } from 'react-icons/fi'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    discount: '',
    category: '',
    unit: 'kg',
    stock: '',
    imageUrl: '',
    isFeatured: false,
    isBestSeller: false
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
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

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/categories')
      const data = await res.json()
      if (data.success) setCategories(data.categories)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...form,
          images: form.imageUrl ? [form.imageUrl] : []
        })
      })
      const data = await res.json()
      if (data.success) {
        setShowModal(false)
        fetchProducts()
        setForm({
          name: '', description: '', price: '',
          originalPrice: '', discount: '', category: '',
          unit: 'kg', stock: '', imageUrl: '', isFeatured: false, isBestSeller: false
        })
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
  if (!window.confirm('Delete this product?')) return
  try {
    const token = localStorage.getItem('token')
    console.log('Token:', token) // Debug
    
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    console.log('Delete response:', data) // Debug
    
    if (data.success) {
      fetchProducts()
    } else {
      alert(data.message)
    }
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
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
        >
          <FiPlus />
          Add Product
        </button>
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
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-lg"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'inline' }}
                      />
                    ) : null}
                    <span className="text-2xl" style={{ display: product.images && product.images.length > 0 ? 'none' : 'inline' }}>
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

      {/* ADD PRODUCT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-800">Add New Product</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <FiX />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">

              {/* Name */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Description *
                </label>
                <textarea
                  placeholder="Enter product description"
                  value={form.description}
                  onChange={(e) => setForm({...form, description: e.target.value})}
                  required
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 resize-none"
                />
              </div>

              {/* Price + Original Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    placeholder="120"
                    value={form.price}
                    onChange={(e) => setForm({...form, price: e.target.value})}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="150"
                    value={form.originalPrice}
                    onChange={(e) => setForm({...form, originalPrice: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>

              {/* Discount + Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    placeholder="20"
                    value={form.discount}
                    onChange={(e) => setForm({...form, discount: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Stock *
                  </label>
                  <input
                    type="number"
                    placeholder="100"
                    value={form.stock}
                    onChange={(e) => setForm({...form, stock: e.target.value})}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/apple.jpg"
                  value={form.imageUrl}
                  onChange={(e) => setForm({...form, imageUrl: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                />
                {form.imageUrl && (
                  <img
                    src={form.imageUrl}
                    alt="preview"
                    className="mt-2 w-20 h-20 object-cover rounded-xl border border-gray-200"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                )}
              </div>

              {/* Category + Unit */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({...form, category: e.target.value})}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Unit
                  </label>
                  <select
                    value={form.unit}
                    onChange={(e) => setForm({...form, unit: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                  >
                    <option value="kg">kg</option>
                    <option value="litre">litre</option>
                    <option value="piece">piece</option>
                    <option value="dozen">dozen</option>
                    <option value="packet">packet</option>
                  </select>
                </div>
              </div>

              {/* Featured + BestSeller */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => setForm({...form, isFeatured: e.target.checked})}
                    className="w-4 h-4 accent-green-600"
                  />
                  <span className="text-sm text-gray-700">Featured Product</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isBestSeller}
                    onChange={(e) => setForm({...form, isBestSeller: e.target.checked})}
                    className="w-4 h-4 accent-green-600"
                  />
                  <span className="text-sm text-gray-700">Best Seller</span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2.5 rounded-xl hover:bg-green-700 transition font-medium"
                >
                  Add Product
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}