import Calculadora from '../features/calculadora';

describe('Calculadora', () =>{
  var calculadora;

  beforeAll(() => {
    calculadora = new Calculadora();
  });

  test('quando receber 1 e 2 para somar deve retornar 3', () => {
    expect(calculadora.somar(1, 2)).toBe(3);
  });

  test('quando receber 1 e 2 para subtrair deve retornar -1', () => {
    expect(calculadora.subtrair(1, 2)).toBe(-1);
  });

  test('quando receber 5 e 3 para subtrair deve retornar 2', () => {
    expect(calculadora.subtrair(5, 3)).toBe(2);
  });

  test('quando receber 2 e 2 para multiplicar deve retornar 4', () => {
    expect(calculadora.multiplicar(2, 2)).toBe(4);
  });

  test('quando receber 2 e -1 para multiplicar deve retornar -2', () => {
    expect(calculadora.multiplicar(2, -1)).toBe(-2);
  });

  test('quando receber 2 e 2 para dividir deve retornar 1', () => {
    expect(calculadora.dividir(1, 1)).toBe(1);
  });
});
