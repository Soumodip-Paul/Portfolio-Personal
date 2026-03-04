import React from 'react';
import { useData } from '../context/AppContext';

const Footer = () => {
  const { data } = useData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {currentYear} {data.personalInfo.name}. All rights reserved.
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
              Chemical Engineer | Refinery Production Specialist
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href={`mailto:${data.personalInfo.email}`}
              className="text-sm text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
            >
              Email
            </a>
            <a
              href={data.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
