import { useState, useEffect } from 'react'
import { FiUsers, FiSearch } from 'react-icons/fi'

export default function Customers() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:5000/api/auth/users', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) setCustomers(data.users)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="text-center py-20">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Customers</h2>
        <div className="text-sm text-gray-500">{customers.length} total</div>
      </div>

      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Customer</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Email</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Phone</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Role</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((customer) => (
              <tr key={customer._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                      {customer.name.charAt(0).toUpperCase()}
                    </div>
                    <p className="font-medium text-gray-800">{customer.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">{customer.email}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">{customer.phone || '-'}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    customer.role === 'admin'
                      ? 'bg-purple-50 text-purple-600'
                      : 'bg-green-50 text-green-600'
                  }`}>
                    {customer.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">
                  {new Date(customer.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No customers found!
          </div>
        )}
      </div>
    </div>
  )
}