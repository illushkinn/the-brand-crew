/**
 * Team member data for The Brand Crew
 * Centralized data structure for founding partners
 */

export interface TeamMember {
  id: string;
  name: string;
  photo: string;
  index: string;
  i18nKeyPrefix: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'illya',
    name: 'Illya Grytsyk',
    photo: '/assets/profile-11.webp',
    index: '01',
    i18nKeyPrefix: 'team.illya',
  },
  {
    id: 'carlos',
    name: 'Carlos Segovia Gonzalez',
    photo: '/assets/profile-12.webp',
    index: '02',
    i18nKeyPrefix: 'team.carlos',
  },
];
