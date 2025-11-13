import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Logo from '../assets/images.png';
import { CgFileDocument } from "react-icons/cg";
import { PiMicrophoneLight, PiTelegramLogoThin } from 'react-icons/pi';
import Card from '../components/Card';
import Header from '../components/Header';
import Stack from '../components/Stack';

const Home = () => {
  const stackStyle = "text-xs bg-zinc-700 text-gray-400 font-semibold py-1 px-2 rounded-md inline-flex items-center whitespace-nowrap m-1";

  const Project1 = {
    title: 'Book Tracker',
    liveUrl: 'https://code-store8-cipher-school.vercel.app/',
    githubUrl: 'https://github.com/chaturvedinitin/CodeStore8-CipherSchool',
    description: 'A web application which has a large library of books to read online and keep track of book to read, read or will be reading',
    technologies: ["React", "Google API", "Express"],
  };

  const Project2 = {
    title: 'Banking Fraud Detection',
    liveUrl: '/',
    githubUrl: 'https://github.com/chaturvedinitin/Banking_Fraud_Detection_System',
    description: 'Uses Data from past transactions to train ML model and give feedback on transactions and detect fraud',
    technologies: ["Python", "Streamlit", "ML"],
  };

  const Project3 = {
    title: 'Portfolio Website',
    liveUrl: 'https://portfolio.example.com/',
    githubUrl: 'https://github.com/chaturvedinitin/Portfolio',
    description: 'Personal portfolio website showcasing skills and projects.',
    technologies: ["React", "Javascript"],
  };

  const Project4 = {
    title: 'Weather App',
    liveUrl: 'https://weather.example.com/',
    githubUrl: 'https://github.com/chaturvedinitin/WeatherApp',
    description: 'A simple weather forecast app using public APIs.',
    technologies: ["FaNodeJs", "FaReact"],
  };

  const projects = [Project1, Project2, Project3, Project4];

  const FORM_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfTXcjLvwkbI8U8oN9xBNhqCPxmvdckw8AqcY3_BcomWSERnw/formResponse";
  const NAME_ENTRY_ID = "entry.483191057";

  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState("");
  const boxRef = useRef(null);
  const pos = useRef({ offsetX: 0, offsetY: 0 });
  const dragging = useRef(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setShowInput(false);
        setName("");
      }
    };

    const handleMouseMove = (e) => {
      if (!dragging.current || !boxRef.current) return;
      const x = e.clientX - pos.current.offsetX;
      const y = e.clientY - pos.current.offsetY;
      boxRef.current.style.left = `${x}px`;
      boxRef.current.style.top = `${y}px`;
      boxRef.current.style.transform = "translate(0, 0)";
    };

    const handleTouchMove = (e) => {
      if (!dragging.current || !boxRef.current || e.touches.length === 0) return;
      const touch = e.touches[0];
      const x = touch.clientX - pos.current.offsetX;
      const y = touch.clientY - pos.current.offsetY;
      boxRef.current.style.left = `${x}px`;
      boxRef.current.style.top = `${y}px`;
      boxRef.current.style.transform = "translate(0, 0)";
    };

    const handleMouseUp = () => (dragging.current = false);
    const handleTouchEnd = () => (dragging.current = false);

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [showInput]);

  const handleMouseDown = (e) => {
    if (!boxRef.current) return;
    dragging.current = true;
    pos.current.offsetX = e.clientX - boxRef.current.offsetLeft;
    pos.current.offsetY = e.clientY - boxRef.current.offsetTop;
  };

  const handleTouchStart = (e) => {
    if (!boxRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    dragging.current = true;
    pos.current.offsetX = touch.clientX - boxRef.current.offsetLeft;
    pos.current.offsetY = touch.clientY - boxRef.current.offsetTop;
  };

  const handleResumeClick = () => setShowInput(true);

  const handleAccess = async () => {
    if (name.trim() === "") {
      alert("/error : enter name to access");
      return;
    }

    try {
      const formData = new FormData();
      formData.append(NAME_ENTRY_ID, name);

      await fetch(FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
    } catch (err) {
      console.error("Error logging name:", err);
    }

    window.open(
      "https://docs.google.com/document/d/13vDSHAYj3VW_Dns-VpSViCj3xqWgsDJI/edit?usp=sharing",
      "_blank",
      "noopener,noreferrer"
    );

    setShowInput(false);
    setName("");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };
  const contentRef = useRef(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
      className="scroll-smooth bg-zinc-950/70 text-zinc-100"
      style={{
        fontFamily: '"Merriweather", serif',
        fontOpticalSizing: 'auto',
        fontWeight: 400,
        fontStyle: 'normal',
        fontVariationSettings: '"wdth" 100',
      }}
    >
      <div className="container mx-auto max-w-3xl">
        <Header />
        <div className="flex flex-col min-h-screen px-6 sm:px-8 lg:px-10 py-6">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-between gap-10"
          >
            <div className="flex flex-col text-center md:text-left">
              <h1 className="text-[7.5vw] sm:text-[6.5vw] md:text-[5.5vw] lg:text-[3.5vw] font-extrabold text-white leading-none tracking-wide">
                Nitin Chaturvedi
              </h1>
              <p className="text-[2vw] sm:text-[1vw] md:text-[1vw] lg:text-[1.2vw] text-zinc-200 mt-3 tracking-tighter font-thin">
                Full Stack Web Developer | Building products
              </p>
            </div>
            <Link to="/" className="shrink-0">
              <img
                src={Logo}
                alt="Logo"
                className="w-28 h-28 sm:w-34 sm:h-34 md:w-46 md:h-46 rounded-md object-cover bg-black/10 border-2 border-accent border-zinc-800"
              />
            </Link>
          </motion.div>


          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative mt-10 text-base sm:text-md text-gray-300 leading-loose tracking-wider border-y-2 border-zinc-700"
          >
            {/* Animated content with dynamic height */}
            <motion.div
              animate={{
                maxHeight: expanded ? contentRef.current?.scrollHeight : 80
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="overflow-hidden px-6"
              ref={contentRef}
            >
              <p className='my-6'>
                I'm a full-stack developer with a drive for building beautiful, functional, and scalable web applications.
              </p>
              <p className='my-4'>
                I love to jump into projects and learn from those around me to refine my skills as a student and developer.
              </p>
              <p className='my-6'>
                Enthusiastic about <strong>competitive coding</strong>. I also enjoy contributing to open-source projects, mentoring others, and continuously learning new tools and technologies to build impactful products.
              </p>
            </motion.div>

            {/* Read more / Read less button (below text, no overlap) */}
            <div
              onClick={toggleExpand}
              className="w-full text-center text-white text-xs bg-zinc-900/30 cursor-pointer py-2 transition-all hover:bg-zinc-900/50"
            >
              {expanded ? (
                <>Read less <span className="hover:animate-bounce">↑</span></>
              ) : (
                <>Read more <span className="hover:animate-bounce">↓</span></>
              )}
            </div>
          </motion.div>


          <div className="mt-12 flex flex-row gap-4 justify-center">
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={handleResumeClick}
                className="text-sm text-zinc-300 flex justify-center items-center gap-2 border border-gray-400 px-2 py-1 rounded-md hover:bg-violet-200 hover:text-zinc-700 transition cursor-pointer"
              >
                <CgFileDocument />
                Resume
              </button>

              <AnimatePresence>
                {showInput && (
                  <motion.div
                    ref={boxRef}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="w-[50vw] sm:w-[40vw] md:w-[30vw] fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-black border border-zinc-700 rounded-lg shadow-lg p-4 flex flex-col sm:flex-row items-center gap-3 cursor-grab active:cursor-grabbing"
                  >
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name here..."
                      className="w-full px-3 py-2 text-sm sm:text-base text-zinc-300 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    />
                    <button
                      onClick={handleAccess}
                      className="w-full sm:w-auto text-sm sm:text-base px-4 py-2 bg-zinc-800 text-zinc-300 rounded-md hover:bg-zinc-700 transition cursor-pointer"
                    >
                      Access
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="mailto:chaturvediinitin@gmail.com"
              className="text-sm hover:text-zinc-300 flex justify-center items-center gap-2 border hover:bg-zinc-900 border-zinc-300 px-2 py-1 rounded-md bg-violet-200 text-zinc-700 transition cursor-pointer"
            >
              <PiTelegramLogoThin />
              Get In Touch
            </a>
          </div>

          <div className='mt-12'>
            <Stack />
          </div>

          <motion.div className="" variants={containerVariants}>
            <h2 className="text-md sm:text-xl font-bold text-white mb-6 text-center sm:text-left border-zinc-700 pt-10">
              Notable Projects
            </h2>

            <motion.div
              className="grid grid-cols-1 gap-6 border-zinc-700 pb-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.01 }}
            >
              {projects.map((project, idx) => (
                <motion.div key={idx} variants={cardVariants} whileHover={{ scale: 1.02 }}>
                  <Card project={project} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
