"use client";

import { useState } from "react";
import { Sparkles, Menu, X } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="border border-b-2 sticky top-0 z-50 bg-white border-gray-200 px-4 md:px-10 h-16 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image alt="logo" src={'/icons/logo.png'} width={24} height={24}/>
            <span className="text-xl font-semibold text-gray-900">Reppoo</span>
          </div>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-poppins">John Doe</p>
            <p className="text-xs font-poppins">John@gmail.com</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          className="rounded-full border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-2 text-sm bg-transparent"
        >
          Logout
        </Button>
      </div>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMenu}
          className="p-2"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </Button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg md:hidden z-40">
          <div className="px-4 py-4 space-y-4">
            {/* User Info */}
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-poppins font-medium">John Doe</p>
                <p className="text-xs font-poppins text-gray-600">John@gmail.com</p>
              </div>
            </div>
            
            {/* Logout Button */}
            <Button
              variant="outline"
              className="w-full rounded-full border-blue-500 text-blue-500 hover:bg-blue-50 py-2 text-sm bg-transparent"
              onClick={() => setIsMenuOpen(false)}
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;