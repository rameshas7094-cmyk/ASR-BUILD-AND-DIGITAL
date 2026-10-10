import React, { useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowRight, Menu, X, Workflow, Globe, Code2, ChartNoAxesCombined, AppWindow,
  Database, House, HardHat, MapPinned, UserRound, MessageCircle, ShieldCheck,
  Handshake, HeartHandshake, Compass, Phone, Mail, MapPin, Send, CheckCircle2,
  MonitorSmartphone, Layers3, Lightbulb, BadgeCheck, Building2, Sparkles,
  ChevronRight, Check, Instagram, Linkedin, Facebook, Youtube, Clock3
} from 'lucide-react';
import { digitalServices, propertyServices, projects } from './data.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const digitalHero = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=90';
const propertyHero = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90';
const officeHero = 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=90';

const iconMap = {
  workflow: Workflow, globe: Globe, code: Code2, chart: ChartNoAxesCombined,
  app: AppWindow, database: Database, house: House, hardhat: HardHat,
  land: MapPinned, user: UserRound, map: Compass, message: MessageCircle
};

function Brand() {
  return <Link to="/" className="brand" aria-label="ASR Build & Digital home">
    <span className="brand-mark"><House size={25}/></span>
    <span className="brand-type"><strong>ASR</strong><small>BUILD & DIGITAL</small></span>
  </Link>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  React.useEffect(() => setOpen(false), [location.pathname]);
  const links = [
    ['Home', '/'], ['Digital Services', '/digital-services'],
    ['Property & Construction', '/property-services'], ['Projects', '/projects'],
    ['About Us', '/about'], ['Contact', '/contact']
  ];
  return <header className="site-header">
    <div className="nav-wrap container">
      <Brand/>
      <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      <nav className={open ? 'nav-links open' : 'nav-links'}>
        {links.map(([label, path]) => <NavLink key={path} to={path} end={path === '/'}>{label}</NavLink>)}
        <Link className="button button-gold nav-cta" to="/contact">Get a Quote <ArrowRight size={14}/></Link>
      </nav>
    </div>
  </header>;
}

function Footer() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div className="footer-brand-col"><Brand/><p className="footer-copy">Building smarter businesses. Creating better spaces. A family-led business bringing together digital innovation and property support.</p>
        <div className="socials"><a href="https://www.linkedin.com/" aria-label="LinkedIn"><Linkedin/></a><a href="https://www.instagram.com/" aria-label="Instagram"><Instagram/></a><a href="https://www.facebook.com/" aria-label="Facebook"><Facebook/></a><a href="https://www.youtube.com/" aria-label="YouTube"><Youtube/></a></div>
      </div>
      <div><h4>Explore</h4><Link to="/">Home</Link><Link to="/digital-services">Digital Services</Link><Link to="/property-services">Property & Construction</Link><Link to="/projects">Projects</Link></div>
      <div><h4>Company</h4><Link to="/about">About Us</Link><Link to="/contact">Contact</Link><Link to="/contact">Request a Quote</Link></div>
      <div><h4>Contact</h4><span><Mail size={15}/> hello@yourdomain.com</span><span><Phone size={15}/> +91 XXXXX XXXXX</span><span><MapPin size={15}/> Your city, India</span></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} ASR Build & Digital. All rights reserved.</span><span>Privacy · Terms</span></div>
  </footer>;
}

function IconCard({ item }) {
  const Icon = iconMap[item.icon] || Layers3;
  return <article className="service-card"><span className="service-icon"><Icon size={23}/></span><h3>{item.title}</h3><p>{item.text}</p><span className="card-arrow"><ArrowRight size={15}/></span></article>;
}

function PageHero({ eyebrow, title, highlight, text, image, children, compact=false }) {
  return <section className={`page-hero ${compact?'compact':''}`} style={{ backgroundImage: `linear-gradient(90deg, rgba(8,19,35,.97) 0%, rgba(8,19,35,.82) 48%, rgba(8,19,35,.22) 100%), url("${image}")` }}>
    <div className="container page-hero-content"><span className="eyebrow"><span className="eyebrow-line"/> {eyebrow}</span><h1>{title} <em>{highlight}</em></h1><p>{text}</p>{children}</div>
  </section>;
}

function CTA({ title, text, button = 'Discuss a Project' }) {
  return <section className="cta-band"><div><span className="eyebrow">LET'S BUILD SOMETHING BETTER</span><h2>{title}</h2><p>{text}</p></div><Link className="button button-gold" to="/contact">{button} <ArrowRight size={16}/></Link></section>;
}

