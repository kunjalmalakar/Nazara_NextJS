"use client";

import React from "react";
import Image from "next/image";
import logoImg from "@/assets/logo.png";
import logoWhite from "@/assets/logo-white.png";

interface NazaraLogoProps {
  className?: string;
  variant?: "primary" | "light" | "gold" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
}

export function NazaraLogo({
  className = "",
  variant = "primary",
  size = "md",
}: NazaraLogoProps) {
  const heightClasses = {
    sm: "h-10 sm:h-12 md:h-14",
    md: "h-14 sm:h-20 md:h-24",
    lg: "h-24 sm:h-28 md:h-32",
    xl: "h-32 sm:h-40 md:h-48",
  };

  const isDarkBg = variant === "light" || variant === "gold";
  const selectedImage = isDarkBg ? logoWhite : logoImg;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <Image
        src={selectedImage}
        alt="Nazara - Real Diamonds. Ethically Grown"
        priority
        className={`w-auto object-contain transition-transform duration-300 hover:scale-105 ${heightClasses[size]} ${
          isDarkBg ? "" : "mix-blend-multiply"
        }`}
      />
    </div>
  );
}
