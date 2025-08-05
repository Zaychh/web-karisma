import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import InstructorManagement from './components/instructor/instructor';
import AddInstructorForm from './components/instructor/form';
import EditInstructorForm from './components/instructor/Edit';
import Bootcamp from './components/program/bootcamp';
import ProgramAdd from './components/program/addprogram';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/instructors" element={<InstructorManagement />} />
        <Route path="/instructors/add" element={<AddInstructorForm />} />
        <Route path="/instructors/edit/:id" element={<EditInstructorForm />} />
        <Route path="/bootcamp" element={<Bootcamp />} />
        <Route path="/program/add" element={<ProgramAdd />} />
      </Routes>
    </Router>
  );
}
