import icon1 from '../../assets/icon-chat.png';
import icon2 from '../../assets/icon-money.png';
import icon3 from '../../assets/icon-security.png';

/**
 * @typedef {Object} feature
 * @property {string} title
 * @property {string} description
 * @property {string} picPath Chemin et fhcier de l'image
 * @property {string} picAlt  Texte alternatif de l'image
 */
/** @type {feature[]} */
export const featuresList = [
  {
    title: 'You are our #1 priority',
    description:
      'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
    picPath: icon1,
    picAlt: 'Chat Icon',
  },
  {
    title: 'More savings means higher rates',
    description:
      'he more you save with us, the higher your interest rate will be!',
    picPath: icon2,
    picAlt: 'Money',
  },
  {
    title: 'Security you can trust',
    description:
      'We use top of the line encryption to make sure your data and money is always safe.',
    picPath: icon3,
    picAlt: 'Shield Security',
  },
];
