import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Transaction from './components/transaction/transaction';
import ToolsList from './components/ManajemenTools/Tools/tools';
import DetailTools from './components/ManajemenTools/Tools/detail';
import AddTools from './components/ManajemenTools/Tools/addtool';
import EditTools from './components/ManajemenTools/Tools/editTools'
import BadgeList from './components/badges/badges/badges';
import AddBadge from './components/badges/badges/AddBadge';
import EditBadge from './components/badges/badges/editBadge';
import DetailBadge from './components/badges/badges/detail';
import EditProgram from './components/program/editProgram';
import DetailSesi from './components/sesi/detailsesi';
import EditSesi from './components/sesi/editsesi';
import AddQuiz from './components/sesi/quizadd';
import QuizManagement from './components/sesi/quizManage';
import QuizEdit from './components/sesi/quizEdit';

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
        <Route path="/program/edit/:id" element={<EditProgram />} />
        <Route path="/program/detail/:id" element={<DetailProgram />} />
        <Route path="/program/:id/list-sesi" element={<ListSesi />} />
        <Route path="/program/:id/tambah-sesi" element={<TambahSesi />} />
        <Route path="/program/:programId/sesi/:sesiId" element={<DetailSesi />} />
        <Route path="/program/:programId/sesi/:sesiId/edit" element={<EditSesi />} />
        
        {/* ✅ PERBAIKI ROUTE UNTUK QUIZ - gunakan parameter 'programId' bukan 'id' */}
        <Route path="/program/:programId/quiz/create" element={<AddQuiz />} />
        <Route path="/quiz/manage/:programId" element={<QuizManagement />} />
        <Route path="/quiz/edit/:quizId" element={<QuizEdit />} />
        
        <Route path="/users" element={<UserList />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/tools" element={<ToolsList />} />
        <Route path="/tools/detail/:id" element={<DetailTools />} />
        <Route path="/tools/add" element={<AddTools />} />
        <Route path="/tools/edit/:id" element={<EditTools />} />
        <Route path="/achievement" element={<BadgeList />} />
        <Route path="/achievement/add" element={<AddBadge />} />
        <Route path="/achievement/edit/:id" element={<EditBadge />} />
        <Route path="/achievement/detail/:id" element={<DetailBadge />} />

      </Routes>
    </Router>
  );
}