function ProjectGrid({ items }) {
  return <div className="project-grid">{items.map((p) => <article className="project-card" key={p.title}><div className="project-image"><img src={p.image} alt={p.title} loading="lazy"/><span className={p.tag==='Digital'?'tag tag-digital':'tag tag-property'}>{p.tag==='Digital'?'ASR Digital':'ASR Spaces'}</span></div><div className="project-body"><h3>{p.title}</h3><p>{p.text}</p><span className="project-more">Project concept <ArrowRight size={14}/></span></div></article>)}</div>;
}

function Home() {
  return <>
    <section className="reference-hero">
      <div className="reference-hero-photo" aria-hidden="true">
        <img src={propertyHero} alt="" />
      </div>
      <div className="reference-hero-overlay"/>
      <div className="container reference-hero-inner">
        <div className="reference-hero-copy">
          <span className="eyebrow"><span className="eyebrow-line"/> ONE FAMILY. TWO DIVISIONS. ONE VISION.</span>
          <h1>Building Smarter<br/>Businesses.<br/><em>Creating Better Spaces.</em></h1>
          <p>At ASR Build & Digital, we combine technology and property expertise to help businesses grow and help individuals bring their dream spaces to life.</p>
          <div className="hero-actions">
            <Link className="button button-gold" to="/digital-services">Explore Digital Solutions <ArrowRight size={15}/></Link>
            <Link className="button button-outline" to="/property-services">Explore Property Services <ArrowRight size={15}/></Link>
          </div>
        </div>
        <div className="reference-hero-visual">
          <div className="reference-tech-image"><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=90" alt="Business analytics dashboard on screen"/><span>ASR DIGITAL</span></div>
          <div className="reference-home-image"><img src={propertyHero} alt="Modern home exterior"/><span>ASR SPACES</span></div>
          <div className="reference-visual-caption"><span><Sparkles size={17}/></span><div><strong>Ideas into action</strong><small>Digital innovation + real-world spaces</small></div></div>
        </div>
      </div>
      <div className="reference-hero-bottom container"><span><ShieldCheck size={15}/> Practical solutions</span><span><Handshake size={15}/> Quality & transparency</span><span><HeartHandshake size={15}/> Customer-first service</span><span><ChartNoAxesCombined size={15}/> End-to-end support</span></div>
    </section>

    <section className="reference-divisions container">
      <article className="reference-division-card">
        <div className="reference-division-image"><img src={digitalHero} alt="Digital workspace"/><span><MonitorSmartphone size={28}/></span></div>
        <div className="reference-division-content"><div className="eyebrow">01 / DIGITAL SOLUTIONS</div><h2>ASR Digital</h2><p>Automation, websites, applications and dashboards that help businesses reduce manual work and deliver smarter digital experiences.</p><Link className="button button-gold" to="/digital-services">Learn More <ArrowRight size={15}/></Link></div>
      </article>
      <article className="reference-division-card">
        <div className="reference-division-image"><img src={propertyHero} alt="Modern house"/><span><House size={28}/></span></div>
        <div className="reference-division-content"><div className="eyebrow">02 / PROPERTY & CONSTRUCTION</div><h2>ASR Spaces</h2><p>House planning, construction coordination, property-related services and practical support to help your plans move forward.</p><Link className="button button-gold" to="/property-services">Learn More <ArrowRight size={15}/></Link></div>
      </article>
    </section>

    <section className="reference-values"><div className="container reference-values-grid">
      <div><span><Lightbulb/></span><strong>Experience & Expertise</strong><small>Practical thinking across two domains</small></div>
      <div><span><ShieldCheck/></span><strong>Quality & Reliability</strong><small>Transparent, dependable support</small></div>
      <div><span><HeartHandshake/></span><strong>Customer Satisfaction</strong><small>Solutions shaped around your needs</small></div>
      <div><span><Layers3/></span><strong>End-to-End Support</strong><small>From first conversation to delivery</small></div>
    </div></section>

    <section className="reference-stats"><div className="container reference-stats-grid">
      <div><BriefcaseIcon/><strong>25+</strong><small>Projects Completed</small></div>
      <div><UsersIcon/><strong>50+</strong><small>Happy Clients</small></div>
      <div><Building2/><strong>2</strong><small>Business Divisions</small></div>
      <div><BadgeCheck/><strong>100%</strong><small>Commitment to Quality</small></div>
    </div></section>

    <section className="section container reference-projects">
      <div className="section-heading section-heading-row"><div><span className="eyebrow"><span className="eyebrow-line"/> OUR RECENT WORK</span><h2>Featured <em>Projects</em></h2><p>A selection of recent work in digital solutions and property support.</p></div><Link className="button button-outline-dark" to="/projects">View All Projects <ArrowRight size={15}/></Link></div>
      <ProjectGrid items={projects.slice(0,4)}/>
    </section>
    <CTA title="Let's build something better together." text="Tell us what you want to automate, build, improve, or plan. We'll help you explore the next step." button="Get a Quote"/>
  </>;
}

