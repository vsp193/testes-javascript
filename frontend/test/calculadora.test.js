import Calculadora from '../src/calculadora';
import $ from 'jquery';

describe('Calculadora', () => {
  var calculadora;

  beforeAll(() => calculadora = new Calculadora());

  test('somar deve receber 1 e 2 e retornar 3', () => {
    const arg1 = 1;
    const arg2 = 2;

    const resultado = calculadora.somar(arg1, arg2);

    expect(resultado).toEqual(3);
  });

  test('subtrair deve receber 3 e 2 e retornar 1', () => {
    const resultado = calculadora.subtrair(3, 2);
    expect(resultado).toEqual(1);
  });

  test('dividir deve receber 2 e 2 e retornar 1', () => {
    const resultado = calculadora.dividir(2, 2);
    expect(resultado).toEqual(1);
  });

  test('multiplicar deve receber 2 e 2 e retornar 4', () => {
    const resultado = calculadora.multiplicar(2, 2);
    expect(resultado).toEqual(4);
  });

  test('executarEquacao deve receber 3 e 4 e retornar 12 valor do servidor', () => {
    const defer = $.Deferred().resolve(12);
    $.get = jest.fn().mockReturnValueOnce(defer.promise());

    return calculadora.executarEquacao(3, 4).done(data => {
      expect(data).toEqual(12);
    });
  });
});
