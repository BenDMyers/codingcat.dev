import Link from 'next/link';
import Image from 'next/image';

import { Dispatch, SetStateAction } from 'react';
import { useAuth, useSigninCheck } from 'reactfire';
import dynamic from 'next/dynamic';
import { signOut } from '@/components/FirebaseAuth';
import ActiveLink from '@/components/ActiveLink';

const AuthWrapper = dynamic<any>(
  () => import('@/components/FirebaseAuth').then((mod) => mod.AuthWrapper),
  {
    ssr: false,
  }
);

const FirebaseFirestoreProvider = dynamic<any>(
  () =>
    import('@/components/firebase/wrappers').then(
      (mod) => mod.FirebaseFirestoreProvider
    ),
  {
    ssr: false,
  }
);
const AvatarProfile = dynamic<any>(
  () => import('@/components/user/AvatarProfile'),
  {
    ssr: false,
  }
);
export default function AvatarMenu({
  userMenu,
  setUserMenu,
  positionClass = 'right-0',
}: {
  userMenu: boolean;
  setUserMenu: Dispatch<SetStateAction<boolean>>;
  positionClass?: string;
}): JSX.Element {
  const auth = useAuth();
  const { data: signInCheckResult } = useSigninCheck();

  return (
    <FirebaseFirestoreProvider>
      <>
        <div className="relative">
          <AuthWrapper
            fallback={
              <Link href="/user/profile">
                <a className="flex items-center justify-center p-2 rounded text-basics-50 hover:bg-primary-800 dark:hover:bg-primary-800 focus:ring-2 focus:ring-basics-50">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M24 3.88235C24 1.73819 22.287 0 20.1739 0H10.087V2.11765H20.1739C21.1344 2.11765 21.913 2.90773 21.913 3.88235V20.1176C21.913 21.0923 21.1344 21.8824 20.1739 21.8824H10.087V24H20.1739C22.287 24 24 22.2618 24 20.1176V3.88235ZM10.087 18.1131L20.5217 12L10.087 5.88688V10.9412H-4.47035e-07V13.0588H10.087V18.1131Z"
                      fill="#FBFBFB"
                    />
                  </svg>
                  <span className="ml-2 space-nowrap">Sign In</span>
                </a>
              </Link>
            }
          >
            <button
              className="flex p-1 text-sm rounded-full text-basics-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-800 focus:ring-basics-50 hover:bg-primary-800 dark:hover:bg-primary-800"
              id="user-menu"
              aria-haspopup="true"
              onClick={() => setUserMenu(!userMenu)}
            >
              <span className="sr-only">Open user menu</span>
              {signInCheckResult?.user && signInCheckResult?.user?.photoURL ? (
                <AvatarProfile user={signInCheckResult.user} />
              ) : (
                <Image
                  src="/static/images/avatar.png"
                  loader={() => '/static/images/avatar.png'}
                  unoptimized={true}
                  layout="fixed"
                  width="40"
                  height="40"
                  alt="Avatar for user Profile"
                  className="w-8 h-8 rounded-full"
                />
              )}
            </button>
          </AuthWrapper>

          <div
            className={`${
              userMenu ? 'block' : 'hidden'
            } ${positionClass} absolute z-40 w-48 p-2 py-1 mt-2 rounded-md shadow-lg bg-basics-50 ring-1 ring-black ring-opacity-5`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <ActiveLink
              activeClassName="bg-primary-500 text-basics-50"
              href="/user/profile"
            >
              <a
                className="flex items-center p-2 text-sm rounded-md hover:bg-primary-50 dark:hover:bg-primary-900 dark:hover:text-basics-50"
                role="menuitem"
              >
                <svg
                  className="w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="ml-2">Your Profile</span>
              </a>
            </ActiveLink>

            <a
              href="#"
              className="flex items-center p-2 text-sm rounded-md text-basics-900 hover:bg-primary-50 dark:hover:bg-primary-900 dark:hover:text-basics-50"
              role="menuitem"
              onClick={() => {
                signOut(auth);
                setUserMenu(false);
              }}
            >
              <svg
                className="w-8 -scale-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="ml-2">Sign out</span>
            </a>
          </div>
        </div>
      </>
    </FirebaseFirestoreProvider>
  );
}
