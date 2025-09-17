import React, { useState } from 'react';
import { ContactIllustration } from '../components/illustrations/ContactIllustration';
import { SpinnerIcon } from '../components/icons/SpinnerIcon';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (formData.name && formData.email && formData.message) {
      console.log('Form submitted:', formData);
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setError('Please fill out all fields.');
      setStatus('idle');
    }
  };


  return (
    <main className="flex-grow bg-slate-50 dark:bg-slate-900 animate-fade-in-up">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white">Get In Touch</h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                We’d love to hear from you. Whether you have a question, feedback, or just want to say hello, please don't hesitate to reach out.
            </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 w-full">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
              {status === 'sent' ? (
                <div className="text-center py-10">
                  <h3 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-2">Thank you!</h3>
                  <p className="text-slate-600 dark:text-slate-300">Your message has been sent. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">Name</label>
                    <input
                      type="text" id="name" name="name"
                      value={formData.name} onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">Email</label>
                    <input
                      type="email" id="email" name="email"
                      value={formData.email} onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">Message</label>
                    <textarea
                      id="message" name="message" rows={5}
                      value={formData.message} onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <button type="submit" disabled={status === 'sending'} className="w-full flex items-center justify-center gap-3 bg-teal-500 text-white font-semibold py-3 rounded-lg hover:bg-teal-600 dark:hover:bg-teal-400 transition-all disabled:bg-slate-400">
                      {status === 'sending' ? <><SpinnerIcon className="w-5 h-5 animate-spin"/> Sending...</> : 'Send Message'}
                    </button>
                  </div>
                  {error && <p className="text-center text-red-500">{error}</p>}
                </form>
              )}
            </div>
          </div>
          <div className="lg:w-1/2 w-full hidden lg:block">
            <ContactIllustration className="w-full h-auto" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
