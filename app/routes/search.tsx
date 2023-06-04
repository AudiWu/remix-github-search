import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Octokit } from "octokit";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const usernameParams = url.searchParams.get("username");

  if (!usernameParams) {
    throw json("No search term provided", { status: 400 });
  }

  const octokit = new Octokit({});

  const data = await octokit.request("GET /search/users", {
    q: usernameParams,
    per_page: 5,
  });

  return json({ result: data, status: 200 });
}

export default function Search() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <h1>{data.status}</h1>
      <div>
        {data.result.data.items.map(({ login }) => (
          <p>{login}</p>
        ))}
      </div>
    </>
  );
}
