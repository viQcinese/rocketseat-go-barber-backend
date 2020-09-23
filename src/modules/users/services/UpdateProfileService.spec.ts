import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test User',
      email: 'test@test.com',
      password: '123123',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Edited User Name',
      email: 'test_edited@test.com',
    });

    expect(updatedUser.name).toBe('Edited User Name');
    expect(updatedUser.email).toBe('test_edited@test.com');
  });

  it('should not be able to update profile from non existing user', async () => {
    expect(
      updateProfileService.execute({
        user_id: 'non existing user id',
        name: 'non existing name',
        email: 'non existing email',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Old User',
      email: 'old_user@test.com',
      password: '123123',
    });

    const newUser = await fakeUsersRepository.create({
      name: 'New User',
      email: 'new_user@test.com',
      password: '123123',
    });

    await expect(
      updateProfileService.execute({
        user_id: newUser.id,
        name: 'Edited New User',
        email: 'old_user@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test User',
      email: 'test@test.com',
      password: '123123',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Edited Test User',
      email: 'test@test.com',
      old_password: '123123',
      password: '123456',
    });

    expect(updatedUser.password).toBe('123456');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test User',
      email: 'test@test.com',
      password: '123123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Edited Test User',
        email: 'test@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test User',
      email: 'test@test.com',
      password: '123123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Edited Test User',
        email: 'test@test.com',
        old_password: 'wrong_old_password',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
