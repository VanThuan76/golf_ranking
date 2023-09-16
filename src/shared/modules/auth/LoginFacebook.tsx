import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/useRedux';
import { login } from '../../stores/appSlice';
import { IUser } from '@/src/schemas/user.table.type';

const LoginFacebook: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useDispatch();
  const { user } = useAppSelector(state => state.appSlice);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/auth/facebook/callback${router.query}`, {
          headers: new Headers({ accept: 'application/json' }),
        });

        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const result: IUser = await response.json();
        dispatch(login(result));
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
        console.error(error);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return <React.Fragment>Loading....</React.Fragment>;
  }

  if (error) {
    return (
      <React.Fragment>
        <div>
          <p>Error:</p>
          <code className='Code-block'>{error.toString()}</code>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div>
        <details>
          <summary>Welcome {user?.user.name}</summary>
          <p>Here is your info: </p>
        </details>
      </div>
    </React.Fragment>
  );
};

export default LoginFacebook;
