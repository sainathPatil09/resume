import React from "react";

export default function ProfessionalTemplate({ data }) {
  const {
    personalInfo,
    education,
    experience,
    skills,
    projects,
    achievements,
  } = data;

  return (
    <div className="w-full h-full bg-white text-black font-serif p-8">
      {/* Header */}
      <header className="text-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold mb-1">
          {personalInfo?.fullName || "Your Name"}
        </h1>

        <div className="flex justify-center flex-wrap gap-x-4 text-sm">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>{personalInfo.location}</span>}
        </div>

        {/* Social Links */}
        {(personalInfo?.linkedin ||
          personalInfo?.github ||
          personalInfo?.portfolio) && (
          <div className="flex justify-center gap-x-4 text-sm mt-2">
            {personalInfo?.linkedin && (
              <a
                href={`https://${personalInfo.linkedin}`}
                className="text-blue-800"
              >
                LinkedIn
              </a>
            )}
            {personalInfo?.github && (
              <a
                href={`https://${personalInfo.github}`}
                className="text-blue-800"
              >
                GitHub
              </a>
            )}
            {personalInfo?.portfolio && (
              <a
                href={`https://${personalInfo.portfolio}`}
                className="text-blue-800"
              >
                Portfolio
              </a>
            )}
          </div>
        )}
      </header>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b mb-2">
            Professional Summary
          </h2>
          <p className="text-sm">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b mb-2">Experience</h2>
          {experience.map((job, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-bold text-sm">{job.title}</h3>
                <span className="text-sm">
                  {job.startDate} - {job.endDate || "Present"}
                </span>
              </div>
              <div className="text-sm">
                {job.company}
                {job.location && `, ${job.location}`}
              </div>
              <p className="text-xs mt-1">{job.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b mb-2">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-bold text-sm">{edu.degree}</h3>
                <span className="text-sm">
                  {edu.startDate} - {edu.endDate || "Present"}
                </span>
              </div>
              <div className="text-sm">
                {edu.institution}
                {edu.location && `, ${edu.location}`}
              </div>
              {edu.description && (
                <p className="text-xs mt-1">{edu.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 px-2 py-1 text-xs rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b mb-2">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-bold text-sm">{project.title}</h3>
                {project.date && (
                  <span className="text-sm">{project.date}</span>
                )}
              </div>
              {project.url && (
                <a href={project.url} className="text-xs text-blue-800">
                  {project.url}
                </a>
              )}
              <p className="text-xs mt-1">{project.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Achievements */}
      {achievements && achievements.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b mb-2">Achievements</h2>
          <ul className="list-disc pl-5">
            {achievements.map((achievement, index) => (
              <li key={index} className="text-sm mb-1">
                {achievement}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Additional Sections (Certifications, Languages, etc.) */}
      {personalInfo?.certifications &&
        personalInfo.certifications.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold border-b mb-2">Certifications</h2>
            <ul className="list-disc pl-5">
              {personalInfo.certifications.map((cert, index) => (
                <li key={index} className="text-sm mb-1">
                  {cert}
                </li>
              ))}
            </ul>
          </section>
        )}

      {personalInfo?.languages && personalInfo.languages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b mb-2">Languages</h2>
          <div className="flex flex-wrap gap-2">
            {personalInfo.languages.map((lang, index) => (
              <span
                key={index}
                className="bg-gray-100 px-2 py-1 text-xs rounded"
              >
                {lang}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
