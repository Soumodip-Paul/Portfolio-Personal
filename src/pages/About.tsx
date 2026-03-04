import React from 'react';
import { useData } from '../context/AppContext';
import { Award, CheckCircle2 } from 'lucide-react';

const About = () => {
  const { data } = useData();
  const { about } = data;

  return (
    <div className="space-y-16 py-8">
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Professional Summary
        </h2>
        <div className="mt-6 max-w-3xl">
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {about.professionalSummary}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <section>
          <h3 className="flex items-center text-2xl font-bold text-slate-900 dark:text-white">
            <CheckCircle2 className="mr-3 text-indigo-600" size={24} />
            Core Expertise
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {about.coreExpertise.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center rounded-lg border border-slate-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="h-2 w-2 rounded-full bg-indigo-500 mr-3"></div>
                <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="flex items-center text-2xl font-bold text-slate-900 dark:text-white">
            <Award className="mr-3 text-indigo-600" size={24} />
            Certifications
          </h3>
          <div className="mt-6 space-y-4">
            {about.certifications.map((cert, idx) => (
              <div 
                key={idx} 
                className="rounded-xl border border-slate-100 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50"
              >
                <p className="font-semibold text-slate-900 dark:text-white">{cert}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">Verified Professional Credential</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {data.awards && data.awards.length > 0 && (
        <section>
          <h3 className="flex items-center text-2xl font-bold text-slate-900 dark:text-white">
            <Award className="mr-3 text-indigo-600" size={24} />
            Awards & Recognition
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.awards.map((award) => (
              <div 
                key={award.id} 
                className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="absolute top-0 left-0 h-1 w-full bg-indigo-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{award.year}</p>
                <h4 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{award.name}</h4>
                <p className="mt-1 text-slate-600 dark:text-slate-400">{award.institute}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default About;
