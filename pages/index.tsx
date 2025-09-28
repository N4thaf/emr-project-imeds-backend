export default async function Home() {
  return null;
}

export const getServerSideProps = async ({ res }: { res: any }) => {
  const data = {
    message: "/api json"
  }

  res.setHeader("Content-Type", "application/json")
  res.write(JSON.stringify(data))
  res.end()

  return { props: {} };
}