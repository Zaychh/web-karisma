import Header from "../../sections/Landing/Header";

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default GuestLayout;
