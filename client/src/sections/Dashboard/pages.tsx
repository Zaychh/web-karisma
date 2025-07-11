import Head from './kepala';
import Courses from './HeroCourse';
import MyProgress from './MyProgress';
import MyAchievement from './MyAch';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white">
      <Head />
      <Courses />
      <MyProgress />
      <MyAchievement />
    </div>
  );
}