import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-custom-primary shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-custom-accent">
              BoxifyMe
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/" className="text-custom-accent hover:text-custom-highlight px-3 py-2">
              Home
            </a>
            <a href="/about-devs" className="text-custom-accent hover:text-custom-highlight px-3 py-2">
              About Devs
            </a>
            <a href="/get-started" className="text-custom-accent hover:text-custom-highlight px-3 py-2">
              <Button className="hover:bg-custom-highlight text-custom-primary bg-custom-accent hover:text-custom-primary">
                Get Started
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-custom-accent hover:text-custom-highlight focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-custom-primary">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="block text-custom-accent hover:text-custom-highlight px-3 py-2">
              Home
            </a>
            <a href="/about-devs" className="block text-custom-accent hover:text-custom-highlight px-3 py-2">
              About Devs
            </a>
            <a href="/get-started" className="block text-custom-accent hover:text-custom-highlight px-3 py-2">
              <Button className="w-full  text-custom-primary bg-custom-accent hover:text-custom-primary hover:bg-custom-highlight">
                Get Started
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}