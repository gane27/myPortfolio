import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { resumeData } from '@/lib/resume-data';

export function Footer() {
  return (
    <footer className="bg-secondary border-t">
      <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          &copy; {new Date().getFullYear()} {resumeData.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5 text-muted-foreground hover:text-accent transition-colors" />
          </Link>
          <Link href={resumeData.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="h-5 w-5 text-muted-foreground hover:text-accent transition-colors" />
          </Link>
          <Link href={`mailto:${resumeData.contact.email}`} aria-label="Email">
            <Mail className="h-5 w-5 text-muted-foreground hover:text-accent transition-colors" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
