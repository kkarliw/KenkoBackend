import { Link, useLocation } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink = ({ to, children }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`text-xs font-display font-semibold tracking-widest transition-smooth hover:text-accent relative group ${
        isActive ? "text-accent" : "text-foreground/80"
      }`}
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-[1px] bg-accent transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
};

export default NavLink;
