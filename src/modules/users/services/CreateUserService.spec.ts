import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      email: 'test@test.com',
      name: 'Test User',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should NOT be able to create a new user with an already used email', async () => {
    await createUser.execute({
      email: 'test@test.com',
      name: 'Test User',
      password: '123123',
    });

    await expect(
      createUser.execute({
        email: 'test@test.com',
        name: 'Test User',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
