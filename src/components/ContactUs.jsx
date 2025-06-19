import React, { useState } from 'react';

function Page6() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    query: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      alert(data.message);
      setFormData({ name: '', contact: '', query: '', message: '' });
    } catch (err) {
      alert('Failed to send message');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center text-white px-6 sm:px-10 pt-32 pb-20 font-sans">
      <h1 className="text-5xl sm:text-6xl font-extrabold font-bebas tracking-widest text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-amber-400">
        Contact Us
      </h1>

      <p className="text-lg sm:text-xl text-gray-300 max-w-2xl text-center mb-10 leading-relaxed font-light">
        Have a project in mind or want to collaborate? Reach out to us and let's create something amazing together!
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-md animate-fadeInUp">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400 transition"
          required
        />

        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Your Contact No."
          className="px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400 transition"
          required
        />

        <select
          name="query"
          value={formData.query}
          onChange={handleChange}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          required
        >
          <option value="" disabled>What are you interested in?</option>
          <option value="photography">Brand Films</option>
          <option value="pre wedding">Brand Reels</option>
          <option value="videography">Weddings & Events</option>
          <option value="event coverage">Photography</option>
          <option value="others">Others</option>
        </select>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows={5}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400 resize-none transition"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-amber-500 via-pink-500 to-red-500 text-black font-bold py-3 rounded-xl uppercase tracking-wide hover:opacity-90 transition duration-200 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

export default Page6;
