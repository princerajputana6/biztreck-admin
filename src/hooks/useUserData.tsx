
import { useEffect, useState } from 'react';
import { useSession} from 'next-auth/react'; // Import useSession from next-auth/react

type UserData = {
  name: string | null | undefined;
  email: string | null | undefined;
  image?: string | null | undefined;
};

export function useSessionData(): { userData: UserData | null; loading: boolean } {
  const { data: session, status } = useSession(); // Use useSession hook

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
    } else {
      setLoading(false);
      if (session?.user) {
        const { name, email, image } = session.user;
        setUserData({ name, email, image });
      } else {
        setUserData(null);
      }
    }
  }, [session, status]);

  return { userData, loading };
}
