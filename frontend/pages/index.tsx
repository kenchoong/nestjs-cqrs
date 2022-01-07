import type { NextPage } from "next";
import Layout from "../components/layout/Layout";
import SignUpForm from "../components/users/SignUpForm";

const Home: NextPage = () => {
  return (
    <Layout>
      <SignUpForm />
    </Layout>
  );
};

export default Home;
