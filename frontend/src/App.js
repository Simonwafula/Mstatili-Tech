import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Bars3Icon, 
  XMarkIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  CheckCircleIcon,
  StarIcon,
  BuildingOfficeIcon,
  DevicePhoneMobileIcon,
  CogIcon,
  CpuChipIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [dataServiceDetails, setDataServiceDetails] = useState(null);
  const [showDataDetails, setShowDataDetails] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchServices();
    fetchDataServiceDetails();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/services`);
      setServices(response.data.services);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchDataServiceDetails = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/data-solutions-detail`);
      setDataServiceDetails(response.data);
    } catch (error) {
      console.error('Error fetching data service details:', error);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${BACKEND_URL}/api/contact`, contactForm);
      setFormStatus({ type: 'success', message: response.data.message });
      setContactForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });
    } catch (error) {
      setFormStatus({ 
        type: 'error', 
        message: error.response?.data?.detail || 'Error submitting form. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const serviceIcons = {
    'branding': BuildingOfficeIcon,
    'app-development': DevicePhoneMobileIcon,
    'automation': CogIcon,
    'ai-solutions': CpuChipIcon,
    'data-solutions': ChartBarIcon
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src="https://raw.githubusercontent.com/Simonwafula/Mstatili-Tech/main/Mstatili%20Logo.png" 
                alt="Mstatili Technologies Logo" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h1 className="text-lg font-display font-bold text-gray-900">Mstatili Technologies</h1>
                <p className="text-xs text-gray-600">Tech & Data Solutions</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-primary-600 transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-primary-600 transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-primary-600 transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-primary-600 transition-colors">
                Contact
              </button>
              <button onClick={() => scrollToSection('contact')} className="btn-primary">
                Get Started
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 bg-white">
              <nav className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('home')} className="text-left text-gray-700 hover:text-primary-600 transition-colors">
                  Home
                </button>
                <button onClick={() => scrollToSection('about')} className="text-left text-gray-700 hover:text-primary-600 transition-colors">
                  About
                </button>
                <button onClick={() => scrollToSection('services')} className="text-left text-gray-700 hover:text-primary-600 transition-colors">
                  Services
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-left text-gray-700 hover:text-primary-600 transition-colors">
                  Contact
                </button>
                <button onClick={() => scrollToSection('contact')} className="btn-primary mt-4">
                  Get Started
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-16 gradient-bg">
        <div className="container-custom section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slideUp">
              <h2 className="text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
                Transform Your Business with 
                <span className="text-gradient block">Tech Excellence</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 text-balance">
                Leading tech consultancy in Kenya, specializing in branding, app development, automation, AI solutions, and comprehensive data analytics to accelerate your business growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => scrollToSection('services')} className="btn-primary">
                  Explore Services
                </button>
                <button onClick={() => scrollToSection('contact')} className="btn-secondary">
                  Get Free Consultation
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">50+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">95%</div>
                  <div className="text-sm text-gray-600">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">24/7</div>
                  <div className="text-sm text-gray-600">Support Available</div>
                </div>
              </div>
            </div>
            
            <div className="animate-fadeIn">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1650901161049-5a508b78388d" 
                  alt="Modern Technology Building" 
                  className="w-full rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircleIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Kenya's Trusted</p>
                      <p className="text-sm text-gray-600">Tech Partner</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white">
        <div className="container-custom section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1573497619860-6d82917e4ec8" 
                alt="Professional Team Meeting" 
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
            
            <div>
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                About Mstatili Tech & Data Solutions
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We are a leading technology consultancy firm based in Kenya, dedicated to empowering businesses 
                through innovative technology solutions. Our expertise spans across multiple domains, ensuring 
                comprehensive digital transformation for our clients.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-6 w-6 text-primary-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Expert Team</h3>
                    <p className="text-gray-600">Skilled professionals with years of industry experience</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-6 w-6 text-primary-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Local Understanding</h3>
                    <p className="text-gray-600">Deep knowledge of Kenyan market and business landscape</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-6 w-6 text-primary-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">End-to-End Solutions</h3>
                    <p className="text-gray-600">Complete project lifecycle management from concept to deployment</p>
                  </div>
                </div>
              </div>
              
              <button onClick={() => scrollToSection('contact')} className="btn-primary">
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-gray-50">
        <div className="container-custom section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive technology solutions designed to accelerate your business growth and digital transformation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = serviceIcons[service.id] || BuildingOfficeIcon;
              return (
                <div key={service.id} className="card p-8 text-center animate-slideUp" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.name}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-primary-600" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  {service.id === 'data-solutions' && (
                    <button
                      onClick={() => setShowDataDetails(!showDataDetails)}
                      className="mt-6 btn-primary text-sm"
                    >
                      {showDataDetails ? 'Hide Details' : 'Learn More'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Data Solutions Detail Section */}
      {showDataDetails && dataServiceDetails && (
        <section className="bg-white">
          <div className="container-custom section-padding">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                {dataServiceDetails.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
                {dataServiceDetails.subtitle}
              </p>
              <p className="text-lg text-gray-700 max-w-5xl mx-auto">
                {dataServiceDetails.overview}
              </p>
            </div>

            {/* Planning Phases */}
            <div className="mb-16">
              <h3 className="text-3xl font-display font-bold text-gray-900 mb-8 text-center">
                Our Data Planning Process
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dataServiceDetails.planning_phases.map((phase, index) => (
                  <div key={index} className="card p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">{phase.phase}</h4>
                    </div>
                    <p className="text-gray-600 mb-4">{phase.description}</p>
                    <div className="space-y-2">
                      <h5 className="text-sm font-semibold text-gray-900">Key Deliverables:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {phase.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <CheckCircleIcon className="h-3 w-3 text-primary-600" />
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Benefits */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Key Benefits
                </h3>
                <div className="space-y-4">
                  {dataServiceDetails.key_benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircleIcon className="h-5 w-5 text-primary-600 mt-1" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Technologies We Use
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {dataServiceDetails.technologies.map((tech, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg text-center">
                      <span className="text-sm font-medium text-gray-700">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-primary text-lg px-8 py-4"
              >
                Start Your Data Transformation Journey
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="bg-white">
        <div className="container-custom section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Why Choose Mstatili Technologies?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine technical expertise with local market knowledge to deliver exceptional results
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Assurance</h3>
              <p className="text-gray-600">Rigorous testing and quality control processes ensure exceptional deliverables</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock technical support and maintenance services</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPinIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Expertise</h3>
              <p className="text-gray-600">Deep understanding of Kenyan business environment and regulations</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CpuChipIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation Focus</h3>
              <p className="text-gray-600">Leveraging cutting-edge technologies to drive business transformation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-primary-600">
        <div className="container-custom section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="text-white">
              <h2 className="text-4xl font-display font-bold mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Get in touch with our expert team to discuss your project requirements and discover how we can help accelerate your digital transformation.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                    <PhoneIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-primary-100">+254 708 385 523</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                    <EnvelopeIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-primary-100">info@mstatilitechnologies.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                    <MapPinIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-primary-100">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h3>
              
              {formStatus.message && (
                <div className={`mb-6 p-4 rounded-lg ${formStatus.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
                  {formStatus.message}
                </div>
              )}
              
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={contactForm.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Interest</label>
                  <select
                    name="service"
                    value={contactForm.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="branding">Branding Solutions</option>
                    <option value="app-development">App Development</option>
                    <option value="automation">Automation Solutions</option>
                    <option value="ai-solutions">AI Solutions</option>
                    <option value="data-solutions">Data Solutions</option>
                    <option value="consultation">General Consultation</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white">
        <div className="container-custom py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="https://raw.githubusercontent.com/Simonwafula/Mstatili-Tech/main/Mstatili%20Logo.png" 
                  alt="Mstatili Technologies Logo" 
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <h3 className="font-display font-bold">Mstatili Technologies</h3>
                  <p className="text-sm text-gray-400">Tech & Data Solutions</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Transforming businesses through innovative technology solutions in Kenya and beyond.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#services" className="hover:text-white transition-colors">Branding Solutions</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">App Development</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Automation</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">AI Solutions</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Data Analytics</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📧 info@mstatilitechnologies.com</p>
                <p>📞 +254 708 385 523</p>
                <p>📍 Nairobi, Kenya</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Mstatili Tech and Data Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;