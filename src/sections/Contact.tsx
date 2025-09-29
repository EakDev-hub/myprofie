import React, { useState } from 'react';
import { getContactData } from '../utils/dataLoader';

const Contact: React.FC = () => {
  const data = getContactData();
  
  const [formData, setFormData] = useState(() => {
    const initialData: Record<string, string> = {};
    data.form.fields.forEach(field => {
      initialData[field.name] = '';
    });
    return initialData;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className={`section-padding ${data.section.backgroundColor}`}>
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            {data.section.title}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">{data.content.heading}</h3>
              <p className="text-gray-600 mb-8">
                {data.content.description}
              </p>
              <div className="space-y-4">
                {data.contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="w-6 h-6 text-primary-600 mr-4" fill="none" stroke="currentColor" viewBox={info.icon.viewBox}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={info.icon.path} />
                    </svg>
                    <span className="text-gray-900">{info.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {data.form.fields.map((field, index) => (
                  <div key={index}>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        rows={field.rows || 3}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required={field.required}
                      ></textarea>
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required={field.required}
                      />
                    )}
                  </div>
                ))}
                <button type="submit" className={data.form.submitButton.className}>
                  {data.form.submitButton.label}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;