import { BiUser } from 'react-icons/bi';
import { defineField } from 'sanity';

const profile = {
  name: 'profile',
  title: 'Profile',
  type: 'document',
  icon: BiUser,
  fields: [
    // ── Identity ──────────────────────────────────────
    defineField({
      name: 'fullName',
      title: 'Full Name (EN)',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'en',
    }),
    defineField({
      name: 'fullName_fr',
      title: 'Full Name (FR)',
      type: 'string',
      group: 'fr',
    }),
    defineField({
      name: 'role',
      title: 'Role (EN)',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'en',
    }),
    defineField({
      name: 'role_fr',
      title: 'Role (FR)',
      type: 'string',
      group: 'fr',
    }),
    defineField({
      name: 'headline',
      title: 'Headline (EN)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'In one short sentence, what do you do?',
      validation: (Rule) => Rule.required().max(100),
      group: 'en',
    }),
    defineField({
      name: 'headline_fr',
      title: 'Headline (FR)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'En une phrase courte, que faites-vous ?',
      group: 'fr',
    }),

    // ── Media ──────────────────────────────────────
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      description: 'Upload a profile picture',
      options: { hotspot: true },
      group: ['en', 'fr'],
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'profileVideoId',
      title: 'Youtube video ID (EN)',
      type: 'string',
      group: 'en',
      validation: (rule) => {
        return rule.custom((value) => {
          if (!value) {
            return true;
          }
          return value.length === 11
            ? true
            : 'The field must be exactly 11 characters if provided.';
        });
      },
    }),
    defineField({
      name: 'profileVideoId_fr',
      title: 'Youtube video ID (FR)',
      type: 'string',
      group: 'fr',
      validation: (rule) => {
        return rule.custom((value) => {
          if (!value) {
            return true;
          }
          return value.length === 11
            ? true
            : 'The field must be exactly 11 characters if provided.';
        });
      },
    }),

    // ── Bio ──────────────────────────────────────
    defineField({
      name: 'shortBio',
      title: 'Short Bio (EN)',
      type: 'text',
      rows: 4,
      group: 'en',
    }),
    defineField({
      name: 'shortBio_fr',
      title: 'Short Bio (FR)',
      type: 'text',
      rows: 4,
      group: 'fr',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      group: ['en', 'fr'],
    }),
    defineField({
      name: 'location',
      title: 'Location (EN)',
      type: 'string',
      group: 'en',
    }),
    defineField({
      name: 'location_fr',
      title: 'Location (FR)',
      type: 'string',
      group: 'fr',
    }),
    defineField({
      name: 'fullBio',
      title: 'Full Bio (EN)',
      type: 'object',
      group: 'en',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'bio',
          title: 'Your bio',
          type: 'array',
          of: [{ type: 'block' }],
        }),
      ],
    }),
    defineField({
      name: 'fullBio_fr',
      title: 'Full Bio (FR)',
      type: 'object',
      group: 'fr',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre',
          type: 'string',
        }),
        defineField({
          name: 'bio',
          title: 'Votre bio',
          type: 'array',
          of: [{ type: 'block' }],
        }),
      ],
    }),

    // ── Resume ──────────────────────────────────────
    defineField({
      name: 'resumeURL',
      title: 'Upload Resume (EN)',
      type: 'file',
      group: 'en',
    }),
    defineField({
      name: 'resumeURL_fr',
      title: 'Upload Resume (FR)',
      type: 'file',
      group: 'fr',
    }),

    // ── Social Links ──────────────────────────────────────
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      group: ['en', 'fr'],
      of: [
        defineField({
          name: 'socialLink',
          title: 'Social Link',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Platform',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url_fr',
              title: 'URL (FR)',
              type: 'url',
            }),
            defineField({
              name: 'code',
              title: 'Code',
              type: 'string',
              validation: (rule) => rule.min(4).max(4).uppercase(),
            }),
          ],
          options: {
            collapsible: true,
            collapsed: false,
            columns: 2,
          },
        }),
      ],
      options: {
        sortable: true,
      },
    }),

    // ── Skills ──────────────────────────────────────
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      description: 'Add a list of skills',
      of: [{ type: 'string' }],
      group: ['en', 'fr'],
    }),

    // ── Jobs ──────────────────────────────────────
    defineField({
      name: 'jobs',
      type: 'array',
      group: ['en', 'fr'],
      of: [
        {
          name: 'job',
          type: 'object',
          fields: [
            defineField({
              name: 'company',
              title: 'company',
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({ name: 'url', title: 'URL', type: 'url' }),
              ],
            }),
            defineField({
              name: 'location',
              title: 'Location (EN)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'location_fr',
              title: 'Location (FR)',
              type: 'string',
            }),
            defineField({
              name: 'date',
              title: 'Date',
              type: 'object',
              fields: [
                defineField({
                  name: 'start',
                  title: 'Start',
                  type: 'date',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'end',
                  title: 'End',
                  type: 'date',
                }),
                defineField({ name: 'present', title: 'Present', type: 'boolean' }),
              ],
              options: {
                columns: 3,
              },
            }),
            defineField({
              name: 'role',
              title: 'Role (EN)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'role_fr',
              title: 'Role (FR)',
              type: 'string',
            }),
            defineField({
              name: 'jobType',
              title: 'Job Type',
              type: 'string',
              options: {
                list: ['full-time', 'internship', 'part-time'],
              },
            }),
            defineField({
              name: 'description',
              title: 'Job description (EN)',
              type: 'array',
              of: [{ type: 'block' }],
            }),
            defineField({
              name: 'description_fr',
              title: 'Job description (FR)',
              type: 'array',
              of: [{ type: 'block' }],
            }),
          ],
          preview: {
            select: {
              title: 'company.name',
            },
          },
        },
      ],
    }),

    // ── Projects ──────────────────────────────────────
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      group: ['en', 'fr'],
      of: [
        {
          type: 'object',
          name: 'project',
          title: 'project',
          fields: [
            defineField({
              name: 'name',
              title: 'Title (EN)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'name_fr',
              title: 'Title (FR)',
              type: 'string',
            }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
            defineField({ name: 'url_fr', title: 'URL (FR)', type: 'url' }),
            defineField({
              name: 'image',
              title: 'image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt (EN)',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'alt_fr',
                  title: 'Alt (FR)',
                  type: 'string',
                }),
              ],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description (EN)',
              type: 'array',
              of: [{ type: 'block' }],
            }),
            defineField({
              name: 'description_fr',
              title: 'Description (FR)',
              type: 'array',
              of: [{ type: 'block' }],
            }),
            defineField({
              name: 'image2',
              title: 'image2',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt (EN)',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'alt_fr',
                  title: 'Alt (FR)',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'technos',
              title: 'Technos',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
        },
      ],
    }),
  ],
  groups: [
    { name: 'en', title: 'English', default: true },
    { name: 'fr', title: 'Français' },
  ],
};

export default profile;
