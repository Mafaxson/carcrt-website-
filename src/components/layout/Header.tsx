import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const navItems = [{
  label: "Home",
  path: "/"
}, {
  label: "About",
  children: [
    {
      label: "Mission & Vision",
      path: "/mission-vision"
    },
    {
      label: "History",
      path: "/history"
    },
    {
      label: "Leadership",
      path: "/leadership"
    }
  ]
}, {
  label: "Programs",
  path: "/programs"
}, {
  label: "Impact Stories",
  path: "/impact-stories"
}, {
  label: "News & Events",
  children: [{
    label: "News & Blog",
    path: "/news"
  }, {
    label: "Events",
    path: "/events"
  }]
}, {
  label: "Get Involved",
  path: "/get-involved"
}, {
  label: "Contact",
  path: "/contact"
}];
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img alt="CArCRT Logo" className="h-14 w-14 object-contain" src="/lovable-uploads/8244f18e-9ff6-4e5f-af99-58e31fa50aed.png" />
            <div className="hidden sm:block">
              <p className="font-heading font-bold text-primary text-lg leading-tight">CArCRT</p>
              <p className="text-xs text-muted-foreground leading-tight">Community Resilience</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => item.children ? <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48">
                    {item.children.map(child => <DropdownMenuItem key={child.path} asChild>
                        <Link to={child.path} className={isActive(child.path) ? "text-primary font-medium" : ""}>
                          {child.label}
                        </Link>
                      </DropdownMenuItem>)}
                  </DropdownMenuContent>
                </DropdownMenu> : <Link key={item.path} to={item.path!} className={`px-3 py-2 text-sm font-medium transition-colors ${isActive(item.path!) ? "text-primary" : "text-foreground/80 hover:text-primary"}`}>
                  {item.label}
                </Link>)}
          </nav>

          {/* Donate Button & Mobile Menu */}
          <div className="flex items-center gap-3">
            <Link to="/donate">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 shadow-soft">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Donate</span>
              </Button>
            </Link>

            <button className="lg:hidden p-2 text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navItems.map(item => item.children ? <div key={item.label} className="py-2">
                    <p className="px-4 text-sm font-semibold text-muted-foreground mb-2">{item.label}</p>
                    {item.children.map(child => <Link key={child.path} to={child.path} onClick={() => setMobileMenuOpen(false)} className={`block px-6 py-2 text-sm ${isActive(child.path) ? "text-primary font-medium" : "text-foreground/80"}`}>
                        {child.label}
                      </Link>)}
                  </div> : <Link key={item.path} to={item.path!} onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-2 text-sm ${isActive(item.path!) ? "text-primary font-medium" : "text-foreground/80"}`}>
                    {item.label}
                  </Link>)}
            </nav>
          </div>}
      </div>
    </header>;
}