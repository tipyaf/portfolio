import { BiUser } from 'react-icons/bi';
import { defineField } from 'sanity';

const profile = {
  name: 'profile',
  title: 'Profile',
  type: 'document',
  icon: BiUser,
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'In one short sentence, what do you do?',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      description: 'Upload a profile picture',
      options: { hotspot: true },
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
      title: 'Youtube video ID',
      type: 'string',
      validation: (rule) => {
        return rule.custom((value) => {
          if (!value) {
            return true; // Field is optional
          }
          return value.length === 11
            ? true
            : 'The field must be exactly 11 characters if provided.';
        });
      },
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'fullBio',
      title: 'Full Bio',
      type: 'object',
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
      name: 'resumeURL',
      title: 'Upload Resume',
      type: 'file',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
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
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      description: 'Add a list of skills',
      of: [{ type: 'string' }],
    }),
  ],
};

export default profile;
