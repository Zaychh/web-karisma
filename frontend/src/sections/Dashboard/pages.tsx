import { useEffect } from "react";
import Courses from './HeroCourse';
import MyProgress from "./MyProgress";
import MyAchievement from './MyAch';
import Foot from '../Landing/Footer';

export default function Dashboard() {
  // Scroll to top ketika komponen pertama kali dimount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Courses />
      <MyProgress />
      <MyAchievement />
      <Foot />
    </>
  );
};