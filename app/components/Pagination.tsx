import { Link, useSearchParams } from "@remix-run/react";

type PaginationProps = {
  page: number;
  perPage: number;
  searchTerm: string;
  totalNumberOfPages: number;
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
    <>
      <div className="flex flex-col md:flex-row py-4 text-2xl space-x-2">
        <div className="flex flex-row flex-1">
          Showing pages {page} of {totalNumberOfPages}
        </div>
        <div className="flex flex-row space-x-2">
          {page > 1 && (
            <Link
              role={"button"}
              className="py-1 px-6 border-2 border-black rounded-md shadow-md block text-2xl font-semibold space-x-2 align-middle"
              to={pageRouteHandler(page - 1, perPage)}
            >
              <span className="inline-block">Previous</span>
            </Link>
          )}
          {page < totalNumberOfPages && (
            <Link
              role={"button"}
              className="py-1 px-6 border-2 border-black rounded-md shadow-md block text-2xl font-semibold space-x-2 align-middle"
              to={pageRouteHandler(page + 1, perPage)}
            >
              <span className="inline-block">Next</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
