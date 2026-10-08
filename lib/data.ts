export interface NavLink {
  label: string;
  href: string;
  key: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Story", href: "#story", key: "story" },
  { label: "Endings", href: "#endings", key: "endings" },
];

export const BRAND = {
  name: "The Lost Puppy",
  tagline: "A Choose-Your-Adventure Story",
  emoji: "🐶",
} as const;

export type StoryScreenId =
  | "start"
  | "check-tag"
  | "ask-ranger"
  | "ask-lady"
  | "follow-paw"
  | "call-out"
  | "ending-ranger"
  | "ending-mia"
  | "ending-gate"
  | "ending-leo";

export interface Choice {
  label: string;
  next: StoryScreenId;
  variant: "primary" | "accent" | "secondary";
}

export interface StoryScreen {
  id: StoryScreenId;
  emoji: string;
  title: string;
  text: string;
  choices: Choice[];
  isEnding?: boolean;
  endingKey?: string;
}

export const STORY_DATA: StoryScreen[] = [
  {
    id: "start",
    emoji: "🐾🌳🐶😟",
    title: "Oh No! A Lost Puppy!",
    text: "You are walking in the park when you spot a tiny puppy sitting all alone. He has big brown eyes and a little wagging tail. He looks lost! What do you do?",
    choices: [
      { label: "Check the puppy's collar tag", next: "check-tag", variant: "primary" },
      { label: "Follow the paw prints and see where they go", next: "follow-paw", variant: "accent" },
      { label: "Call out loud to see if anyone knows the puppy", next: "call-out", variant: "secondary" },
    ],
  },
  {
    id: "check-tag",
    emoji: "🐶🏷️👀✨",
    title: "Check the Tag!",
    text: "You look at the puppy's collar. There is a tag! It says his name is Biscuit 🍪 and has a phone number. But wait — you don't have a phone! You see a park ranger nearby and a friendly old lady on a bench. Who do you ask for help?",
    choices: [
      { label: "Ask the park ranger for help", next: "ask-ranger", variant: "primary" },
      { label: "Ask the kind lady on the bench", next: "ask-lady", variant: "accent" },
    ],
  },
  {
    id: "ask-ranger",
    emoji: "🐶👮🌲📻",
    title: "The Park Ranger!",
    text: "The park ranger smiles and radios for help right away! She says Biscuit's family has been looking everywhere. They are on their way! While you wait, Biscuit licks your nose. You giggle!",
    choices: [
      { label: "Wait with Biscuit and give him a pat", next: "ending-ranger", variant: "primary" },
    ],
  },
  {
    id: "ask-lady",
    emoji: "🐶👵📱🌸",
    title: "The Kind Lady!",
    text: "The old lady is so happy to help! She calls the number on the tag. Biscuit's owner is a little girl named Mia. Mia is crying because she misses Biscuit so much. She is coming right now!",
    choices: [
      { label: "Stay and wait for Mia to arrive", next: "ending-mia", variant: "primary" },
    ],
  },
  {
    id: "follow-paw",
    emoji: "🐾🐾🌻🏡",
    title: "Follow the Paw Prints!",
    text: "Biscuit starts sniffing the ground and trotting along a path. You decide to follow him! He leads you past the big fountain, through the flower garden, and stops at a yellow gate. He wags his tail super fast!",
    choices: [
      { label: "Knock on the gate and see who answers", next: "ending-gate", variant: "primary" },
      { label: "Look around for someone who might know Biscuit", next: "call-out", variant: "accent" },
    ],
  },
  {
    id: "call-out",
    emoji: "📢🐶🏘️🌈",
    title: "Call Out Loud!",
    text: "You cup your hands and shout: Does anyone know this puppy? A boy named Leo comes running over. He lives right next to the park! He knows Biscuit — Biscuit belongs to his neighbour. Leo runs to get them!",
    choices: [
      { label: "Go with Leo to find the neighbour", next: "ending-leo", variant: "primary" },
      { label: "Wait right here so nobody gets confused", next: "ending-ranger", variant: "accent" },
    ],
  },
  {
    id: "ending-ranger",
    emoji: "🎉🐶👨‍👩‍👧🌟",
    title: "Happy Ending — Hero of the Park!",
    text: "Biscuit's family arrives and hugs him tight. They hug YOU too! The park ranger gives you a shiny sticker that says Animal Hero. Biscuit barks happily. Everyone cheers! You did it! 🎊",
    choices: [],
    isEnding: true,
    endingKey: "ending-ranger",
  },
  {
    id: "ending-mia",
    emoji: "🎀🐶👧💛",
    title: "Happy Ending — Best Friends!",
    text: "Mia runs over and scoops up Biscuit. She is SO happy she does a little dance! She says you are the kindest person ever. She invites you for ice cream to say thank you. You and Mia become best friends! 🍦",
    choices: [],
    isEnding: true,
    endingKey: "ending-mia",
  },
  {
    id: "ending-gate",
    emoji: "🏡🐶🌈🎈",
    title: "Happy Ending — Home Sweet Home!",
    text: "The yellow gate opens and a family rushes out. Biscuit jumps and spins in circles! They say Biscuit dug under the fence and got out. They give you a big bag of cookies as a thank-you. Biscuit waves his paw goodbye! 🍪",
    choices: [],
    isEnding: true,
    endingKey: "ending-gate",
  },
  {
    id: "ending-leo",
    emoji: "🤝🐶🏅🌟",
    title: "Happy Ending — Neighbourhood Hero!",
    text: "Leo's neighbour comes running out in her slippers! She cries happy tears and squeezes Biscuit. She bakes you a whole tray of cupcakes right then and there. Leo says you are the coolest kid he has ever met! 🧁",
    choices: [],
    isEnding: true,
    endingKey: "ending-leo",
  },
];

export const ENDINGS_INFO: Record<string, { label: string; emoji: string }> = {
  "ending-ranger": { label: "Hero of the Park", emoji: "⭐" },
  "ending-mia": { label: "Best Friends!", emoji: "🎀" },
  "ending-gate": { label: "Home Sweet Home", emoji: "🏡" },
  "ending-leo": { label: "Neighbourhood Hero", emoji: "🏅" },
};