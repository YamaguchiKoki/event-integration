export interface IUserRepository {
  create(email: string, name: string): Promise<void>;
}
