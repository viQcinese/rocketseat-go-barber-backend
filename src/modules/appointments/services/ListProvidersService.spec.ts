import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'User 1',
      email: 'first@email.com',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'User 2',
      email: 'second@email.com',
      password: '123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Logged User',
      email: 'logged@email.com',
      password: '123123',
    });

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([user1, user2]);
  });
});
