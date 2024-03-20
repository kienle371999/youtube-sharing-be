import { dataSource, initDatasource } from 'src/config/database.config';
import { User } from 'src/entities/user.entity';

const users: Partial<User>[] = [
  {
    username: 'JaneSmith92',
    email: 'jane.smith@example.com',
    password: 'password123',
  },
  {
    username: 'JohnDoe85',
    email: 'john.doe@example.com',
    password: 'qwerty456',
  },
  {
    username: 'BobJackson78',
    email: 'bob.jackson@example.com',
    password: 'securepassword789',
  },
];

const seeding = async () => {
  await initDatasource();

  const userRepo = await dataSource.getRepository(User);
  const seedUsers: User[] = [];

  for (const user of users) {
    const newUser = new User();
    newUser.username = user.username;
    newUser.email = user.email;
    newUser.password = user.password;

    seedUsers.push(newUser);
  }

  await userRepo.save(seedUsers);
  console.log('Seeding users successfully!!!!');
};

seeding();
