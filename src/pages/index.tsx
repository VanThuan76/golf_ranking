import { useRouter } from 'next/router';

function Home() {
  const router = useRouter();
  return null;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/rank',
      permanent: false,
    },
  };
}

export default Home;
