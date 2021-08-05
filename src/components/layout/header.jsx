import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
import { ReactComponent as LogoSVG } from "../../assets/atnz-logo.svg";

import "../../styles/components/header.scss";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const shaded = useIsTopOfPage();
  const isScrolling = useScrollingDown();
  return (
    <>
      <motion.header variants={stagger} initial="initial" animate="animate">
        <div
          className={shaded ? "header-cnt shaded" : "header-cnt"}
          style={isScrolling ? { top: "-100%" } : { top: 0 }}
        >
          <div className="header">
            <HeaderLogo />
            <Nav
              menuItems={menuItems}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
            />
          </div>
        </div>
      </motion.header>
      <Menu
        menuItems={menuItems}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
    </>
  );
};
export default Header;

// --------- THINGS IN THE COMPONENT ---------

export const HeaderLogo = () => {
  return (
    <motion.div className="logo-cnt" variants={fadeIn}>
      <a href="https://atnz.org.nz/" className="logo">
        <LogoSVG />
      </a>
    </motion.div>
  );
};

const Nav = ({ menuOpen, setMenuOpen, menuItems }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 800px" });

  return (
    <nav>
      {isDesktop ? (
        <motion.ul variants={staggerHeight} initial="initial" animate="animate">
          {menuItems.map(({ title, link }) => (
            <motion.li key={title} variants={fadeIn}>
              <a href={link}>{title}</a>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <div className="hamburger-cnt" onClick={() => setMenuOpen(!menuOpen)}>
          <motion.div
            className="hamburger"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeIn} className="line" />
            <motion.div variants={fadeIn} className="line" />
            <motion.div variants={fadeIn} className="line" />
          </motion.div>
        </div>
      )}
    </nav>
  );
};

const Menu = ({ menuOpen, setMenuOpen, menuItems }) => {
  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="menu-cnt"
          initial={{ x: "100%" }}
          animate={{ x: 0, transition: { ease: "circOut" } }}
          exit={{ x: "100%" }}
        >
          <div className="exit-button" onClick={() => setMenuOpen(!menuOpen)}>
            +
          </div>
          <div className="menu">
            <div className="menu-contents">
              {menuItems.map(({ title }) => (
                <h3>{title}</h3>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ----------------- HOOKS--------------

// IS TOP OF PAGE

const useIsTopOfPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const top = window.pageYOffset || document.documentElement.scrollTop;
    setIsScrolled(top !== 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isScrolled;
};

// SCROLLING DOWN

const stagger = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const staggerHeight = {
  initial: { height: 0 },
  animate: {
    height: "100%",
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const menuItems = [
  {
    title: "About ATNZ",
    link: "https://atnz.org.nz/about-atnz/",
  },
  {
    title: "Our apprenticeships",
    link: "https://atnz.org.nz/become-an-apprentice/our-apprenticeships/",
  },
  {
    title: "Current vacancies",
    link: "https://atnz.org.nz/become-an-apprentice/jobs/",
  },
];

const useScrollingDown = () => {
  const [scrollDir, setScrollDir] = useState(false); // True is scrolling down, false is scrolling up

  useEffect(() => {
    const threshold = 20;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => { // decides ticking true or false
      const scrollY = window.pageYOffset;
      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? true : false);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    console.log(scrollDir);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  return scrollDir;
};
