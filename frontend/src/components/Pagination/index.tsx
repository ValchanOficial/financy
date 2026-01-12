import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

function generatePaginationRange(currentPage: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  let start: number
  if (currentPage === 1) {
    start = 1
  } else if (currentPage >= totalPages) {
    start = totalPages - 1
  } else {
    start = currentPage - 1
  }

  const visiblePages = [start, start + 1]

  // Add ellipsis on the side with more hidden pages
  const hiddenLeft = start - 1
  const hiddenRight = totalPages - (start + 1)

  if (hiddenLeft <= 0 && hiddenRight <= 0) {
    return visiblePages
  }

  if (hiddenLeft <= hiddenRight) {
    // More pages hidden on right, ellipsis goes right
    return [...visiblePages, "ellipsis", totalPages]
  } else {
    // More pages hidden on left, ellipsis goes left
    return [1, "ellipsis", ...visiblePages]
  }
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const paginationRange = generatePaginationRange(currentPage, totalPages)

  const goToPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const goToNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

//   if (totalPages <= 1) {
//     return null
//   }

  return (
    <nav role="navigation" aria-label="Pagination" className={`flex items-center justify-center gap-1 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        onClick={goToPrevious}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className="text-gray-600"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {paginationRange.map((page, index) => {
        if (page === "ellipsis") {
          return (
            <span key={`ellipsis-${index}`} className="flex h-9 w-9 items-center justify-center" aria-hidden="true">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </span>
          )
        }

        return (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(page)}
            aria-label={`Go to page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
            className={`text-gray-600 ${currentPage === page ? 'bg-brand-base text-white' : ''}`}
          >
            {page}
          </Button>
        )
      })}

      <Button
        variant="outline"
        size="icon"
        className="text-gray-600"
        onClick={goToNext}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}
