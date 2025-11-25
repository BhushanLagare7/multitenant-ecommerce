import { Categories } from "./categories";
import { SearchInput } from "./search-input";

interface SearchFiltersProps {
  categories: any;
}

export const SearchFilters = ({ categories }: SearchFiltersProps) => {
  return (
    <div className="flex flex-col gap-4 px-4 py-8 w-full border-b lg:px-12">
      <SearchInput />
      <Categories data={categories} />
    </div>
  );
};
