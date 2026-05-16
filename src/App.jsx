import React, { useState, useEffect } from 'react';
import expenseTrackerBg from './assets/images/backgrounds/Expense_Tracker.jpg';
import weatherReportBg from './assets/images/backgrounds/Weather_Report.jpg';
import profilePhoto from './assets/images/profile/ProfilePhoto.jpg';
import gatewayPlacementBg from './assets/images/backgrounds/Gateway_Placement.jpg';
import monthlyReportBg from './assets/images/backgrounds/Monthly_Report.jpg';
import allabolagScraperBg from './assets/images/backgrounds/Scraper.jpg';
import resumeImage from './assets/images/profile/Resume.png';
import resumePDF from './assets/documents/Vinayashree_Resume.pdf';
import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { motion } from "framer-motion";
import './index.css';
import {
  Check, 
  Monitor, 
  Database, 
  Settings,
  GitBranch,
  UserCircle,
  MailOpen,
  ExternalLink,
  Code2,
  Layers,
  Cpu,
  Globe,
  X,
} from 'lucide-react';

// --- Reusable Components ---

const SectionHeading = ({ children }) => (
  <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100 mb-8">
    {children}
  </h2>
);

const ProjectCard = ({ title, desc, tech, live, github, backgroundImage }) => (
  <div 
    className={`group relative border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl transition-all overflow-hidden min-h-[280px] flex flex-col justify-end ${
      backgroundImage ? 'text-white' : 'bg-white dark:bg-slate-900'
    }`}
    style={
      backgroundImage ? { 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      } : {}
    }
  >
    {/* Gradient Overlay for Readability (Only shows if image exists) */}
    {backgroundImage && (
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/100 to-transparent z-6" />
    )}

    {/* Content Container (z-10 to stay above the image/overlay) */}
    <div className="relative z-10 w-full">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${backgroundImage ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
          <Code2 size={24} />
        </div>
        <div className={`flex gap-3 ${backgroundImage ? 'text-white/70' : 'text-slate-400'}`}>
          <a href={github} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">
            <GitBranch size={20} />
          </a>
          <a href={live} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <h3 className={`text-xl font-bold mb-2 ${backgroundImage ? 'text-white' : 'text-slate-800 dark:text-slate-100' }`}>
        {title}
      </h3>
      <p className={`text-sm mb-4 leading-relaxed ${backgroundImage ? 'text-slate-200' : 'text-slate-600 dark:text-slate-400'}`}>
        {desc}
      </p>

      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <span 
            key={t} 
            className={`px-3 py-1 text-xs font-semibold rounded-md italic ${
              backgroundImage 
                ? 'bg-white/20 dark:bg-slate-900/20 text-white backdrop-blur-sm' 
                : 'bg-slate-100 text-slate-600 dark:text-slate-400'
            }`}
          >
            #{t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// --- Component for the Skill Card ---
const SkillCard = ({ icon: Icon, title, skills }) => (
  <div className="relative bg-white dark:bg-slate-900 p-8 pt-12 border border-slate-100 rounded-lg shadow-sm text-center">
    {/* Floating Icon */}
    <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-[#1E293B] rounded-full flex items-center justify-center text-white shadow-md">
      <Icon size={28} />
    </div>
    
    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">{title}</h3>
    
    <ul className="text-left space-y-3">
      {skills.map((skill, index) => (
        <li key={index} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm">
          <Check size={16} className="text-[#1E293B] mt-0.5 shrink-0" />
          <span>{skill}</span>
        </li>
      ))}
    </ul>
  </div>
);

// --- Main Application ---
export default function App() {

const [darkMode, setDarkMode] = useState(false);
const [formData, setFormData] = useState({ name: '', email: '', message: '' });
const [activeSection, setActiveSection] = useState('home');

useEffect(() => {
  document.documentElement.classList.toggle('dark', darkMode);
}, [darkMode]);

useEffect(() => {
  const sections = ['home', 'aboutMe', 'projects', 'resume', 'skills', 'contact'];
  
  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Find the topmost visible section
        const topmost = visibleEntries.reduce((top, entry) => {
          return entry.boundingClientRect.top < top.boundingClientRect.top ? entry : top;
        });
        setActiveSection(topmost.target.id);
      }
    },
    { threshold: 0.1 }
  );

  sections.forEach((id) => {
    const element = document.getElementById(id);
    if (element) observer.observe(element);
  });

  return () => observer.disconnect();
}, []);

const handleFormChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  window.location.href = `mailto:vinayapatanakar@gmail.com?subject=Portfolio%20Contact%20from%20${formData.name}&body=${formData.message}%0D%0AFrom:%20${formData.email}`;
  setFormData({ name: '', email: '', message: '' });
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};
  return (
    <div className="min-h-screen">
     {/* Toggle Button */}
      <button
  onClick={() => setDarkMode(!darkMode)}
  className="fixed top-2 right-4 z-[100] p-3 rounded-full 
             bg-[#1E293B] text-white 
             dark:bg-white dark:text-slate-900 
             shadow-lg border border-slate-200 dark:border-slate-700
             transition-all duration-300 hover:scale-105"
>
  {darkMode ?  <Sun /> : <Moon />}
</button>
     {/* Main App */}
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-l font-black tracking-tighter text-blue-500 underline-offset-4">VINAYASHREE TUKARAM PATANAKAR</span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a href="#home" className={`transition-colors ${activeSection === 'home' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'hover:text-blue-600'}`}>Home</a>
            <a href="#aboutMe" className={`transition-colors ${activeSection === 'aboutMe' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'hover:text-blue-600'}`}>About Me</a>
            <a href="#skills" className={`transition-colors ${activeSection === 'skills' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'hover:text-blue-600'}`}>Skills</a>
            <a href="#projects" className={`transition-colors ${activeSection === 'projects' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'hover:text-blue-600'}`}>Projects</a>
            <a href="#resume" className={`transition-colors ${activeSection === 'resume' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'hover:text-blue-600'}`}>Resume</a>
            <a href="#contact" className={`transition-colors ${activeSection === 'contact' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'hover:text-blue-600'}`}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
    <section id="home">
      <header className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          {/* Left Column - Text (60%) */}
         <motion.div 
  variants={fadeUp}
  initial="hidden"
  animate="show"
  className="md:col-span-3"
><span className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold mb-4">
  ✅ Open to Work
</span>
            <p className="text-blue-600 dark:text-blue-400 font-bold tracking-widest text-sm mb-4 uppercase">Available for roles in Sweden / Remote</p>
            <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 font-bold mb-2">Hello, I'm VINAYASHREE TUKARAM PATANAKAR</p>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 tracking-tight">
              Full Stack Developer building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">scalable systems.</span>
            </h1>
            <div className="flex gap-4">
              <a href="#projects" className="px-8 py-4 bg-[#1E293B] dark:bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 dark:hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 dark:shadow-blue-900/50">
                Previous Projects
              </a>
            </div>
          </motion.div>
          
          {/* Right Column - Image (40%) */}
          <div className="md:col-span-2 flex justify-center md:justify-end">
            <img 
              src={profilePhoto} 
              alt="Profile Photo" 
              className="w-full rounded-2xl shadow-2xl object-cover"
            />
          </div>
        </div>
      </header>
    </section>

      {/* About Me */}
      <section id="aboutMe" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">About Me</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Hi, I am a Full Stack Developer with 5+ years of experience building scalable, secure, and high-performance web applications.
            I specialize in React, Node.js, and TypeScript, with strong experience in cloud platforms (Azure, GCP) and modern DevOps practices. I enjoy creating intuitive user interfaces while ensuring robust backend systems.
            Recently, I worked on an interactive site-map tool, energy analytics dashboards, and automation solutions that improved efficiency and reduced manual effort.
            I’m passionate about building impactful digital products that support innovation, sustainability, and real-world problem solving.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="#contact" className="px-8 py-4 bg-[#1E293B] dark:bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 dark:hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 dark:shadow-blue-900/50">
              Hire Me
            </a>
            <a href="#resume" className="px-8 py-4 border hover:text-white border-slate-200 dark:border-slate-700 hover:bg-blue-600 rounded-xl font-semibold dark:hover:bg-blue-600 transition-all">
              Resume
            </a>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Skills Overview</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          I have a broad technical skill set spanning frontend, backend, and cloud technologies. 
          Below is a quick overview of my main tools and languages.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
        <SkillCard 
          icon={Monitor} 
          title="Frontend" 
          skills={[
            "React.js, Angular, Vue.js",
            "JavaScript (ES6+), TypeScript",
            "HTML5, CSS3, Tailwind CSS",
            "Responsive Design & PWA"
          ]} 
        />
        
        <SkillCard 
          icon={Database} 
          title="Backend & DB" 
          skills={[
            "Node.js, Express.js",
            "Java (Spring Boot), C#, PHP",
            "MySQL, PostgreSQL, MS SQL",
            "MongoDB",
            "Microservices Architecture"
          ]} 
        />

        <SkillCard 
          icon={Settings} 
          title="Cloud & Tools" 
          skills={[
            "Azure & GCP (CI/CD)",
            "Docker & Kubernetes",
            "Git, GitHub & Postman",
            "Agile / Scrum / Teamwork",
            "REST APIs & Data Processing"
          ]} 
        />

      </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="bg-slate-50 dark:bg-slate-800 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading>Projects</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
            <ProjectCard
              title="Expense Tracker Website"
              backgroundImage={expenseTrackerBg} // Pass the image here
              desc="A full-featured Expense Tracker Web Application built using React.js that helps users manage their personal finances efficiently. 
              The application provides a clean and interactive interface to track income, expenses, and overall financial health with real-time insights and visual analytics."
              tech={['React', 'Node.js', 'MongoDB']}
              github="https://github.com/VinayashreePatanakar/expense-tracker"
              live="https://expense-tracker-vinaya.netlify.app/"       
            />
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
            <ProjectCard
              title="Weather Dashboard Pro"
              backgroundImage={weatherReportBg} 
              desc="Weather Dashboard Pro is a modern, responsive web application that provides real-time weather updates, interactive maps, and personalized city tracking. Built with a focus on usability and performance, the app delivers an intuitive experience for users to explore weather conditions across multiple locations."
              tech={['JavaScript', 'Leaflet.js', 'OpenWeather API', 'CSS3']}
              github="https://github.com/VinayashreePatanakar/Real-time-weather-website"
              /*live="#" */// Usually GitHub Pages URL
            />
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
            <ProjectCard
              title="Gateway Placement Tool"
              backgroundImage={gatewayPlacementBg} // Pass the image here
              desc="The Gateway Placement Tool is an interactive, web-based site map feature integrated into the Signal page. It replaces the previous manual workflow with a collaborative, versioned, and persistent system that allows both DAZOQ and customers to place, edit, and track sensors, gateways, and 
              repeaters directly on a scaled floor map."
              tech={['React', 'Node.js', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'JWT', 'Tailwind CSS', 'Axios / Fetch API', 'Git & GitHub']}
              github="https://github.com/VinayashreePatanakar/gateway-placement-tool"
              /*live="#" */// Usually GitHub Pages URL
            />
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
            <ProjectCard
              title="Monthly Report Generator"
              backgroundImage={monthlyReportBg} // Pass the image here
              desc="The Monthly Executive Energy Report is a data-driven analytics system designed to transform raw energy consumption data into actionable executive insights. The application processes structured JSON datasets to generate a comprehensive, multi-page report that highlights energy trends, peak demand periods,
               and machine-level performance."
              tech={['PHP', 'JSON', 'JavaScript', 'Highcharts', 'HTML', 'CSS']}
              github="https://github.com/VinayashreePatanakar/Monthly_Reports"
              /*live="#" */// Usually GitHub Pages URL
            />
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
            <ProjectCard
              title="Allabolag Scraper"
              backgroundImage={allabolagScraperBg} // Pass the image here
              desc="The Allabolag Company Scraper is a Python-based web scraping tool designed to collect company information from Allabolag.se, 
              enrich it with Swedish region data based on city names, and export the results to an Excel file with clickable hyperlinks."
              tech={['Python', 'Excel']}
              github="https://github.com/VinayashreePatanakar/allabolag_scraper"
              /*live="#" */// Usually GitHub Pages URL
            />
            </motion.div>
        
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-12 items-start mb-12">
            {/* Left Column - Resume Text (60%) */}
            <div className="md:col-span-5">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">Resume</h2>
            </div>

            {/* Right Column - Download Button (40%) */}
            <div className="md:col-span-2 flex items-center justify-center md:justify-end">
              <a
                href={resumePDF}
                download="Vinayashree_Resume.pdf"
                className="inline-flex items-center px-8 py-4 bg-[#1E293B] dark:bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 dark:shadow-blue-900/50 whitespace-nowrap"
              >
                Download PDF Version
              </a>
            </div>
          </div>

          {/* Resume Image */}
          <div className="flex justify-center">
            <img
              src={resumeImage}
              alt="Resume"
              className="max-w-2xl w-full rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-4">Hire Me</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            I'm currently open to new opportunities in the Swedish tech ecosystem. 
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Left Column: Contact Form (Spans 2 columns on large screens) */}
      <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700">
        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="Your Name" 
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="Your Email" 
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Message</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleFormChange}
              rows="5" 
              placeholder="Enter your message..." 
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="w-full md:w-auto px-10 py-4 bg-[#1E293B] dark:bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 dark:hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 dark:shadow-blue-900/50">
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Right Column: Direct Contact Info */}
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">Contact Details</h3>
          <div className="space-y-6">
            <a href="mailto:vinayapatanakar@gmail.com" className="flex items-center gap-4 group">
              <div  className="w-12 h-12 bg-slate-100 dark:bg-slate-700 text-[#1E293B] dark:text-slate-400 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                <MailOpen size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1E293B] dark:text-slate-500 uppercase tracking-wider">Email</p>
                <p className="text-slate-700 dark:text-slate-300 font-medium">vinayapatanakar@gmail.com</p>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/vinayapatanakar/" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 text-[#1E293B] dark:text-slate-400 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                <UserCircle size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">LinkedIn</p>
                <p className="text-slate-700 dark:text-slate-300 font-medium">vinayapatanakar</p>
              </div>
            </a>

            <a href="https://github.com/VinayashreePatanakar" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                <GitBranch size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">GitHub</p>
                <p className="text-slate-700 dark:text-slate-300 font-medium">VinayashreePatanakar</p>
              </div>
            </a>
          </div>
        </div>

        {/* Swedish Location Tag */}
        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
          <p className="text-sm text-[#1E293B] dark:text-blue-300 font-medium flex items-start gap-2">
           <MapPin size={16} className="shrink-0 flex-shrink-0 mt-0.5"/> <span className="flex-1">Based in <strong>Sweden</strong>. Available for local opportunities in Stockholm/Gothenburg area or Remote roles worldwide.</span>
          </p>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 py-10 text-center text-slate-400 dark:text-slate-500 text-xs tracking-widest uppercase">
        &copy; 2026 Designed & Built by Vinayashree Tukaram Patanakar &bull; Stockholm, SE
      </footer>

    </div>

    
</div>
  );
}