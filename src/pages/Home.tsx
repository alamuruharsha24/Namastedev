import React, { useEffect } from 'react'; // Add useEffect here
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Brain, BookOpen, Users, Terminal, ChevronRight, Mail, Twitter, Github, Linkedin, Phone } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const companies = [
  'Google', 'Microsoft', 'Amazon', 'Netflix', 'Meta', 
  'Uber', 'Spotify', 'PayPal', 'Intel', 'IBM'
];

const courses = [
  {
    id: 'javascript',
    title: 'Namaste JavaScript',
    description: 'Master JavaScript from basics to advanced concepts',
    icon: <Code2 />,
    price: 'Free',
    companies: ['Google', 'Microsoft', 'Netflix']
  },
  {
    id: 'react',
    title: 'Namaste React',
    description: 'Build modern web applications with React',
    icon: <Code2 />,
    price: '₹800',
    companies: ['Amazon', 'Meta', 'Uber']
  },
  {
    id: 'node',
    title: 'Namaste Node',
    description: 'Backend development with Node.js',
    icon: <Code2 />,
    price: '₹1000',
    companies: ['PayPal', 'Intel', 'IBM']
  },
  {
    id: 'system',
    title: 'Namaste System Design',
    description: 'Learn to design scalable systems',
    icon: <Brain />,
    price: '₹1200',
    companies: ['Spotify', 'Amazon', 'Google']
  },
];

const features = [
  {
    id: 1,
    title: 'Expert Instructors',
    description: 'Learn from industry professionals with real-world experience',
    icon: <Users />
  },
  {
    id: 2,
    title: 'Practical Projects',
    description: 'Hands-on projects to build your portfolio',
    icon: <Terminal />
  },
  {
    id: 3,
    title: 'Flexible Learning',
    description: 'Access courses anytime, anywhere, on any device',
    icon: <BookOpen />
  },
];

const comments = [
  {
    id: 1,
    user: 'Alice',
    comment: 'Great course! Helped me land a job at Google.',
    course: 'Namaste JavaScript'
  },
  {
    id: 2,
    user: 'Bob',
    comment: 'Very detailed and well-explained.',
    course: 'Namaste React'
  },
  {
    id: 3,
    user: 'Charlie',
    comment: 'Excellent course! Highly recommended.',
    course: 'Namaste Node'
  },
  {
    id: 4,
    user: 'Diana',
    comment: 'The projects were very practical.',
    course: 'Namaste System Design'
  },
  {
    id: 5,
    user: 'Eve',
    comment: 'Loved the course! Very comprehensive.',
    course: 'Namaste JavaScript'
  },
  {
    id: 6,
    user: 'Frank',
    comment: 'The instructor is very knowledgeable.',
    course: 'Namaste React'
  }
];

const AnimatedSection = ({ children, threshold = 0.2 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
      {/* Navbar */}
      <nav className="fixed w-full bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-700">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Namaste Dev
            </span>
          </Link>
          <div className="flex space-x-8 text-gray-300">
            <button onClick={() => scrollToSection('courses')} className="hover:text-purple-400 transition-colors">Courses</button>
            <Link to="/signup" className="hover:text-purple-400 transition-colors">Sign Up</Link>
            <Link to="/login" className="hover:text-purple-400 transition-colors">Login</Link>
            <button onClick={() => scrollToSection('footer')} className="hover:text-purple-400 transition-colors">Contact</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Transform Your Coding Skills
              </h1>
            </motion.div>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Master modern technologies with industry-aligned courses and real-world projects
            </p>
            <div className="flex justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/signup"
                  className="bg-purple-500 hover:bg-purple-600 px-8 py-3 rounded-lg font-semibold text-white flex items-center"
                >
                  Start Learning Free
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Logos */}
      <div className="py-12 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="flex overflow-hidden relative before:absolute before:left-0 before:top-0 before:w-24 before:h-full before:bg-gradient-to-r before:from-gray-800 before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:w-24 after:h-full after:bg-gradient-to-l after:from-gray-800 after:to-transparent after:z-10">
            <div className="flex space-x-16 py-4 animate-marquee whitespace-nowrap">
              {[...companies, ...companies].map((company, index) => (
                <div key={index} className="text-gray-400 text-xl font-medium">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-200">
              Why Choose Namaste Dev
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <motion.div
                  key={feature.id}
                  whileHover={{ y: -10 }}
                  className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500/30 transition-all"
                >
                  <div className="mb-6 text-purple-400">
                    {React.cloneElement(feature.icon, { className: 'w-12 h-12' })}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-200">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-24 bg-gray-800/30">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-200">Popular Courses</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Join thousands of learners from top companies worldwide
              </p>
            </div>
            <div className="grid lg:grid-cols-4 gap-8">
              {courses.map((course) => (
                <motion.div 
                  key={course.id}
                  whileHover={{ y: -10 }}
                  className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500/30 transition-all cursor-pointer"
                  onClick={() => handleCourseClick(course.id)}
                >
                  <div className="mb-6 text-purple-400">
                    {React.cloneElement(course.icon, { className: 'w-12 h-12' })}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-200">{course.title}</h3>
                  <p className="text-gray-400 mb-6">{course.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.companies.map((company) => (
                      <span 
                        key={company}
                        className="px-3 py-1 text-xs bg-purple-500/10 text-purple-400 rounded-full"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                  <div className="text-purple-400 font-bold text-lg">{course.price}</div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Student Comments Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-200">
              What Our Students Say
            </h2>
            <div className="overflow-hidden relative">
              <div className="flex animate-scroll-comments whitespace-nowrap">
                {[...comments, ...comments].map((comment, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -10 }}
                    className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500/30 transition-all min-w-[300px] mx-4"
                  >
                    <h3 className="text-lg font-semibold mb-2 text-gray-200">{comment.course}</h3>
                    <p className="text-gray-400 mb-4 text-sm">{comment.comment}</p>
                    <p className="text-gray-400 font-medium text-sm">- {comment.user}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-gray-900/80 py-12 border-t border-gray-700">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-gray-400">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Code2 className="w-8 h-8 text-purple-400" />
                <span className="text-xl font-bold text-gray-200">Namaste Dev</span>
              </div>
              <p>Empowering developers worldwide</p>
              <div className="flex space-x-4 mt-4">
                <a href="mailto:contact@namastedev.com" className="hover:text-purple-400">
                  <Mail className="w-6 h-6" />
                </a>
                <a href="https://twitter.com/namastedev" className="hover:text-purple-400">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="https://github.com/namastedev" className="hover:text-purple-400">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com/company/namastedev" className="hover:text-purple-400">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-gray-200 font-semibold mb-4">Courses</h3>
              <ul className="space-y-2">
                <li><Link to="/courses/javascript" className="hover:text-purple-400">JavaScript</Link></li>
                <li><Link to="/courses/react" className="hover:text-purple-400">React</Link></li>
                <li><Link to="/courses/node" className="hover:text-purple-400">Node.js</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-200 font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:contact@namastedev.com" className="hover:text-purple-400">
                    contact@namastedev.com
                  </a>
                </li>
                <li>
                  <a href="tel:+1234567890" className="hover:text-purple-400">
                    +1 (234) 567-890
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-200 font-semibold mb-4">Newsletter</h3>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-400"
                />
                <button
                  type="submit"
                  className="w-full bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg font-semibold text-white"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Namaste Dev. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* CSS for Auto-Scrolling Comments */}
      <style>
        {`
          @keyframes scroll-comments {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-comments {
            animation: scroll-comments 20s linear infinite;
            display: flex;
          }
        `}
      </style>
    </div>
  );
};

export default Home;