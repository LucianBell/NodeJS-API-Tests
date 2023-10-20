/* eslint-disable linebreak-style */
import {
  describe, expect, it, jest,
} from '@jest/globals';
import Editora from '../../models/editora';

describe('Testando modelo editora', () => {
  const objetoEditora = {
    nome: 'cdc',
    cidade: 'São Paulo',
    email: 'C@c.com',
  };
  it('Deve instanciar uma nova editora', () => {
    const editora = new Editora(objetoEditora);
    // Forma menos intutitiva, mas que significa que esperamos que o objeto observado
    // contenha/seja um subconjunto de objectContaining.
    expect(editora).toEqual(expect.objectContaining(objetoEditora));
  });

  // it.skip serve para se você quiser pular esse teste na hora de execução
  it.skip('Deve salvar editora no DB', () => {
    const editora = new Editora(objetoEditora);
    editora.salvar().then((dados) => {
      expect(dados.nome).toBe('cdc');
    });
  });

  it.skip('Deve salvar no DB usando a síntaxe moderna', async () => {
    const editora = new Editora(objetoEditora);
    const dados = await editora.salvar();
    const valorRetornado = await Editora.pegarPeloId(dados.id);
    expect(valorRetornado).toEqual(expect.objectContaining({
      id: expect.any(Number),
      ...objetoEditora,
      created_at: expect.any(String),
      updated_at: expect.any(String),
    }));
  });

  it('Deve fazer uma chamada simulada ao DB', async () => {
    const editora = new Editora(objetoEditora);
    editora.salvar = jest.fn().mockReturnValue({
      id: 10,
      nome: 'cdc',
      cidade: 'São Paulo',
      email: 'C@c.com',
      created_at: '2023-10-19',
      updated_at: '2023-10-20',
    });
    const retorno = editora.salvar();
    expect(retorno).toEqual(expect.objectContaining({
      id: expect.any(Number),
      ...objetoEditora,
      created_at: expect.any(String),
      updated_at: expect.any(String),
    }));
  });
});
