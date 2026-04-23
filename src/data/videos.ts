// Curated videos from youtube.com/@chrisjasonmcqueen
// Featured = the one big embed at top of /watch and /watch CTA on home
// Update by replacing IDs from your channel.

export interface Video {
  id: string;
  title: string;
  description: string;
  category: 'Faith' | 'Discipline' | 'Identity' | 'Discipleship';
}

export const featured: Video = {
  id: 'PCMQvtfjZI8',
  title: 'The Sabbath Secret God Doesn\'t Want You to Miss',
  description: 'Where does the Sabbath come from, and should we still keep it today?',
  category: 'Faith',
};

export const videos: Video[] = [
  {
    id: 'dSwKGKy0ikw',
    title: 'YouTube is Destroying Your Faith and Here\'s Why',
    description:
      'YouTube and other platforms want you on their feeds — here\'s why a break might be exactly what your faith needs.',
    category: 'Faith',
  },
  {
    id: 'rj2FlH1jYlE',
    title: 'Phone Addiction Ruined Me — Here\'s What Changed',
    description: 'Biblical ways to destroy distractions and recover from phone addiction with Jesus.',
    category: 'Discipline',
  },
  {
    id: 'kaYFASGA7yg',
    title: 'Jesus vs. Hormozi on Success',
    description: 'When we look at success, which philosophy actually works — hustle culture or the Kingdom?',
    category: 'Faith',
  },
  {
    id: 'x9OzQufVmlA',
    title: 'Jesus\' Secret to Saying No',
    description: 'Jesus said no to multitudes without guilt. Here\'s what we can learn.',
    category: 'Discipline',
  },
  {
    id: 'Rf62W40ifq0',
    title: '3 Tools That Give You Back Time for God',
    description: 'Three tools that help you find and make time for God again.',
    category: 'Discipline',
  },
  {
    id: '68wzq36EIyg',
    title: 'You\'re a 10/10 and God Knows It',
    description: 'How to find your identity in Christ when culture screams otherwise.',
    category: 'Identity',
  },
  {
    id: 'RXZYhPhOkSg',
    title: '7 Things That Will Get You On Fire For God',
    description: 'Seven habits that helped me stay on fire — practical, biblical, doable.',
    category: 'Discipleship',
  },
  {
    id: 'PS_okBOgI24',
    title: 'This Mindset Shift Will Radically Change Young Christian Men',
    description: 'What it actually means to renew your mind in Christ.',
    category: 'Identity',
  },
  {
    id: 'AlUK7rMpAZ0',
    title: 'How to Escape Your Lukewarm Era',
    description: 'Three steps to get out of lukewarm faith before it\'s too late.',
    category: 'Discipleship',
  },
  {
    id: 'BfTLNlcvDfw',
    title: 'This Simple Gospel Approach Actually Reaches Hearts',
    description: 'How to share the gospel in 2025 without leaflets or cringe.',
    category: 'Discipleship',
  },
];

export function ytThumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function ytWatch(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function ytEmbed(id: string) {
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
}
