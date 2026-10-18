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
    url: 'https://www.linkedin.com/in/mike-dawson-bb4168194',
  },
].filter((contact) => contact.url)
