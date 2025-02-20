import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, BookOpen, Check, ExternalLink } from "lucide-react";

const Roadmap = ({ data }) => {
  useEffect(() => {
    // Debug the received data
    console.log("Roadmap received data:", data);
  }, [data]);

  // Validate data structure
  if (!data || !data.sections) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-4">Invalid data format received</h2>
        <pre className="bg-gray-100 p-4 rounded text-left overflow-auto max-h-96 text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  }

  // Calculate completion percentage for progress bar - this would be dynamic in a real app
  const getProgressColor = (index) => {
    const colors = [
      "bg-emerald-500",
      "bg-blue-500",
      "bg-purple-500",
      "bg-amber-500",
    ];
    return colors[index % colors.length];
  };

  const getSectionBackground = (index) => {
    const colors = [
      "bg-emerald-50 border-emerald-200",
      "bg-blue-50 border-blue-200",
      "bg-purple-50 border-purple-200",
      "bg-amber-50 border-amber-200",
    ];
    return colors[index % colors.length];
  };

  const getTimeframeColor = (index) => {
    const colors = [
      "bg-emerald-100 text-emerald-800",
      "bg-blue-100 text-blue-800",
      "bg-purple-100 text-purple-800",
      "bg-amber-100 text-amber-800",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          {data.roadmapTitle}
        </h1>
        <div className="flex items-center justify-center mt-3">
          <Clock className="w-5 h-5 text-gray-500 mr-2" />
          <span className="text-lg text-gray-600">
            Estimated timeframe: {data.overallTimeFrame}
          </span>
        </div>
      </div>

      {/* Timeline visualization */}
      <div className="relative mb-12 hidden md:block">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2"></div>
        <div className="flex justify-between relative">
          {data.sections.map((section, index) => (
            <div
              key={index}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${getProgressColor(
                  index
                )}`}
              >
                {index + 1}
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700 max-w-[120px] text-center">
                {section.sectionTitle?.split("(")[0].trim() ||
                  `Section ${index + 1}`}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.sections.map((section, index) => (
          <div
            key={index}
            className={`rounded-xl border p-6 transition-all duration-200 hover:shadow-md ${getSectionBackground(
              index
            )}`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {section.sectionTitle || `Section ${index + 1}`}
              </h3>
              <Badge
                variant="outline"
                className={`${getTimeframeColor(index)} flex items-center`}
              >
                <Clock className="w-3 h-3 mr-1" />
                {section.time || "N/A"}
              </Badge>
            </div>

            <div className="space-y-3 mt-6">
              {section.topics &&
                section.topics.map((topic, idx) => (
                  <div
                    key={idx}
                    className="flex items-start p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all shadow-sm"
                  >
                    <div
                      className={`p-1 rounded-full ${getProgressColor(
                        index
                      )} bg-opacity-20 mr-3`}
                    >
                      <Check
                        className={`w-4 h-4 ${getProgressColor(index).replace(
                          "bg-",
                          "text-"
                        )}`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{topic}</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="text-sm text-gray-500 flex items-center mt-1 hover:text-blue-600 transition-colors">
                            View resources{" "}
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Resources for {topic}</DialogTitle>
                            <DialogDescription>
                              Here are recommended resources to learn {topic}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <h4 className="font-medium flex items-center text-gray-900">
                                <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
                                Recommended Courses
                              </h4>
                              <ul className="mt-2 space-y-2">
                                <li className="text-gray-700">
                                  • Interactive tutorial on {topic}
                                </li>
                                <li className="text-gray-700">
                                  • {topic} fundamentals course
                                </li>
                                <li className="text-gray-700">
                                  • Advanced {topic} concepts
                                </li>
                              </ul>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-lg">
                              <h4 className="font-medium text-gray-900">
                                Practice Projects
                              </h4>
                              <p className="mt-1 text-gray-700">
                                Build a sample project using {topic} to solidify
                                your understanding
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Next Steps */}
      <div className="mt-12 text-center">
        <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-indigo-500">
          Recommendation
        </Badge>
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Ready to start your journey?
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Begin with the first module and track your progress. Set aside
          dedicated learning time each day to stay on track with this roadmap.
        </p>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center mx-auto transition-colors">
          Begin Learning <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Roadmap;
