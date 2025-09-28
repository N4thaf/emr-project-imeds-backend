import { GetStaticProps } from 'next';

export async function Home() {
  return null;
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      message: 'Welcome to the Patient API',
      status: 'OK',
    },
  };
}