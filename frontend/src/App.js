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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="container-custom">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="https://raw.githubusercontent.com/Simonwafula/Mstatili-Tech/main/Mstatili%20Logo.png" 
                alt="Mstatili Technologies Logo" 
                className="h-20 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-vibrant-blue transition-all duration-300 font-medium relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vibrant-blue transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-vibrant-blue transition-all duration-300 font-medium relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vibrant-blue transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-vibrant-blue transition-all duration-300 font-medium relative group">
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vibrant-blue transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-vibrant-blue transition-all duration-300 font-medium relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vibrant-blue transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection('contact')} className="btn-primary text-sm">
                Get Started
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-3 rounded-xl bg-vibrant-blue/10 hover:bg-vibrant-blue/20 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <XMarkIcon className="h-6 w-6 text-vibrant-blue" /> : <Bars3Icon className="h-6 w-6 text-vibrant-blue" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-6 border-t border-white/20 bg-white/95 backdrop-blur-xl rounded-b-2xl">
              <nav className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('home')} className="text-left text-gray-700 hover:text-vibrant-blue transition-colors py-2 px-4 rounded-lg hover:bg-vibrant-blue/10">
                  Home
                </button>
                <button onClick={() => scrollToSection('about')} className="text-left text-gray-700 hover:text-vibrant-blue transition-colors py-2 px-4 rounded-lg hover:bg-vibrant-blue/10">
                  About
                </button>
                <button onClick={() => scrollToSection('services')} className="text-left text-gray-700 hover:text-vibrant-blue transition-colors py-2 px-4 rounded-lg hover:bg-vibrant-blue/10">
                  Services
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-left text-gray-700 hover:text-vibrant-blue transition-colors py-2 px-4 rounded-lg hover:bg-vibrant-blue/10">
                  Contact
                </button>
                <button onClick={() => scrollToSection('contact')} className="btn-primary mt-4 text-center">
                  Get Started
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-20 min-h-screen flex items-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 pattern-dots opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50/80 to-purple-50/60"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-vibrant-blue/20 rounded-full blur-xl animate-bounce-slow"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-vibrant-purple/20 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-vibrant-pink/20 rounded-full blur-xl animate-float"></div>
        
        <div className="container-custom section-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slideRight">
              <div className="mb-8">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-vibrant-blue/20 to-vibrant-cyan/20 text-vibrant-blue font-medium text-sm border border-vibrant-blue/30 animate-glow">
                  🚀 Transforming Kenya's Digital Landscape
                </span>
              </div>
              
              <h2 className="text-6xl lg:text-7xl font-display font-bold text-gray-900 mb-8 leading-tight">
                Transform Your Business with 
                <span className="text-gradient block mt-2">Tech Excellence</span>
              </h2>
              
              <p className="text-xl text-gray-700 mb-10 text-balance leading-relaxed">
                Leading tech consultancy in Kenya, specializing in <strong className="text-vibrant-blue">comprehensive data ecosystem planning</strong>, 
                innovative branding, cutting-edge app development, intelligent automation, and AI-powered solutions to accelerate your business growth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <button onClick={() => scrollToSection('services')} className="btn-primary group">
                  <span className="flex items-center">
                    Explore Services
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
                <button onClick={() => scrollToSection('contact')} className="btn-secondary group">
                  <span className="flex items-center">
                    Get Free Consultation
                    <svg className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </span>
                </button>
              </div>
              
              {/* Enhanced Stats */}
              <div className="grid grid-cols-3 gap-8 p-8 rounded-3xl bg-white/70 backdrop-blur-lg border border-white/30 creative-shadow">
                <div className="text-center group">
                  <div className="text-4xl font-bold bg-gradient-to-r from-vibrant-blue to-vibrant-cyan bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">50+</div>
                  <div className="text-sm text-gray-600 font-medium">Projects Completed</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-bold bg-gradient-to-r from-vibrant-purple to-vibrant-pink bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">95%</div>
                  <div className="text-sm text-gray-600 font-medium">Client Satisfaction</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-bold bg-gradient-to-r from-vibrant-orange to-vibrant-green bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">24/7</div>
                  <div className="text-sm text-gray-600 font-medium">Support Available</div>
                </div>
              </div>
            </div>
            
            <div className="animate-slideLeft relative">
              <div className="relative floating-element">
                <img 
                  src="https://images.unsplash.com/photo-1650901161049-5a508b78388d" 
                  alt="Modern Technology Building" 
                  className="w-full rounded-3xl shadow-2xl creative-shadow"
                />
                
                {/* Floating Badge */}
                <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/30 vibrant-card">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-vibrant-green to-vibrant-blue rounded-2xl flex items-center justify-center glow-blue">
                      <CheckCircleIcon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">Kenya's Trusted</p>
                      <p className="text-vibrant-blue font-semibold">Tech Innovation Partner</p>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-vibrant-orange rounded-full animate-pulse"></div>
                <div className="absolute top-20 left-4 w-6 h-6 bg-vibrant-purple rounded-full animate-bounce"></div>
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
      <section id="services" className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 pattern-grid opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/50 to-purple-50/30"></div>
        
        <div className="container-custom section-padding relative z-10">
          <div className="text-center mb-20">
            <span className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-vibrant-blue/20 to-vibrant-purple/20 text-vibrant-blue font-semibold text-sm border border-vibrant-blue/30 mb-6">
              💼 Our Expert Services
            </span>
            <h2 className="text-5xl font-display font-bold text-gray-900 mb-6">
              <span className="text-gradient">Innovative Solutions</span> for Modern Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Comprehensive technology solutions designed to accelerate your business growth and digital transformation with creativity and precision
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = serviceIcons[service.id] || BuildingOfficeIcon;
              const gradients = [
                'from-vibrant-blue to-vibrant-cyan',
                'from-vibrant-purple to-vibrant-pink',
                'from-vibrant-orange to-vibrant-green',
                'from-vibrant-pink to-vibrant-purple',
                'from-vibrant-cyan to-vibrant-blue'
              ];
              const glowColors = ['glow-blue', 'glow-purple', 'glow-pink', 'glow-blue', 'glow-purple'];
              
              return (
                <div 
                  key={service.id} 
                  className={`card-vibrant p-8 text-center animate-slideUp group transition-all duration-500`} 
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-vibrant-blue transition-colors">
                    {service.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3 group-hover:translate-x-2 transition-transform duration-300" style={{ transitionDelay: `${idx * 50}ms` }}>
                        <div className={`w-6 h-6 bg-gradient-to-r ${gradients[index % gradients.length]} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <CheckCircleIcon className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {service.id === 'data-solutions' && (
                    <button
                      onClick={() => setShowDataDetails(!showDataDetails)}
                      className={`mt-8 bg-gradient-to-r ${gradients[index % gradients.length]} text-white font-bold py-3 px-6 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                    >
                      {showDataDetails ? 'Hide Details' : 'Explore Data Solutions'}
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
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        
        <div className="container-custom py-16 relative z-10">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src="https://raw.githubusercontent.com/Simonwafula/Mstatili-Tech/main/Mstatili%20Logo.png" 
                  alt="Mstatili Technologies Logo" 
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Transforming businesses through innovative technology solutions in Kenya and beyond. 
                Your trusted partner for digital transformation and data-driven growth.
              </p>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-vibrant-blue to-vibrant-cyan rounded-xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  <span className="text-white font-bold">f</span>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-vibrant-purple to-vibrant-pink rounded-xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  <span className="text-white font-bold">t</span>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-vibrant-orange to-vibrant-green rounded-xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  <span className="text-white font-bold">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-6 text-vibrant-blue">Our Services</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#services" className="hover:text-vibrant-blue transition-colors hover:translate-x-2 transform duration-300 block">Branding Solutions</a></li>
                <li><a href="#services" className="hover:text-vibrant-blue transition-colors hover:translate-x-2 transform duration-300 block">App Development</a></li>
                <li><a href="#services" className="hover:text-vibrant-blue transition-colors hover:translate-x-2 transform duration-300 block">Automation</a></li>
                <li><a href="#services" className="hover:text-vibrant-blue transition-colors hover:translate-x-2 transform duration-300 block">AI Solutions</a></li>
                <li><a href="#services" className="hover:text-vibrant-blue transition-colors hover:translate-x-2 transform duration-300 block">Data Analytics</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-6 text-vibrant-cyan">Contact Info</h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-vibrant-blue rounded-lg flex items-center justify-center">
                    <span className="text-xs">📧</span>
                  </div>
                  <span>info@mstatilitechnologies.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-vibrant-green rounded-lg flex items-center justify-center">
                    <span className="text-xs">📞</span>
                  </div>
                  <span>+254 708 385 523</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-vibrant-purple rounded-lg flex items-center justify-center">
                    <span className="text-xs">📍</span>
                  </div>
                  <span>Nairobi, Kenya</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 Mstatili Technologies. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-vibrant-blue transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-vibrant-blue transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-vibrant-blue transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-vibrant-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-vibrant-purple/10 rounded-full blur-3xl"></div>
      </footer>
    </div>
  );
}

export default App;