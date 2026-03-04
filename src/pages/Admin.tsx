import React, { useState, useReducer, useEffect } from 'react';
import { useData } from '../context/AppContext';
import { Save, Download, RefreshCw, LogOut, Plus, Trash2, ChevronRight, ChevronDown, Loader2, CheckCircle, MessageSquare, Phone, Globe, ArrowLeft, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

// --- Reducer for Form State Management ---

const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          [action.field]: action.value,
        },
      };
    case 'UPDATE_ARRAY_ITEM': {
      const updatedArray = [...state[action.section]];
      updatedArray[action.index] = { ...updatedArray[action.index], [action.field]: action.value };
      return { ...state, [action.section]: updatedArray };
    }
    case 'ADD_ARRAY_ITEM':
      return {
        ...state,
        [action.section]: [...state[action.section], { ...action.template, id: Date.now().toString() }],
      };
    case 'REMOVE_ARRAY_ITEM':
      return {
        ...state,
        [action.section]: state[action.section].filter((_, i) => i !== action.index),
      };
    case 'UPDATE_STRING_ARRAY': {
      const updatedStringArray = [...state[action.section][action.subField]];
      updatedStringArray[action.index] = action.value;
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          [action.subField]: updatedStringArray,
        },
      };
    }
    case 'ADD_STRING_ARRAY':
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          [action.subField]: [...state[action.section][action.subField], ""],
        },
      };
    case 'REMOVE_STRING_ARRAY':
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          [action.subField]: state[action.section][action.subField].filter((_, i) => i !== action.index),
        },
      };
    case 'UPDATE_NESTED_ARRAY': {
      const itemsForNested = [...state[action.section]];
      const subArray = [...itemsForNested[action.itemIndex][action.subField]];
      subArray[action.subIndex] = action.value;
      itemsForNested[action.itemIndex] = { ...itemsForNested[action.itemIndex], [action.subField]: subArray };
      return { ...state, [action.section]: itemsForNested };
    }
    case 'ADD_NESTED_ARRAY': {
      const itemsForAddNested = [...state[action.section]];
      itemsForAddNested[action.itemIndex] = {
        ...itemsForAddNested[action.itemIndex],
        [action.subField]: [...itemsForAddNested[action.itemIndex][action.subField], ""],
      };
      return { ...state, [action.section]: itemsForAddNested };
    }
    case 'REMOVE_NESTED_ARRAY': {
      const itemsForRemoveNested = [...state[action.section]];
      itemsForRemoveNested[action.itemIndex] = {
        ...itemsForRemoveNested[action.itemIndex],
        [action.subField]: itemsForRemoveNested[action.itemIndex][action.subField].filter((_, i) => i !== action.subIndex),
      };
      return { ...state, [action.section]: itemsForRemoveNested };
    }
    case 'UPDATE_AWARD': {
      const updatedAwards = [...state.awards];
      updatedAwards[action.index] = { ...updatedAwards[action.index], [action.field]: action.value };
      return { ...state, awards: updatedAwards };
    }
    case 'ADD_AWARD':
      return {
        ...state,
        awards: [...state.awards, { id: Date.now().toString(), name: '', year: '', institute: '' }],
      };
    case 'REMOVE_AWARD':
      return {
        ...state,
        awards: state.awards.filter((_, i) => i !== action.index),
      };
    case 'RESET_FORM':
      return action.data;
    default:
      return state;
  }
};

// --- Sub-components for Form Sections ---

const PersonalInfoForm = ({ data, dispatch }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Personal Information</h3>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Name</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', section: 'personalInfo', field: 'name', value: e.target.value })}
          className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>
      <div>
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Title</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', section: 'personalInfo', field: 'title', value: e.target.value })}
          className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>
    </div>
    <div className="h-px bg-slate-100 dark:bg-slate-800" />
    <div>
      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Summary</label>
      <textarea
        value={data.summary}
        onChange={(e) => dispatch({ type: 'UPDATE_FIELD', section: 'personalInfo', field: 'summary', value: e.target.value })}
        rows={4}
        className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />
    </div>
  </div>
);

