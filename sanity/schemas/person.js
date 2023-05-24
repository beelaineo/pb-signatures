// schemas/person.js
export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      description: 'e.g. "Johnny Pascucci"',
      type: 'string'
    },
    {
        name: 'role',
        title: 'Role',
        description: 'e.g. "Owner"',
        type: 'string'
    },
    {
        name: 'phone_label',
        title: 'Phone Label',
        description: 'e.g. "Cell:"',
        type: 'string'
    },
    {
        name: 'phone',
        title: 'Phone',
        description: 'e.g. "+1 305 812 2122"',
        type: 'string'
    },
    {

        name: 'insta',
        title: 'Instagram',
        description: 'e.g. "johhny_pascucci"',
        type: 'string'
    },
    {
        name: 'insta_link',
        title: 'Instagram Link',
        description: 'e.g. "https://www.instagram.com/johnny_pascucci/"',
        type: 'string'
    }
  ]
}