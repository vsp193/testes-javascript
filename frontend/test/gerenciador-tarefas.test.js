import GerenciadorTarefas from '../src/gerenciador-tarefas';
import $ from 'jquery';

describe('GerenciadorTarefas', () => {
  var gerenciador;

  beforeAll(() => {
    gerenciador = new GerenciadorTarefas()
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('imprimirBemVindo deve imprimir texto de boas-vindas na div #boas-vindas', () => {
    document.body.innerHTML = `<h2 id='boas-vindas'></h2>`;

    gerenciador.imprimirBemVindo();

    var textoDiv = $('#boas-vindas').text();
    expect(textoDiv).toEqual('Seja bem-vindo ao Gerenciador de Tarefas!');
  });

  test('imprimirTarefas deve imprimir lista de tarefas na ul #lista-tarefas', () => {
    document.body.innerHTML = `<ul id='lista-tarefas'></ul>`;
    const tarefas = [
      { id: 1, titulo: 'Teste1', foiFeita: false },
      { id: 2, titulo: 'Teste2', foiFeita: false },
      { id: 3, titulo: 'Teste3', foiFeita: false }
    ];

    gerenciador.imprimirTarefas(tarefas);

    expect($('#tarefa-1 span').text()).toEqual('Teste1');
    expect($('#tarefa-2 span').text()).toEqual('Teste2');
    expect($('#tarefa-3 span').text()).toEqual('Teste3');
  });

  describe('recarregarTarefas', () => {
    test('deve chamar $.get com parametros corretos', () => {
      const promiseFalsa = $.Deferred().resolve([]).promise();
      $.get = jest.fn().mockReturnValueOnce(promiseFalsa);

      return gerenciador.recarregarTarefas().done(() => {
        expect($.get).toHaveBeenCalledTimes(1);
        expect($.get).toHaveBeenCalledWith('http://localhost:3000/tarefa');
      });
    });

    test('deve imprimir lista de tarefas na ul #lista-tarefas em caso de sucesso', () => {
      document.body.innerHTML = `<ul id='lista-tarefas'></ul>`;
      const tarefas = [
        { id: 1, titulo: 'Teste1', foiFeita: false },
        { id: 2, titulo: 'Teste2', foiFeita: false },
        { id: 3, titulo: 'Teste3', foiFeita: false }
      ];
      const defer = $.Deferred().resolve(tarefas);
      $.get = jest.fn().mockReturnValueOnce(defer.promise());

      return gerenciador.recarregarTarefas().done(() => {
        expect($.get).toHaveBeenCalledTimes(1);
        expect($('#tarefa-1 span').text()).toEqual('Teste1');
        expect($('#tarefa-2 span').text()).toEqual('Teste2');
        expect($('#tarefa-3 span').text()).toEqual('Teste3');
      });
    });
  });

  test('criarElementoTarefa deve retornar HTML corretamente preenchido', () => {
    const tarefa = { id: 1, titulo: 'foo', foiFeita: false };

    const resultado = gerenciador.criarElementoTarefa(tarefa);

    expect(resultado).toEqual(`
      <li id='tarefa-1'>
        <span>foo</span>
        <input type='checkbox' value='1' />
      </li>
    `);
  });

  describe('tarefaFoiFeita', () => {
    test('deve retornar "checked" se for true', () => {
      const tarefa = { foiFeita: true };

      const resultado = gerenciador.tarefaFoiFeita(tarefa);

      expect(resultado).toEqual('checked');
    });

    test('deve retornar vazio se for false', () => {
      const tarefa = { foiFeita: false };

      const resultado = gerenciador.tarefaFoiFeita(tarefa);

      expect(resultado).toEqual('');
    });
  });

  test('clicar no botão #adicionar-tarefa deve chamar funcao de adicionarTarefa', () => {
    document.body.innerHTML = `<button id='adicionar-tarefa'>Adicionar tarefa</button>`;
    const spy = jest.spyOn(gerenciador, 'adicionarTarefa');

    gerenciador.atribuirBindAElementos();
    $('#adicionar-tarefa').click();

    expect(spy).toHaveBeenCalled();
  });

  describe('adicionarTarefa', () => {
    test('deve chamar $.post com parametros corretos', () => {
      const promiseFalsa = $.Deferred().resolve().promise();
      $.post = jest.fn().mockReturnValueOnce(promiseFalsa);
      gerenciador.recarregarTarefas = jest.fn();
      $('#titulo-tarefa').val('tarefa');

      return gerenciador.adicionarTarefa().done(() => {
        expect($.post).toHaveBeenCalledTimes(1);
        expect($.post).toHaveBeenCalledWith('http://localhost:3000/tarefa', {titulo: 'tarefa'});
      });
    });

    test('deve sair da execução caso titulo seja vazio', () => {
      document.body.innerHTML = `<input type='text' id='titulo-tarefa' />`;
      const spy = jest.spyOn($, 'post');
      spy.mockReset();
      $('#titulo-tarefa').val('');

      gerenciador.adicionarTarefa();

      expect(spy).not.toHaveBeenCalled();
    });

    test('deve enviar nova tarefa para servidor', () => {
      document.body.innerHTML = `<input type='text' id='titulo-tarefa' />`;
      const defer = $.Deferred().resolve();
      $.post = jest.fn().mockReturnValueOnce(defer.promise());
      $('#titulo-tarefa').val('tarefa');

      gerenciador.adicionarTarefa();

      expect($.post).toHaveBeenCalled();
    });

    test('deve executar recarregarTarefas quando uma nova tarefa for adicionada', () => {
      document.body.innerHTML = `<input type='text' id='titulo-tarefa' />`;
      const promiseFalsa = $.Deferred().resolve().promise();
      $.post = jest.fn().mockReturnValueOnce(promiseFalsa);
      gerenciador.recarregarTarefas = jest.fn();
      $('#titulo-tarefa').val('tarefa');

      return gerenciador.adicionarTarefa().done(() => {
        expect(gerenciador.recarregarTarefas).toHaveBeenCalled();
      });
    });
  });

  test('inicializar deve executar imprimirBemVindo, recarregarTarefas e atribuirBindAElementos', () => {
    gerenciador.imprimirBemVindo = jest.fn();
    gerenciador.recarregarTarefas = jest.fn();
    gerenciador.atribuirBindAElementos = jest.fn();

    gerenciador.inicializar();

    expect(gerenciador.imprimirBemVindo).toHaveBeenCalled();
    expect(gerenciador.recarregarTarefas).toHaveBeenCalled();
    expect(gerenciador.atribuirBindAElementos).toHaveBeenCalled();
  });
});