function BriefcaseIcon() {
  return <span className="stats-symbol"><Layers3 size={21}/></span>;
}
function UsersIcon() {
  return <span className="stats-symbol"><HeartHandshake size={21}/></span>;
}

function DigitalServices() {
  return <>
    <PageHero eyebrow="ASR DIGITAL" title="Smart solutions for" highlight="a digital future." text="We build modern websites, automate business processes, develop custom applications and create data dashboards to help your team work smarter." image={digitalHero}><Link className="button button-gold" to="/contact">Get a Quote <ArrowRight size={16}/></Link></PageHero>
    <section className="section container"><div className="section-heading"><span className="eyebrow"><span className="eyebrow-line"/> OUR DIGITAL SERVICES</span><h2>Make everyday work <em>work better.</em></h2><p>Practical technology shaped around your business, your customers, and your goals.</p></div><div className="service-grid">{digitalServices.map(item=><IconCard key={item.title} item={item}/>)}</div></section>
    <section className="feature-split"><div className="feature-image"><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=90" alt="Business analytics dashboard"/></div><div className="feature-copy"><span className="eyebrow"><span className="eyebrow-line"/> OUR METHOD</span><h2>Less repetitive work.<br/><em>More room to grow.</em></h2><p>We map your current process, identify the friction, and build a solution that makes work simpler and more visible.</p><ul className="check-list"><li><Check/> Understand your workflow and requirements</li><li><Check/> Build and test a practical solution</li><li><Check/> Document and hand over clearly</li></ul><Link className="button button-dark" to="/contact">Discuss Your Project <ArrowRight size={15}/></Link></div></section>
    <section className="dark-feature"><div className="container"><div className="section-heading light"><span className="eyebrow"><span className="eyebrow-line"/> WHY ASR DIGITAL</span><h2>Technology with a <em>clear purpose.</em></h2></div><div className="benefit-grid"><div><Workflow/><h3>Automation</h3><p>Reduce manual tasks and repetitive steps.</p></div><div><MonitorSmartphone/><h3>Useful experiences</h3><p>Design websites and apps around real users.</p></div><div><ChartNoAxesCombined/><h3>Better visibility</h3><p>Bring key information into clear dashboards.</p></div></div></div></section>
    <section className="section container"><div className="section-heading section-heading-row"><div><span className="eyebrow"><span className="eyebrow-line"/> DIGITAL PORTFOLIO</span><h2>Solutions in <em>focus.</em></h2></div><Link className="text-link" to="/projects">View all projects <ArrowRight size={16}/></Link></div><ProjectGrid items={projects.filter(p=>p.tag==='Digital').slice(0,3)}/></section>
    <CTA title="Ready to simplify a process?" text="Share your website, workflow, or reporting challenge with ASR Digital." button="Request a Digital Quote"/>
  </>;
}

