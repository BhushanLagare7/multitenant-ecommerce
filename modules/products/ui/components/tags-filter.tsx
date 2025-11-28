import { JSX } from "react";

import { LoaderIcon } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { DEFAULT_LIMIT } from "@/constants";
import { useTRPC } from "@/trpc/client";

import { Checkbox } from "@/components/ui/checkbox";

interface TagsFilterProps {
  tags?: string[] | null;
  onTagsChange: (tags: string[]) => void;
}

/**
 * Tags filter component
 * @description A component that renders the tags filter.
 * @param {object} props - The props object
 * @param props.tags - The tags of the filter
 * @param props.onTagsChange - The callback function to be called when the tags change
 * @returns {JSX.Element} A JSX element that renders the tags filter component
 */
export const TagsFilter = ({
  tags,
  onTagsChange,
}: TagsFilterProps): JSX.Element => {
  const trpc = useTRPC();
  const {
    data: tagsData,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery(
    trpc.tags.getMany.infiniteQueryOptions(
      { limit: DEFAULT_LIMIT },
      {
        getNextPageParam: (lastPage) =>
          lastPage.docs.length > 0 ? lastPage.nextPage : undefined,
      }
    )
  );

  /**
   * Handle tags change
   *
   * @param tag - The tag to be changed
   */
  const handleTagsChange = (tag: string) => {
    if (tags?.includes(tag)) {
      onTagsChange(tags?.filter((t) => t !== tag) || []);
    } else {
      onTagsChange([...(tags || []), tag]);
    }
  };

  /**
   * Render tags filter
   *
   * @returns JSX.Element A JSX element that renders the tags filter
   */
  return (
    <div className="flex flex-col gap-y-2">
      {isLoading ? (
        <div className="flex justify-center items-center p-4">
          <LoaderIcon className="animate-spin size-4" />
        </div>
      ) : (
        tagsData?.pages
          .flatMap((page) => page.docs)
          .map((tag) => (
            <div
              key={tag.id}
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleTagsChange(tag.name)}
            >
              <p className="font-medium">{tag.name}</p>
              <Checkbox
                checked={tags?.includes(tag.name)}
                onCheckedChange={() => handleTagsChange(tag.name)}
              />
            </div>
          ))
      )}
      {hasNextPage && (
        <button
          type="button"
          className="justify-start font-medium underline cursor-pointer text-start disabled:opacity-50"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          Load more...
        </button>
      )}
    </div>
  );
};
