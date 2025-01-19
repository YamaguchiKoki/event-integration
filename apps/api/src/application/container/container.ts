export class DIContainer<T> {
  private instances: Partial<T> = {};

  public get<K extends keyof T>(key: K): T[K] {
    const instance = this.instances[key];
    if (!instance) {
      throw new Error(`No instance found for key: ${String(key)}`);
    }
    return instance as T[K];
  }

  public set<K extends keyof T>(key: K, value: T[K]): void {
    this.instances[key] = value;
  }
}