function PropertyServices() {
  return <>
    <PageHero eyebrow="ASR SPACES" title="Your vision. Our" highlight="planning support." text="From house planning conversations to construction coordination and property-related support, we help you understand requirements and move forward with confidence." image={propertyHero}><Link className="button button-gold" to="/contact">Discuss Your Project <ArrowRight size={16}/></Link></PageHero>
    <section className="section container"><div className="section-heading"><span className="eyebrow"><span className="eyebrow-line"/> PROPERTY & CONSTRUCTION</span><h2>Build with a clearer <em>plan.</em></h2><p>Tell us where you are in your project and what kind of support you need.</p></div><div className="service-grid">{propertyServices.map(item=><IconCard key={item.title} item={item}/>)}</div></section>
    <section className="property-feature"><div className="property-feature-bg" style={{backgroundImage:`linear-gradient(90deg,rgba(8,19,35,.95),rgba(8,19,35,.45)),url("https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=90")`}}/><div className="container property-feature-content"><span className="eyebrow"><span className="eyebrow-line"/> FROM IDEA TO NEXT STEP</span><h2>Every project begins<br/>with a <em>conversation.</em></h2><p>We discuss your requirements, clarify the scope, and help identify practical next steps for your property or building project.</p><Link className="button button-gold" to="/contact">Talk to ASR Spaces <ArrowRight size={16}/></Link></div></section>
    <section className="section container"><div className="section-heading"><span className="eyebrow"><span className="eyebrow-line"/> HOW WE WORK</span><h2>Clear steps. <em>Confident decisions.</em></h2></div><div className="process-grid">{[['01','Listen','Understand your goals and requirements.'],['02','Clarify','Discuss scope, budget, timing, and next steps.'],['03','Coordinate','Work through agreed requirements and partners.'],['04','Support','Keep communication clear as the project progresses.']].map(([n,t,d])=><div className="process-step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div><p className="disclaimer">Architectural design, structural engineering, approvals, and regulated services must be delivered by appropriately qualified and authorized professionals where required.</p></section>
    <section className="section container"><div className="section-heading section-heading-row"><div><span className="eyebrow"><span className="eyebrow-line"/> PROPERTY PORTFOLIO</span><h2>Spaces and projects <em>in focus.</em></h2></div><Link className="text-link" to="/projects">View all projects <ArrowRight size={15}/></Link></div><ProjectGrid items={projects.filter(p=>p.tag==='Property')}/></section>
    <CTA title="Planning a house or property project?" text="Share your requirements and start a conversation with ASR Spaces." button="Request Property Support"/>
  </>;
}

function Projects() {
  const [filter, setFilter] = useState('All');
  const filtered = projects.filter(p => filter === 'All' || p.tag === filter);
  return <><PageHero eyebrow="OUR PORTFOLIO" title="Ideas, work and" highlight="project concepts." text="Explore illustrative examples across digital solutions and property services. Replace these sample concepts with your real completed projects." image={officeHero} compact/>
    <section className="section container"><div className="portfolio-intro"><div><span className="eyebrow"><span className="eyebrow-line"/> SELECTED WORK</span><h2>A closer look at <em>what we do.</em></h2></div><p>Use the filters to explore projects by division. Each card can later link to a detailed case study with the challenge, solution, and outcome.</p></div><div className="filter-row">{['All','Digital','Property'].map(f=><button key={f} onClick={()=>setFilter(f)} className={filter===f?'filter-button active':'filter-button'}>{f==='All'?'All Projects':f==='Digital'?'ASR Digital':'ASR Spaces'}</button>)}</div><ProjectGrid items={filtered}/><p className="disclaimer">Portfolio images and descriptions are illustrative placeholders, not claims of completed client work. Replace them with real work and approved project photos before publishing.</p></section><CTA title="Let's build your next success story." text="Tell us about the result you want to achieve." button="Start a Project"/></>;
}

function About() {
  return <><PageHero eyebrow="ABOUT ASR" title="Two divisions." highlight="One family vision." text="A family-led business bringing together digital innovation and property-related support, guided by practical thinking and clear communication." image={officeHero}/>
    <section className="section container"><div className="section-heading"><span className="eyebrow"><span className="eyebrow-line"/> MEET THE TEAM</span><h2>People behind <em>the promise.</em></h2><p>Replace the sample portraits and profile text with your actual photos, names, and experience.</p></div><div className="people-grid">
      <article className="person-card"><div className="person-photo"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=90" alt="Placeholder portrait for Digital Solutions lead"/></div><div className="person-content"><span className="person-label">01 / ASR DIGITAL</span><h2>Your Name</h2><h4>Digital Solutions Lead</h4><p>I focus on website development, business process automation, applications, and dashboards that help teams work smarter. My approach is practical, collaborative, and centered on real business needs.</p><div className="profile-tags"><span>Automation</span><span>Web Development</span><span>Power Apps</span></div><Link className="button button-dark" to="/contact">Discuss a Digital Project <ArrowRight size={15}/></Link></div></article>
      <article className="person-card"><div className="person-photo"><img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=90" alt="Placeholder portrait for Property and Construction lead"/></div><div className="person-content"><span className="person-label">02 / ASR SPACES</span><h2>Your Brother's Name</h2><h4>Property & Construction Lead</h4><p>I focus on understanding property and building requirements, coordinating practical next steps, and supporting customers through their planning journey.</p><div className="profile-tags"><span>House Planning</span><span>Property Support</span><span>Coordination</span></div><Link className="button button-dark" to="/contact">Discuss a Property Project <ArrowRight size={15}/></Link></div></article>
    </div></section>
    <section className="values-section"><div className="container"><div className="section-heading"><span className="eyebrow"><span className="eyebrow-line"/> WHAT GUIDES US</span><h2>Values that shape <em>our work.</em></h2></div><div className="benefit-grid values-grid"><div><HeartHandshake/><h3>Customer focus</h3><p>Understand the need before proposing a solution.</p></div><div><BadgeCheck/><h3>Quality work</h3><p>Take care with the details and agreed scope.</p></div><div><ShieldCheck/><h3>Transparency</h3><p>Communicate clearly about progress and expectations.</p></div><div><Handshake/><h3>Long-term relationships</h3><p>Build trust through reliable support.</p></div></div></div></section>
    <section className="quote-section"><div className="container"><span className="quote-mark">“</span><h2>Good work is not only about what we build.<br/><em>It's about how we work with people.</em></h2><span className="quote-credit">— ASR Build & Digital</span></div></section>
  </>;
}

function Contact() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', division:'Digital Solutions', service:'', message:'' });
  const [state, setState] = useState({ loading:false, type:'', text:'' });
  const update = e => {
    const { name, value } = e.target;
    setForm(old => ({...old, [name]:value, ...(name==='division'?{service:''}:{})}));
  };
  async function submit(e) {
    e.preventDefault();
    setState({loading:true,type:'',text:''});
    try {
      await axios.post(`${API_URL}/enquiries`, form);
      setState({loading:false,type:'success',text:'Thank you! Your enquiry has been submitted. We will be in touch soon.'});
      setForm({name:'',email:'',phone:'',division:'Digital Solutions',service:'',message:''});
    } catch (err) {
      const msg = err?.response?.data?.message || 'We could not submit your enquiry. Check that the backend and database are running, then try again.';
      setState({loading:false,type:'error',text:msg});
    }
  }
  return <><PageHero eyebrow="CONTACT ASR" title="Let's talk about" highlight="your next project." text="Tell us what you have in mind. Choose the team that best matches your requirements." image={officeHero} compact/>
    <section className="section container contact-layout"><div className="contact-panel"><span className="eyebrow"><span className="eyebrow-line"/> SEND AN ENQUIRY</span><h2>Tell us a little <em>about it.</em></h2><p className="muted">Fields marked * are required. Your details will be used to respond to your enquiry.</p>
      <form onSubmit={submit} className="contact-form">
        <div className="form-row"><label>Full name *<input required name="name" value={form.name} onChange={update} minLength="2" maxLength="120" placeholder="Your name"/></label><label>Email address *<input required type="email" name="email" value={form.email} onChange={update} maxLength="254" placeholder="you@example.com"/></label></div>
        <label>Phone number<input name="phone" value={form.phone} onChange={update} maxLength="40" placeholder="+91"/></label>
        <label>Which team do you need? *<select required name="division" value={form.division} onChange={update}><option>Digital Solutions</option><option>Property & Construction</option></select></label>
        <label>Service<select name="service" value={form.service} onChange={update}><option value="">Select a service (optional)</option>{(form.division==='Digital Solutions'?digitalServices:propertyServices).map(s=><option key={s.title}>{s.title}</option>)}</select></label>
        <label>Project details *<textarea required name="message" value={form.message} onChange={update} minLength="10" maxLength="4000" rows="5" placeholder="Tell us about your requirements..."/></label>
        <button className="button button-gold submit-button" disabled={state.loading}>{state.loading?'Sending…':<>Send Enquiry <Send size={16}/></>}</button>
        {state.text && <div role="status" className={`form-message ${state.type}`}>{state.type==='success'?<CheckCircle2 size={18}/>:null}{state.text}</div>}
      </form>
    </div>
    <aside className="contact-aside"><div className="aside-card"><span className="eyebrow"><span className="eyebrow-line"/> CONTACT DETAILS</span><h3>We'd love to hear from you.</h3><p>Replace the sample details below with your official business contact information before launch.</p><div className="contact-item"><Phone/><div><strong>Phone</strong><span>+91 XXXXX XXXXX</span></div></div><div className="contact-item"><Mail/><div><strong>Email</strong><span>hello@yourdomain.com</span></div></div><div className="contact-item"><MapPin/><div><strong>Location</strong><span>Your city, India</span></div></div><div className="contact-item"><Clock3/><div><strong>Business hours</strong><span>Monday – Saturday · 9 AM – 6 PM</span></div></div><a className="whatsapp-link" href="https://wa.me/" target="_blank" rel="noreferrer"><MessageCircle/> Add your WhatsApp number</a></div><div className="aside-note"><CheckCircle2/><span>We'll review your requirements and respond as soon as practical.</span></div></aside>
    </section></>;
}

export default function App() {
  return <><Header/><main><Routes><Route path="/" element={<Home/>}/><Route path="/digital-services" element={<DigitalServices/>}/><Route path="/property-services" element={<PropertyServices/>}/><Route path="/projects" element={<Projects/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<Home/>}/></Routes></main><Footer/></>;
}
