import { useQuery } from 'blitz';
import getCurrentUser from 'app/users/queries/getCurrentUser';
import { User } from 'db';

export const useCurrentUser = (initialData?: Partial<User>) => {
  const [user] = useQuery(getCurrentUser, null, {
    initialData,
    suspense: false,
  });
  return user;
};
