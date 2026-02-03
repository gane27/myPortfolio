import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { resumeData } from '@/lib/resume-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

export function ProjectsSection() {
  const allProjects = [...resumeData.experience.flatMap(exp => exp.projects), ...resumeData.otherProjects];

  const getImage = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id);
  }

  return (
    <section id="projects" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">My Projects</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of projects that demonstrate my skills in frontend development, architecture, and leadership.
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allProjects.map((project, index) => {
            const projectImage = getImage(project.id);
            return (
              <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {projectImage && (
                  <div className="aspect-video relative">
                    <Image
                      src={projectImage.imageUrl}
                      alt={project.name}
                      fill
                      className="object-cover"
                      data-ai-hint={projectImage.imageHint}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{(project as any).role || ""}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                   <Button variant="link" className="p-0 h-auto self-start text-accent">
                      <Link href={(project as any).link || resumeData.contact.github} target="_blank" rel="noopener noreferrer">
                        {(project as any).link ? 'View Project' : 'View on GitHub'} <ArrowRight className="inline ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
}
