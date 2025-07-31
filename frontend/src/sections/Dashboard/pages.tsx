import { useEffect } from "react";
import Courses from './HeroCourse';
import MyProgress from './MyProgress';
import MyAchievement from './MyAch';
import Foot from '../Landing/Footer';

export default function Dashboard() {
  // Scroll to top ketika komponen About pertama kali dimount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white">
      <Courses />
      <MyProgress />
      <MyAchievement />
      <Foot />
    </div>
  );
}