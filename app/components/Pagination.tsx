import { Link } from "@remix-run/react";

type PaginationButtonProps = {
  text: string;
  to: string;
  disabled: boolean;
};

type PaginationProps = {
  page: number;
  perPage: number;
  searchTerm: string;
  totalNumberOfPages: number;
};

const PaginationButton = ({ text, to, disabled }: PaginationButtonProps) => {
  if (disabled) return null;

  return (
    <Link
      className="border-black py-1 px-6 border-2 rounded-md shadow-md block text-2xl font-semibold space-x-2 align-middle"
      to={to}
    >
      <span className="inline-block">{text}</span>
    </Link>
  );
};

export default function Pagination({
  page,
  perPage,
  searchTerm,
  totalNumberOfPages,
}: PaginationProps) {
  const pageRouteHandler = (pagination: number, perPagination?: number) =>
    `/search?username=${searchTerm}&page=${pagination}&perPage=${perPagination}`;

  return (
    <div className="md:flex-row py-4 text-2xl space-x-2">
      <div className="flex flex-row justify-center mb-2">
        Showing pages {page} of {totalNumberOfPages}
      </div>
      <div className=" flex flex-row justify-center align-items-center gap-2">
        <PaginationButton
          text="Prev"
          disabled={page <= 1}
          to={pageRouteHandler(page - 1, perPage)}
        />
        <PaginationButton
          text="Next"
          disabled={page >= totalNumberOfPages}
          to={pageRouteHandler(page + 1, perPage)}
        />
      </div>
    </div>
  );
}
