import React from 'react';
import { useData } from '../context/AppContext';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const Experience = () => {
  const { data } = useData();
  const { experience } = data;

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        Professional Experience
      </h2>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        A timeline of my professional journey in the refinery and petrochemical industry.
      </p>

      <div className="mt-12 space-y-12">
        {experience.map((exp, idx) => (
          <div 
            key={exp.id} 
            className="relative flex flex-col items-start rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900 md:flex-row"
          >
            <div className="mb-6 flex-shrink-0 md:mb-0 md:mr-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                <Briefcase size={32} />
              </div>
            </div>

            <div className="flex-grow">
              <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {exp.role}
                </h3>
                <div className="mt-2 flex items-center text-sm font-medium text-slate-500 dark:text-slate-500 sm:mt-0">
                  <Calendar className="mr-2" size={16} />
                  {exp.period}
                </div>
              </div>
              
              <div className="mt-2 flex items-center text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                <MapPin className="mr-2" size={18} />
                {exp.company}
              </div>

              <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {exp.description}
              </p>

              <div className="mt-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Key Achievements
                </h4>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {exp.achievements.map((achievement, aIdx) => (
                    <li 
                      key={aIdx} 
                      className="flex items-start text-sm text-slate-600 dark:text-slate-400"
                    >
                      <div className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500"></div>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
