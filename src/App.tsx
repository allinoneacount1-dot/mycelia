import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Gateway from './pages/Gateway';
import CoreNexus from './pages/CoreNexus';
import LivingLedger from './pages/LivingLedger';
import AnomalyIsolation from './pages/AnomalyIsolation';
import MutationChamber from './pages/MutationChamber';
import IntelligenceCore from './pages/IntelligenceCore';
import ReflexNode from './pages/ReflexNode';
import { SystemLog, emitSysLog } from './components/SystemLog';

export default function App() {
  return (
    <BrowserRouter>
      <div className="grain-overlay"></div>
      <div className="scanline"></div>
      <SystemLog />
      
      <Routes>
        <Route path="/" element={<Gateway />} />
        
        <Route element={<Layout />}>
          <Route path="/nexus" element={<CoreNexus />} />
          <Route path="/ledger" element={<LivingLedger />} />
          <Route path="/anomaly" element={<AnomalyIsolation />} />
          <Route path="/mutation" element={<MutationChamber />} />
          <Route path="/intelligence" element={<IntelligenceCore />} />
          <Route path="/reflex" element={<ReflexNode />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
