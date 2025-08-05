import { useEffect } from "react";
import HeroSec from './HeroSection';
import Courses from './HeroCourse';
import MyProgress from './MyProgress';
import MyAchievement from './MyAch';
import Foot from '../Landing/Footer';

export default function Dashboard() {
  // Scroll to top ketika komponen pertama kali dimount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroSec />
      <Courses />
      <MyProgress />
      <MyAchievement />
      <Foot />
    </>
  );
};