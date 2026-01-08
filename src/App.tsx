import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Code, Database, GitBranch, ExternalLink, Menu, X, ChevronDown, Download } from 'lucide-react';

import profileImage from './assets/images/ajay_bg.png';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = {
    frontend: ['React.js', 'Next.js', 'Redux', 'TypeScript', 'Tailwind CSS', 'Material UI', 'Bootstrap'],
    backend: ['Node.js', 'Express.js', 'RESTful APIs', 'GraphQL', 'JWT Auth'],
    database: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'],
    tools: ['Git', 'Docker', 'AWS', 'Postman', 'Agile/Scrum']
  };

  const experience = [
    {
      title: 'MERN Stack Developer',
      company: 'RadarSoft Technologies PVT LTD',
      location: 'Pune',
      period: 'MAY 2021 - AUG 2025',
      description: 'Developed and maintained MERN stack applications with responsive UI. Integrated RESTful APIs with Redis caching and managed state with Redux.'
    },
    {
      title: 'Associate Software Developer',
      company: 'Aspire SoftServe PVT. LTD.',
      location: 'Ahmedabad',
      period: 'AUG 2025 - OCT 2025',
      description: 'Designed and implemented new product features and web architecture. Created robust server-side logic and RESTful APIs using Node.js.'
    },
    {
      title: 'Trainee Software Engineer',
      company: 'Hefshine Software PVT. LTD.',
      location: 'Pune',
      period: 'NOV 2020 - MAY 2021',
      description: 'Worked as a trainee Software Engineer gaining foundational experience in web development.'
    }
  ];

  const projects = [
    {
      name: 'Executive Search - Consultant Portal',
      description: 'A web-based CRM and search process application enabling executives to manage client data, candidate details, and Fit Quotients in real-time.',
      tech: ['React', 'Node.js', 'PostgreSQL'],
      highlights: ['Database migration', 'RESTful APIs', 'Real-time data management']
    },
    {
      name: 'Executive Search - Report Builder',
      description: 'Customizable status reports with manual field control, template creation, and sharing capabilities for search/job positions.',
      tech: ['React', 'Node.js', 'PostgreSQL'],
      highlights: ['Custom templates', 'Search Grid', 'Report generation']
    },
    {
      name: 'Executive Search - Candidate Sourcing Portal',
      description: 'Candidate analysis platform with third-party AI/ML tool integration for contact details and comprehensive skill tracking.',
      tech: ['React', 'Node.js', 'PostgreSQL'],
      highlights: ['AI/ML integration', 'SFPA tracking', 'Third-party APIs']
    },
    {
      name: 'Executive Search - Interview Application',
      description: 'Interview management portal with candidate comparison capabilities and analytical reports for consultants and clients.',
      tech: ['React', 'Node.js', 'PostgreSQL'],
      highlights: ['Analytical reports', 'Candidate comparison', 'Position matching']
    },
    {
      name: 'HiveTrack',
      description: 'Performance analytics platform for supplier evaluation with interactive dashboards and third-party service integration.',
      tech: ['React', 'Node.js', 'MongoDB'],
      highlights: ['Interactive dashboards', 'Performance metrics', 'Cloud deployment']
    },
    {
      name: 'DivineConnect',
      description: 'Scalable spiritual/educational digital connection platform with secure authentication and optimized performance.',
      tech: ['Next.js', 'Node.js', 'MySQL', 'Docker'],
      highlights: ['Cloud infrastructure', 'Secure auth', 'Cross-browser compatibility']
    }
  ];

  const scrollToSection = (id: any) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  // Placeholder profile image - replace with your actual image
  // const profileImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='480' viewBox='0 0 320 480'%3E%3Crect width='320' height='480' fill='%239333ea'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='48' fill='white'%3EYour Photo%3C/text%3E%3C/svg%3E";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AK
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize hover:text-purple-400 transition-colors ${activeSection === section ? 'text-purple-400' : ''}`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/98 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left px-3 py-2 capitalize hover:bg-purple-900/30 rounded-md transition-colors"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center px-4 pt-16 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-purple-400 opacity-60"></div>
        <div className="absolute top-40 left-20 w-3 h-3 rounded-full bg-pink-400 opacity-60"></div>
        <div className="absolute top-60 left-16 w-2 h-2 rounded-full bg-purple-300 opacity-60"></div>
        <div className="absolute bottom-40 left-32 w-3 h-3 rounded-full bg-pink-300 opacity-60"></div>
        <div className="absolute bottom-60 left-24 w-4 h-4 rounded-full bg-purple-400 opacity-60"></div>
        
        <div className="absolute top-32 right-16 w-3 h-3 rounded-full bg-purple-400 opacity-60"></div>
        <div className="absolute top-1/2 right-12 w-4 h-4 rounded-full bg-pink-400 opacity-60"></div>
        <div className="absolute bottom-32 right-20 w-3 h-3 rounded-full bg-purple-300 opacity-60"></div>
        <div className="absolute bottom-48 right-32 w-2 h-2 rounded-full bg-pink-300 opacity-60"></div>
        <div className="absolute bottom-1/3 right-24 w-4 h-4 rounded-full bg-purple-400 opacity-60"></div>

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left space-y-6">
            <h2 className="text-xl md:text-2xl text-purple-300">Hello, I'm</h2>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Ajay Kumavat
              </span>
              <br />
              <span className="text-white">A MERN Stack</span>
              <br />
              <span className="text-white">Developer</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
              4+ years of expertise in MERN stack development, creating robust web applications with elegant user experiences and modern architecture.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="mailto:ajay.kumavat0815@gmail.com" className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg">
                Get Started
              </a>
              <a href="#" download="Ajay_Kumavat_CV.pdf" className="flex items-center gap-2 border-2 border-purple-400 text-purple-400 hover:bg-purple-400/20 px-8 py-4 rounded-full transition-all">
                <Download size={20} />
                Download CV
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a href="https://github.com/ajay08081995" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-800 hover:bg-purple-600 transition-all transform hover:scale-110">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/ajay-kumavat-039671207/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-800 hover:bg-purple-600 transition-all transform hover:scale-110">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Right Content - Profile Image Area */}
          <div className="relative flex justify-center items-center">
            {/* Large decorative blob background */}
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-yellow-400 to-orange-500 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-sm opacity-90"></div>
            
            {/* Profile container */}
            <div className="relative">
              {/* Decorative curved lines */}
              <svg className="absolute -top-12 -left-12 w-24 h-24 text-purple-400/60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M 20 80 Q 20 20 80 20" />
              </svg>
              <svg className="absolute -bottom-12 -right-12 w-24 h-24 text-pink-400/60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M 80 20 Q 80 80 20 80" />
              </svg>

              {/* Main profile image container */}
              <div className="relative w-80 h-[480px] flex items-end justify-center overflow-visible">
                <div className="relative w-full h-full flex items-end justify-center">
                  <img 
                    src={profileImage}
                    alt="Ajay Kumavat" 
                    className="w-full h-full object-cover object-top relative z-0"
                  />
                </div>
                
                {/* Experience badge */}
                <div className="absolute -bottom-4 -right-4 bg-white text-purple-900 px-6 py-3 rounded-2xl shadow-xl z-10">
                  <div className="text-3xl font-bold">4+</div>
                  <div className="text-sm">Years<br/>Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button onClick={() => scrollToSection('about')} className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-purple-400" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Professional Summary</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                I'm a passionate Full Stack Developer with over 4 years of hands-on experience in building scalable web applications. I specialize in the MERN stack with 3.7 years in React and 3.2 years in Node.js.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I excel at developing robust RESTful APIs, implementing responsive UIs, and optimizing application performance. I'm adaptive to learning new tools and technologies while maintaining excellent problem-solving and debugging skills.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all">
              <h3 className="text-2xl font-bold mb-6 text-purple-400">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin size={20} className="text-purple-400" />
                  <span>Pune, Maharashtra, India</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone size={20} className="text-purple-400" />
                  <span>+91-8380988087</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail size={20} className="text-purple-400" />
                  <span>ajay.kumavat0815@gmail.com</span>
                </div>
                <a href="https://github.com/ajay08081995" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors">
                  <Github size={20} className="text-purple-400" />
                  <span>GitHub Profile</span>
                </a>
                <a href="https://www.linkedin.com/in/ajay-kumavat-039671207/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors">
                  <Linkedin size={20} className="text-purple-400" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Work Experience
          </h2>
          <div className="space-y-6">
            {experience.map((job, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:transform hover:scale-[1.02]">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-purple-400">{job.title}</h3>
                    <p className="text-xl text-gray-300">{job.company}</p>
                    <p className="text-gray-400">{job.location}</p>
                  </div>
                  <span className="text-purple-300 mt-2 md:mt-0">{job.period}</span>
                </div>
                <p className="text-gray-300 leading-relaxed">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:transform hover:scale-[1.02]">
                <h3 className="text-xl font-bold mb-3 text-purple-400">{project.name}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">Key Highlights:</h4>
                  <ul className="list-disc list-inside text-gray-400 space-y-1">
                    {project.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-900/40 text-purple-300 rounded-full text-sm border border-purple-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Code size={24} className="text-purple-400" />
                <h3 className="text-xl font-bold text-purple-400">Frontend</h3>
              </div>
              <div className="space-y-2">
                {skills.frontend.map((skill, i) => (
                  <div key={i} className="text-gray-300">{skill}</div>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Database size={24} className="text-purple-400" />
                <h3 className="text-xl font-bold text-purple-400">Backend</h3>
              </div>
              <div className="space-y-2">
                {skills.backend.map((skill, i) => (
                  <div key={i} className="text-gray-300">{skill}</div>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Database size={24} className="text-purple-400" />
                <h3 className="text-xl font-bold text-purple-400">Database</h3>
              </div>
              <div className="space-y-2">
                {skills.database.map((skill, i) => (
                  <div key={i} className="text-gray-300">{skill}</div>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <GitBranch size={24} className="text-purple-400" />
                <h3 className="text-xl font-bold text-purple-400">Tools</h3>
              </div>
              <div className="space-y-2">
                {skills.tools.map((skill, i) => (
                  <div key={i} className="text-gray-300">{skill}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="mailto:ajay.kumavat0815@gmail.com" className="flex items-center gap-3 bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-full transition-all transform hover:scale-105 text-lg">
              <Mail size={24} />
              Email Me
            </a>
            <a href="tel:+918380988087" className="flex items-center gap-3 border-2 border-purple-400 hover:bg-purple-400/20 px-8 py-4 rounded-full transition-all text-lg">
              <Phone size={24} />
              Call Me
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-sm py-8 px-4 border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2026 Ajay Kumavat. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}