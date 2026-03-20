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

export const organizationType = {
  name: 'organization',
  title: 'Organization',
  type: 'document',
  fields: [
    { name: 'role', title: 'Role/Position', type: 'string' },
    { name: 'organization', title: 'Organization Name', type: 'string' },
    { name: 'period', title: 'Period', type: 'string', description: 'e.g. 2024 - 2025' },
    { name: 'startDate', title: 'Start Date', type: 'date', hidden: true }, // Optional sorting
  ],
};

export const landingPageType = {
  name: 'landingPage',
  title: 'Landing Page Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Home'
    },
    {
      name: 'sections',
      title: 'Navigation & Sections Order',
      description: 'Drag and drop to reorder sections on the landing page.',
      type: 'array',
      initialValue: [
        { title: 'it', type: 'it' },
        { title: 'design', type: 'design' },
        { title: 'about', type: 'umum' }
      ],
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            { name: 'title', title: 'Label (in Nav)', type: 'string' },
            { 
              name: 'type', 
              title: 'Section Content', 
              type: 'string',
              options: {
                list: [
                  { title: 'IT Projects', value: 'it' },
                  { title: 'Design Projects', value: 'design' },
                  { title: 'About Me', value: 'umum' },
                ]
              }
            }
          ],
          preview: {
            select: {
              title: 'title',
              type: 'type'
            },
            prepare(selection: any) {
              const { title, type } = selection;
              return {
                title: title,
                subtitle: `Type: ${type}`
              };
            }
          }
        }
      ]
    },
    {
      name: 'aboutSections',
      title: 'About Tab Content Order',
      description: 'Drag and drop to reorder content blocks inside the About section.',
      type: 'array',
      initialValue: [
        { title: 'Experience', type: 'experience' },
        { title: 'Education', type: 'education' },
        { title: 'Achievements', type: 'achievements' },
        { title: 'Organizations', type: 'organizations' },
        { title: 'Certificates', type: 'certificates' }
      ],
      of: [
        {
          type: 'object',
          name: 'aboutSectionItem',
          fields: [
            { name: 'title', title: 'Section Title', type: 'string' },
            { 
              name: 'type', 
              title: 'Block Type', 
              type: 'string',
              options: {
                list: [
                  { title: 'Experience', value: 'experience' },
                  { title: 'Education', value: 'education' },
                  { title: 'Achievements', value: 'achievements' },
                  { title: 'Organizations', value: 'organizations' },
                  { title: 'Certificates', value: 'certificates' },
                ]
              }
            }
          ],
          preview: {
            select: {
              title: 'title',
              type: 'type'
            },
            prepare(selection: any) {
              const { title, type } = selection;
              return {
                title: title || type,
                subtitle: `Content: ${type}`
              };
            }
          }
        }
      ]
    },
    {
      name: 'itProjectsOrder',
      title: 'Manually Order IT Projects',
      description: 'Select and reorder projects for the IT tab. If empty, all IT projects will show sorted by year.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    },
    {
      name: 'designProjectsOrder',
      title: 'Manually Order Design Projects',
      description: 'Select and reorder projects for the Design tab. If empty, all Design projects will show sorted by year.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }
  ]
};

export const schemaTypes = [projectType, bioType, experienceType, educationType, honorType, certificateType, organizationType, landingPageType];
