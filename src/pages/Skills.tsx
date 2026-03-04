import React from 'react';
import { useData } from '../context/AppContext';
import { Code, Users, Terminal, Database, ShieldCheck, Search } from 'lucide-react';

const Skills = () => {
  const { data } = useData();
  const { skills } = data;

  const technicalIcons = [
    <Terminal size={24} />,
    <Database size={24} />,
    <Code size={24} />,
    <ShieldCheck size={24} />,
  ];

  const softIcons = [
    <Users size={24} />,
    <Search size={24} />,
    <BarChart3 size={24} />,
  ];

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        Technical & Soft Skills
      </h2>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        A comprehensive overview of my technical expertise and professional capabilities.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <section>
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none">
              <Code size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Technical Skills</h3>
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {skills.technical.map((skill, idx) => (
              <div 
                key={idx} 
                className="group flex items-center rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-900"
              >
                <div className="mr-4 h-2 w-2 rounded-full bg-indigo-500 transition-all group-hover:scale-150 group-hover:bg-indigo-600"></div>
                <span className="text-lg font-semibold text-slate-700 dark:text-slate-300">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-none">
              <Users size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Soft Skills</h3>
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {skills.soft.map((skill, idx) => (
              <div 
                key={idx} 
                className="group flex items-center rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-900"
              >
                <div className="mr-4 h-2 w-2 rounded-full bg-emerald-500 transition-all group-hover:scale-150 group-hover:bg-emerald-600"></div>
                <span className="text-lg font-semibold text-slate-700 dark:text-slate-300">{skill}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// Helper for dynamic icons if needed
import { BarChart3 } from 'lucide-react';

export default Skills;