const AboutForm = ({ data, dispatch }) => (
  <div className="space-y-8">
    <h3 className="text-xl font-bold text-slate-900 dark:text-white">About & Expertise</h3>
    <div>
      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Professional Summary</label>
      <textarea
        value={data.professionalSummary}
        onChange={(e) => dispatch({ type: 'UPDATE_FIELD', section: 'about', field: 'professionalSummary', value: e.target.value })}
        rows={4}
        className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />
    </div>
    <div className="h-px bg-slate-100 dark:bg-slate-800" />
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">Core Expertise</h4>
        <button
          onClick={() => dispatch({ type: 'ADD_STRING_ARRAY', section: 'about', subField: 'coreExpertise' })}
          className="flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400"
        >
          <Plus className="mr-1" size={14} /> Add Expertise
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {data.coreExpertise.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <input
              type="text"
              value={item}
              onChange={(e) => dispatch({ type: 'UPDATE_STRING_ARRAY', section: 'about', subField: 'coreExpertise', index: idx, value: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <button
              onClick={() => dispatch({ type: 'REMOVE_STRING_ARRAY', section: 'about', subField: 'coreExpertise', index: idx })}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">Certifications</h4>
        <button
          onClick={() => dispatch({ type: 'ADD_STRING_ARRAY', section: 'about', subField: 'certifications' })}
          className="flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400"
        >
          <Plus className="mr-1" size={14} /> Add Certification
        </button>
      </div>
      <div className="space-y-3">
        {data.certifications.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <input
              type="text"
              value={item}
              onChange={(e) => dispatch({ type: 'UPDATE_STRING_ARRAY', section: 'about', subField: 'certifications', index: idx, value: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <button
              onClick={() => dispatch({ type: 'REMOVE_STRING_ARRAY', section: 'about', subField: 'certifications', index: idx })}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SkillsForm = ({ data, dispatch }) => (
  <div className="space-y-8">
    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Skills</h3>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">Technical Skills</h4>
        <button
          onClick={() => dispatch({ type: 'ADD_STRING_ARRAY', section: 'skills', subField: 'technical' })}
          className="flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400"
        >
          <Plus className="mr-1" size={14} /> Add Skill
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {data.technical.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <input
              type="text"
              value={item}
              onChange={(e) => dispatch({ type: 'UPDATE_STRING_ARRAY', section: 'skills', subField: 'technical', index: idx, value: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <button
              onClick={() => dispatch({ type: 'REMOVE_STRING_ARRAY', section: 'skills', subField: 'technical', index: idx })}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">Soft Skills</h4>
        <button
          onClick={() => dispatch({ type: 'ADD_STRING_ARRAY', section: 'skills', subField: 'soft' })}
          className="flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400"
        >
          <Plus className="mr-1" size={14} /> Add Skill
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {data.soft.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <input
              type="text"
              value={item}
              onChange={(e) => dispatch({ type: 'UPDATE_STRING_ARRAY', section: 'skills', subField: 'soft', index: idx, value: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <button
              onClick={() => dispatch({ type: 'REMOVE_STRING_ARRAY', section: 'skills', subField: 'soft', index: idx })}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ExperienceForm = ({ data, dispatch, expandedItems, toggleExpand }) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Experience</h3>
      <button
        onClick={() => dispatch({ type: 'ADD_ARRAY_ITEM', section: 'experience', template: { role: '', company: '', period: '', description: '', achievements: [] } })}
        className="flex items-center text-sm font-bold text-indigo-600 dark:text-indigo-400"
      >
        <Plus className="mr-1" size={16} /> Add Role
      </button>
    </div>
    <div className="space-y-4">
      {data.map((exp, idx) => {
        const isExpanded = expandedItems[`experience-${exp.id}`];
        return (
          <div key={exp.id} className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/30">
            <div
              onClick={() => toggleExpand('experience', exp.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleExpand('experience', exp.id); } }}
              role="button"
              tabIndex={0}
              className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:hover:bg-slate-800/50"
            >
              <div className="flex items-center space-x-3">
                <div className={isExpanded ? "rotate-180 transition-transform" : "transition-transform"}>
                  <ChevronDown size={18} className="text-slate-400" />
                </div>
                <span className="font-bold text-slate-900 dark:text-white">
                  {exp.role || "Untitled Role"} @ {exp.company || "Untitled Company"}
                </span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); dispatch({ type: 'REMOVE_ARRAY_ITEM', section: 'experience', index: idx }); }}
                className="text-red-500 hover:text-red-700 focus:outline-none"
                aria-label="Delete experience"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {isExpanded && (
              <div className="border-t border-slate-100 p-6 dark:border-slate-800">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Role</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => dispatch({ type: 'UPDATE_ARRAY_ITEM', section: 'experience', index: idx, field: 'role', value: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => dispatch({ type: 'UPDATE_ARRAY_ITEM', section: 'experience', index: idx, field: 'company', value: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Period</label>
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => dispatch({ type: 'UPDATE_ARRAY_ITEM', section: 'experience', index: idx, field: 'period', value: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Description</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => dispatch({ type: 'UPDATE_ARRAY_ITEM', section: 'experience', index: idx, field: 'description', value: e.target.value })}
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Achievements</label>
                    <button
                      onClick={() => dispatch({ type: 'ADD_NESTED_ARRAY', section: 'experience', itemIndex: idx, subField: 'achievements' })}
                      className="flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400"
                    >
                      <Plus className="mr-1" size={14} /> Add Achievement
                    </button>
                  </div>
                  <div className="mt-3 space-y-2">
                    {exp.achievements.map((achievement, aIdx) => (
                      <div key={aIdx} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={achievement}
                          onChange={(e) => dispatch({ type: 'UPDATE_NESTED_ARRAY', section: 'experience', itemIndex: idx, subField: 'achievements', subIndex: aIdx, value: e.target.value })}
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_NESTED_ARRAY', section: 'experience', itemIndex: idx, subField: 'achievements', subIndex: aIdx })}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

const ProjectsForm = ({ data, dispatch, expandedItems, toggleExpand }) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Projects</h3>
      <button
        onClick={() => dispatch({ type: 'ADD_ARRAY_ITEM', section: 'projects', template: { title: '', problem: '', methodology: '', tools: [], results: '' } })}
        className="flex items-center text-sm font-bold text-indigo-600 dark:text-indigo-400"
      >
        <Plus className="mr-1" size={16} /> Add Project
      </button>
    </div>
    <div className="space-y-4">
      {data.map((project, idx) => {
        const isExpanded = expandedItems[`projects-${project.id}`];
        return (
          <div key={project.id} className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/30">
            <div
              onClick={() => toggleExpand('projects', project.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleExpand('projects', project.id); } }}
              role="button"
              tabIndex={0}
              className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:hover:bg-slate-800/50"
            >
              <div className="flex items-center space-x-3">
                <div className={isExpanded ? "rotate-180 transition-transform" : "transition-transform"}>
                  <ChevronDown size={18} className="text-slate-400" />
                </div>
                <span className="font-bold text-slate-900 dark:text-white">
                  {project.title || "Untitled Project"}
                </span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); dispatch({ type: 'REMOVE_ARRAY_ITEM', section: 'projects', index: idx }); }}
                className="text-red-500 hover:text-red-700 focus:outline-none"
                aria-label="Delete project"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {isExpanded && (
              <div className="border-t border-slate-100 p-6 dark:border-slate-800">
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Title</label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => dispatch({ type: 'UPDATE_ARRAY_ITEM', section: 'projects', index: idx, field: 'title', value: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Problem</label>
                      <textarea
                        value={project.problem}
                        onChange={(e) => dispatch({ type: 'UPDATE_ARRAY_ITEM', section: 'projects', index: idx, field: 'problem', value: e.target.value })}
                        rows={3}
                        className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Methodology</label>
                      <textarea
                        value={project.methodology}
                        onChange={(e) => dispatch({ type: 'UPDATE_ARRAY_ITEM', section: 'projects', index: idx, field: 'methodology', value: e.target.value })}
                        rows={3}
                        className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Results</label>
                    <input
                      type="text"
                      value={project.results}
                      onChange={(e) => dispatch({ type: 'UPDATE_ARRAY_ITEM', section: 'projects', index: idx, field: 'results', value: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Tools Used</label>
                      <button
                        onClick={() => dispatch({ type: 'ADD_NESTED_ARRAY', section: 'projects', itemIndex: idx, subField: 'tools' })}
                        className="flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400"
                      >
                        <Plus className="mr-1" size={14} /> Add Tool
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tools.map((tool, tIdx) => (
                        <div key={tIdx} className="flex items-center space-x-1 rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800">
                          <input
                            type="text"
                            value={tool}
                            onChange={(e) => dispatch({ type: 'UPDATE_NESTED_ARRAY', section: 'projects', itemIndex: idx, subField: 'tools', subIndex: tIdx, value: e.target.value })}
                            className="w-24 bg-transparent px-2 py-1 text-xs outline-none dark:text-white"
                          />
                          <button
                            onClick={() => dispatch({ type: 'REMOVE_NESTED_ARRAY', section: 'projects', itemIndex: idx, subField: 'tools', subIndex: tIdx })}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

const AwardsForm = ({ data, dispatch }) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Awards</h3>
      <button
        onClick={() => dispatch({ type: 'ADD_AWARD' })}
        className="flex items-center text-sm font-bold text-indigo-600 dark:text-indigo-400"
      >
        <Plus className="mr-1" size={16} /> Add Award
      </button>
    </div>
    <div className="space-y-4">
      {data.map((award, idx) => (
        <div key={award.id} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/30">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-900 dark:text-white">Award #{idx + 1}</h4>
            <button
              onClick={() => dispatch({ type: 'REMOVE_AWARD', index: idx })}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Award Name</label>
              <input
                type="text"
                value={award.name}
                onChange={(e) => dispatch({ type: 'UPDATE_AWARD', index: idx, field: 'name', value: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Year</label>
              <input
                type="text"
                value={award.year}
                onChange={(e) => dispatch({ type: 'UPDATE_AWARD', index: idx, field: 'year', value: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Institute</label>
              <input
                type="text"
                value={award.institute}
                onChange={(e) => dispatch({ type: 'UPDATE_AWARD', index: idx, field: 'institute', value: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ContactForm = ({ data, dispatch }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Contact Details</h3>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', section: 'contact', field: 'email', value: e.target.value })}
          className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>
      <div>
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">LinkedIn Profile</label>
        <input
          type="text"
          value={data.linkedin}
          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', section: 'contact', field: 'linkedin', value: e.target.value })}
          className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>
      <div>
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Location</label>
        <input
          type="text"
          value={data.location}
          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', section: 'contact', field: 'location', value: e.target.value })}
          className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>
    </div>
  </div>
);

const MessagesView = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    
    setDeletingId(id);
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setMessages(prev => prev.filter(msg => msg.id !== id));
      } else {
        const errorData = await response.json();
        alert(`Failed to delete message: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('An error occurred while deleting the message.');
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-slate-500">
        <MessageSquare size={48} className="mb-4 opacity-20" />
        <p>No messages received yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Contact Form Submissions</h3>
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="group relative rounded-2xl border border-slate-100 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800/50">
            <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">{msg.name}</h4>
                <p className="text-sm text-slate-500">{msg.email}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-xs text-slate-400">
                  {new Date(msg.timestamp).toLocaleString()}
                </div>
                <button
                  onClick={() => handleDelete(msg.id)}
                  disabled={deletingId === msg.id}
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-50 dark:hover:bg-red-900/20"
                  title="Delete message"
                >
                  {deletingId === msg.id ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Trash2 size={18} />
                  )}
                </button>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Subject</div>
              <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">{msg.subject}</p>
            </div>
            <div className="mt-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Message</div>
              <p className="mt-1 whitespace-pre-wrap text-slate-600 dark:text-slate-400">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Admin Component ---

const Admin = () => {
  const { data, updateData, resetData } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('admin_authenticated') === 'true');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('personal');
  const [expandedItems, setExpandedItems] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Single state object for all form data managed by useReducer
  const [formData, dispatch] = useReducer(formReducer, data);

  // Sync formData with context data when context data changes (e.g., on reset)
  useEffect(() => {
    dispatch({ type: 'RESET_FORM', data });
  }, [data]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('admin_authenticated', 'true');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Invalid password');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  };

  const handleSave = async () => {
    const { personalInfo } = formData;
    if (!personalInfo.name.trim() || !personalInfo.title.trim()) {
      alert('Name and Title are required fields.');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        updateData(formData);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        const errorData = await response.json();
        alert(`Failed to save data: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('An error occurred while saving data. Check the console for details.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'portfolio_data.json');
    linkElement.click();
  };

  const toggleExpand = (section, id) => {
    setExpandedItems(prev => ({
      ...prev,
      [`${section}-${id}`]: !prev[`${section}-${id}`]
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-8 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white">
              <User size={32} />
            </div>
          </div>
          <h2 className="text-center text-2xl font-bold text-slate-900 dark:text-white">Admin Login</h2>
          <p className="mt-2 text-center text-slate-600 dark:text-slate-400">Enter password to access dashboard</p>
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 py-4 font-bold text-white transition-all hover:bg-indigo-700"
            >
              Access Dashboard
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-slate-500">Hint: admin123</p>
          <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800">
            <Link to="/" className="flex items-center justify-center text-sm font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400">
              <ArrowLeft className="mr-2" size={16} /> Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
          <div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm hover:text-indigo-600 dark:bg-slate-900 dark:text-slate-400">
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h2>
                <p className="text-slate-600 dark:text-slate-400">Manage your portfolio content</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              className={`flex items-center rounded-lg px-4 py-2 text-sm font-bold text-white transition-all ${
                showSuccess ? 'bg-emerald-500' : 'bg-emerald-600 hover:bg-emerald-700'
              } disabled:opacity-70 disabled:cursor-not-allowed min-w-[140px] justify-center`}
            >
              <AnimatePresence mode="wait">
                {isSaving ? (
                  <motion.div
                    key="saving"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center"
                  >
                    <Loader2 className="mr-2 animate-spin" size={18} />
                    Saving...
                  </motion.div>
                ) : showSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center"
                  >
                    <CheckCircle className="mr-2" size={18} />
                    Saved!
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center"
                  >
                    <Save className="mr-2" size={18} />
                    Save Changes
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <button onClick={handleExport} className="flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-indigo-700">
              <Download className="mr-2" size={18} /> Export JSON
            </button>
            <button
              onClick={() => { if (window.confirm('Reset to initial data? All local changes will be lost.')) resetData(); }}
              className="flex items-center rounded-lg bg-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition-all hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <RefreshCw className="mr-2" size={18} /> Reset
            </button>
            <button 
              onClick={() => { 
                setIsAuthenticated(false); 
                localStorage.removeItem('admin_authenticated'); 
              }} 
              className="flex items-center rounded-lg bg-red-100 px-4 py-2 text-sm font-bold text-red-600 transition-all hover:bg-red-200"
            >
              <LogOut className="mr-2" size={18} /> Logout
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="space-y-2 lg:col-span-1">
            {[
              { id: 'personal', label: 'Personal Info', icon: <User size={18} /> },
              { id: 'about', label: 'About & Expertise', icon: <Globe size={18} /> },
              { id: 'skills', label: 'Skills', icon: <ChevronRight size={18} /> },
              { id: 'experience', label: 'Experience', icon: <ChevronRight size={18} /> },
              { id: 'projects', label: 'Projects', icon: <ChevronRight size={18} /> },
              { id: 'awards', label: 'Awards', icon: <ChevronRight size={18} /> },
              { id: 'contact', label: 'Contact Info', icon: <Phone size={18} /> },
              { id: 'messages', label: 'Messages', icon: <MessageSquare size={18} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                </div>
                <ChevronRight size={18} className={activeTab === tab.id ? 'opacity-100' : 'opacity-0'} />
              </button>
            ))}
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-3">
            {activeTab === 'personal' && <PersonalInfoForm data={formData.personalInfo} dispatch={dispatch} />}
            {activeTab === 'about' && <AboutForm data={formData.about} dispatch={dispatch} />}
            {activeTab === 'skills' && <SkillsForm data={formData.skills} dispatch={dispatch} />}
            {activeTab === 'experience' && <ExperienceForm data={formData.experience} dispatch={dispatch} expandedItems={expandedItems} toggleExpand={toggleExpand} />}
            {activeTab === 'projects' && <ProjectsForm data={formData.projects} dispatch={dispatch} expandedItems={expandedItems} toggleExpand={toggleExpand} />}
            {activeTab === 'awards' && <AwardsForm data={formData.awards} dispatch={dispatch} />}
            {activeTab === 'contact' && <ContactForm data={formData.contact} dispatch={dispatch} />}
            {activeTab === 'messages' && <MessagesView />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
