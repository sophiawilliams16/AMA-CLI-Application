import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Hello from './pages/Hello';
import Ask from './pages/Ask';

const App = () => {
  return (
        <Routes>
          <Route path="*" element={<Hello />} />
          <Route path="/ask" element={<Ask />} />
        </Routes>
    );
};

export default App;
