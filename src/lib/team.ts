/**
 * Team member data for The Brand Crew
 * Centralized data structure for founding partners
 */

export type TeamMemberId = 'illya' | 'carlos';

export interface TeamMember {
  id: TeamMemberId;
  name: string;
  photo: string;
  index: string;
  i18nKeyPrefix: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'illya',
    name: 'Illya Grytsyk',
    photo: '/assets/profile-illya.webp',
    index: '01',
    i18nKeyPrefix: 'team.illya',
  },
  {
    id: 'carlos',
    name: 'Carlos Segovia Gonzalez',
    photo: '/assets/profile-carlos.webp',
    index: '02',
    i18nKeyPrefix: 'team.carlos',
  },
];
