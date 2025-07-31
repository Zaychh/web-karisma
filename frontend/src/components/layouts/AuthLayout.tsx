import { useLocation } from "react-router-dom";
import Navigation from "../../sections/Dashboard/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  // Path-path yang TIDAK mau munculin Navbar
  const hideNavPaths = ["/profile", "/profile/my-profile", "/profile/inbox", "/profile/setting"];
  const hideNavbar = hideNavPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {!hideNavbar && <Navigation />}
      <main>{children}</main>
    </>
  );
};

export default AuthLayout;
