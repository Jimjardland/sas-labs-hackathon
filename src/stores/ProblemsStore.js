import { observable, runInAction } from 'mobx';
import api from '../api';

class ProblemsStore {
  @observable
  created = null;

  @observable
  problems = [];

  @observable
  currentProblem = null;

  async createProblem(text) {
    const { problem } = await api.post('/api/problems', { text });

    runInAction(() => {
      this.created = problem;
    });
    this.getAll();
    return problem;
  }

  async getProblem(id, baseUrl = '') {
    try {
      const { problem } = await api.get(`${baseUrl}/api/problems/${id}`);
      runInAction(() => {
        this.currentProblem = problem;
      });

      return problem;
    } catch (e) {}
  }

  async getAll(baseUrl = '') {
    try {
      const data = await api.get(`${baseUrl}/api/problems`);
      runInAction(() => {
        this.problems = data.problems;
      });
    } catch (e) {
      console.error(e);
    }
  }
}

export default new ProblemsStore();
