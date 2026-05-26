import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  startItem: number;
  endItem: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

const PAGE_SIZE_OPTIONS = [10, 15, 25, 50];

export const DashboardPagination = ({
  page,
  pageSize,
  totalPages,
  totalItems,
  startItem,
  endItem,
  onPageChange,
  onPageSizeChange,
}: Props) => {
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <div className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-gray-700 bg-[#1f242b] px-3 py-2 text-sm text-gray-200">
      <div className="whitespace-nowrap text-gray-300">
        Showing <span className="font-semibold text-white">{startItem}</span>-<span className="font-semibold text-white">{endItem}</span> of{" "}
        <span className="font-semibold text-white">{totalItems}</span>
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 whitespace-nowrap text-gray-300">
          Rows
          <select
            className="w-16 rounded-md border border-gray-500 bg-white px-2 py-1 text-gray-900"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.currentTarget.value))}
          >
            {PAGE_SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-600 text-gray-200 duration-300 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!canGoPrev}
            onClick={() => onPageChange(page - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <span className="min-w-16 text-center text-gray-300">
            <span className="font-semibold text-white">{page}</span> / {totalPages}
          </span>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-600 text-gray-200 duration-300 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!canGoNext}
            onClick={() => onPageChange(page + 1)}
            aria-label="Next page"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
