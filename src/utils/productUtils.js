import { ecoEnhancements } from '../data/ecoData';

export const enhanceProductWithEcoData = (product) => {
  //rebem el producte
  const ecoDAta = ecoEnhancements[product.id] || {}; // busquem el producte que coincideixi amb el product.id
  return { ...product, ...ecoDAta }; // ajuntem product i dades json
};
