import { useState } from 'react'
import { FiPhone, FiMail, FiMapPin, FiSend } from 'react-icons/fi'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us 📞</h1>
        <p className="text-green-100 text-lg">
          Koi bhi sawaal? Hum yahan hain!
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Get in Touch
            </h2>

            {[
              { icon: FiPhone, title: 'Phone', value: '+91 72850 93573', color: 'text-green-600' },
              { icon: FiMail, title: 'Email', value: 'support@grocera.com', color: 'text-blue-600' },
              { icon: FiMapPin, title: 'Address', value: '123 Market Street, Mumbai, Maharashtra 400001', color: 'text-red-500' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm">
                <div className={`${item.color} bg-gray-50 p-3 rounded-xl`}>
                  <item.icon className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{item.title}</p>
                  <p className="text-gray-500 text-sm mt-1">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Timings */}
            <div className="bg-green-50 rounded-2xl p-5">
              <h3 className="font-semibold text-green-800 mb-3">⏰ Business Hours</h3>
              <div className="space-y-2 text-sm text-green-700">
                <div className="flex justify-between">
                  <span>Monday - Saturday</span>
                  <span className="font-medium">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">10:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send Message
            </h2>

            {sent && (
              <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-4 text-center font-medium">
                ✅ Message sent successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Apna message likho..."
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <FiSend />
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}