import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      email: 'test@test.com',
      name: 'Test User',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should NOT be able to create a new user with an already used email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      email: 'test@test.com',
      name: 'Test User',
      password: '123123',
    });

    expect(
      createUser.execute({
        email: 'test@test.com',
        name: 'Test User',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
