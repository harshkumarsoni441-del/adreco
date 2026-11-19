import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Products" },
  { to: "/applications", label: "Applications" },
  { to: "/technology", label: "Technology" },
  { to: "/projects", label: "Projects" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About Us" },
] as const;

export function Header() {
  const { count, setDrawerOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <>
      <header className={cn("sticky top-0 z-40 border-b transition-all duration-300", scrolled ? "border-border bg-background/90 shadow-card backdrop-blur-md" : "border-transparent bg-background")}>
        <div className={cn("container-x relative flex items-center justify-between gap-4 transition-all", scrolled ? "h-16" : "h-[72px]")}>
          <Logo />
          <nav className={cn("hidden items-center gap-1 lg:flex")} aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
                className="relative px-3 py-2 text-[13px] font-semibold text-navy transition-colors hover:text-accent data-[status=active]:text-accent data-[status=active]:after:absolute data-[status=active]:after:inset-x-3 data-[status=active]:after:-bottom-0.5 data-[status=active]:after:h-0.5 data-[status=active]:after:bg-accent">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className={cn("flex items-center gap-2")}>
            <button onClick={() => setDrawerOpen(true)} className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-secondary" aria-label={`Quote cart, ${count} items`}>
              <ShoppingBag className="h-5 w-5 text-navy" />
              {count > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">{count}</span>}
            </button>
            <Button asChild variant="cta" size="sm" className="hidden rounded-md px-5 sm:inline-flex"><Link to="/contact">Contact Us</Link></Button>
            <button className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu className="h-5 w-5 text-navy" />
            </button>
          </div>
        </div>
      </header>
      <div className={cn("fixed inset-0 z-50 bg-gradient-navy text-navy-foreground transition-all duration-300 lg:hidden", open ? "visible opacity-100" : "invisible opacity-0")} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="absolute inset-0 blueprint" />
        <div className="container-x relative flex h-20 items-center justify-between">
          <Logo light />
          <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-primary-foreground/10" aria-label="Close menu"><X /></button>
        </div>
        <nav className="container-x relative mt-6 flex flex-col">
          {NAV.map((n, i) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: n.to === "/" }}
              className={cn("border-b border-primary-foreground/10 py-4 text-2xl font-bold transition-all data-[status=active]:text-accent", open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0")}
              style={{ transitionDelay: `${i * 40}ms` }}>
              {n.label}
            </Link>
          ))}
          <Button asChild variant="cta" size="lg" className="mt-8"><Link to="/quote" onClick={() => setOpen(false)}>Get a Quote</Link></Button>
          <Link to="/contact" onClick={() => setOpen(false)} className="mt-4 text-center text-navy-foreground/70">Contact us</Link>
        </nav>
      </div>
    </>
  );
}
