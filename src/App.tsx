import { useEffect, useState } from 'react'
import { LINKEDIN, EMAIL, PHONE, CV, experience, skills, certs, contrib } from './data'

const nav=['about','experience','projects','skills','certificates','contact']

function useReveal(){useEffect(()=>{
  const els=document.querySelectorAll('.rv')
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12})
  els.forEach(e=>io.observe(e));return()=>io.disconnect()},[])}

function Contours(){return(<svg className="contours" viewBox="0 0 800 600" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
  {[0,1,2,3,4,5,6,7,8].map(i=><ellipse key={i} cx={540} cy={300} rx={70+i*42} ry={44+i*30} transform={`rotate(${-18+i*2} 540 300)`} fill="none" stroke="currentColor" strokeWidth="1"/>)}</svg>)}

function Head({n,t}:{n:string;t:string}){return <div className="head rv"><span className="mono">{n}</span><h2>{t}</h2></div>}

export default function App(){
  useReveal()
  const [active,setActive]=useState('');const [prog,setProg]=useState(0);const [open,setOpen]=useState(false)
  useEffect(()=>{
    const f=()=>{const h=document.documentElement;setProg(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)}
    window.addEventListener('scroll',f,{passive:true})
    const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&setActive(e.target.id)),{rootMargin:'-45% 0px -50% 0px'})
    nav.forEach(id=>{const el=document.getElementById(id);el&&io.observe(el)})
    return()=>{window.removeEventListener('scroll',f);io.disconnect()}},[])
  return(<>
  <a className="skip" href="#about">Skip to content</a>
  <div className="progress" style={{width:prog+'%'}}/>
  <header className="nav"><a href="#top" className="brand">ABDULRAHMAN AL-QASMI</a>
    <button className="burger" aria-expanded={open} aria-label="Menu" onClick={()=>setOpen(!open)}>{open?'Close':'Menu'}</button>
    <nav className={open?'open':''}>{nav.map(n=><a key={n} href={'#'+n} className={active===n?'on':''} onClick={()=>setOpen(false)}>{n}</a>)}
      <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a><a className="btn sm" href={CV} download>CV</a></nav></header>
  <main id="top">
  <section className="hero"><Contours/>
    <div className="wrap hero-grid">
      <div>
        <p className="mono">EARTH SCIENCES / GIS — SULTANATE OF OMAN</p>
        <h1>Abdulrahman<br/>Al-Qasmi</h1>
        <p className="lead">Earth Sciences graduate turning field and spatial data into clear maps, analysis and digital solutions.</p>
        <p className="tags">Data Analysis · GIS · Project Coordination · Digital Solutions</p>
        <div className="cta"><a className="btn" href="#projects">View My Work</a><a className="btn ghost" href={CV} download>Download CV</a></div>
        <p className="meta mono"><a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a> · <a href={'mailto:'+EMAIL}>{EMAIL}</a> · Saham / Muscat, Oman</p>
      </div>
      <figure className="portrait"><img src={import.meta.env.BASE_URL+"assets/profile.jpg"} alt="Portrait of Abdulrahman Al-Qasmi" width={480} height={480}/><figcaption className="mono">B.Sc. Earth Sciences · SQU</figcaption></figure>
    </div></section>

  <section id="about" className="wrap sec"><Head n="01" t="About"/>
    <div className="two rv"><p className="big">A multidisciplinary professional with a background in Earth Sciences, specializing in data analysis, digital transformation and technical project coordination.</p>
    <div><p>I collect, analyze and visualize data using GIS and digital tools, while supporting project workflows and organizational processes.</p>
    <p>I combine analytical thinking with creative design skills to deliver data-driven solutions, improve efficiency and support modern digital initiatives.</p></div></div>
    <div className="facts rv">{[['Earth Sciences','B.Sc., SQU'],['GIS & Mapping','QGIS · ArcMap'],['Data','Collect · Analyze · Visualize'],['Design','Illustrator · Photoshop · InDesign']].map(f=><div key={f[0]}><b>{f[0]}</b><span className="mono">{f[1]}</span></div>)}</div></section>

  <section id="experience" className="wrap sec"><Head n="02" t="Experience & Education"/>
    <ol className="timeline">{experience.map(e=><li key={e.org} className="rv"><span className="mono">{e.y}</span><div><h3>{e.org}</h3><ul>{e.pts.map(p=><li key={p}>{p}</li>)}</ul></div></li>)}
    <li className="rv"><span className="mono">2026</span><div><h3>Bachelor of Science in Earth Sciences</h3><p className="muted">Sultan Qaboos University</p><ul>{['GIS Mapping','Data Analysis','Geological Mapping','Field & Laboratory Data Interpretation'].map(p=><li key={p}>{p}</li>)}</ul></div></li></ol></section>

  <section id="projects" className="wrap sec"><Head n="03" t="Projects"/>
    <article className="case rv"><div><span className="mono">01 / 01 — GEOLOGICAL MAPPING</span><h3>Geological Mapping Project</h3><p className="muted">Sultan Qaboos University</p>
      <ul><li>Collected and analyzed geological field data</li><li>Created GIS-based maps using QGIS</li><li>Interpreted spatial data and produced technical reports</li></ul>
      <p className="mono">TOOLS — QGIS · GIS · GEOLOGICAL FIELD DATA</p><p className="mono">DELIVERABLES — GIS MAPS · TECHNICAL REPORTS</p></div>
      <svg className="viz" viewBox="0 0 400 300" role="img" aria-label="Abstract geological layers illustration"><rect width="400" height="300" fill="var(--paper2)"/>
      {[0,1,2,3,4,5].map(i=><path key={i} d={`M0 ${70+i*34} C100 ${40+i*34} 200 ${110+i*34} 400 ${60+i*34}`} fill="none" stroke={i%2?'var(--accent)':'var(--ink)'} strokeOpacity={.55} strokeWidth="1.2"/>)}
      <text x="14" y="288" className="mono" fontSize="10" fill="currentColor">ABSTRACT — NOT PROJECT DATA</text></svg></article></section>

  <section id="skills" className="wrap sec"><Head n="04" t="Skills & Tools"/>
    <div className="cols">{skills.map(([g,l])=><div key={g} className="rv"><h3 className="mono">{g}</h3><div className="chips">{l.map(x=><span key={x}>{x}</span>)}</div></div>)}</div></section>

  <section id="certificates" className="wrap sec"><Head n="05" t="Certifications"/>
    <ul className="rows">{certs.map(c=><li key={c[0]} className="rv"><b>{c[0]}</b><span>{c[1]}</span><span className="mono">{c[2]}</span></li>)}</ul>
    <h3 className="sub rv">Professional &amp; Community Contributions</h3>
    <ul className="rows">{contrib.map(c=><li key={c[1]} className="rv"><b>{c[1]}</b><span>{c[2]}</span><span className="mono">{c[0]}</span></li>)}</ul></section>

  <section id="contact" className="wrap sec contact"><Head n="06" t="Let’s connect"/>
    <a className="mail rv" href={'mailto:'+EMAIL}>{EMAIL}</a>
    <p className="rv mono"><a href={'tel:'+PHONE.replace(/\s/g,'')}>{PHONE}</a> · Saham / Muscat, Oman · <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a></p></section>
  </main>
  <footer className="foot mono">© 2026 Abdulrahman Al-Qasmi · Sultanate of Oman</footer></>)}
