import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, PhoneIcon, User2Icon, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import FINAL_LOGO from "@/assets/NPS.png";
import bgvideo from "@/assets/bgvideo.mp4";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [hideOnScroll, setHideOnScroll] = useState(false); // hide nav when scrolling down
  const [isSticky, setIsSticky] = useState(false); // sticky state for non-home or after threshold
  const [projectsOpen, setProjectsOpen] = useState(false); // projects dropdown open
  const location = useLocation();
  const { data: user } = useAuth();

  const lastY = useRef(0);
  const isHome = location.pathname === "/";

  // nav items
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Maps", path: "/maps" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Portfolio", path: "/portfolio" },
  ];

  const projectLinks = [
    { name: "Noida", desc: "Premium properties in Noida", link: "/projects/noida" },
    { name: "Greater Noida", desc: "Modern developments in Greater Noida", link: "/projects/greater-noida" },
    { name: "Yamuna Expressway", desc: "Luxury estates on Yamuna Expressway", link: "/projects/yamuna" },
    { name: "All Properties", desc: "Browse all properties", link: "/properties" },
    { name: "New Launches", desc: "Explore our new launches", link: "/comingsoon" },
  ];

  // Scroll handler — uses ref (lastY) to avoid stale closures
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const scrollDown = y > lastY.current;
      const scrollUp = y < lastY.current;

      // sticky threshold: homepage may require larger scroll to become sticky
      if (isHome) {
        setIsSticky(y > 150);
      } else {
        setIsSticky(y > 50);
      }

      // hide on scroll down (when past a threshold), show on scroll up
      const hideThreshold = isHome ? 120 : 80; // tuneable
      if (scrollDown && y > hideThreshold) {
        setHideOnScroll(true);
      } else if (scrollUp) {
        setHideOnScroll(false);
      }

      // if at very top, reset everything to initial (show nav, not sticky)
      if (y === 0) {
        setHideOnScroll(false);
        setIsSticky(false);
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // small helper to mark active link
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`
        w-full z-50 transition-all duration-300 ease-out
        ${isHome ? "absolute top-0 left-0" : ""}
        ${!isHome && isSticky ? "fixed top-0 left-0" : ""}
        ${!isHome && !isSticky ? "relative" : ""}
        ${hideOnScroll ? "-translate-y-full" : "translate-y-0"}
      `}
    >
      {/* VIDEO BACKGROUND (only on non-home pages) */}
      {!isHome && (
        <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
          <video
            src={bgvideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30"
          />
        </div>
      )}

      {/* NAV CONTENT */}
      <div className="relative z-10 container mx-auto px-4">
        {/* MOBILE LOGO (visible on small screens) */}
        <div className="flex lg:hidden justify-center py-3">
          <Link to="/">
            <img
              src={FINAL_LOGO}
              alt="NPS Logo"
              className="h-28 sm:h-32 w-auto transition-transform duration-300 hover:scale-105 drop-shadow-[0_0_25px_rgba(255,215,0,0.3)]"
            />
          </Link>
        </div>

        {/* DESKTOP NAVBAR */}
        <div className="hidden lg:flex w-full justify-between items-start py-4">
          {/* LEFT: LOGO */}
          <Link to="/" className="flex items-start">
            <img
              src={FINAL_LOGO}
              alt="NPS Logo"
              className={`h-32 sm:h-40 w-auto transition-transform duration-300 ${
                isSticky ? "scale-90" : "scale-100"
              }`}
            />
          </Link>

          {/* RIGHT SIDE */}
          <div className="flex flex-col items-end space-y-4">
            {/* TOP ROW: phone + login */}
            <div className="flex items-center space-x-4">
              <div className="flex flex-row gap-2 items-center font-bold px-6 py-2 text-white">
                <PhoneIcon size={40} className="translate-y-1" />
                <p className="text-4xl sm:text-5xl">+91 93119 31770</p>
              </div>

              <Link to={user?.fullName ? "/logout" : "/login"}>
                <div className="flex flex-row gap-2 items-center font-bold px-6 py-2 text-white hover:scale-105 transition">
                  <User2Icon size={40} />
                  <span className="text-2xl sm:text-4xl">{user?.fullName ? "Logout" : "Login"}</span>
                </div>
              </Link>
            </div>

            {/* BOTTOM ROW: nav links */}
            <div className="flex items-center space-x-8">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-base font-bold transition-colors ${
                    isActive(item.path) ? "text-gold" : "text-white hover:text-gold"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Projects dropdown: controlled by mouse enter/leave and click */}
              <div
                className="relative"
                onMouseEnter={() => setProjectsOpen(true)}
                onMouseLeave={() => setProjectsOpen(false)}
              >
                <button
                  onClick={() => setProjectsOpen((s) => !s)}
                  aria-expanded={projectsOpen}
                  className="text-base font-bold flex items-center gap-2 text-white"
                >
                  <span>Projects</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${projectsOpen ? "rotate-180" : "rotate-0"}`}
                  />
                </button>

                {/* Dropdown panel */}
                <div
                  className={`absolute right-0 top-full mt-3 w-[500px] grid grid-cols-2 gap-3
                    bg-[rgba(25,25,25,0.95)] border border-gold/20 rounded-xl shadow-xl p-4
                    transform origin-top-right transition-all duration-200
                    ${projectsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}
                  `}
                >
                  {projectLinks.map((p) => (
                    <Link
                      key={p.name}
                      to={p.link}
                      className="block space-y-1 rounded-md p-3 hover:bg-gold/10"
                      onClick={() => setProjectsOpen(false)}
                    >
                      <div className="text-base font-semibold text-gold">{p.name}</div>
                      <p className="text-sm text-white/70">{p.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <Link
                to="/contact"
                className={`text-base font-bold transition-colors ${
                  isActive("/contact") ? "text-gold" : "text-white hover:text-gold"
                }`}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden text-white absolute right-4 top-6"
          onClick={() => setIsOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>

        {/* MOBILE MENU CONTENT */}
        {isOpen && (
          <div className="lg:hidden pb-6 space-y-3 text-base font-semibold bg-[rgba(15,15,15,0.9)] rounded-xl p-4 border border-gold/20 shadow-lg">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-2 ${isActive(item.path) ? "text-gold" : "text-white hover:text-gold"}`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile projects list (expands inline, no flicker) */}
            <div>
              <div className="text-base font-bold text-gold mt-3 mb-2">Projects</div>
              <ul className="space-y-2 pl-3">
                {projectLinks.map((p) => (
                  <li key={p.link}>
                    <Link
                      to={p.link}
                      className="block text-sm text-white/80 hover:text-gold"
                      onClick={() => setIsOpen(false)}
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={`block py-2 ${isActive("/contact") ? "text-gold" : "text-white hover:text-gold"}`}
            >
              Contact Us
            </Link>

            <div className="text-white font-bold py-2">+91 93119 31770</div>

            <Link to={user?.fullName ? "/logout" : "/login"} onClick={() => setIsOpen(false)}>
              <Button variant="gold" className="w-full text-base font-bold">
                {user?.fullName ? "Logout" : "Login"}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
