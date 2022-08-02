import AuthStore from './authStore';

export interface IRootStore {
  auth: typeof AuthStore;
}

export class RootStore implements IRootStore {
  auth: typeof AuthStore;

  constructor() {
    this.auth = AuthStore; // Authorization and user interaction
  }
}

export default new RootStore();
