/* eslint-disable linebreak-style */
import {
  afterEach, beforeEach, describe, expect, it,
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
});

describe('Teste de DELETE em /editoras/id', () => {
  it('Deve deletar uma editora', async () => {
    await request(app).delete(`/editoras/${idResposta}`).expect(200);
  });
});

describe('Teste de GET em /editoras/id', () => {
  it('Deve retornar uma editora', async () => {
    await request(app).get(`/editoras/${idResposta}`).expect(200);
  });
});
