import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { resumeData } from '@/lib/resume-data';

export function ExperienceSection() {
  return (
    <section id="experience" className="w-full py-16 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Professional Experience</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A journey of growth, leadership, and innovation in the tech industry.
            </p>
          </div>
        </div>
        
        <div className="relative pl-6 after:absolute after:inset-y-0 after:w-px after:bg-border after:left-0">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="relative grid gap-10 pb-12">
                <div className="absolute w-3 h-3 rounded-full mt-1.5 -left-[7px] bg-primary ring-4 ring-background"></div>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                        <p className="font-medium text-lg">{exp.company}</p>
                        <p className="text-muted-foreground text-lg">({exp.duration})</p>
                    </div>
                    <h3 className="text-xl font-semibold font-headline">{exp.role}</h3>
                </div>

              {exp.projects.map((project, projIndex) => (
                <Card key={projIndex} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>{project.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
