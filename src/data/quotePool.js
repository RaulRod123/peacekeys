const QUOTE_POOL = [
  {
    text: 'To direct your thoughts to what is said. To focus the mind on what happens and what makes it happen.',
    author: 'Marcus Aurelius',
    source: 'Meditations',
  },
  {
    text: 'So other people hurt me? That is their problem. Their character and actions are not mine. What is done to me is ordained by nature, what I do by my own.',
    author: 'Marcus Aurelius',
    source: 'Meditations',
  },
  {
    text: 'It is crazy to want what is impossible. And impossible for the wicked not to do so.',
    author: 'Marcus Aurelius',
    source: 'Meditations',
  },
  {
    text: 'To labor cheerfully and so endure and to endure the wind that blows from heaven.',
    author: 'Marcus Aurelius',
    source: 'Meditations',
  },
  {
    text: 'To love only what happens, what was destined. No greater harmony.',
    author: 'Marcus Aurelius',
    source: 'Meditations',
  },  
  {
    text: 'Not a dancer but a wrestler: waiting, poised and dug in, for sudden assault.',
    author: 'Marcus Aurelius',
    source: 'Meditations',
  },  
  {
    text: 'Never let loyalty and kindness leave you! Tie them around your neck as a reminder. Write them deep within your heart.',
    author: 'Proverbs',
    source: 'Bible',
  },  
  {
    text: 'Seek His will in all you do, and He will show you which path to take.',
    author: 'Proverbs',
    source: 'Bible',
  },  
  {
    text: 'Awaken; return to yourself. Now, no longer asleep, knowing they were only dreams, clear-headed again, treat everything around you as a dream.',
    author: 'Marcus Aurelius',
    source: 'Meditations',
  },  
  {
    text: 'Fear of the Lord is the foundation of true knowledge, but fools despise wisdom and discipline.',
    author: 'Proverbs',
    source: 'Bible',
  },  
  {
    text: 'The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.',
    author: 'Psalms',
    source: 'Bible',
  },  
  {
    text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    author: 'Proverbs',
    source: 'Bible',
  },  
  {
    text: 'I can do all this through him who gives me strength.',
    author: 'Philippians',
    source: 'Bible',
  },      
  {
    text: 'The wise inherit honor, but fools are put to shame.',
    author: 'Proverbs',
    source: 'Bible',
  },  
  {
    text: 'Let your wife be a fountain of blessing for you. Rejoice in the wife of your youth.',
    author: 'Proverbs',
    source: 'Bible',
  },  {
    text: 'Such is the fate of all who are greedy for money; it robs them of life.',
    author: 'Proverbs',
    source: 'Bible',
  },  
  {
    text: 'Tune your ears to wisdom, and concentrate on understanding. Cry out for insight, and ask for understanding. Search for them as you would for silver; seek them like hidden treasures.',
    author: 'Proverbs',
    source: 'Bible',
  },  
  {
    text: 'He grants a treasure of common sense to the honest. He is a shield to those who walk with integrity.',
    author: 'Proverbs',
    source: 'Bible',
  },
  {
    text: 'Joyful is the person who finds wisdom, the one who gains understanding. For wisdom is more profitable than silver, and her wages are better than gold.',
    author: 'Proverbs',
    source: 'Bible',
  },
  {
    text: 'Wisdom is more precious than rubies; nothing you desire can compare with her. She offers you long life in her right hand, and riches and honor in her left.',
    author: 'Proverbs',
    source: 'Bible',
  },
  {
    text: 'My child, do not lose sight of common sense and discernment. Hang on to them, for they will refresh your soul.',
    author: 'Proverbs',
    source: 'Bible',
  },
  {
    text: 'Do not plot harm against your neighbor, for those who live nearby trust you. Do not pick a fight without reason, when no one has done you harm.',
    author: 'Proverbs',
    source: 'Bible',
  },
  {
    text: 'Do not envy violent people or copy their ways. Such wicked people are detestable to the Lord, but he offers his friendship to the godly.',
    author: 'Proverbs',
    source: 'Bible',
  }, 
  {
    text: 'Forget everything else. Keep hold of this alone and remember it: Each of us lives only now, this brief instant. The rest has been lived already, or is impossible to see.',
    author: 'Marcus Aurelius',
    source: 'Meditations',
  },
  {
    text: 'Your ability to control your thoughts - treat it with respect. It is all that protects your mind from false perceptions - false to your nature, and that of all rational beings.',
    author: 'Marcus Aurelius',
    source: 'Meditations',
  },
  {
    text: 'To make your mind your guide to what seems best: even people who deny the gods do that. Even people who betray their country.',
    author: 'Marcus Aurelius',
    source: 'Meditations',
  },
  {
    text: 'My mind. What is it? What am I making of it? What am I using it for? Is it empty of thoughts? Isolated and torn loose from those around it?',
    author: 'Marcus Aurelius',
    source: 'Meditations',
  },
  {
    text: 'This is what you deserve. You could be good today. But instead you choose tomorrow.',
    author: 'Marcus Aurelius',
    source: 'Meditations',
  },
  {
    text: 'To do harm is to do yourself harm. To do an injustice is to do yourself an injustice - it degrades you.',
    author: 'Marcus Aurelius',
    source: 'Meditations',
  },
  // David Goggins//
  {
    text: 'We are all being tested in life. While my test is different than yours, you will be tested. And how you face that test and how you overcome that test, determines the rest of your life.',
    author: 'David Goggins',
    source: '',
  },
  {
    text: 'The one mentality you must have in life is regardless of what is in front of you, you still must grind. I fail at most things I do but still, I grind.',
    author: 'David Goggins',
    source: '',
  },
  {
    text: 'Inspiration is found in every first step you take. Every grasp of that iron bar. All the miles in the pool. Inspiration is found in suffering.',
    author: 'David Goggins',
    source: '',
  },
  {
    text: 'I did not hear a whistle blow in my life, so I am going to keep on playing.',
    author: 'David Goggins',
    source: '',
  },{
    text: 'I would rather you hate me and get better than like me and stay the same.',
    author: 'David Goggins',
    source: '',
  },
  {
    text: 'You have to do your best work when you are least motivated. So those days you do not want to do it; guess what you have to do? You got to suck it up and do it.',
    author: 'David Goggins',
    source: '',
  },  
  {
    text: 'Life is short, life is precious. Spend that time with people you love, the people you want to give that time to. Real friends, real family. Everybody else is sucking up the air you breathe.',
    author: 'David Goggins',
    source: '',
  },
  {
    text: 'You live uncomfortable to gain growth. You have to have friction in your life to gain growth.',
    author: 'David Goggins',
    source: '',
  },
  // Kobe Bryant//
  {
    text: 'Rest at the end, not in the middle.',
    author: 'Mr. Fisk',
    source: 'Kobe Bryant',
  },
  {
    text: 'Like I would watch Magic play, I would watch Michael play. I would see them do these unbelievable things and I said you know, "Can I get to that level? I do not know but lets find out."',
    author: 'Kobe Bryant',
    source: 'Video Short',
  }, 
  {
    text: 'Not to be driven this way and that, but always to behave with justice and see things as they are.',
    author:'Marcus Aurelius',
    source:'Meditations',
  },
  {
    text: 'If you want it bad enough, you find a way. If you do not want it bad enough, you will find an excuse.',
    author:'unknown',
    source:'unknown',
  },
  {
    text: 'Confidence and fear both require believing in something that has not happened yet. But at a certain point, you have to consider, you are choosing to be afraid.',
    author: 'Chris Williamson',
    source: 'Modern Wisdom Podcast',
  },
  {
    text: 'And you are going to fail, and you are going to fail, and you are going to fail. And then, you are going to win.',
    author:'Jocko Willink',
    source:'Jocko Podcast',
  },
  {
    text: 'Tired? Does not mean nothing. Tired is only in the mind. You tell yourself you are tired, you are going to be tired. I do not get tired.',
    author:'LeBron James',
    source:'Post game interview',
  },
  {
    text: 'Everyone is jealous of what you got. No one is jealous of how you got it.',
    author:'Chris Williamson',
    source:'Modern Wisdom Podcast',
  },
  {
    text: 'We must constantly look at things in a different way. Boys, you must strive to find your own voice because the longer you wait to begin, the less likely you are to find it at all.',
    author:'Robin Williams',
    source:'Dead Poets Society',
  },
  {
    text: 'So said, "Most men lead lives of quiet desperation." Do not be resigned to that.',
    author:'Robin Williams',
    source:'Dead Poets Society',
  },
  {
    text: 'Champions are never woken up and born into success. They are created, they are matured, they are struggled. Then, through that effort of hard work, dedication and sacrifice to achieve that championship status.',
    author:'Greg Plitt',
    source:'YT short',
  },
  {
    text: 'Failure is a wonderful teacher. It is the only way to learn, you have to fail. Failure is part of the process to becoming successful.',
    author:'Steve Harvey',
    source:'Post-show',
  },
]


export default QUOTE_POOL
