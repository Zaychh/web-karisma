import Header from './head';
import Courses from './HeroCourse';
import MyProgress from './MyProgress';
import MyAchievement from './MyAch';
import Foot from '../Landing/Footer';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white">
      <Header />
      <Courses />
      <MyProgress />
      <MyAchievement />
      <Foot />
    </div>
  );
}