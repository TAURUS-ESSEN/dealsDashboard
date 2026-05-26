import { useEffect, useMemo, useState } from "react";

type UsePaginationArgs = {
  totalItems: number;
  initialPageSize?: number;
};

export const usePagination = ({ totalItems, initialPageSize = 15 }: UsePaginationArgs) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, totalPages));
  }, [totalPages]);

  const pagination = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const startItem = totalItems === 0 ? 0 : startIndex + 1;
    const endItem = Math.min(endIndex, totalItems);

    return {
      page,
      pageSize,
      totalPages,
      startIndex,
      endIndex,
      startItem,
      endItem,
      setPage,
      setPageSize,
    };
  }, [page, pageSize, totalItems, totalPages]);

  return pagination;
};
