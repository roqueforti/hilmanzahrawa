export const projectType = {
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'media', title: 'Media' },
    { name: 'metadata', title: 'Metadata' },
  ],
  fields: [
    { name: 'title', title: 'Title', type: 'string', group: 'content', validation: (Rule: any) => Rule.required() },
    { name: 'featured', title: 'Featured Project', type: 'boolean', initialValue: false, group: 'metadata' },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'metadata',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'description', title: 'Description', type: 'text', group: 'content', validation: (Rule: any) => Rule.required() },
    { name: 'content', title: 'Detailed Content', type: 'array', of: [{ type: 'block' }], group: 'content' },
    { name: 'image', title: 'Main image', type: 'image', group: 'media', options: { hotspot: true } },
    { 
      name: 'gallery', 
      title: 'Gallery', 
      type: 'array', 
      group: 'media',
      of: [{ type: 'image', options: { hotspot: true } }] 
    },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }], group: 'metadata' },
    { name: 'year', title: 'Project Year', type: 'string', group: 'metadata' },
    { name: 'role', title: 'My Role / Position', type: 'string', group: 'metadata', description: 'e.g. Lead Developer, UI/UX Designer, System Architect' },
    {
      name: 'deviceType',
      title: 'Device Display Style',
      type: 'string',
      group: 'metadata',
      options: {
        list: [
          { title: 'Desktop (Wide)', value: 'desktop' },
          { title: 'Mobile (Portrait)', value: 'mobile' },
        ],
        layout: 'radio'
      },
      initialValue: 'desktop'
    },
    { 
      name: 'category', 
      title: 'Category', 
      type: 'string', 
      group: 'metadata',
      options: {
        list: [
          { title: 'IT', value: 'it' },
          { title: 'Design', value: 'design' }
        ],
        layout: 'dropdown'
      },
      validation: (Rule: any) => Rule.required()
    },
    { name: 'subtitle', title: 'Subtitle/Client', type: 'string', group: 'metadata' },
    { name: 'link', title: 'Project Link', type: 'url', group: 'metadata' },
  ],
};

export const bioType = {
  name: 'bio',
  title: 'Biography',
  type: 'document',
  groups: [
    { name: 'profile', title: 'Profile' },
    { name: 'contact', title: 'Contact' },
    { name: 'social', title: 'Social' },
    { name: 'skills', title: 'Skills' },
  ],
  fields: [
    { name: 'name', title: 'Name', type: 'string', group: 'profile' },
    { name: 'headline', title: 'Headline', type: 'string', group: 'profile' },
    { name: 'about', title: 'About Me', type: 'text', group: 'profile' },
    { name: 'experienceSummary', title: 'Experience Summary', type: 'string', group: 'profile' },
    { name: 'location', title: 'Location', type: 'string', group: 'contact' },
    { name: 'email', title: 'Email Address', type: 'string', group: 'contact' },
    { name: 'whatsapp', title: 'WhatsApp Number', type: 'string', description: 'Enter number with country code, e.g. 628123456789', group: 'contact' },
    { name: 'avatar', title: 'Profile Picture', type: 'image', group: 'profile', options: { hotspot: true } },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      group: 'social',
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
      group: 'skills',
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

const certificateType = {
  name: 'certificate',
  title: 'Certificate',
  type: 'document',
  fields: [
    { name: 'title', title: 'Certificate Title', type: 'string' },
    { name: 'issuer', title: 'Issuer', type: 'string' },
    { name: 'date', title: 'Date Received', type: 'string' },
    { name: 'image', title: 'Certificate Image', type: 'image', options: { hotspot: true } },
  ],
};

export const schemaTypes = [projectType, bioType, experienceType, educationType, honorType, certificateType];
