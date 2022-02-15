const sinon = require('sinon');
const { expect } = require('chai');
const {
  describe, it, before, after,
} = require('mocha');
const toDoService = require('../../services/toDo');
const toDoModel = require('../../models/toDo');
const { badRequest } = require('../../utils/dictionary');

describe('Criar uma nova tarefa', () => {
  const payloadToDo = {
    status: 'pendente',
    task: '',
  };
  describe('Quando a tarefa não é informada', () => {
    it('dispara um erro', async () => {
      try {
        await toDoService.create(payloadToDo);
      } catch (error) {
        expect(error.status).to.be.eql(badRequest);
        expect(error.message).to.equal('"task" is required');
      }
    });
  });

  describe('Quando a tarefa é informada', () => {
    before(() => {
      payloadToDo.task = 'Fazer café';
      const response = {
        _id: '29502fjdipwfjwip',
      };

      sinon.stub(toDoModel, 'create')
        .resolves(response);
    });
    after(() => {
      toDoModel.create.restore();
    });

    it('retorna um objeto contendo o id da tarefa criada', async () => {
      const response = await toDoService.create(payloadToDo);

      expect(response).to.be.an('object');
      expect(response).to.have.all.keys('_id', 'status', 'task');
    });
  });
});
