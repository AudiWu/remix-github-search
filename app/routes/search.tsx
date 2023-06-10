import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Octokit } from "octokit";
import Pagination from "~/components/Pagination";
import SearchForm from "~/components/SearchForm";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const usernameParams = url.searchParams.get("username");
  const pageParams = url.searchParams.get("page") ?? 1;
  const perPageParams = url.searchParams.get("perPage") ?? 10;

  if (!usernameParams) {
    throw json("No search term provided", { status: 400 });
  }

  const octokit = new Octokit({});

  const data = await octokit.request("GET /search/users", {
    q: usernameParams,
    page: Number(pageParams),
    per_page: Number(perPageParams),
  });

  return json({
    result: data,
    status: 200,
    searchTerm: usernameParams,
    page: Number(pageParams),
    perPage: Number(perPageParams),
  });
}

export default function Search() {
  const data = useLoaderData<typeof loader>();
  const totalNumberOfPages = Math.ceil(data.result.data.total_count / 10);

  return (
    <div className="p-10">
      <div className="pb-10">
        <SearchForm searchTerm={data.searchTerm} />
      </div>

      <div>
        {data.result.data.items.map(({ login }) => (
          <p>{login}</p>
        ))}
      </div>

      <Pagination
        page={data.page}
        perPage={data.perPage}
        totalNumberOfPages={totalNumberOfPages}
        searchTerm={data.searchTerm}
      />
    </div>
  );
}
