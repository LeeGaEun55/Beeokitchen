import React from "react";
import { GetServerSideProps } from "next";
import { Params } from "next/dist/server/router";
import {
  NoticeCurrentAndAfterAndBefroeListDTO,
  NoticeDetailDTO,
} from "../../../dto/notice-create.dto";
import dynamic from "next/dynamic";
import { ViewerProps } from "@toast-ui/react-editor";
import PageMainTitle from "../../../components/PageMainTitle";
import {
  PageMaxNoCSSLayout,
  Title4,
  Title3,
} from "../../../components/GlobalComponents";
import styled from "styled-components";
import Link from "next/link";
import { useAuth } from "../../../hook/AuthProvider";
import { PageTitleDTO } from "../../../dto/page-title.dto";
import { Router, useRouter } from "next/dist/client/router";

interface Props {
  notice: NoticeDetailDTO;
  PageTitle: PageTitleDTO;
  noticeBeforeAfter: NoticeCurrentAndAfterAndBefroeListDTO;
}

const NoticeDetailPage = ({ notice, PageTitle, noticeBeforeAfter }: Props) => {
  const TuiNoSSRWrapper = dynamic<ViewerProps>(
    () => import("../../../components/ViewEditor"),
    {
      ssr: false,
      loading: () => <p>Loading . . .</p>,
    }
  );
  const TuiWrapper = React.forwardRef((props: ViewerProps, ref) => (
    <TuiNoSSRWrapper {...props} />
  ));
  TuiWrapper.displayName = "Editor";

  console.log(notice);
  const { user } = useAuth();
  const router = useRouter();
  return (
    <div>
      <PageMainTitle {...PageTitle} />
      <PageMaxNoCSSLayout style={{ textAlign: "center" }}>
        <Table>
          <Thead>
            <tr>
              <th>
                <Title3>{notice.title}</Title3>
              </th>
              <th>
                <Title3>{notice.datetime.split("/")[0]}</Title3>
              </th>
            </tr>
          </Thead>
          <Tbody>
            <tr>
              <th rowSpan={2}>
                <Title4>{<TuiWrapper initialValue={notice.content} />}</Title4>
              </th>
            </tr>
          </Tbody>
          <Tfoot>
            {noticeBeforeAfter.after != undefined ? (
              <tr>
                <th
                  onClick={() => {
                    if (noticeBeforeAfter.after != undefined) {
                      router.push(
                        "/board/notice/" + noticeBeforeAfter.after.id
                      );
                    }
                  }}
                >
                  <DropIcon type="after" />
                  <Title3>{noticeBeforeAfter.after.title}</Title3>
                </th>
                <td>
                  <Title3>
                    {noticeBeforeAfter.after.datetime.split("/")[0]}
                  </Title3>
                </td>
              </tr>
            ) : null}
            {noticeBeforeAfter.before != undefined ? (
              <tr>
                <th
                  onClick={() => {
                    if (noticeBeforeAfter.before != undefined) {
                      router.push(
                        "/board/notice/" + noticeBeforeAfter.before.id
                      );
                    }
                  }}
                >
                  <DropIcon type="before" />
                  <Title3>{noticeBeforeAfter.before.title}</Title3>
                </th>
                <td>
                  <Title3>
                    {noticeBeforeAfter.before.datetime.split("/")[0]}
                  </Title3>
                </td>
              </tr>
            ) : null}
          </Tfoot>
        </Table>
        {user ? (
          <Button
            onClick={() => router.push("/admin/modify/" + notice.id)}
            style={{ marginRight: "20px" }}
          >
            <Title3>수정하기</Title3>
          </Button>
        ) : null}
        <Button onClick={() => router.push("/board?page=notice")}>
          <Title3>목록으로</Title3>
        </Button>
      </PageMaxNoCSSLayout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: Params) => {
  const { id } = params;
  const notice: NoticeDetailDTO = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/api/notice/${id}`
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  const noticeBeforeAfter: NoticeCurrentAndAfterAndBefroeListDTO = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/api/notice/beforeAfterNoticeList`,
    {
      method: "POST",
      body: JSON.stringify({ id: id }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  const resPageTitle = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/page-title/Notice"
  );
  const PageTitle: PageTitleDTO = await resPageTitle.json();

  if (!notice && !noticeBeforeAfter) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      notice,
      PageTitle,
      noticeBeforeAfter,
    },
  };
};

