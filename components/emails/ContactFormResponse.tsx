import * as React from 'react';

interface FormData {
  fullName: string;
  email: string;
  instagram: string;
  country: string;
  message: string;
}

interface ContactFormResponseProps {
  formData: FormData;
}

export default function ContactFormResponse({ formData }: ContactFormResponseProps) {
  const { fullName, email, instagram, country, message } = formData;
  
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
      color: '#333333',
      padding: '20px'
    }}>
      <p>Hi Julian,</p>
      
      <p>You have received a response from the website contact form.</p>
      
      <p><strong>{"Here are the person's details:"}</strong></p>
      
      <div style={{ marginLeft: '20px' }}>
        <p><strong>Name:</strong> {fullName}</p>
        <p><strong>Email:</strong> {email}</p>
        {instagram && <p><strong>Instagram:</strong> {instagram}</p>}
        {country && <p><strong>Country:</strong> {country}</p>}
        <p><strong>Message:</strong></p>
        <p style={{ 
          marginLeft: '20px', 
          fontStyle: 'italic',
          whiteSpace: 'pre-wrap' as const 
        }}>
          {`"${message}"`}
        </p>
      </div>
    </div>
  );
}