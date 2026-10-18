// How to reach Mike. A channel with no url is left off the page.
export const contacts = [
  {
    id: 'email',
    number: 'A',
    name: 'Email',
    value: 'mike.stuart.dawson@outlook.com',
    url: 'mailto:mike.stuart.dawson@outlook.com',
  },
  {
    id: 'linkedin',
    number: 'B',
    name: 'LinkedIn',
    value: 'Connect on LinkedIn',
    // TODO(SCRUM-31): add Mike's LinkedIn profile URL.
    url: '',
  },
].filter((contact) => contact.url)
