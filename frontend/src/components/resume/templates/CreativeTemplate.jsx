import React from "react";

export default function CreativeTemplate({ data }) {
  const {
    personalInfo,
    education,
    experience,
    skills,
    projects,
    achievements,
  } = data;

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans p-6">
      {/* Colorful Header with Sidebar Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sidebar */}
        <aside className="bg-indigo-600 text-white p-6 rounded-lg shadow-lg w-full md:w-1/3">
          {/* Profile Section */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-indigo-300 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
              {personalInfo?.fullName?.charAt(0) || "?"}
            </div>
            <h1 className="text-2xl font-bold">
              {personalInfo?.fullName || "Your Name"}
            </h1>
            <p className="text-indigo-200 mt-2">
              {personalInfo?.title || "Your Title"}
            </p>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <h2 className="uppercase text-sm tracking-wider mb-3 border-b border-indigo-400 pb-1">
              Contact
            </h2>
            <ul className="space-y-2 text-sm">
              {personalInfo?.email && (
                <li className="flex items-center gap-2">
                  <span className="text-indigo-300">✉</span>
                  <span>{personalInfo.email}</span>
                </li>
              )}
              {personalInfo?.phone && (
                <li className="flex items-center gap-2">
                  <span className="text-indigo-300">☏</span>
                  <span>{personalInfo.phone}</span>
                </li>
              )}
              {personalInfo?.location && (
                <li className="flex items-center gap-2">
                  <span className="text-indigo-300">⌂</span>
                  <span>{personalInfo.location}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Social Links */}
          {(personalInfo?.linkedin ||
            personalInfo?.github ||
            personalInfo?.portfolio) && (
            <div className="mb-8">
              <h2 className="uppercase text-sm tracking-wider mb-3 border-b border-indigo-400 pb-1">
                Connect
              </h2>
              <ul className="space-y-2 text-sm">
                {personalInfo?.linkedin && (
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-300">in</span>
                    <a
                      href={`https://${personalInfo.linkedin}`}
                      className="hover:text-indigo-200"
                    >
                      LinkedIn
                    </a>
                  </li>
                )}
                {personalInfo?.github && (
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-300">⌨</span>
                    <a
                      href={`https://${personalInfo.github}`}
                      className="hover:text-indigo-200"
                    >
                      GitHub
                    </a>
                  </li>
                )}
                {personalInfo?.portfolio && (
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-300">🌐</span>
                    <a
                      href={`https://${personalInfo.portfolio}`}
                      className="hover:text-indigo-200"
                    >
                      Portfolio
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div>
              <h2 className="uppercase text-sm tracking-wider mb-3 border-b border-indigo-400 pb-1">
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
                      className="bg-indigo-700 px-2 py-1 text-xs rounded-full"
                    >
                      {skillText}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Languages */}
          {personalInfo?.languages && personalInfo.languages.length > 0 && (
            <div className="mt-8">
              <h2 className="uppercase text-sm tracking-wider mb-3 border-b border-indigo-400 pb-1">
                Languages
              </h2>
              <div className="flex flex-wrap gap-2">
                {personalInfo.languages.map((lang, index) => (
                  <span
                    key={index}
                    className="bg-indigo-700 px-2 py-1 text-xs rounded-full"
                  >
                    {typeof lang === "string"
                      ? lang
                      : lang.name || lang.language || ""}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-2/3 p-2">
          {/* Summary */}
          {personalInfo?.summary && (
            <section className="mb-8">
              <h2 className="text-xl font-bold border-b-2 border-indigo-300 pb-2 mb-4">
                About Me
              </h2>
              <p className="text-gray-700 italic">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold border-b-2 border-indigo-300 pb-2 mb-4">
                Work Experience
              </h2>
              <div className="space-y-6">
                {experience.map((job, index) => (
                  <div
                    key={index}
                    className="relative pl-6 border-l-2 border-indigo-200"
                  >
                    <div className="absolute w-3 h-3 bg-indigo-400 rounded-full -left-[7px] top-1.5"></div>
                    <div className="mb-1">
                      <h3 className="font-bold text-indigo-700">{job.title}</h3>
                      <div className="text-sm text-gray-700">
                        {job.company}
                        {job.location && `, ${job.location}`}
                      </div>
                      <div className="text-xs text-gray-500">
                        {job.startDate} - {job.endDate || "Present"}
                      </div>
                    </div>
                    <p className="text-sm mt-2 text-gray-600">
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold border-b-2 border-indigo-300 pb-2 mb-4">
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="relative pl-6 border-l-2 border-indigo-200"
                  >
                    <div className="absolute w-3 h-3 bg-indigo-400 rounded-full -left-[7px] top-1.5"></div>
                    <div className="mb-1">
                      <h3 className="font-bold text-indigo-700">
                        {edu.degree}
                      </h3>
                      <div className="text-sm text-gray-700">
                        {edu.institution}
                        {edu.location && `, ${edu.location}`}
                      </div>
                      <div className="text-xs text-gray-500">
                        {edu.startDate} - {edu.endDate || "Present"}
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-sm mt-2 text-gray-600">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold border-b-2 border-indigo-300 pb-2 mb-4">
                Projects
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <h3 className="font-bold text-indigo-600">
                      {project.title}
                    </h3>
                    {project.date && (
                      <div className="text-xs text-gray-500 mb-2">
                        {project.date}
                      </div>
                    )}
                    <p className="text-sm text-gray-600">
                      {project.description}
                    </p>
                    {project.url && (
                      <a
                        href={project.url}
                        className="text-xs text-indigo-500 mt-2 inline-block"
                      >
                        View Project ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Achievements */}
          {achievements && achievements.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold border-b-2 border-indigo-300 pb-2 mb-4">
                Achievements
              </h2>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-indigo-500">★</span>
                    <div>
                      {typeof achievement === "string" ? (
                        <p className="text-sm">{achievement}</p>
                      ) : (
                        <div>
                          <strong className="text-sm">
                            {achievement.title}
                          </strong>
                          {achievement.date && (
                            <span className="text-xs text-gray-500 ml-2">
                              ({achievement.date})
                            </span>
                          )}
                          {achievement.description && (
                            <p className="text-xs text-gray-600 mt-1">
                              {achievement.description}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {personalInfo?.certifications &&
            personalInfo.certifications.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold border-b-2 border-indigo-300 pb-2 mb-4">
                  Certifications
                </h2>
                <div className="space-y-3">
                  {personalInfo.certifications.map((cert, index) => (
                    <div key={index} className="flex gap-2">
                      <span className="text-indigo-500">◈</span>
                      <p className="text-sm">
                        {typeof cert === "string"
                          ? cert
                          : cert.name || cert.title || ""}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
        </main>
      </div>
    </div>
  );
}
