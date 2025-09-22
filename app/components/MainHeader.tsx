"use client"
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Breadcrumbs from "./Breadcrumbs";
import {
  ThemeProvider,
  createTheme,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#065f46", // emerald-800
      light: "#047857", // emerald-700
    },
    secondary: {
      main: "#f59e0b", // amber-500
    },
    background: {
      default: "#1f2937", // gray-800
      paper: "#065f46", // emerald-800
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
      fontSize: "1.125rem",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    button: {
      textTransform: "uppercase",
      fontWeight: 500,
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#065f46",
          color: "#ffffff",
          zIndex: 2200,
        },
      },
    },
  },
});

const MainHeader = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prefetch common routes on mount for snappier navigation
  useEffect(() => {
    const routes = [
      "/",
      "/aboutus",
      "/gallery",
      "/view-gallery",
      "/view-projects",
      "/products/box-culvert",
      "/products/drains",
      "/products/walls",
      "/contacts",
      "/certifications",
    ];
    routes.forEach((r) => router.prefetch(r));
  }, [router]);

  // Prefetch product routes when dropdown opens
  useEffect(() => {
    if (isProductsOpen) {
      [
        "/products/box-culvert",
        "/products/drains",
        "/products/walls",
      ].forEach((r) => router.prefetch(r));
    }
  }, [isProductsOpen, router]);

  const handleProductsClick = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  const handleMobileProductsClick = () => {
    setMobileProductsOpen(!mobileProductsOpen);
  };

  const handleClose = () => {
    setIsProductsOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <header style={{ padding: '0px 3rem', zIndex: 2000 }} className="relative w-full h-28 bg-gray-900 overflow-visible">
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src="/navBgUt.webp"
            alt="Concrete background"
            layout="fill"
            objectFit="cover"
            quality={100}       
            priority
            className="opacity-90"
          />
        </div>
        
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Main container */}
        <div className="relative z-10 h-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center pl-4 sm:pl-6 gap-4 md:gap-6">
            <div className="rounded-full p-1 bg-white/10 backdrop-blur-sm border border-white/20">
            <Link href="/">
              <Image 
                src="/brandIcon.jpeg" 
                alt="Company Logo" 
                width={80}
                height={80}
                className="rounded-full border-2 border-white/80 shadow-lg"
                quality={100}
              />
                          </Link>

            </div>
            {/* Header breadcrumbs */}
            {/* <div className="hidden md:block max-w-[40vw] truncate">
              <Breadcrumbs variant="header" />
            </div> */}
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-x-6 lg:gap-x-8 pr-4 sm:pr-6 relative">
            <Link href="/">
              <Typography variant="body1" className="text-white hover:text-amber-300 transition-colors duration-300">
                HOME
              </Typography>
            </Link>
      
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleProductsClick}
                className="flex items-center text-white hover:text-amber-300 transition-colors duration-300"
              >
                <Typography variant="body1">PRODUCTS</Typography>
                <ExpandMoreIcon className={`ml-1 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Custom dropdown menu with proper padding */}
              <div 
                className={`absolute right-0 top-full mt-2 w-56 bg-emerald-700 text-white rounded-md shadow-lg overflow-hidden transition-all duration-200 z-50 ${
                  isProductsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
                style={{ border: '1px solid #047857' }}
              >
                <div className="py-2">
                  <Link 
                    href="/products/box-culvert" 
                    onClick={handleClose}
                    className="flex w-full items-center px-6 py-3 hover:bg-emerald-600 transition-colors"
                  >
                    <Typography style={{padding: "1rem"}} variant="body2" className="font-medium leading-tight">
                      Box Culvert
                    </Typography>
                  </Link>
                  <Link 
                    href="/products/drains" 
                    onClick={handleClose}
                    className="flex w-full items-center px-6 py-3 hover:bg-emerald-600 transition-colors"
                  >
                    <Typography style={{padding: "1rem"}} variant="body2" className="font-medium leading-tight">
                      Drains
                    </Typography>
                  </Link>
                  <Link 
                    href="/products/walls" 
                    onClick={handleClose}
                    className="flex w-full items-center px-6 py-3 hover:bg-emerald-600 transition-colors"
                  >
                    <Typography style={{padding: "1rem"}} variant="body2" className="font-medium leading-tight">
                      Walls
                    </Typography>
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/view-gallery">
              <Typography variant="body1" className="text-white hover:text-amber-300 transition-colors duration-300">
                GALLERY
              </Typography>
            </Link>
            <Link href="/view-projects">
              <Typography variant="body1" className="text-white hover:text-amber-300 transition-colors duration-300">
                PROJECTS
              </Typography>
            </Link>
               <Link href="/case-study">
              <Typography variant="body1" className="text-white hover:text-amber-300 transition-colors duration-300">
                CASE STUDY
              </Typography>
            </Link>
            <Link href="/why-3ginfra">
              <Typography variant="body1" className="text-white hover:text-amber-300 transition-colors duration-300">
                WHY 3GINFRATECH
              </Typography>
            </Link>
            <Link href="/certifications">
              <Typography variant="body1" className="text-white hover:text-amber-300 transition-colors duration-300">
                CERTIFICATIONS
              </Typography>
            </Link>
            <Link href="/contacts">
              <Typography variant="body1" className="text-white hover:text-amber-300 transition-colors duration-300">
                CONTACT
              </Typography>
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <IconButton 
            onClick={() => setMobileOpen(true)} 
            className="md:hidden text-white p-2 mr-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </div>
        
        {/* Mobile Drawer with higher z-index */}
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            zIndex: 2200,
            '& .MuiDrawer-paper': {
              backgroundColor: '#065f46',
              color: '#ffffff',
            }
          }}
        >
          <div className="w-72 h-full flex flex-col">
            <div className="p-2 flex items-center justify-between border-b border-emerald-600">
              <Typography variant="h6" className="p-2">
                Navigation Menu
              </Typography>
              <IconButton onClick={() => setMobileOpen(false)} color="inherit">
                <CloseIcon />
              </IconButton>
            </div>
            
            <List className="flex-grow">
              <ListItem component={Link} href="/" onClick={() => setMobileOpen(false)}>
                <ListItemText primary="HOME" />
              </ListItem>
              
              <ListItem onClick={handleMobileProductsClick}>
                <ListItemText primary="PRODUCTS" />
                {mobileProductsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              
              <Collapse in={mobileProductsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem 
                    sx={{ pl: 4 }}
                    component={Link} 
                    href="/products/box-culvert" 
                    onClick={() => setMobileOpen(false)}
                  >
                    <ListItemText primary="Box Culvert" />
                  </ListItem>
                  <ListItem 
                    sx={{ pl: 4 }}
                    component={Link} 
                    href="/products/drains" 
                    onClick={() => setMobileOpen(false)}
                  >
                    <ListItemText primary="Drains" />
                  </ListItem>
                  <ListItem 
                    sx={{ pl: 4 }}
                    component={Link} 
                    href="/products/walls" 
                    onClick={() => setMobileOpen(false)}
                  >
                    <ListItemText primary="Walls" />
                  </ListItem>
                </List>
              </Collapse>
              
              <ListItem component={Link} href="/view-gallery" onClick={() => setMobileOpen(false)}>
                <ListItemText primary="GALLERY" />
              </ListItem>
              <ListItem component={Link} href="/view-projects" onClick={() => setMobileOpen(false)}>
                <ListItemText primary="PROJECTS" />
              </ListItem>
                  <ListItem component={Link} href="/case-study" onClick={() => setMobileOpen(false)}>
                <ListItemText primary="CASE STUDY" />
              </ListItem>
               <ListItem component={Link} href="/why-3ginfra" onClick={() => setMobileOpen(false)}>
                <ListItemText primary="WHY 3GINFRATECH" />
              </ListItem>
              <ListItem component={Link} href="/certifications" onClick={() => setMobileOpen(false)}>
                <ListItemText primary="CERTIFICATIONS" />
              </ListItem>
              <ListItem component={Link} href="/contacts" onClick={() => setMobileOpen(false)}>
                <ListItemText primary="CONTACT" />
              </ListItem>
            </List>
            
            {/* Footer with company info */}
            <div className="p-3 bg-emerald-800/50 border-t border-emerald-600/50">
              <Typography variant="body2" align="center" color="textSecondary">
                © {new Date().getFullYear()} 3G Infratech
              </Typography>
            </div>
          </div>
        </Drawer>
      </header>
    </ThemeProvider>
  );
};

export default MainHeader;