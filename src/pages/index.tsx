function Home() {
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
