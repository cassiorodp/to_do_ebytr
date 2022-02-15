/* eslint-disable no-unused-expressions */
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

describe('Atualiza uma tarefa', () => {
  let connectionMock;
  let taskId;

  const payloadToDo = {
    status: 'pendente',
    task: 'Fazer os testes',
  };

  // Aqui atualizamos o código para usar o banco montado pela lib `mongo-memory-server`
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    const { insertedId } = await connectionMock.db('tasks').collection('to_do').insertOne(payloadToDo);
    taskId = insertedId;
  });

  // Restauraremos a função `connect` original após os testes.
  after(async () => {
    await connectionMock.db('tasks').collection('to_do').drop();
    MongoClient.connect.restore();
  });

  describe('Quando é atualizado com sucesso', () => {
    it('deve retornar uma tarefa atualizada!', async () => {
      const updateStatusPayloadToDo = {
        id: taskId,
        status: 'em andamento',
      };

      await toDoModel.update(updateStatusPayloadToDo);

      const updatedTask = await connectionMock
        .db('tasks')
        .collection('to_do')
        .findOne({ _id: taskId });

      expect(updatedTask.status).to.be.equal('em andamento');
    });
  });
});
