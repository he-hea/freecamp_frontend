import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const FETCH_BOARD = gql`
  query fetchBoard($number: Int) {
    fetchBoard(number: $number) {
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutedPage() {
  const router = useRouter();
  console.log(router);

  const { data } = useQuery(FETCH_BOARD, {
    variables: { number: Number(router.query.number) },
  });

  console.log(data);

  const onClickMoveToEdit = () => {
    router.push(`/09-01-board/${router.query.number}/edit`);
  };

  return (
    <>
      <div>1번 게시글로 이동이 완료되었습니다.</div>
      <div>작성자: {data ? data.fetchBoard.writer : "로딩중입니다.."}</div>
      <div>제목: {data && data.fetchBoard.title}</div>
      <div>내용: {data?.fetchBoard.contents}</div>
      <button onClick={onClickMoveToEdit}>수정하러 이동하기</button>
    </>
  );
}
