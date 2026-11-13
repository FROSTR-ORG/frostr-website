import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import About from './components/routes/About';
import Apps from './components/routes/Apps';
import Glossary from './components/routes/Glossary';
import Media from './components/routes/Media';
import Privacy from './components/routes/Privacy';
import { fetchPublicOrgData } from './lib/github';

export default function App() {
  const [orgData, setOrgData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    fetchPublicOrgData()
      .then((data) => { if (active) setOrgData(data); })
      .catch((err) => { if (active) setError(err.message); });
    return () => { active = false; };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout error={error} roadmapEnabled={false} />}>
          <Route index element={<About orgData={orgData} error={error} />} />
          <Route path="apps" element={<Apps />} />
          <Route path="glossary" element={<Glossary />} />
          <Route path="media" element={<Media />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>
      </Routes>
    </Router>
  );
}
