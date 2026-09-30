export type Person = {
  id: string;
  name: string;
  role: string;
  location: string;
  linkedin: string;
  instagram: string;
  tagline: string;
  bio: string;
  needs: string[];
  hobbies: string[];
  interests: string[];
  qualities: string[];
  values: string[];
  tags: string[];
  vibe: string;
  lookingFor: string;
  agentName: string;
  agentPersona: string;
  linkedinSignals: string[];
  instagramSignals: string[];
};

export const PEOPLE_SEED: Array<{
  id: string; name: string; role: string; location: string;
  linkedin: string; instagram: string; tagline: string; bio: string;
}> = [
  { id: "sam-altman", name: "Sam Altman", role: "CEO, OpenAI · ex-Y Combinator", location: "San Francisco", linkedin: "https://www.linkedin.com/in/sama", instagram: "https://www.instagram.com/sama", tagline: "Optimist building AGI for everyone", bio: "Startup operator turned AI lab CEO. Minimalist poster, long-horizon thinker, prepper-adjacent pragmatist." },
  { id: "alexis-ohanian", name: "Alexis Ohanian", role: "Founder, Seven Seven Six · Reddit co-founder", location: "Florida", linkedin: "https://www.linkedin.com/in/alexisohanian", instagram: "https://www.instagram.com/alexisohanian", tagline: "Dad, investor, nerd-athlete", bio: "Reddit co-founder turned early-stage investor. Loud advocate for paid family leave, women's sports, and dad life." },
  { id: "gary-vee", name: "Gary Vaynerchuk", role: "CEO, VaynerMedia · Creator", location: "New York", linkedin: "https://www.linkedin.com/in/garyvaynerchuk", instagram: "https://www.instagram.com/garyvee", tagline: "Hustle with empathy", bio: "Wine-to-ads empire builder. Daily motivational poster, Jets superfan, trading-card obsessive." },
  { id: "melanie-perkins", name: "Melanie Perkins", role: "Co-founder & CEO, Canva", location: "Sydney", linkedin: "https://www.linkedin.com/in/melanieperkins", instagram: "https://www.instagram.com/melanieperkins", tagline: "Democratising design, kiteboarding on weekends", bio: "Built Canva from a yearbook tool into a design giant. Outdoorsy, low-ego, mission-driven operator." },
  { id: "neil-patel", name: "Neil Patel", role: "Co-founder, NP Digital · Marketer", location: "Las Vegas", linkedin: "https://www.linkedin.com/in/neilpatel", instagram: "https://www.instagram.com/neilpatel", tagline: "Marketing experiments, daily", bio: "SEO educator and agency builder. Data-obsessed tester who posts teardowns and travel snapshots." },
  { id: "tim-ferriss", name: "Tim Ferriss", role: "Author · Angel investor", location: "Austin", linkedin: "https://www.linkedin.com/in/timferriss", instagram: "https://www.instagram.com/timferriss", tagline: "Deconstructing world-class performers", bio: "4-Hour author and podcast interviewer. Slow mornings, journaling, psychedelic-research funder, dog lover." },
  { id: "mkbhd", name: "Marques Brownlee", role: "Creator, MKBHD · Founder, Studio", location: "New Jersey", linkedin: "https://www.linkedin.com/in/marquesbrownlee", instagram: "https://www.instagram.com/mkbhd", tagline: "Calm tech reviews, frisbee championships", bio: "The internet's most trusted reviewer. Minimal-desk aesthete, ultimate frisbee pro, EV nerd." },
  { id: "sara-blakely", name: "Sara Blakely", role: "Founder, Spanx", location: "Atlanta", linkedin: "https://www.linkedin.com/in/sarablakely", instagram: "https://www.instagram.com/sarablakely", tagline: "Fun-first billionaire inventor", bio: "Sold fax machines, then reinvented shapewear. Goofy storyteller, prankster wife, women-founder mentor." },
  { id: "brian-chesky", name: "Brian Chesky", role: "Co-founder & CEO, Airbnb", location: "San Francisco", linkedin: "https://www.linkedin.com/in/brianchesky", instagram: "https://www.instagram.com/bchesky", tagline: "Belong anywhere — design-led host", bio: "RISD designer turned travel CEO. Lives out of Airbnbs, sketches interfaces, runs marathons." },
  { id: "tony-fadell", name: "Tony Fadell", role: "Founder, Nest · iPod creator", location: "Paris / California", linkedin: "https://www.linkedin.com/in/tonyfadell", instagram: "https://www.instagram.com/tfadell", tagline: "Build things that matter", bio: "Hardware legend mentoring deep-tech founders. Museum-goer, wine collector, blunt design critic." },
  { id: "julie-zhuo", name: "Julie Zhuo", role: "Co-founder, Sundial · ex-FB Design VP", location: "Bay Area", linkedin: "https://www.linkedin.com/in/juliezhuo", instagram: "https://www.instagram.com/joulee", tagline: "Manager of managers, mom of three", bio: "Wrote the book on management. Book-club host, journaling devotee, gentle-but-direct coach." },
  { id: "garry-tan", name: "Garry Tan", role: "President & CEO, Y Combinator", location: "San Francisco", linkedin: "https://www.linkedin.com/in/garrytan", instagram: "https://www.instagram.com/garrytan", tagline: "Make something people want", bio: "Initialized founder turned YC chief. Ramen-and-hacker-house nostalgist, anime fan, prolific poster." },
  { id: "ijustine", name: "Justine Ezarik", role: "Creator, iJustine · Host", location: "Los Angeles", linkedin: "https://www.linkedin.com/in/justineezarik", instagram: "https://www.instagram.com/ijustine", tagline: "Lifecasting tech since 2007", bio: "OG YouTuber covering Apple and gadgets. Gamer, escape-room fan, rescue-dog mom." },
  { id: "lenny-rachitsky", name: "Lenny Rachitsky", role: "Author, Lenny's Newsletter · ex-Airbnb", location: "San Francisco", linkedin: "https://www.linkedin.com/in/lennyrachitsky", instagram: "https://www.instagram.com/lennyrachitsky", tagline: "Product frameworks + coffee chats", bio: "PM's PM turned newsletter business. Leafs hockey fan, espresso snob, systems thinker." },
  { id: "ankur-warikoo", name: "Ankur Warikoo", role: "Founder, WebVeda · Author", location: "Bengaluru / Gurugram", linkedin: "https://www.linkedin.com/in/warikoo", instagram: "https://www.instagram.com/ankurwarikoo", tagline: "Do epic shit, journal daily", bio: "Nearbuy founder turned educator. 5am writer, fitness comeback story, brutally honest about money." },
  { id: "sahil-bloom", name: "Sahil Bloom", role: "Investor · Author, 5 Types of Wealth", location: "New York", linkedin: "https://www.linkedin.com/in/sahilbloom", instagram: "https://www.instagram.com/sahilbloom", tagline: "Curiosity chronicles, family first", bio: "Ex-private equity turned writer-investor. Morning-run philosopher, baseball romantic, new dad." },
  { id: "jessica-alba", name: "Jessica Alba", role: "Co-founder, Honest Company · Actor", location: "Los Angeles", linkedin: "https://www.linkedin.com/in/jessicaalba", instagram: "https://www.instagram.com/jessicaalba", tagline: "Clean living, honest business", bio: "Actor turned consumer-goods founder. Wellness poster, family camping trips, Latina-pride advocate." },
  { id: "reshma-saujani", name: "Reshma Saujani", role: "Founder, Girls Who Code · Moms First", location: "New York", linkedin: "https://www.linkedin.com/in/reshmasaujani", instagram: "https://www.instagram.com/reshmasaujani", tagline: "Brave, not perfect", bio: "Lawyer-turned-nonprofit founder. Marathoner, keynote machine, policy fighter for moms." },
  { id: "katrina-lake", name: "Katrina Lake", role: "Founder, Stitch Fix", location: "San Francisco", linkedin: "https://www.linkedin.com/in/kmlake", instagram: "https://www.instagram.com/katrinalake", tagline: "Data + personal style", bio: "First woman to take a fashion-tech company public. Trail runner, thrift lover, working mom of two." },
  { id: "badassboz", name: "Bozoma Saint John", role: "Founder, Eve by Boz · ex-Netflix CMO", location: "Los Angeles", linkedin: "https://www.linkedin.com/in/bozoma-saint-john", instagram: "https://www.instagram.com/badassboz", tagline: "Badass in every room", bio: "Hall-of-fame marketer turned beauty founder. Bold fashion, grief-to-joy storyteller, dance-floor starter." },
  { id: "allie-miller", name: "Allie K. Miller", role: "AI Founder · Advisor, ex-Amazon", location: "New York", linkedin: "https://www.linkedin.com/in/alliekmiller", instagram: "https://www.instagram.com/alliekmiller", tagline: "AI for humans, outdoors daily", bio: "ML leader turned startup advisor. Trail hiker, piano player, prolific AI explainer." },
  { id: "alex-morgan", name: "Alex Morgan", role: "Co-founder, TOGETHXR · Footballer", location: "San Diego", linkedin: "https://www.linkedin.com/in/alexmorgan13", instagram: "https://www.instagram.com/alexmorgan13", tagline: "Compete with joy", bio: "World Cup champion building women's sports media. Coffee snob, book clubber, new-mom athlete." },
  { id: "payal-kadakia", name: "Payal Kadakia", role: "Founder, ClassPass · Author", location: "New York", linkedin: "https://www.linkedin.com/in/payalkadakia", instagram: "https://www.instagram.com/payal", tagline: "Dance, sweat, build", bio: "Dancer who turned booking fitness into a unicorn. Classical dance daily, art collector, mom." },
  { id: "naval", name: "Naval Ravikant", role: "Founder, AngelList · Philosopher", location: "Miami", linkedin: "https://www.linkedin.com/in/navalr", instagram: "https://www.instagram.com/naval", tagline: "Seek wealth, not money", bio: "AngelList founder turned tweet-philosopher. Meditator, reader, leverage-and-freedom maximalist." },
  { id: "whitney-herd", name: "Whitney Wolfe Herd", role: "Founder, Bumble", location: "Austin", linkedin: "https://www.linkedin.com/in/whitneywolfeherd", instagram: "https://www.instagram.com/whitney", tagline: "Women make the first move", bio: "Youngest woman to IPO a US company. Southern hospitality, ranch life, fierce women's-safety advocate." }
];
