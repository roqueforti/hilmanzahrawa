import { StructureBuilder } from 'sanity/structure';

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content Management')
    .items([
      // Singleton: Landing Page Settings
      S.listItem()
        .title('Landing Page Settings')
        .id('landingPage')
        .child(
          S.document()
            .schemaType('landingPage')
            .documentId('landingPage')
        ),
      
      // Singleton: Biography (Profile)
      S.listItem()
        .title('Biography')
        .id('bio')
        .child(
          S.document()
            .schemaType('bio')
            .documentId('bio')
        ),
        
      S.divider(),
      
      // Filter out singletons from other documents
      ...S.documentTypeListItems().filter(
        (listItem: any) => !['landingPage', 'bio'].includes(listItem.getId())
      ),
    ]);
