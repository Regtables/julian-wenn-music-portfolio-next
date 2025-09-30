"use client";

import { SanityImageWithAlt } from "@/app/lib/sanity/types";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";
import Input from "../forms/Input";
import MainButton from "../buttons/MainButton";
import PhoneInfo from "../icons/PhoneInfo";
import EmailInfo from "../icons/EmailInfo";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ContactProps = {
  heading: string;
  text: string;
  image: SanityImageWithAlt;
};

// Form data interface
interface FormData {
  fullName: string;
  email: string;
  instagram: string;
  country: string;
  message: string;
}

// Form errors interface
interface FormErrors {
  fullName?: string;
  email?: string;
  instagram?: string;
  country?: string;
  message?: string;
}

const Contact = ({ heading, text, image }: ContactProps) => {
  // Refs for animation targeting
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    instagram: "",
    country: "",
    message: ""
  });

  // Form validation errors
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  
  // Loading and submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { animateSectionHeading } = useGSAPAnimations();

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/emails/send/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: "",
          email: "",
          instagram: "",
          country: "",
          message: ""
        });
        console.log('Form submitted successfully:', formData);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      instagram: "",
      country: "",
      message: ""
    });
    setFormErrors({});
    setSubmitStatus('idle');
  };

  useGSAP(() => {
    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 90%'
      }
    });

    const contentContainer = contentContainerRef.current;

    // Set initial state - elements invisible
    contactTl.set([imageRef.current, contentContainer?.children], {
      autoAlpha: 0
    }, 0);

    // Animation sequence matching your Webflow pattern
    contactTl
      .add(animateSectionHeading(headingRef.current))
      .fromTo(imageRef.current, 
        { autoAlpha: 0 }, 
        { 
          autoAlpha: 1,
          duration: 0.6,
          ease: "power2.out"
        }
      )
      .fromTo(contentContainer?.children, 
        { 
          y: 0,
          autoAlpha: 0
        },
        {
          y: 30,
          autoAlpha: 1,
          stagger: 0.15,
          duration: 0.5,
          ease: 'circ.out'
        }
      );

    return () => {
      contactTl.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="contact-us flex md:flex-row flex-col w-full lg:h-screen md:h-[60vh]"
      id="contact"
    >
      {/* Image */}
      <div 
        ref={imageRef}
        className="contact-us-image relative md:h-full h-[40vh] md:w-1/2 w-full"
      >
        <Image
          alt={image.alt}
          src={image.image.asset.url}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Copy & Form */}
      <div 
        ref={contentContainerRef}
        className="contact-us-form-container flex text-custom-gold flex-col md:items-end items-center md:w-1/2 gap-5 lg:px-section-x-desktop md:px-section-x-tablet px-section-x-mobile py-12 pt-6 pb-14 md:py-8 justify-center"
      >
        <h2 
          ref={headingRef}
          className="contact-us-heading md:ml-auto w-auto lg:text-8xl md:text-6xl text-4xl md:text-end text-center uppercase"
        >
          {heading}
        </h2>
        
        <p className="text-xs w-3/5 md:text-end text-center">{text}</p>

        <div className="flex gap-8">
          <PhoneInfo />
          <EmailInfo />
        </div>

        {/* Form */}
        <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex min-w-full gap-2">
            <div className="w-full">
              <Input 
                placeholder="Full Name" 
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full" 
                required
              />
              {formErrors.fullName && (
                <span className="text-red-500 text-xs mt-1 block">
                  {formErrors.fullName}
                </span>
              )}
            </div>
            <div className="w-full">
              <Input 
                placeholder="Email Address" 
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {formErrors.email && (
                <span className="text-red-500 text-xs mt-1 block">
                  {formErrors.email}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Input 
              placeholder="Instagram" 
              name="instagram"
              value={formData.instagram}
              onChange={handleInputChange}
              className="w-full"
            />
            <Input 
              placeholder="Country" 
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full border-2 border-custom-gold rounded-lg px-3 py-2 placeholder:text-custom-gold bg-transparent text-custom-gold resize-none min-h-[100px]"
              placeholder="Your Message"
              required
            />
            {formErrors.message && (
              <span className="text-red-500 text-xs mt-1 block">
                {formErrors.message}
              </span>
            )}
          </div>

          {/* Submit Status Messages */}
          {submitStatus === 'success' && (
            <div className="text-green-500 text-sm text-center">
              Thank you! Your message has been sent successfully.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="text-red-500 text-sm text-center">
              Sorry, there was an error sending your message. Please try again.
            </div>
          )}

          <MainButton 
            text={isSubmitting ? "Sending..." : "Submit"} 
            className="w-full min-w-full"
            color="gold"
          />
        </form>
      </div>
    </section>
  );
};

export default Contact;