import { useState, useEffect } from 'react'
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', description: '', icon: '', image: '' })

  useEffect(() => { fetchCategories() }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/categories')
      const data = await res.json()
      if (data.success) setCategories(data.categories)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:5000/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.success) {
        setShowModal(false)
        setForm({ name: '', description: '', icon: '', image: '' })
        fetchCategories()
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) return <div className="text-center py-20">Loading...</div>

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
        >
          <FiPlus />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div key={cat._id} className="bg-white rounded-2xl p-6 shadow-sm text-center hover:shadow-md transition">
            {cat.image ? (
              <img
                src={cat.image}
                alt={cat.name}
                className="w-16 h-16 mx-auto mb-3 object-cover rounded-xl"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }}
              />
            ) : null}
            <div className="text-5xl mb-3" style={{ display: cat.image ? 'none' : 'block' }}>{cat.icon || '📦'}</div>
            <h3 className="font-bold text-gray-800">{cat.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{cat.description}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold">Add Category</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <FiX />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Name *</label>
                <input
                  type="text"
                  placeholder="Fruits"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
                <input
                  type="text"
                  placeholder="Fresh fruits"
                  value={form.description}
                  onChange={(e) => setForm({...form, description: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Icon (Emoji)</label>
                <input
                  type="text"
                  placeholder="🍎"
                  value={form.icon}
                  onChange={(e) => setForm({...form, icon: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Image URL (optional, emoji ki jagah use hoga)</label>
                <input
                  type="text"
                  placeholder="https://example.com/fruits.jpg"
                  value={form.image}
                  onChange={(e) => setForm({...form, image: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                />
                {form.image && (
                  <img
                    src={form.image}
                    alt="preview"
                    className="mt-2 w-16 h-16 object-cover rounded-xl border border-gray-200"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                )}
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2.5 rounded-xl hover:bg-green-700 transition"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}