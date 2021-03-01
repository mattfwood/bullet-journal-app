import { BlitzPage, GetServerSideProps } from 'blitz';
import { getSessionContext } from '@blitzjs/server';
import Layout from 'app/core/layouts/Layout';
import { useCurrentUser } from 'app/core/hooks/useCurrentUser';
import Dashboard from 'app/core/components/Dashboard';
import { User } from 'db';

// const UserInfo = () => {
//   const currentUser = useCurrentUser()
//   const [logoutMutation] = useMutation(logout)

//   if (currentUser) {
//     return (
//       <>
//         <button
//           className="button small"
//           onClick={async () => {
//             await logoutMutation()
//           }}
//         >
//           Logout
//         </button>
//         <div>
//           User id: <code>{currentUser.id}</code>
//           <br />
//           User role: <code>{currentUser.role}</code>
//         </div>
//       </>
//     )
//   } else {
//     return (
//       <>
//         <Link href="/signup">
//           <a className="button small">
//             <strong>Sign Up</strong>
//           </a>
//         </Link>
//         <Link href="/login">
//           <a className="button small">
//             <strong>Login</strong>
//           </a>
//         </Link>
//       </>
//     )
//   }
// }

const Home: BlitzPage<{ user?: Partial<User> }> = ({ user }) => {
  useCurrentUser(user);
  return <Dashboard />;
};

Home.suppressFirstRenderFlicker = true;
Home.authenticate = true;
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSessionContext(req, res);
  return {
    props: {
      user: session.$publicData,
    },
  };
};

export default Home;
