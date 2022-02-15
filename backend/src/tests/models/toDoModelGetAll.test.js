const sinon = require('sinon');
const { expect } = require('chai');
// Importar o MongoClient e o mock da conexão
const { MongoClient } = require('mongodb');
const {
  describe, before, after, it,
} = require('mocha');
const { getConnection } = require('./mongoMockConnection');

// Importar o model a ser testado
const toDoModel = require('../../models/toDo');

describe('Retorna uma lista de tarefas', () => {
  let connectionMock;

  const payloadToDo = {
    status: 'pendente',
    task: 'Fazer os testes',
  };

  // Aqui atualizamos o código para usar o banco montado pela lib `mongo-memory-server`
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    await connectionMock.db('tasks').collection('to_do').insertOne(payloadToDo);
  });

  // Restauraremos a função `connect` original após os testes.
  after(async () => {
    await connectionMock.db('tasks').collection('to_do').drop();
    MongoClient.connect.restore();
  });

  describe('Quando é retornado as tarefas com sucesso', () => {
    it('retorna um array', async () => {
      const response = await toDoModel.getAll();

      expect(response).to.be.an('array');
    });
    // Testando se o usuário foi cadastrado após chamar a função `create`.
    it('deve existir uma tarefa cadastrada!', async () => {
      const tasks = await toDoModel.getAll();

      expect(tasks[0].status).to.be.equal('nova');
    });
  });
});
