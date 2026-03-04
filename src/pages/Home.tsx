import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, FileText } from 'lucide-react';
import { useData } from '../context/AppContext';
import { motion } from 'motion/react';

const Home = () => {
  const { data } = useData();
  const { personalInfo } = data;

  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-24">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
        >
          Available for new opportunities
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-7xl"
        >
          {personalInfo.name}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-xl font-medium text-indigo-600 dark:text-indigo-400 sm:text-2xl"
        >
          {personalInfo.title}
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-slate-600 dark:text-slate-400"
        >
          {personalInfo.summary}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0"
        >
          <Link
            to="/projects"
            className="group flex items-center rounded-full bg-indigo-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-indigo-700 hover:shadow-lg dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            View Projects
            <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
          </Link>
          
          <a
            href="/resume.pdf"
            className="flex items-center rounded-full border border-slate-200 bg-white px-8 py-4 text-lg font-semibold text-slate-900 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          >
            <Download className="mr-2" size={20} />
            Download Resume
          </a>
        </motion.div>
      </div>

      {/* Featured Stats or Areas */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-24 grid w-full grid-cols-1 gap-8 sm:grid-cols-3"
      >
        {[
          { label: 'Specialization', value: 'Refinery Ops' },
          { label: 'Experience', value: '5+ Years' },
          { label: 'Certifications', value: 'Six Sigma' },
        ].map((stat, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-8 text-center dark:border-slate-800 dark:bg-slate-900/50">
            <p className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
