"use client";

import React, { useState } from "react";
import wpicon from "@/assets/wpicon.png";
import igicon from "@/assets/igicon.png";
import yticon from "@/assets/yticon.png";
import { Phone, Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function SocialSidebar() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const youtubeUrl = "https://www.youtube.com/";
  const instagramUrl = "https://www.instagram.com/";
  const whatsappUrl = "https://wa.me/1234567890"; // Replace with your number

  const socials = [
    { name: "YouTube", icon: yticon, link: youtubeUrl },
    { name: "Instagram", icon: igicon, link: instagramUrl },
    { name: "WhatsApp", icon: wpicon, link: whatsappUrl },
  ];

  return (
    <>
      {/* ✅ Desktop Sidebar */}
      <div
        className="hidden md:flex fixed top-1/2 left-0 -translate-y-1/2 z-50 
                   flex-col items-center space-y-3 p-2
                   bg-black/50 border-r border-gold/20 rounded-r-2xl
                   backdrop-blur-xl shadow-[4px_0_20px_rgba(0,0,0,0.3)]
                   transition-all duration-500"
      >
        {/* Social Icons */}
        {socials.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-10 h-10 rounded-lg 
                       bg-white/10 border border-white/10 backdrop-blur-md 
                       hover:bg-gold/20 hover:translate-x-3 transition-all duration-300"
          >
            <img
              src={item.icon}
              alt={item.name}
              className="w-5 h-5 object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </a>
        ))}

        {/* Divider */}
        <div className="w-8 border-t border-gray-500/40 my-2"></div>

        {/* Contact Card */}
        <button
          onClick={() => setOpen(true)}
          className="group flex items-center justify-center w-10 h-10 rounded-lg 
                     bg-gradient-to-b from-yellow-500/30 to-yellow-700/30 
                     border border-yellow-500/30 shadow-[0_0_15px_rgba(255,215,0,0.3)]
                     hover:scale-110 hover:translate-x-3 hover:shadow-[0_0_25px_rgba(255,215,0,0.6)] 
                     transition-all duration-500"
          title="Contact Us"
        >
          <Phone className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300" />
        </button>
      </div>

      {/* ✅ Mobile Floating Button Sidebar */}
      <div className="md:hidden fixed bottom-5 left-5 z-50 flex flex-col items-center space-y-3">
        {/* Expanded Icons */}
        <div
          className={`flex flex-col items-center space-y-3 mb-2 transition-all duration-500 ${
            expanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
          }`}
        >
          {socials.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full 
                         bg-white/10 border border-white/10 backdrop-blur-md 
                         hover:bg-gold/20 transition-all duration-300 shadow-lg"
            >
              <img
                src={item.icon}
                alt={item.name}
                className="w-6 h-6 object-contain transition-transform duration-300"
              />
            </a>
          ))}

          {/* Contact Button */}
          <button
            onClick={() => {
              setExpanded(false);
              setOpen(true);
            }}
            className="flex items-center justify-center w-12 h-12 rounded-full 
                       bg-gradient-to-b from-yellow-500/30 to-yellow-700/30 
                       border border-yellow-500/30 shadow-[0_0_20px_rgba(255,215,0,0.5)]
                       hover:scale-110 transition-all duration-500"
          >
            <Phone className="w-6 h-6 text-yellow-400" />
          </button>
        </div>

        {/* Expand/Collapse Main Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-center w-14 h-14 rounded-full 
                     bg-gradient-to-tr from-yellow-500 to-yellow-400 text-black 
                     shadow-[0_0_25px_rgba(255,215,0,0.6)] hover:scale-110 transition-all duration-500"
        >
          {expanded ? <X className="w-6 h-6" /> : <Plus className="w-7 h-7" />}
        </button>
      </div>

      {/* ✅ Contact Form Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-md w-[90%] bg-black/80 text-white border border-gold/30 
                     rounded-2xl backdrop-blur-2xl "
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-yellow-400 text-center">
              Contact Us
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-center">
              Enter your details and we’ll get back to you shortly.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="name" className="text-gray-300">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Your full name"
                className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-gray-300">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-gray-300">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Your message..."
                className="bg-white/10 border-gray-600 text-white placeholder-gray-400 min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter className="mt-6 flex justify-center">
            <Button
              onClick={() => setOpen(false)}
              className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold px-6 py-2 rounded-full hover:from-yellow-400 hover:to-yellow-200 shadow-[0_0_20px_rgba(255,215,0,0.6)] transition"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
