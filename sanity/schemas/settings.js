// schemas/settings.js
export default {
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    {
      name: 'insta',
      title: 'Instagram Handle',
      description: 'e.g. "photobombproduction"',
      type: 'string'
    },
    {
      name: 'insta_link',
      title: 'Instagram Link',
      description: 'e.g. "https://instagram.com/photobombproduction"',
      type: 'string'
    },
    {
        name: 'invoice_label',
        title: 'Invoice Label',
        description: 'e.g. "Click to invoice"',
        type: 'string'
    },
    {
      name: 'invoice_link',
      title: 'Invoice Link',
      description: 'e.g. "mailto:invoicing@photobombproduction.com?subject=Invoicing"',
      type: 'string'
    },
    {
      name: 'locations',
      title: 'Locations',
      description: 'add locations here in order from left to right',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: 'office'}]}
      ]
    }
  ]
}