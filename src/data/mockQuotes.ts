export interface MotivationalQuote {
  id: number;
  quote: string;
  author: string;
  category: 'Persistence' | 'Growth' | 'Learning' | 'Courage' | 'Excellence';
}

export const MOTIVATIONAL_QUOTES: MotivationalQuote[] = [
  {
    id: 1,
    quote: "Small steps taken consistently create remarkable progress.",
    author: "Educational Wisdom",
    category: "Persistence",
  },
  {
    id: 2,
    quote: "Your skills grow every time you choose to keep learning.",
    author: "Original Proverb",
    category: "Growth",
  },
  {
    id: 3,
    quote: "Progress is built through practice, patience, and persistence.",
    author: "Educational Wisdom",
    category: "Persistence",
  },
  {
    id: 4,
    quote: "You do not need to know everything today. You need to keep learning.",
    author: "Lifelong Learner Motto",
    category: "Learning",
  },
  {
    id: 5,
    quote: "Every weakness you work on can become a strength.",
    author: "Continuous Improvement Axiom",
    category: "Growth",
  },
  {
    id: 6,
    quote: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
    category: "Learning",
  },
  {
    id: 7,
    quote: "Excellence is not an act, but a habit.",
    author: "Will Durant (interpreting Aristotle)",
    category: "Excellence",
  },
  {
    id: 8,
    quote: "The expert in anything was once a beginner.",
    author: "Helen Hayes",
    category: "Growth",
  },
  {
    id: 9,
    quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi",
    category: "Learning",
  },
  {
    id: 10,
    quote: "Continuous learning is the minimum requirement for success in any field.",
    author: "Brian Tracy",
    category: "Growth",
  },
  {
    id: 11,
    quote: "It always seems impossible until it is done.",
    author: "Nelson Mandela",
    category: "Courage",
  },
  {
    id: 12,
    quote: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier",
    category: "Persistence",
  },
  {
    id: 13,
    quote: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King",
    category: "Learning",
  },
  {
    id: 14,
    quote: "Do not wait for opportunities, create them through diligence and skill.",
    author: "Educational Axiom",
    category: "Courage",
  },
  {
    id: 15,
    quote: "Climbing to the top demands strength, whether it is to the top of Mount Everest or to the top of your career.",
    author: "Dr. A.P.J. Abdul Kalam",
    category: "Excellence",
  },
  {
    id: 16,
    quote: "Learning gives creativity, creativity leads to thinking, thinking provides knowledge, knowledge makes you great.",
    author: "Dr. A.P.J. Abdul Kalam",
    category: "Learning",
  },
  {
    id: 17,
    quote: "If four things are followed - having a great aim, acquiring knowledge, hard work, and perseverance - then anything can be achieved.",
    author: "Dr. A.P.J. Abdul Kalam",
    category: "Persistence",
  },
  {
    id: 18,
    quote: "You cannot change your future, but you can change your habits, and surely your habits will change your future.",
    author: "Dr. A.P.J. Abdul Kalam",
    category: "Growth",
  },
  {
    id: 19,
    quote: "To succeed in your mission, you must have single-minded devotion to your goal.",
    author: "Dr. A.P.J. Abdul Kalam",
    category: "Excellence",
  },
  {
    id: 20,
    quote: "Knowledge has to be improved, challenged, and increased constantly, or it vanishes.",
    author: "Peter Drucker",
    category: "Learning",
  },
  {
    id: 21,
    quote: "A person who never made a mistake never tried anything new.",
    author: "Albert Einstein",
    category: "Courage",
  },
  {
    id: 22,
    quote: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    author: "Benjamin Franklin",
    category: "Learning",
  },
  {
    id: 23,
    quote: "An investment in knowledge pays the best interest.",
    author: "Benjamin Franklin",
    category: "Learning",
  },
  {
    id: 24,
    quote: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
    author: "Brian Herbert",
    category: "Learning",
  },
  {
    id: 25,
    quote: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe",
    category: "Persistence",
  },
  {
    id: 26,
    quote: "Focus on progress, not perfection.",
    author: "Development Motto",
    category: "Growth",
  },
  {
    id: 27,
    quote: "The future belongs to those who learn more skills and combine them in creative ways.",
    author: "Robert Greene",
    category: "Excellence",
  },
  {
    id: 28,
    quote: "Confidence comes from discipline and training.",
    author: "Robert Kiyosaki",
    category: "Excellence",
  },
  {
    id: 29,
    quote: "Every master was once a student who refused to surrender.",
    author: "Academic Encouragement",
    category: "Persistence",
  },
  {
    id: 30,
    quote: "Curiosity is the engine of intellectual achievement.",
    author: "Educational Insight",
    category: "Learning",
  },
  {
    id: 31,
    quote: "Self-discipline is the bridge between goals and accomplishment.",
    author: "Jim Rohn",
    category: "Excellence",
  },
  {
    id: 32,
    quote: "Competency is built one focused hour of study at a time.",
    author: "Skill Development Philosophy",
    category: "Growth",
  }
];

/**
 * Returns a deterministic quote based on day-of-year so that it stays stable throughout the day.
 */
export function getDailyQuote(customIndex?: number): MotivationalQuote {
  if (customIndex !== undefined) {
    const safeIdx = Math.abs(customIndex) % MOTIVATIONAL_QUOTES.length;
    return MOTIVATIONAL_QUOTES[safeIdx];
  }
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = (now.getTime() - startOfYear.getTime()) + ((startOfYear.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const index = dayOfYear % MOTIVATIONAL_QUOTES.length;
  return MOTIVATIONAL_QUOTES[index];
}
