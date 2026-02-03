// src/ai/flows/personalize-introduction.ts
'use server';
/**
 * @fileOverview A flow to personalize the introduction section of a portfolio for different target audiences.
 *
 * - personalizeIntroduction - A function that personalizes the introduction based on the target audience.
 * - PersonalizeIntroductionInput - The input type for the personalizeIntroduction function.
 * - PersonalizeIntroductionOutput - The return type for the personalizeIntroduction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeIntroductionInputSchema = z.object({
  resumeText: z.string().describe('The full text of the resume to generate introduction from.'),
  targetAudience: z.string().describe('The target audience for the personalized introduction (e.g., recruiters, potential clients).'),
});
export type PersonalizeIntroductionInput = z.infer<typeof PersonalizeIntroductionInputSchema>;

const PersonalizeIntroductionOutputSchema = z.object({
  personalizedIntroduction: z.string().describe('The personalized introduction tailored for the specified target audience.'),
});
export type PersonalizeIntroductionOutput = z.infer<typeof PersonalizeIntroductionOutputSchema>;

export async function personalizeIntroduction(input: PersonalizeIntroductionInput): Promise<PersonalizeIntroductionOutput> {
  return personalizeIntroductionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeIntroductionPrompt',
  input: {schema: PersonalizeIntroductionInputSchema},
  output: {schema: PersonalizeIntroductionOutputSchema},
  prompt: `You are an expert resume writer specializing in tailoring introductions for specific audiences.

  Given the following resume text and target audience, generate a personalized introduction that highlights the most relevant skills and experiences.

  Resume Text: {{{resumeText}}}
  Target Audience: {{{targetAudience}}}

  Personalized Introduction:`,
});

const personalizeIntroductionFlow = ai.defineFlow(
  {
    name: 'personalizeIntroductionFlow',
    inputSchema: PersonalizeIntroductionInputSchema,
    outputSchema: PersonalizeIntroductionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
