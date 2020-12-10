import React from "react";
import { Text } from "grommet";
import MainLayout from "src/layouts/MainLayout";
import { Loading, Link } from "src/components/_lib_";
import { redirectToExample } from "src/helpers/root";

/* Use this as your starting point for your app! */

const pageTitle = "Redirecting...";

const Page = () => {
  /* You can clear all this out and output whatever you'd like for your page */
  const redirectPath = redirectToExample();

  return (
    <MainLayout
      pageTitle={pageTitle}
      className={"justify-items-center justify-center"}
    >
      <Loading />
      <Text>
        You should be redirecting soon. If not,{" "}
        <Link href={redirectPath}>click here</Link>.
      </Text>
    </MainLayout>
  );
};

export default Page;
