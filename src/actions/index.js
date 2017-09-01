export const GET_CATEGORIES = 'GET_CATEGORIES'

export function getCategories( { categories } ) {
  console.log('action->categories ', categories);
  return {
    type: GET_CATEGORIES,
    categories: categories
  }
}
