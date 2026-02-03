'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowRight, Wand2, Loader2 } from 'lucide-react';
import { resumeData } from '@/lib/resume-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { personalizeIntroductionAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

export function HeroSection() {
  const [targetAudience, setTargetAudience] = useState('Recruiter');
  const [personalizedIntro, setPersonalizedIntro] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handlePersonalize = () => {
    startTransition(async () => {
      const result = await personalizeIntroductionAction(targetAudience);
      if ('error' in result) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
        setPersonalizedIntro('');
      } else {
        setPersonalizedIntro(result.personalizedIntroduction);
      }
    });
  };

  return (
    <section id="profile" className="w-full py-20 md:py-28 lg:py-36">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                {resumeData.name}
              </h1>
              <p className="text-xl text-accent font-medium">{resumeData.title}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-muted-foreground hover:text-accent transition-colors" />
              </Link>
              <Link href={resumeData.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-6 w-6 text-muted-foreground hover:text-accent transition-colors" />
              </Link>
              <Link href={`mailto:${resumeData.contact.email}`} aria-label="Email">
                <Mail className="h-6 w-6 text-muted-foreground hover:text-accent transition-colors" />
              </Link>
            </div>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              {resumeData.summary}
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href="#projects">
                  View My Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
          <Card className="shadow-lg">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Wand2 className="h-6 w-6 text-accent" />
                <h3 className="text-xl font-semibold font-headline">Personalized Introduction</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Select a target audience to see an introduction tailored by AI.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <Select value={targetAudience} onValueChange={setTargetAudience}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Recruiter">Recruiter</SelectItem>
                    <SelectItem value="Potential Client">Potential Client</SelectItem>
                    <SelectItem value="Technical Manager">Technical Manager</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handlePersonalize} disabled={isPending} className="w-full sm:w-auto">
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Generate'}
                </Button>
              </div>
              {personalizedIntro && (
                <div className="p-4 bg-secondary rounded-lg border animate-in fade-in-50">
                  <p className="text-sm text-foreground">{personalizedIntro}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
