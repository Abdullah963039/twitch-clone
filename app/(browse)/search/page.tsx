import { Suspense } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { Results, ResultsSkeleton } from "./_component/results";

interface SearchPageProps {
  searchParams: {
    term?: string;
  };
}

export function generateMetadata({ searchParams }: SearchPageProps): Metadata {
  if (!searchParams.term) return { title: "" };

  return { title: `Search results of ${searchParams.term}` };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  if (!searchParams.term) {
    redirect("/");
  }

  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={searchParams.term} />
      </Suspense>
    </div>
  );
};

export default SearchPage;
