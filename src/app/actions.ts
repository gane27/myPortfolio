// src/app/actions.ts
'use server';

import { z } from 'zod';
import { personalizeIntroduction as personalizeIntroFlow } from '@/ai/flows/personalize-introduction';
import { resumeData } from '@/lib/resume-data';

export async function personalizeIntroductionAction(
  targetAudience: string
): Promise<{ personalizedIntroduction: string } | { error: string }> {
  if (!targetAudience) {
    return { error: 'Target audience is required.' };
  }

  try {
    const resumeText = `${resumeData.summary}\n\n${resumeData.experience.map(exp => `${exp.role} at ${exp.company}\n${exp.projects.map(p => p.description).join('\n')}`).join('\n\n')}`;
    const result = await personalizeIntroFlow({ resumeText, targetAudience });
    return result;
  } catch (error) {
    console.error('Error personalizing introduction:', error);
    return { error: 'Failed to generate personalized introduction.' };
  }
}

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export type FormState = {
    message: string;
    errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    } | null;
    success: boolean;
};


export async function submitContactFormAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors below.',
      success: false,
    };
  }
  
  try {
    // In a real app, you would send an email here using a service like Resend, SendGrid, etc.
    console.log('New contact form submission:');
    console.log(validatedFields.data);

    return { message: 'Thank you for your message! I will get back to you soon.', errors: null, success: true };
  } catch (e) {
    return { message: 'An unexpected error occurred. Please try again.', errors: null, success: false };
  }
}
