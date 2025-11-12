import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import FINAL_LOGO from "@/assets/NPS.png";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { data: user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

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
    { name: "All Properties", desc: "Browse all our properties", link: "/properties" },
    {name:"Under Construction","desc":"Explore properties under construction","link":"/comingsoon"},
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md ">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* ✅ Left: Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={FINAL_LOGO}
              alt="NPS Logo"
              className="h-16 w-auto sm:h-20 md:h-24 transition-transform duration-300 hover:scale-105 drop-shadow-[0_0_25px_rgba(255,215,0,0.3)]"
            />
          </Link>

          {/* ✅ Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-base font-semibold transition-colors hover:text-gold ${
                  isActive(item.path) ? "text-gold" : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Projects Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-base font-semibold">
                    Projects
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 bg-[rgba(25,25,25,0.95)] border border-gold/20 rounded-xl">
                      {projectLinks.map((item) => (
                        <li key={item.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.link}
                              className="block space-y-1 rounded-md p-3 leading-none transition-colors hover:bg-gold/10"
                            >
                              <div className="text-base font-semibold text-gold">{item.name}</div>
                              <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              to="/contact"
              className={`text-base font-semibold transition-colors hover:text-gold ${
                isActive("/contact") ? "text-gold" : "text-foreground"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* ✅ Right: Phone + Login */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="rounded-full bg-white/10 drop-shadow-lg backdrop-blur-lg px-6 py-2 text-base font-semibold text-gold shadow-[inset_0_0_15px_rgba(255,215,0,0.25)]">
              📞 +91 93119 31770
            </div>

            <Link to={user?.fullName ? "/logout" : "/login"}>
              <Button variant="gold" size="lg" className="text-base font-semibold">
                {user?.fullName ? "Logout" : "Login"}
              </Button>
            </Link>
          </div>

          {/* ✅ Mobile Menu Button */}
          <button
            className="lg:hidden text-gold"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {/* ✅ Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden pb-6 space-y-3 text-base font-semibold bg-[rgba(15,15,15,0.9)] rounded-xl p-4 border border-gold/20 shadow-lg">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-2 transition-colors hover:text-gold ${
                  isActive(item.path) ? "text-gold" : "text-white"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* ✅ Projects Mobile Section */}
            <div>
              <div className="text-base font-semibold text-gold mt-3 mb-2">Projects</div>
              <ul className="space-y-2 pl-3">
                {projectLinks.map((item) => (
                  <li key={item.link}>
                    <Link
                      to={item.link}
                      className="block text-sm text-muted-foreground hover:text-gold transition"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ✅ Contact */}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={`block py-2 transition-colors hover:text-gold ${
                isActive("/contact") ? "text-gold" : "text-white"
              }`}
            >
              Contact Us
            </Link>

            {/* ✅ Phone */}
            <div className="text-gold font-semibold py-2">📞 +91 93119 31770</div>

            {/* ✅ Login / Logout */}
            <Link to={user?.fullName ? "/logout" : "/login"} onClick={() => setIsOpen(false)}>
              <Button variant="gold" className="w-full text-base font-semibold">
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
