// schemas/office.js
export default {
  name: 'office',
  title: 'Office',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      description: 'e.g. "Photobomb NYC"',
      type: 'string'
    },
    {
        name: 'address',
        title: 'Address',
        description: 'e.g. "360 W 34 St / New York, NY / Office: +1 646 477 5559"',
        type: 'text'
    }
  ]
}