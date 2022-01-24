import type { GetServerSideProps, NextPage } from "next";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import { BannerDTO } from "../dto/banner-create.dto";
import { PageFullWidthLayout } from "../components/GlobalComponents";
import BannerEdit from "../components/BannerModal/BannerEdit";
import { useAuth } from "../hook/AuthProvider";
import "react-loading-skeleton/dist/skeleton.css";
import Head from 'next/head';

interface Props {
  BannerList: BannerDTO[];
}

const Home: NextPage<Props> = ({ BannerList }) => {
  const { user } = useAuth();
  return (
    <>
      <Head>
        <meta name="title" content="비오키친 홈"/>
        <meta name="description" content="건강한 식습관, 비오키친" />
      </Head>
      <PageFullWidthLayout>
        {user ? <BannerEdit initialItems={BannerList} /> : null}
        <Carousel
          showThumbs={false}
          swipeable={true}
          autoPlay={true}
          infiniteLoop={true}
          showStatus={false}
          showArrows={false}
        >
          {BannerList.map((item, key) => (
            <div key={key}>
              <Img src={item.downloadUrl} alt="" />
            </div>
          ))}
        </Carousel>
      </PageFullWidthLayout>
    </>
  );
};

const Img = styled.img`
  height: 69vh;
  object-fit: cover;
`;

export const getStaticProps: GetServerSideProps = async (context) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/banner");
  const BannerList: BannerDTO[] = await res.json();

  if (!BannerList) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      BannerList,
    },
  };
};

export default Home;
