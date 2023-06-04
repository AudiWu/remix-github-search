import { V2_MetaFunction } from "@remix-run/node";
import SearchForm from "~/components/SearchForm";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Remix Github Search" },
    { name: "description", content: "Remix Github Search" },
  ];
};

export default function Index() {
  return (
    <div className="w-full flex flex-col justify-center items-center p-6 gap-3">
      <SearchForm />
    </div>
  );
}
