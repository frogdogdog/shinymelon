export const brand = {
  name: 'ShinyMelon',
  tagline: 'Learn · Grow · Explore',
  url: 'shinymelon.com',

  // Logo
  logo: {
    version: 'v1',
    mascotUrl: 'https://tvimmduaznytpjpbwfiw.supabase.co/storage/v1/object/public/assets/watermelon-rays.png',
    wordmarkFont: 'Grandstander',
  },

  // Fonts
  fonts: {
    display: 'Grandstander',     // headings, logo, titles
    body: 'Atkinson Hyperlegible', // worksheet body, instructions, questions
  },

  // Colors
  colors: {
    melon:       '#E8845A',
    melonLight:  '#FCE8DF',
    teal:        '#2A7B8C',
    tealLight:   '#D6EEF2',
    gold:        '#D4A017',
    goldLight:   '#FEF7E0',
    green:       '#1E8449',
    greenLight:  '#D5F5E3',
    gray:        '#4A4A4A',
    lightGray:   '#F7F7F7',
    white:       '#FFFFFF',
  },

  // Print-specific overrides
  print: {
    primaryColor:  '#2A7B8C',  // teal only
    borderColor:   '#555555',
    textColor:     '#333333',
  },

  // Copyright — update year here each January
  copyright: {
    year: new Date().getFullYear(),
    text: () => `© ${new Date().getFullYear()} ShinyMelon · shinymelon.com`,
  },

  // Worksheet settings
  worksheet: {
    questionsPerPage: 8,
    pageSize: { width: 8.5, height: 11 }, // inches
    margins: { top: 0.75, bottom: 0.75, left: 0.75, right: 0.75 }, // inches
    questionFontSize: 14,    // pt — readable for K/1st
    instructionFontSize: 13,
    answerLineFontSize: 12,
    headerHeight: 0.6,       // inches
    footerHeight: 0.35,      // inches
  },
}

// Skill URL builder — takes taxonomy data and returns a clean URL
export function buildSkillUrl(gradeId, domainCode, nodeCode) {
  const grade = gradeId.toLowerCase()
  const domain = domainCode.toLowerCase()
  const skill = nodeCode.toLowerCase().replace(/\./g, '-')
  return `${brand.url}/math/${grade}/${domain}/${skill}`
}