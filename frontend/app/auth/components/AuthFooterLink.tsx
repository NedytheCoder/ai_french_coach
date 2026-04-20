"use client";

import Link from "next/link";

interface AuthFooterLinkProps {
  text: string;
  linkText: string;
  href: string;
}

export function AuthFooterLink({ text, linkText, href }: AuthFooterLinkProps) {
  return (
    <p className="text-center text-sm text-slate-500">
      {text}{" "}
      <Link
        href={href}
        className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors hover:underline"
      >
        {linkText}
      </Link>
    </p>
  );
}
