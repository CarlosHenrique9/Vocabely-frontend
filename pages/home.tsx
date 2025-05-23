import Footer from "@/src/components/common/footer";
import HeaderAuth from "@/src/components/common/headerAuth";
import PageSpinner from "@/src/components/common/spinner";
import FavoriteCategory from "@/src/components/homeAuth/favoriteCategory";
import FeaturedCategory from "@/src/components/homeAuth/featuredCategory";
import FeaturedSection from "@/src/components/homeAuth/featuresSection";
import ListCategories from "@/src/components/homeAuth/listCategories";
import NewestCategory from "@/src/components/homeAuth/newestCategory";
import Head  from "next/head";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HomeAuth = function () {

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem("vocabely-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

if (loading) {
	return <PageSpinner />;
}

  return (
    <>
			<Head>
        <title>Vocabely - Home</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <FeaturedSection />
        <NewestCategory />
        <FavoriteCategory />
        <FeaturedCategory />
        <ListCategories />
        <Footer />
      </main>
    </>
  );
};

export default HomeAuth;
