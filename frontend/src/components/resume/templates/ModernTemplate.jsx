import React from "react";

export default function ModernTemplate({ data }) {
  const {
    personalInfo,
    education,
    experience,
    skills,
    projects,
    achievements,
  } = data;

  return (
    <div className="w-full h-full bg-white text-gray-800 font-sans p-8">
      {/* Minimalist Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-1">
          {personalInfo?.fullName || "Your Name"}
        </h1>
        <p className="text-lg text-gray-500">
          {personalInfo?.title || "Professional Title"}
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600">
          {personalInfo?.email && (
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center hover:text-blue-600"
            >
              <span className="mr-1">✉</span> {personalInfo.email}
            </a>
          )}

          {personalInfo?.phone && (
            <span className="flex items-center">
              <span className="mr-1">☏</span> {personalInfo.phone}
            </span>
          )}

          {personalInfo?.location && (
            <span className="flex items-center">
              <span className="mr-1">⌂</span> {personalInfo.location}
            </span>
          )}
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap gap-4 mt-3 text-sm">
          {personalInfo?.linkedin && (
            <a
              href={`https://${personalInfo.linkedin}`}
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
          )}

          {personalInfo?.github && (
            <a
              href={`https://${personalInfo.github}`}
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
          )}

          {personalInfo?.portfolio && (
            <a
              href={`https://${personalInfo.portfolio}`}
              className="text-blue-600 hover:underline"
            >
              Portfolio
            </a>
          )}
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-2">
          {/* Summary */}
          {personalInfo?.summary && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                About
              </h2>
              <p className="text-gray-600">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((job, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex flex-wrap justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-800">
                        {job.title}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {job.startDate} - {job.endDate || "Present"}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {job.company}
                      {job.location && ` • ${job.location}`}
                    </div>
                    <p className="text-sm text-gray-600">{job.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Projects
              </h2>
              <div className="space-y-5">
                {projects.map((project, index) => (
                  <div key={index}>
                    <div className="flex flex-wrap justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-800">
                        {project.title}
                      </h3>
                      {project.date && (
                        <span className="text-sm text-gray-500">
                          {project.date}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {project.description}
                    </p>
                    {project.url && (
                      <a
                        href={project.url}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {project.url}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Education */}
          {education && education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-800">
                      {edu.degree}
                    </h3>
                    <div className="text-sm text-gray-600">
                      {edu.institution}
                      {edu.location && `, ${edu.location}`}
                    </div>
                    <div className="text-sm text-gray-500 mb-1">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </div>
                    {edu.description && (
                      <p className="text-xs text-gray-600">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skillItem, index) => {
                  const skillText =
                    typeof skillItem === "string"
                      ? skillItem
                      : skillItem.skill || "";

                  return (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-3 py-1 text-sm rounded-full"
                    >
                      {skillText}
                    </span>
                  );
                })}
              </div>
            </section>
          )}

          {/* Achievements */}
          {achievements && achievements.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Achievements
              </h2>
              <ul className="space-y-2">
                {achievements.map((achievement, index) => (
                  <li key={index} className="text-sm">
                    {typeof achievement === "string" ? (
                      achievement
                    ) : (
                      <div>
                        <span className="font-medium">{achievement.title}</span>
                        {achievement.date && (
                          <span className="text-gray-500 text-xs ml-1">
                            ({achievement.date})
                          </span>
                        )}
                        {achievement.description && (
                          <p className="text-xs text-gray-600 mt-0.5">
                            {achievement.description}
                          </p>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Certifications */}
          {personalInfo?.certifications &&
            personalInfo.certifications.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Certifications
                </h2>
                <ul className="space-y-1">
                  {personalInfo.certifications.map((cert, index) => (
                    <li key={index} className="text-sm">
                      {typeof cert === "string"
                        ? cert
                        : cert.name || cert.title || ""}
                    </li>
                  ))}
                </ul>
              </section>
            )}

          {/* Languages */}
          {personalInfo?.languages && personalInfo.languages.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Languages
              </h2>
              <div className="flex flex-wrap gap-2">
                {personalInfo.languages.map((lang, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 text-sm rounded-full"
                  >
                    {typeof lang === "string"
                      ? lang
                      : lang.name || lang.language || ""}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
