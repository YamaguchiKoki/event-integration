export type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'past';
  description: string;
  organizer: string;
  attendees: number;
};

export const events: Event[] = [
  { id: '1', name: 'Tech Conference 2023', date: '2023-07-15', location: 'Tokyo', status: 'upcoming', description: 'Annual tech conference featuring the latest in software development.', organizer: 'TechJapan', attendees: 500 },
  { id: '2', name: 'AI Symposium', date: '2023-06-01', location: 'Osaka', status: 'ongoing', description: 'A gathering of AI researchers and enthusiasts discussing the future of artificial intelligence.', organizer: 'AI Japan', attendees: 300 },
  { id: '3', name: 'Web Dev Workshop', date: '2023-05-20', location: 'Kyoto', status: 'past', description: 'Hands-on workshop for web developers to learn the latest technologies and best practices.', organizer: 'Kyoto Coders', attendees: 100 },
  { id: '4', name: 'Data Science Summit', date: '2023-08-10', location: 'Fukuoka', status: 'upcoming', description: 'Summit for data scientists and analysts to share insights and methodologies.', organizer: 'Data Insights Japan', attendees: 250 },
  { id: '5', name: 'Blockchain Forum', date: '2023-06-15', location: 'Nagoya', status: 'ongoing', description: 'Forum discussing the latest trends and applications in blockchain technology.', organizer: 'Blockchain Japan', attendees: 150 },
  { id: '6', name: 'UX Design Meetup', date: '2023-04-30', location: 'Sapporo', status: 'past', description: 'Meetup for UX designers to network and share their experiences and best practices.', organizer: 'Sapporo UX Group', attendees: 75 },
];

