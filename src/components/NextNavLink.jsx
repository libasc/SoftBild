"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  to,
  href,
  className = "",
  children,
  ...props
}) {
  const pathname = usePathname();

  const target = href || to || "/";

  const active =
    target === "/"
      ? pathname === "/"
      : pathname === target;

  const classes =
    typeof className === "function"
      ? className({ isActive: active })
      : `${className}${active ? " active" : ""}`.trim();

  return (
    <Link
      href={target}
      className={classes}
      {...props}
    >
      {children}
    </Link>
  );
}