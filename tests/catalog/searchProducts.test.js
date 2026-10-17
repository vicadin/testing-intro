const products = require('../../src/data/products');
const { searchProducts } = require('../../src/catalog');

describe('searchProducts', () => {
  test("запрос 'Наушники' возвращает товар с ID [1]", () => {
    expect(searchProducts(products, 'Наушники').map((p) => p.id)).toEqual([1]);
  });

  test("запрос 'Чистый код' возвращает товар с ID [6]", () => {
    expect(searchProducts(products, 'Чистый код').map((p) => p.id)).toEqual([6]);
  });

  test("запрос 'Настольная лампа' возвращает товар с ID [4]", () => {
    expect(searchProducts(products, 'Настольная лампа').map((p) => p.id)).toEqual([4]);
  });

  test("запрос 'javascript' возвращает товар с ID [3]", () => {
    expect(searchProducts(products, 'javascript').map((p) => p.id)).toEqual([3]);
  });

  test("запрос 'ЧЕХОЛ' возвращает товар с ID [5]", () => {
    expect(searchProducts(products, 'ЧЕХОЛ').map((p) => p.id)).toEqual([5]);
  });

  test("запрос 'наушники' возвращает товар с ID [1]", () => {
    expect(searchProducts(products, 'наушники').map((p) => p.id)).toEqual([1]);
  });

  test("пустой запрос '' возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
    expect(searchProducts(products, '').map((p) => p.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("запрос из пробелов '   ' возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
    expect(searchProducts(products, '   ').map((p) => p.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("запрос '\\t\\n' возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
    expect(searchProducts(products, '\t\n').map((p) => p.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
