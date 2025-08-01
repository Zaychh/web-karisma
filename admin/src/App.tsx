import { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import InstructorManagement from './components/instructor/instructor';
import AddInstructorForm from './components/instructor/form';
import EditInstructorForm from './components/instructor/Edit';
import Program from './components/program/program';
import ProgramAdd from './components/program/addprogram';
import DetailProgram from './components/program/detailprogram';
import ListSesi from './components/sesi/listsesi';
import TambahSesi from './components/sesi/addsesi';
import UserList from './components/users/users';

export default function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/instructors" element={<InstructorManagement />} />
        <Route path="/instructors/add" element={<AddInstructorForm />} />
        <Route path="/instructors/edit/:id" element={<EditInstructorForm />} />
        <Route path="/program" element={<Program />} />
        <Route path="/program/add" element={<ProgramAdd />} />
        <Route path="/program/detail/:id" element={<DetailProgram />} />
        <Route path="/program/:id/list-sesi" element={<ListSesi />} />
        <Route path="/program/:id/tambah-sesi" element={<TambahSesi />} />
        <Route path="/users" element={<UserList />} />

      </Routes>
    </Router>
  );
}