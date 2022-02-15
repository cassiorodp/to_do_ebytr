/* eslint-disable no-unused-expressions */
const sinon = require('sinon');
const { expect } = require('chai');
// Importar o MongoClient e o mock da conexão
const { MongoClient, ObjectId } = require('mongodb');
const {
  describe, before, after, it,
} = require('mocha');
const { getConnection } = require('./mongoMockConnection');

// Importar o model a ser testado
const toDoModel = require('../../models/toDo');

describe('Atualiza uma tarefa', () => {
  let connectionMock;

  const payloadToDo = {
    status: 'pendente',
    task: 'Fazer os testes',
  };

  const updateStatusPayloadToDo = {
    status: 'em andamento',
  };

  const updateTaskPayloadToDo = {
    task: 'Fazendo os testes',
  };

  // Aqui atualizamos o código para usar o banco montado pela lib `mongo-memory-server`
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  // Restauraremos a função `connect` original após os testes.
  after(async () => {
    await connectionMock.db('tasks').collection('to_do').drop();
    MongoClient.connect.restore();
  });

  describe('Quando é criado a tarefa com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await toDoModel.create(payloadToDo);

      expect(response).to.be.an('object');
    });
    // Testando se o usuário foi cadastrado após chamar a função `create`.
    it('deve existir uma tarefa cadastrada!', async () => {
      const taskId = await toDoModel.create(payloadToDo);
      const task = await connectionMock
        .db('tasks')
        .collection('to_do')
        .find({ _id: ObjectId(taskId) });

      expect(task).to.not.be.null;
    });
  });
});
