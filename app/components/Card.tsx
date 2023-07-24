import { Link } from "@remix-run/react";

type CardProps = {
  avatar_url: string;
  login: string;
  html_url: string;
  repos_url: string;
};

export const Card = ({ avatar_url, login, html_url, repos_url }: CardProps) => {
  return (
    <div className="border-black border-solid border-2 rounded p-2 flex flex-row gap-2">
      <img className="w-12 h-12" src={avatar_url} alt="avatar_url" />
      <div>
        <p>{login}</p>
        <Link to={html_url}>Html URL</Link>
        <Link to={repos_url}>Repos URL</Link>
      </div>
    </div>
  );
};
