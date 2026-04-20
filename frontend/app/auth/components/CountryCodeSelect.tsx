"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaSearch } from "react-icons/fa";

interface CountryCode {
  code: string;
  country: string;
  flag: string;
}

const countryCodes: CountryCode[] = [
  { code: "+1", country: "United States/Canada", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+351", country: "Portugal", flag: "🇵🇹" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+32", country: "Belgium", flag: "🇧🇪" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
  { code: "+43", country: "Austria", flag: "🇦🇹" },
  { code: "+46", country: "Sweden", flag: "🇸🇪" },
  { code: "+47", country: "Norway", flag: "🇳🇴" },
  { code: "+45", country: "Denmark", flag: "🇩🇰" },
  { code: "+358", country: "Finland", flag: "🇫🇮" },
  { code: "+353", country: "Ireland", flag: "🇮🇪" },
  { code: "+352", country: "Luxembourg", flag: "🇱🇺" },
  { code: "+377", country: "Monaco", flag: "🇲🇨" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+20", country: "Egypt", flag: "🇪🇬" },
  { code: "+212", country: "Morocco", flag: "🇲🇦" },
  { code: "+216", country: "Tunisia", flag: "🇹🇳" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
  { code: "+54", country: "Argentina", flag: "🇦🇷" },
  { code: "+56", country: "Chile", flag: "🇨🇱" },
  { code: "+57", country: "Colombia", flag: "🇨🇴" },
  { code: "+51", country: "Peru", flag: "🇵🇪" },
  { code: "+58", country: "Venezuela", flag: "🇻🇪" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
  { code: "+90", country: "Turkey", flag: "🇹🇷" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+972", country: "Israel", flag: "🇮🇱" },
  { code: "+98", country: "Iran", flag: "🇮🇷" },
  { code: "+964", country: "Iraq", flag: "🇮🇶" },
  { code: "+962", country: "Jordan", flag: "🇯🇴" },
  { code: "+961", country: "Lebanon", flag: "🇱🇧" },
  { code: "+20", country: "Egypt", flag: "🇪🇬" },
];

interface CountryCodeSelectProps {
  value: string;
  onChange: (code: string) => void;
  error?: string;
}

export function CountryCodeSelect({ value, onChange, error }: CountryCodeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedCountry = countryCodes.find((c) => c.code === value) || countryCodes[0];

  const filteredCountries = countryCodes.filter(
    (country) =>
      country.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery)
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-3 bg-slate-50 border rounded-xl transition-all duration-200 hover:bg-slate-100 ${
          error ? "border-rose-300" : "border-slate-200"
        }`}
      >
        <span className="text-lg">{selectedCountry.flag}</span>
        <span className="font-medium text-slate-700 min-w-[3rem] text-left">{selectedCountry.code}</span>
        <FaChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50"
          >
            {/* Search */}
            <div className="p-3 border-b border-slate-100">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  autoFocus
                />
              </div>
            </div>

            {/* Country List */}
            <div className="max-h-60 overflow-y-auto">
              {filteredCountries.length === 0 ? (
                <p className="p-4 text-center text-sm text-slate-500">No countries found</p>
              ) : (
                filteredCountries.map((country) => (
                  <button
                    key={`${country.code}-${country.country}`}
                    type="button"
                    onClick={() => {
                      onChange(country.code);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-indigo-50 transition-colors ${
                      value === country.code ? "bg-indigo-50 text-indigo-700" : "text-slate-700"
                    }`}
                  >
                    <span className="text-xl">{country.flag}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{country.country}</p>
                      <p className="text-xs text-slate-500">{country.code}</p>
                    </div>
                    {value === country.code && (
                      <span className="text-indigo-600 text-sm">✓</span>
                    )}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
