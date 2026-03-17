export const projectType = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'featured', title: 'Featured Project', type: 'boolean', initialValue: false },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'description', title: 'Description', type: 'text', validation: (Rule: any) => Rule.required() },
    { name: 'content', title: 'Detailed Content', type: 'array', of: [{ type: 'block' }] },
    { name: 'image', title: 'Main image', type: 'image', options: { hotspot: true } },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'link', title: 'Project Link', type: 'url' },
  ],
};

export const bioType = {
  name: 'bio',
  title: 'Biography',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'headline', title: 'Headline', type: 'string' },
    { name: 'about', title: 'About Me', type: 'text' },
    { name: 'experienceSummary', title: 'Experience Summary', type: 'string' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'avatar', title: 'Profile Picture', type: 'image', options: { hotspot: true } },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            { name: 'icon', title: 'Icon (Lucide Name)', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'skills',
      title: 'Skills & Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};

export const experienceType = {
  name: 'experience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    { name: 'company', title: 'Company', type: 'string' },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'company', maxLength: 96 },
    },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'startDate', title: 'Start Date', type: 'date' },
    { name: 'endDate', title: 'End Date (Empty if present)', type: 'date' },
    { name: 'description', title: 'Short Description', type: 'text' },
    { name: 'details', title: 'Full Details', type: 'array', of: [{ type: 'block' }] },
  ],
};

export const educationType = {
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    { name: 'school', title: 'School/University', type: 'string' },
    { name: 'degree', title: 'Degree', type: 'string' },
    { name: 'startDate', title: 'Start Date', type: 'date' },
    { name: 'endDate', title: 'End Date', type: 'date' },
    { name: 'description', title: 'Description', type: 'text' },
  ],
};

export const honorType = {
  name: 'honor',
  title: 'Honors & Awards',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'issuer', title: 'Issuer', type: 'string' },
    { name: 'date', title: 'Date', type: 'date' },
    { name: 'description', title: 'Description', type: 'text' },
  ],
};

export const certificationType = {
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'issuer', title: 'Issuer', type: 'string' },
    { name: 'date', title: 'Date', type: 'date' },
    { name: 'link', title: 'Verification Link', type: 'url' },
  ],
};

export const schemaTypes = [projectType, bioType, experienceType, educationType, honorType, certificationType];
