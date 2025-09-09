import { useEffect, useState } from "react";

export function useBootcamp() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/program/bootcamp")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((p: any) => ({
          ...p,
          image: `http://localhost:3000/${p.image_cover}`,
          duration: "3 atau 6 bulan",
          skills: p.skills || [],
        }));
        setCourses(formatted);
      })
      .finally(() => setLoading(false));
  }, []);

  return { courses, loading };
}
