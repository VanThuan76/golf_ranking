import { GetStaticPaths, GetStaticProps } from 'next/types';

const DetailNews = () => {
  return <></>;
};

export default DetailNews;
export const getStaticProps: GetStaticProps = async ctx => {
  const slug = ctx.params?.slug;
  if (slug) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DEV_NEW_API_URL}/articles/get-by-slug/${slug}`);
    const result = await res.json();
    const data = result.data;
    return {
      props: { data },
    };
  } else {
    return {
      props: {},
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async _ctx => {
  return {
    paths: [],
    fallback: true,
  };
};