const DropIcon = styled.span<{ type: string }>`
  position: absolute;
  height: 100%;
  object-fit: contain;
  background: url("/AccordionIcon.png") no-repeat center center;
  background-size: contain;
  transform: rotate(${(props) => (props.type == "after" ? "-180deg" : "0deg")});
  top: 0px;
  @media only screen and (max-width: 600px) {
    left: 10px;
    width: 15px;
  }
  @media only screen and (min-width: 600px) {
    left: 10px;
    width: 20px;
  }
  @media only screen and (min-width: 768px) {
    left: 10px;
    width: 24px;
  }
`;
const Tfoot = styled.footer`
  border-top: 2px solid #15aa5a;
  border-bottom: 2px solid #15aa5a;
  width: 100%;
  tr {
    display: flex;
    position: relative;
    justify-content: space-between;
    vertical-align: middle;
    font-weight: 600;
    @media only screen and (max-width: 600px) {
      padding: 15px 10px;
    }
    @media only screen and (min-width: 600px) {
      padding: 20px 10px;
    }
    @media only screen and (min-width: 768px) {
      padding: 20px 10px;
    }
  }
  tr:nth-child(1) {
    border-bottom: 2px solid #15aa5a;
  }
  th {
    cursor: pointer;
    @media only screen and (max-width: 600px) {
      margin-left: 25px;
    }
    @media only screen and (min-width: 600px) {
      margin-left: 35px;
    }
    @media only screen and (min-width: 768px) {
      margin-left: 40px;
    }
  }
  td {
    color: #898a8d;
  }
`;
const Table = styled.table`
  width: 100%;
  text-align: left;
  @media only screen and (max-width: 600px) {
    margin: 60px 0px 40px 0px;
  }
  @media only screen and (min-width: 600px) {
    margin: 80px 0px 60px 0px;
  }
  @media only screen and (min-width: 768px) {
    margin: 120px 0px 100px 0px;
  }
`;
const Thead = styled.thead`
  font-weight: 600;
  tr {
    display: flex;
    justify-content: space-between;
    vertical-align: middle;
    border-top: 5px solid #03502c;
    border-bottom: 5px solid #03502c;
  }
  th {
    vertical-align: middle;
    @media only screen and (max-width: 600px) {
      padding: 15px 10px;
    }
    @media only screen and (min-width: 600px) {
      padding: 20px 10px;
    }
    @media only screen and (min-width: 768px) {
      padding: 20px 10px;
    }
  }
  th:nth-child(2) {
    color: #898a8d;
  }
`;
const Tbody = styled.tbody`
  display: inline-block;
  min-height: 500px;
  table {
    border: 1px solid black;
    border-spacing: 0;
  }
  table > thead > tr,
  table > tbody > tr {
    border: 1px solid black;
  }
  table > thead > tr > th,
  table > tbody > tr > th {
    border: 1px solid black;
  }
  table > thead > tr > td,
  table > tbody > tr > td {
    border: 1px solid black;
  }
  img {
    width: 80%;
  }
  @media only screen and (max-width: 600px) {
    padding: 40px 20px;
  }
  @media only screen and (min-width: 600px) {
    padding: 50px 20px;
  }
  @media only screen and (min-width: 768px) {
    padding: 60px 20px;
  }
`;

const Button = styled.button`
  color: #404346;
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 40px;
  background-color: #f9f0ec;
  border: 2px solid #cc3d3d;
  border-radius: 20px;
  cursor: pointer;
  h3 {
    font-weight: 800;
  }
  &:hover {
    background-color: #cc3d3d;
    color: white;
    transition: background-color 0.3s;
    -webkit-transition: background-color 0.3s;
  }
`;
export default NoticeDetailPage;
