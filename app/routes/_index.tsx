import { ActionArgs, LoaderArgs, V2_MetaFunction, json } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { Octokit } from "octokit";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Remix Github Search" },
    { name: "description", content: "Remix Github Search" },
  ];
};

export async function action({ request }: ActionArgs) {
  const form = await request.formData();
  const search = form.get("search");

  const errors = {
    search: search ? null : "search is required",
  };

  const octokit = new Octokit({});

  const data = await octokit.request("GET /search/users", {
    q: search as string,
    per_page: 5,
  });

  return json(data);
}

export default function Index() {
  const data = useActionData<typeof action>();

  return (
    <div className="w-full flex flex-col justify-center items-center p-6 gap-3">
      <h1 className="text-xl">Remix Github Search</h1>
      <Form method="post">
        <input
          className="w-20 border-2 border-black rounded-md p-1"
          type="text"
          name="search"
        />
        <button
          className="w-20 border-2 border-black rounded-md p-1"
          type="submit"
        >
          Search
        </button>
      </Form>
      {data
        ? data.data.items.map((item) => <p key={item.id}>{item.login}</p>)
        : "data is empty"}
    </div>
  );
}
