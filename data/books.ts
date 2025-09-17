import type { Book } from '../types';

export const books: Book[] = [
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1602190253l/52578297.jpg',
    synopsis: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?',
    reviews: [
      { user: 'BookLover22', avatar: 'https://i.pravatar.cc/40?u=1', rating: 5, comment: 'A truly thought-provoking and beautiful story. It made me reflect on my own life choices.' },
      { user: 'AlexReads', avatar: 'https://i.pravatar.cc/40?u=2', rating: 4, comment: 'I really enjoyed the concept. A bit slow at times, but the ending was worth it.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '2',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1597695865l/54493401.jpg',
    synopsis: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn’t know that. He can’t even remember his own name, let alone the nature of his assignment or how to complete it.',
    reviews: [
      { user: 'SciFiFan', avatar: 'https://i.pravatar.cc/40?u=3', rating: 5, comment: 'Absolutely brilliant! The science is fascinating and the story is full of heart. Rocky is the best character ever.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '3',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1535115320l/40121378._SY475_.jpg',
    synopsis: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    reviews: [
        { user: 'GrowthMindset', avatar: 'https://i.pravatar.cc/40?u=4', rating: 5, comment: 'This book changed my life. The strategies are simple, practical, and incredibly effective.' },
        { user: 'Jenna', avatar: 'https://i.pravatar.cc/40?u=5', rating: 5, comment: 'A must-read for anyone looking to make positive changes. Highly recommended!' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '4',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1603206535l/54120408.jpg',
    synopsis: 'Klara and the Sun tells the story of Klara, an Artificial Friend with outstanding observational qualities, who, from her place in the store, keenly watches the behavior of those who come in to browse, and of those who pass on the street outside. She remains hopeful that a customer will soon choose her.',
    reviews: [
        { user: 'LiteraryLion', avatar: 'https://i.pravatar.cc/40?u=6', rating: 4, comment: 'A subtle and moving story about what it means to be human. Ishiguro is a master.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '5',
    title: 'The Four Winds',
    author: 'Kristin Hannah',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1610594348l/53138081.jpg',
    synopsis: 'Texas, 1934. Millions are out of work and a drought has broken the Great Plains. Farmers are fighting to keep their land and their livelihoods as the crops are failing, the water is drying up, and dust threatens to bury them all. One of the darkest periods of the Great Depression, the Dust Bowl era, has arrived with a vengeance.',
    reviews: [
        { user: 'HistoryBuff', avatar: 'https://i.pravatar.cc/40?u=7', rating: 5, comment: 'A powerful and heartbreaking story of resilience. I couldn\'t put it down.' },
        { user: 'SarahP', avatar: 'https://i.pravatar.cc/40?u=8', rating: 4, comment: 'Kristin Hannah never disappoints. A beautiful and emotional read.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '6',
    title: 'Circe',
    author: 'Madeline Miller',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1565909496l/35959740._SY475_.jpg',
    synopsis: 'In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is a strange child--not powerful, like her father, nor viciously alluring like her mother. Turning to the world of mortals for companionship, she discovers that she does possess power--the power of witchcraft, which can transform rivals into monsters and menace the gods themselves.',
    reviews: [
        { user: 'MythologyMaven', avatar: 'https://i.pravatar.cc/40?u=9', rating: 5, comment: 'An absolutely stunning retelling. Miller\'s prose is lyrical and Circe\'s story is captivating.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '7',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1582761232l/40097951._SY475_.jpg',
    synopsis: 'Alicia Berenson’s life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London’s most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.',
    reviews: [
      { user: 'ThrillerFan', avatar: 'https://i.pravatar.cc/40?u=10', rating: 5, comment: 'A stunning psychological thriller. The twist at the end is jaw-dropping.' },
      { user: 'MysteryReader', avatar: 'https://i.pravatar.cc/40?u=11', rating: 4, comment: 'Kept me guessing until the very end. Highly recommended!' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '8',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1585825997l/36809135._SY475_.jpg',
    synopsis: 'For years, rumors of the “Marsh Girl” have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl. But Kya is not what they say.',
    reviews: [
      { user: 'NatureLover', avatar: 'https://i.pravatar.cc/40?u=12', rating: 5, comment: 'Beautifully written. The descriptions of nature are just as compelling as the mystery.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '9',
    title: 'Educated',
    author: 'Tara Westover',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1506026634l/35133922._SY475_.jpg',
    synopsis: 'Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom. Her family was so isolated from mainstream society that there was no one to ensure the children received an education, and no one to intervene when one of Tara’s older brothers became violent. When another brother got himself into college, Tara decided to try a new kind of life.',
    reviews: [
      { user: 'MemoirFan', avatar: 'https://i.pravatar.cc/40?u=13', rating: 5, comment: 'An incredible and inspiring story of resilience and the power of education.' },
      { user: 'Reader_X', avatar: 'https://i.pravatar.cc/40?u=14', rating: 5, comment: 'One of the most powerful memoirs I have ever read. Unforgettable.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '10',
    title: 'The Vanishing Half',
    author: 'Brit Bennett',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1578334114l/51791252.jpg',
    synopsis: 'The Vignes twin sisters will always be identical. But after growing up together in a small, southern black community and running away at age sixteen, it\'s not just the shape of their daily lives that is different as adults, it\'s everything: their families, their communities, their racial identities.',
    reviews: [
      { user: 'BookClubQueen', avatar: 'https://i.pravatar.cc/40?u=15', rating: 4, comment: 'A fascinating exploration of identity, family, and race. Beautifully written.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '11',
    title: 'Dune',
    author: 'Frank Herbert',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1555447414l/44767458.jpg',
    synopsis: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the “spice” melange, a drug capable of extending life and enhancing consciousness.',
    reviews: [
      { user: 'EpicReads', avatar: 'https://i.pravatar.cc/40?u=16', rating: 5, comment: 'The benchmark for all science fiction. A masterpiece of world-building.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '12',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1320399351l/1885.jpg',
    synopsis: 'Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language. Jane Austen called this brilliant work her "own darling child" and its vivacious heroine, Elizabeth Bennet, "as delightful a creature as ever appeared in print."',
    reviews: [
      { user: 'ClassicReader', avatar: 'https://i.pravatar.cc/40?u=17', rating: 5, comment: 'An timeless classic for a reason. Witty, romantic, and utterly charming.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '13',
    title: '1984',
    author: 'George Orwell',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1532714506l/40961427._SY475_.jpg',
    synopsis: 'Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real. Published in 1949, the book offers political satirist George Orwell\'s nightmarish vision of a totalitarian, bureaucratic world and one poor stiff\'s attempt to find individuality.',
    reviews: [
      { user: 'Thinker', avatar: 'https://i.pravatar.cc/40?u=18', rating: 5, comment: 'More relevant today than ever. A chilling and important read.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '14',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1490528560l/4671.jpg',
    synopsis: 'The Great Gatsby, F. Scott Fitzgerald\'s third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers. The story of the fabulously wealthy Jay Gatsby and his new love for the beautiful Daisy Buchanan.',
    reviews: [
      { user: 'LitStudent', avatar: 'https://i.pravatar.cc/40?u=19', rating: 4, comment: 'Fitzgerald\'s prose is beautiful. A poignant critique of the American Dream.' },
    ],
  },
    {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '15',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1553383690l/2657.jpg',
    synopsis: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.',
    reviews: [
      { user: 'JusticeSeeker', avatar: 'https://i.pravatar.cc/40?u=20', rating: 5, comment: 'A timeless story about justice, morality, and compassion. Should be required reading.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '16',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverUrl: 'https://invalid-url-for-testing-fallback.com/image.jpg',
    synopsis: 'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.',
    reviews: [
      { user: 'FantasyFanatic', avatar: 'https://i.pravatar.cc/40?u=21', rating: 5, comment: 'The perfect adventure story. A wonderful introduction to Middle-earth.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '17',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1483464131l/865.jpg',
    synopsis: 'Paulo Coelho\'s enchanting novel has inspired a devoted following around the world. This story, dazzling in its powerful simplicity and soul-stirring wisdom, is about an Andalusian shepherd boy named Santiago who travels from his homeland in Spain to the Egyptian desert in search of a treasure buried near the Pyramids.',
    reviews: [
      { user: 'Wanderer', avatar: 'https://i.pravatar.cc/40?u=22', rating: 5, comment: 'A beautiful story about following your dreams. Truly inspiring.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '18',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1420585954l/23692271.jpg',
    synopsis: 'One hundred thousand years ago, at least six different species of humans inhabited Earth. Yet today there is only one—homo sapiens. What happened to the others? And what may happen to us? Sapiens takes us on a breathtaking ride through our entire human history, from the Stone Age to the Silicon Age.',
    reviews: [
      { user: 'HistoryGeek', avatar: 'https://i.pravatar.cc/40?u=23', rating: 5, comment: 'Mind-blowing. Completely changed the way I see the world and our species.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '19',
    title: 'The Martian',
    author: 'Andy Weir',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1413706054l/18007564.jpg',
    synopsis: 'Six days ago, astronaut Mark Watney became one of the first people to walk on Mars. Now, he\'s sure he\'ll be the first person to die there. After a freak storm nearly kills him and forces his crew to evacuate while thinking him dead, Mark finds himself stranded and completely alone with no way to even signal Earth that he’s alive.',
    reviews: [
      { user: 'SpaceNerd', avatar: 'https://i.pravatar.cc/40?u=24', rating: 5, comment: 'I couldn\'t put it down. Hilarious, smart, and incredibly tense. Science has never been so fun.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '20',
    title: 'Becoming',
    author: 'Michelle Obama',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1528206996l/38746485.jpg',
    synopsis: 'In a life filled with meaning and accomplishment, Michelle Obama has emerged as one of the most iconic and compelling women of our era. As First Lady of the United States of America—the first African American to serve in that role—she helped create the most welcoming and inclusive White House in history.',
    reviews: [
      { user: 'InspirationSeeker', avatar: 'https://i.pravatar.cc/40?u=25', rating: 5, comment: 'Deeply personal, inspiring, and beautifully written. Her story is incredible.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '21',
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1331028545l/11250317.jpg',
    synopsis: 'A tale of gods, kings, immortal fame, and the human heart, The Song of Achilles is a dazzling literary feat that brilliantly reimagines Homer’s enduring masterwork, The Iliad. An action-packed adventure, an epic love story, a marvelously conceived and executed page-turner.',
    reviews: [
      { user: 'Classicist', avatar: 'https://i.pravatar.cc/40?u=26', rating: 5, comment: 'I have no words. This book is a work of art. Heartbreakingly beautiful.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '22',
    title: 'A Man Called Ove',
    author: 'Fredrik Backman',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1405259930l/18774964.jpg',
    synopsis: 'A grumpy yet loveable man finds his solitary world turned on its head when a boisterous young family moves in next door. Meet Ove. He\'s a curmudgeon, the kind of man who points at people he dislikes as if they were burglars caught outside his bedroom window.',
    reviews: [
      { user: 'FeelGoodReads', avatar: 'https://i.pravatar.cc/40?u=27', rating: 5, comment: 'This book made me laugh and cry. So much heart and humor. Ove is unforgettable.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '23',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1498122390l/32620332.jpg',
    synopsis: 'Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more astounded than Monique herself.',
    reviews: [
      { user: 'PopCultureFan', avatar: 'https://i.pravatar.cc/40?u=28', rating: 5, comment: 'Glamorous, heartbreaking, and completely addictive. I devoured this book.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '24',
    title: 'Normal People',
    author: 'Sally Rooney',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1571423193l/41057294.jpg',
    synopsis: 'Connell and Marianne grow up in the same small town in rural Ireland. The similarities end there; they are from very different worlds. But when they both earn places at Trinity College in Dublin, a connection that has grown between them lasts long into the following years.',
    reviews: [
      { user: 'ModernLit', avatar: 'https://i.pravatar.cc/40?u=29', rating: 4, comment: 'An intimate and realistic portrayal of a complex relationship. Rooney\'s writing is sharp and insightful.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '25',
    title: 'Recursion',
    author: 'Blake Crouch',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/154 Recursion_._SY475_.jpg',
    synopsis: 'Memory makes reality. That\'s what NYC cop Barry Sutton is learning as he investigates the devastating phenomenon the media has dubbed False Memory Syndrome—a mysterious affliction that drives its victims mad with memories of a life they never lived.',
    reviews: [
      { user: 'MindBender', avatar: 'https://i.pravatar.cc/40?u=30', rating: 5, comment: 'A fast-paced, mind-bending thriller that I couldn\'t put down. The concept is incredible.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '26',
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1383718290l/13079982.jpg',
    synopsis: 'Guy Montag is a fireman. In his world, where television rules and literature is on the brink of extinction, firemen start fires rather than put them out. His job is to destroy the most illegal of commodities, the printed book, along with the houses in which they are hidden.',
    reviews: [
      { user: 'DystopianDreamer', avatar: 'https://i.pravatar.cc/40?u=31', rating: 5, comment: 'A timeless classic about the importance of knowledge. Frighteningly prescient.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '27',
    title: 'Brave New World',
    author: 'Aldous Huxley',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1575509278l/5129.jpg',
    synopsis: 'Aldous Huxley\'s profoundly important classic of world literature, Brave New World is a searching vision of an unequal, technologically-advanced future where humans are genetically bred, socially indoctrinated, and pharmaceutically anesthetized to passively uphold an authoritarian ruling order.',
    reviews: [
      { user: 'FutureIsNow', avatar: 'https://i.pravatar.cc/40?u=32', rating: 5, comment: 'A haunting vision of the future that forces you to think. A must-read for everyone.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '28',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1398034300l/5107.jpg',
    synopsis: 'The hero-narrator of The Catcher in the Rye is an ancient child of sixteen, a native New Yorker named Holden Caulfield. Through circumstances that tend to preclude adult, secondhand description, he leaves his prep school in Pennsylvania and goes underground in New York City for three days.',
    reviews: [
      { user: 'RebelReader', avatar: 'https://i.pravatar.cc/40?u=33', rating: 4, comment: 'A classic for a reason. Holden\'s voice is iconic and unforgettable.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '29',
    title: 'Lord of the Flies',
    author: 'William Golding',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327869409l/7624.jpg',
    synopsis: 'When a plane crashes on a remote island, a group of schoolboys are the sole survivors. From the prophetic Simon and virtuous Ralph to the chaotic Jack and timid Piggy, the group of boys attempt to form their own society but fail in the face of terror, sin, and evil.',
    reviews: [
      { user: 'Survivalist', avatar: 'https://i.pravatar.cc/40?u=34', rating: 5, comment: 'A chilling and powerful allegory about human nature. It stays with you long after you finish.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '30',
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1529598283l/186074.jpg',
    synopsis: 'Told in Kvothe\'s own voice, this is the tale of the magically gifted young man who grows to be the most notorious wizard his world has ever seen. The intimate narrative of his childhood in a troupe of traveling players, his years spent as a near-feral orphan in a crime-ridden city, and his daringly brazen yet successful bid to enter a legendary school of magic.',
    reviews: [
      { user: 'FantasyWorld', avatar: 'https://i.pravatar.cc/40?u=35', rating: 5, comment: 'The best fantasy book I have ever read. The prose is like music. An absolute masterpiece.' },
    ],
  },
  {
    // FIX: Changed id from number to string to match the Book type definition.
    id: '31',
    title: 'Animal Farm',
    author: 'George Orwell',
    coverUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327959366l/170448.jpg',
    synopsis: 'A farm is taken over by its overworked, mistreated animals. With flaming idealism and stirring slogans, they set out to create a paradise of progress, justice, and equality. Thus the stage is set for one of the most telling satiric fables ever penned.',
    reviews: [
      { user: 'PoliticalJunkie', avatar: 'https://i.pravatar.cc/40?u=36', rating: 5, comment: 'A brilliant and concise political allegory. Short, but incredibly powerful and timeless.' },
    ],
  }
];