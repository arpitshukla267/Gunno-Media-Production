import React, { useState } from 'react';

function Page6() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    query: '',      // NEW FIELD
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
        body: JSON.stringify(formData),   // query now included automatically
      });
      const data = await res.json();
      alert(data.message);
      setFormData({ name: '', contact: '', query: '', message: '' }); // Clear form
    } catch (err) {
      alert('Failed to send message');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center text-white px-10 pt-32 pb-14 gap-10 sm:gap-4">
      <h1 className="uppercase font-extrabold bebas-font text-center text-4xl tracking-widest mb-8">
        Contact Us
      </h1>

      <p className="text-lg text-gray-300 max-w-xl text-center mb-8">
        Have a project in mind or want to collaborate? Reach out to us and let's create something amazing together!
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-md">

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="px-4 py-3 rounded bg-gray-800 text-white focus:outline-none"
          required
        />

        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Your Contact No."
          className="px-4 py-3 rounded bg-gray-800 text-white focus:outline-none"
          required
        />

        {/* NEW QUERY SECTION */}
        <select
          name="query"
          value={formData.query}
          onChange={handleChange}
          className="px-4 py-3 rounded bg-gray-800 text-white focus:outline-none"
          required
        >
          <option value="" disabled>
            What are you interested in?
          </option>
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
          className="px-4 py-3 rounded bg-gray-800 text-white focus:outline-none resize-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-amber-500 via-pink-500 to-red-500 text-black font-bold py-3 rounded uppercase tracking-wider hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

export default Page6;
