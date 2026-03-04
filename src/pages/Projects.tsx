import React from 'react';
import { useData } from '../context/AppContext';
import { Settings, Target, Zap, BarChart3 } from 'lucide-react';

const Projects = () => {
  const { data } = useData();
  const { projects } = data;

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        Refinery Optimization Projects
      </h2>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        Showcasing technical projects focused on efficiency, cost reduction, and yield optimization.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="bg-slate-50 p-8 dark:bg-slate-800/50">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {project.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tools.map((tool, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex-grow space-y-6 p-8">
              <div>
                <div className="flex items-center text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  <Target className="mr-2" size={16} />
                  Problem
                </div>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  {project.problem}
                </p>
              </div>

              <div>
                <div className="flex items-center text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  <Settings className="mr-2" size={16} />
                  Methodology
                </div>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  {project.methodology}
                </p>
              </div>

              <div className="rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-900/20">
                <div className="flex items-center text-sm font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                  <BarChart3 className="mr-2" size={16} />
                  Results
                </div>
                <p className="mt-2 font-semibold text-indigo-900 dark:text-indigo-100">
                  {project.results}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
