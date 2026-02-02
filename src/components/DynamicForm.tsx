import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { sendEmail } from '@/lib/sendEmail';

// Field definition for modular forms
export type Field = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
};

// Props for the DynamicForm component
export type DynamicFormProps = {
  formType: string;
  fields: Field[];
  onSuccess?: () => void;
};

/**
 * DynamicForm is a reusable, type-safe form component that submits data to Supabase
 * and displays success/error messages. It is fully modular for any form type.
 */
const DynamicForm: React.FC<DynamicFormProps> = ({ formType, fields, onSuccess }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setMessage('');
    try {
      // Store submission in Supabase
      const { error } = await supabase.from('form_submissions').insert([
        {
          form_type: formType,
          fields: formData,
          email: formData.email || null,
        },
      ]);
      if (error) throw error;

      // Send email notification to info@carcrt.org
      try {
        await sendEmail({
          to: 'info@carcrt.org',
          subject: `New ${formType} submission`,
          html: `<h2>New ${formType} Submission</h2><pre>${JSON.stringify(formData, null, 2)}</pre><p>Submitted at: ${new Date().toLocaleString()}</p>`
        });
      } catch (emailErr) {
        // Optionally log or display email error, but do not block form success
        console.error('Email notification failed:', emailErr);
      }

      setStatus('success');
      setMessage('Thank you! Your submission was received.');
      setFormData({});
      onSuccess?.();
    } catch (err: any) {
      setStatus('error');
      setMessage('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block font-medium">
            {field.label}
            {field.required && ' *'}
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                required={field.required}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className="mt-1 block w-full border rounded"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                required={field.required}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className="mt-1 block w-full border rounded"
              />
            )}
          </label>
        </div>
      ))}
      <button type="submit" className="btn btn-primary">Submit</button>
      {status === 'success' && <div className="text-green-600">{message}</div>}
      {status === 'error' && <div className="text-red-600">{message}</div>}
    </form>
  );
};

export default DynamicForm;
