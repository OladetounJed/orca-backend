import { User } from './user.model';

describe('UserSchema.methods.toJSON', () => {
  it('should correctly transform and return the user object', () => {
    const user = new User({
      first_name: 'testUser',
      telegram_id: '123456',
      password: 'password123',
    });

    const userObject = user.toJSON();

    expect(userObject).toHaveProperty('first_name', 'testUser');
    expect(userObject).toHaveProperty('telegram_id', '123456');
    expect(userObject).not.toHaveProperty('password');
  });
});
