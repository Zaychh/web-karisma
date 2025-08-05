export interface Transaction {
  id: string;
  user: string;
  program: string;
  kategori: string;
  date: string;
  payment: string;
  price: string;
  status: "Success" | "Pending" | "Failed";
}

export const initialData: Transaction[] = [
  {
    id: "001",
    user: "Budi",
    program: "Bootcamp Back-End Development: Golang",
    kategori: "Bootcamp",
    date: "26 Mei 2025 - 07.30",
    payment: "BCA Virtual Account",
    price: "Rp1.500.000,00",
    status: "Success",
  },
  {
    id: "002",
    user: "Daniel",
    program: "Bootcamp Full-Stack Web Development",
    kategori: "Bootcamp",
    date: "26 Mei 2025 - 07.30",
    payment: "Gopay",
    price: "Rp1.800.000,00",
    status: "Pending",
  },
  {
    id: "003",
    user: "Mbappe",
    program: "Bootcamp Graphic Design & Branding",
    kategori: "FreeClass",
    date: "29 Mei 2025 - 07.30",
    payment: "BCA Virtual Account",
    price: "Rp1.800.000,00",
    status: "Failed",
  },
];
