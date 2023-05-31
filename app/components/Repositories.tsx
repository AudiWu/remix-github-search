import { Octokit } from "octokit";
import { useEffect, useState } from "react";

type RepositoriesProps = {
  username: string;
};

export default function Repositories({ username }: RepositoriesProps) {
  const [repo, setRepo] = useState<any>();

  useEffect(() => {
    const octokit = new Octokit({});

    const data = async () =>
      await octokit.request("GET /users/{username}/repos", {
        username,
        per_page: 5,
      });

    setRepo(data);
  }, []);

  if (!username) {
    return null;
  }

  console.log(repo);

  return <div className=" border-black border-2 p-2">test</div>;
}
