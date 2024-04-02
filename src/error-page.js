import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>이런!</h1>
      <p>죄송하지만, 기대치 않은 오류가 발생했어요.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}