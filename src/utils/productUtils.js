import { ecoEnhancements } from '../data/ecoData';

export const enhanceProductWithEcoData = (product) => {
  const ecoData = ecoEnhancements[product.id] || {};
  return { ...product, ...ecoData };
};
