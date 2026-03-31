import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PipelineDiagram from './components/PipelineDiagram';
import LatencyChart from './components/LatencyChart';
import SelectionLaws from './components/SelectionLaws';
import FlowchartSection from './components/FlowchartSection';
import HardwareSection from './components/HardwareSection';
import ArchitectSelector from './components/ArchitectSelector';
import TestCases from './components/TestCases';
import Authors from './components/Authors';

const App: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero onStart={() => scrollToSection('pipeline')} />
        <PipelineDiagram />
        <LatencyChart />
        <SelectionLaws />
        <FlowchartSection />
        <HardwareSection />
        <ArchitectSelector />
        <TestCases />
        <Authors />
      </main>
      <footer className="footer">
        <p>
          © 2025-2026 VLLMArchitect - Vision Encoder Optimization for Edge Visual LLMs
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.72rem' }}>
          KIIT University, School of Computer Engineering • Based on PolyThrottle (2023) & Comparative Analysis
        </p>
      </footer>
    </>
  );
};

export default App;
