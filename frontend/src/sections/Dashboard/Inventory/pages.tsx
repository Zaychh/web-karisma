import { useEffect } from "react";
import Courses from "../HeroCourse";
import Ach from "../MyAch";
import Foot from '../../Landing/Footer';
export default function Inventory() {
  // Scroll to top ketika komponen pertama kali dimount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Courses />
      <Ach />
      <Foot />
    </>
  );
};