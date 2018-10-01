import $ from 'jquery';

export default class Claculadora {
  somar(a, b) {
    return a + b;
  }

  subtrair(a, b) {
    return a - b;
  }

  dividir(a, b) {
    return a / b;
  }

  multiplicar(a, b) {
    return a * b;
  }

  executarEquacao(a, b) {
    return this.processar(a, b).then(data => data);
  }

  processar(a, b) {
    return $.get(`http://localhost:3000/processar?a=${a}&b=${b}`);
  }
}
