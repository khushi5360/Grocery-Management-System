import { useState, useEffect } from 'react'
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit, FiSave } from 'react-icons/fi'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    }
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        setUser(data.user)
        setForm({
          name: data.user.name || '',
          phone: data.user.phone || '',
          address: {
            street: data.user.address?.street || '',
            city: data.user.address?.city || '',
            state: data.user.address?.state || '',
            pincode: data.user.address?.pincode || ''
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.success) {
        setUser(data.user)
        setEditing(false)
        localStorage.setItem('user', JSON.stringify({
          ...JSON.parse(localStorage.getItem('user')),
          name: data.user.name
        }))
        alert('✅ Profile updated!')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">

        {/* Header Card */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-white text-center mb-6">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl font-bold text-green-600">
              {user.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-green-200 mt-1">{user.email}</p>
          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
            user.role === 'admin'
              ? 'bg-purple-500 text-white'
              : 'bg-green-500 text-white'
          }`}>
            {user.role}
          </span>
        </div>

        {/* Profile Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Profile Details</h2>
            <button
              onClick={() => setEditing(!editing)}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
            >
              <FiEdit />
              {editing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Phone</label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Street</label>
                <input
                  type="text"
                  placeholder="Street address"
                  value={form.address.street}
                  onChange={(e) => setForm({...form, address: {...form.address, street: e.target.value}})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    value={form.address.city}
                    onChange={(e) => setForm({...form, address: {...form.address, city: e.target.value}})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">State</label>
                  <input
                    type="text"
                    placeholder="State"
                    value={form.address.state}
                    onChange={(e) => setForm({...form, address: {...form.address, state: e.target.value}})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Pincode</label>
                <input
                  type="text"
                  placeholder="Pincode"
                  value={form.address.pincode}
                  onChange={(e) => setForm({...form, address: {...form.address, pincode: e.target.value}})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <FiSave />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <FiUser className="text-green-600 text-xl" />
                <div>
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-800">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <FiMail className="text-green-600 text-xl" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <FiPhone className="text-green-600 text-xl" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-medium text-gray-800">{user.phone || 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <FiMapPin className="text-green-600 text-xl" />
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="font-medium text-gray-800">
                    {user.address?.city
                      ? `${user.address.street}, ${user.address.city}, ${user.address.state} - ${user.address.pincode}`
                      : 'Not set'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}