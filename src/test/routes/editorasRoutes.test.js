/* eslint-disable linebreak-style */
import {
  afterEach, beforeEach, describe, expect, it, test, jest,
} from '@jest/globals';
// import Editora from '../../models/editora';
// import rotasEditora from '../../routes/editorasRoutes';
import request from 'supertest';
import app from '../../app';

let server;
beforeEach(() => {
  const port = 4000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('Testes de GET em /editoras', () => {
  it('Retornar lista de editoras', async () => {
    const resposta = await request(app).get('/editoras').set('Accept', 'application/json').expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].email).toEqual('e@e.com');
  });
});

let idResposta;
describe('Testes de POST em /editoras', () => {
  it('Deve receber uma nova editora', async () => {
    const resposta = await request(app).post('/editoras').send({
      nome: 'Casa do Código',
      cidade: 'São Paulo',
      email: 'email@emai.com',
    }).expect(201);

    idResposta = resposta.body.content.id;
  });

  it('Deve não adicionar nada ao passar o body vazio', async () => {
    await request(app).post('/editoras').send({}).expect(400);
  });
});

describe('Teste de GET em /editoras/id', () => {
  it('Deve retornar uma editora', async () => {
    await request(app).get(`/editoras/${idResposta}`).expect(200);
  });
});

describe('Teste de PUT em /editoras/id', () => {
  test.each([
    // Vai chamar vários testes diferentes, um para cada elemento
    ['nome', { nome: 'Casa del Código' }],
    ['cidade', { cidade: 'SP' }],
    ['email', { email: 'cdc@cddc.com' }],
  ])('Deve alterar o campo %s', async (chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(app).put(`/editoras/${idResposta}`).send(param).expect(204);
    expect(spy).toHaveBeenCalled();
  });
});

describe('Teste de DELETE em /editoras/id', () => {
  it('Deve deletar uma editora', async () => {
    await request(app).delete(`/editoras/${idResposta}`).expect(200);
  });
});
