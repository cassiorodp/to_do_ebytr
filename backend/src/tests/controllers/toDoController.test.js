const sinon = require('sinon');
const { expect } = require('chai');
const {
  describe, it, before, after,
} = require('mocha');

const toDoService = require('../../services/toDo');
const toDoController = require('../../controllers/tasks');
const { success } = require('../../utils/dictionary');

describe('Ao chamar o controller toDo', () => {
  const response = {};
  const request = {};
  let next = () => {};

  const tasks = [{ _id: '348ufgisogfvsdfog', status: 'em andamento', task: 'criar testes' }];
  describe('retorna a lista de tarefas', () => {
    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(toDoService, 'getAll')
        .resolves(tasks);

      next = sinon.stub().returns();
    });

    after(() => {
      toDoService.getAll.restore();
    });

    it('é a lista de tarefas', async () => {
      await toDoController.getAll(request, response, next);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      expect(response.status.calledWith(success)).to.be.equal(true);
    });
  });
});
