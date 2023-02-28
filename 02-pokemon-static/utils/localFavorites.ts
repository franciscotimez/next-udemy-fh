const toggleFavorite = (id: number) => {
  console.log('toggle Favorite!');

  let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

  if (favorites.includes(id)) {
    favorites = favorites.filter(pokeId => pokeId !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const existInFavorite = (id: number): boolean => {
  if (typeof window === 'undefined') return false;

  const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
  return favorites.includes(id);
};

const pokemos = (): number[] => {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
};

const localFavorites = {
  toggleFavorite,
  existInFavorite,
  pokemos,
};

export default localFavorites;