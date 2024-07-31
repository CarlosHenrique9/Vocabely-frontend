import HeaderAuth from "@/src/components/common/headerAuth";
import FeaturedSection from "@/src/components/homeAuth/featuresSection";
import NewestCategory from "@/src/components/homeAuth/newestCategory/index.";
import Head  from "next/head";
import router from "next/router";
import { useEffect } from "react";

const HomeAuth = function () {
  useEffect(() => {
    if (sessionStorage.getItem("onebitflix-token")) {
      router.push("/home");
    }
  }, []);
  return (
    <>
			<Head>
        <title>Vocabely - Home</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <FeaturedSection />
        <NewestCategory />
      </main>
    </>
  );
};

export default HomeAuth;
