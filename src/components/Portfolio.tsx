
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Mail, Linkedin, ExternalLink, Github, ChevronLeft, ChevronRight, X } from 'lucide-react';
import portfolioData from '@/data/portfolioData.json';
import { PortfolioData, Project } from '@/types/portfolio';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Portfolio = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeProjectType, setActiveProjectType] = useState('website');
  const data = portfolioData as PortfolioData;
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const { personalInfo, skills, education, experience, projects, social } = data;

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      {/* Mobile Layout */}
      <div className="block md:hidden">
        <div className="p-4 space-y-6">
          {/* Mobile Profile Section */}
          <div className="space-y-4 text-center">
            {/* Profile Picture */}
            <div className="w-24 h-24 rounded-full bg-gray-900 p-1 mx-auto">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-2xl font-bold overflow-hidden">
                {personalInfo.profileImage ? (
                  <img 
                    src={personalInfo.profileImage} 
                    alt={personalInfo.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  personalInfo.profileInitial
                )}
              </div>
            </div>

            {/* Name and Title */}
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-white">
                {personalInfo.name}
              </h1>
              <p className="text-lg text-gray-300">{personalInfo.title}</p>
              <p className="text-gray-400">{personalInfo.location}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-center">
              <a href={social.resume} download>
                <Button size="sm" variant="outline" className="bg-gray-900 border-gray-700 hover:bg-gray-800">
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              </a>
              <a href={`mailto:${social.email}`}>
                <Button size="sm" variant="outline" className="bg-gray-900 border-gray-700 hover:bg-gray-800">
                  <Mail className="w-4 h-4" />
                </Button>
              </a>
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="outline" className="bg-gray-900 border-gray-700 hover:bg-gray-800">
                  <Linkedin className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* Mobile Content Sections */}
          <div className="space-y-8">
            {/* About Me Section */}
            <section id="about" data-section>
              <h2 className="text-xl font-bold mb-3 text-blue-400">About Me</h2>
              <p className="text-gray-300 leading-relaxed text-sm">
                {personalInfo.about}
              </p>
            </section>

            {/* Skills Section */}
            <section id="skills" data-section>
              <h2 className="text-xl font-bold mb-3 text-blue-400">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="border-gray-700 text-gray-300 hover:bg-gray-900 transition-colors text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section id="education" data-section>
              <h2 className="text-xl font-bold mb-4 text-blue-400">Education</h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-gray-700 pl-4">
                    <div className="flex flex-col gap-1 mb-2">
                      <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                      <Badge variant="secondary" className="bg-gray-900 text-gray-300 self-start">
                        {edu.date}
                      </Badge>
                    </div>
                    <p className="text-blue-400 font-medium mb-1 text-sm">{edu.school}</p>
                    <p className="text-gray-400 text-sm">{edu.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience" data-section>
              <h2 className="text-xl font-bold mb-4 text-blue-400">Experience</h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-gray-700 pl-4">
                    <div className="flex flex-col gap-1 mb-2">
                      <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                      <Badge variant="secondary" className="bg-gray-900 text-gray-300 self-start">
                        {exp.date}
                      </Badge>
                    </div>
                    <p className="text-blue-400 font-medium mb-1 text-sm">{exp.company}</p>
                    <p className="text-gray-400 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" data-section>
              <h2 className="text-xl font-bold mb-4 text-blue-400">Projects</h2>
              
              <Tabs defaultValue="website" className="mb-6" onValueChange={(value) => setActiveProjectType(value)}>
                <TabsList className="grid w-full grid-cols-2 bg-gray-900">
                  <TabsTrigger value="website" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                    Websites
                  </TabsTrigger>
                  <TabsTrigger value="figma" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                    Figma Designs
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="space-y-6">
                {projects
                  .filter(project => project.type === activeProjectType)
                  .map((project, index) => (
                  <div key={index} className="space-y-3">
                    <Dialog open={dialogOpen && selectedProject?.title === project.title} onOpenChange={(open) => {
                      setDialogOpen(open);
                      if (!open) setSelectedProject(null);
                    }}>
                      <DialogTrigger asChild>
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-48 object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => {
                            setSelectedProject(project);
                            setDialogOpen(true);
                          }}
                        />
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-4xl md:max-w-5xl lg:max-w-6xl bg-gray-900 border-gray-800">
                        <div className="relative">
                          <button 
                            className="absolute right-0 top-0 z-10 p-2 rounded-full bg-gray-900 text-white hover:bg-gray-800"
                            onClick={() => setDialogOpen(false)}
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <h3 className="text-xl font-semibold text-white mb-4">{project.title}</h3>
                          {project.gallery && project.gallery.length > 0 && (
                            <Carousel className="w-full">
                              <CarouselContent>
                                {project.gallery.map((image, imgIndex) => (
                                  <CarouselItem key={imgIndex}>
                                    <div className="p-1">
                                      <img 
                                        src={image} 
                                        alt={`${project.title} - image ${imgIndex + 1}`}
                                        className="w-full h-72 sm:h-[28rem] md:h-[32rem] object-cover md:object-contain rounded-md"
                                      />
                                    </div>
                                  </CarouselItem>
                                ))}
                              </CarouselContent>
                              <CarouselPrevious className="left-2" />
                              <CarouselNext className="right-2" />
                            </Carousel>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                      </div>
                      <p className="text-gray-400 mb-2 text-sm">{project.description}</p>
                      <div className="flex gap-2 flex-wrap">
                        {project.tech.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="border-gray-700 text-gray-300 text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex">
        {/* Fixed Left Sidebar */}
        <div className="fixed left-0 top-0 w-80 h-screen bg-black flex flex-col justify-start pt-12 p-8">
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="w-32 h-32 rounded-full bg-gray-900 p-1 mx-auto">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-4xl font-bold overflow-hidden">
                {personalInfo.profileImage ? (
                  <img 
                    src={personalInfo.profileImage} 
                    alt={personalInfo.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  personalInfo.profileInitial
                )}
              </div>
            </div>

            {/* Name and Title */}
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold text-white">
                {personalInfo.name}
              </h1>
              <p className="text-xl text-gray-300">{personalInfo.title}</p>
              <p className="text-gray-400">{personalInfo.location}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              <a href={social.resume} download>
                <Button size="sm" variant="outline" className="bg-gray-900 border-gray-700 hover:bg-gray-800">
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              </a>
              <a href={`mailto:${social.email}`}>
                <Button size="sm" variant="outline" className="bg-gray-900 border-gray-700 hover:bg-gray-800">
                  <Mail className="w-4 h-4" />
                </Button>
              </a>
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="outline" className="bg-gray-900 border-gray-700 hover:bg-gray-800">
                  <Linkedin className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Scrollable Right Content */}
        <div className="ml-80 flex-1 p-8 space-y-12">
          {/* About Me Section */}
          <section 
            id="about" 
            data-section 
            className={`transition-opacity duration-500 ${visibleSections.has('about') ? 'opacity-100' : 'opacity-0'}`}
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-400">About Me</h2>
            <p className="text-gray-300 leading-relaxed">
              {personalInfo.about}
            </p>
          </section>

          {/* Skills Section */}
          <section 
            id="skills" 
            data-section 
            className={`transition-opacity duration-500 ${visibleSections.has('skills') ? 'opacity-100' : 'opacity-0'}`}
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="border-gray-700 text-gray-300 hover:bg-gray-900 transition-colors text-xs"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section 
            id="education" 
            data-section 
            className={`transition-opacity duration-500 ${visibleSections.has('education') ? 'opacity-100' : 'opacity-0'}`}
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Education</h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border-l-2 border-gray-700 pl-4">
                  <div className="flex flex-col gap-1 mb-2">
                    <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                    <Badge variant="secondary" className="bg-gray-900 text-gray-300 self-start">
                      {edu.date}
                    </Badge>
                  </div>
                  <p className="text-blue-400 font-medium mb-1 text-sm">{edu.school}</p>
                  <p className="text-gray-400 text-sm">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section 
            id="experience" 
            data-section 
            className={`transition-opacity duration-500 ${visibleSections.has('experience') ? 'opacity-100' : 'opacity-0'}`}
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Experience</h2>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-gray-700 pl-4">
                  <div className="flex flex-col gap-1 mb-2">
                    <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                    <Badge variant="secondary" className="bg-gray-900 text-gray-300 self-start">
                      {exp.date}
                    </Badge>
                  </div>
                  <p className="text-blue-400 font-medium mb-1 text-sm">{exp.company}</p>
                  <p className="text-gray-400 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section 
            id="projects" 
            data-section 
            className={`transition-opacity duration-500 ${visibleSections.has('projects') ? 'opacity-100' : 'opacity-0'}`}
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Projects</h2>
            
            <Tabs defaultValue="website" className="mb-8" onValueChange={(value) => setActiveProjectType(value)}>
              <TabsList className="grid w-64 grid-cols-2 bg-gray-900">
                <TabsTrigger value="website" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                  Websites
                </TabsTrigger>
                <TabsTrigger value="figma" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                  Figma Designs
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="grid gap-6">
              {projects
                .filter(project => project.type === activeProjectType)
                .map((project, index) => (
                <div key={index} className="space-y-3">
                  <Dialog open={dialogOpen && selectedProject?.title === project.title} onOpenChange={(open) => {
                    setDialogOpen(open);
                    if (!open) setSelectedProject(null);
                  }}>
                    <DialogTrigger asChild>
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => {
                          setSelectedProject(project);
                          setDialogOpen(true);
                        }}
                      />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-4xl md:max-w-5xl lg:max-w-6xl bg-gray-900 border-gray-800">
                      <div className="relative">
                        <button 
                          className="absolute right-0 top-0 z-10 p-2 rounded-full bg-gray-900 text-white hover:bg-gray-800"
                          onClick={() => setDialogOpen(false)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <h3 className="text-xl font-semibold text-white mb-4">{project.title}</h3>
                        {project.gallery && project.gallery.length > 0 && (
                          <Carousel className="w-full">
                            <CarouselContent>
                              {project.gallery.map((image, imgIndex) => (
                                <CarouselItem key={imgIndex}>
                                  <div className="p-1">
                                    <img 
                                      src={image} 
                                      alt={`${project.title} - image ${imgIndex + 1}`}
                                      className="w-full h-72 sm:h-[28rem] md:h-[32rem] object-cover md:object-contain rounded-md"
                                    />
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-2" />
                            <CarouselNext className="right-2" />
                          </Carousel>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    </div>
                    <p className="text-gray-400 mb-3">{project.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {project.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="border-gray-700 text-gray-300 text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
