export const projectType = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'link',
      title: 'Project Link',
      type: 'url',
    },
  ],
};

export const bioType = {
  name: 'bio',
  title: 'Biography',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
    },
    {
      name: 'about',
      title: 'About Me',
      type: 'text',
    },
    {
      name: 'experience',
      title: 'Years of Experience',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
  ],
};

export const schemaTypes = [projectType, bioType];
