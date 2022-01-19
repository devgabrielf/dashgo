import { Box, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void
}

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter(page => page > 0)
}

const siblingsCount = 1;

export function Pagination({
  totalCountRegisters,
  registersPerPage = 5,
  currentPage = 1,
  onPageChange
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountRegisters / registersPerPage);

  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : []

  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []

  return (
    <Stack
      direction={["column", "row"]}
      spacing="6"
      mt="8"
      align="center"
      justify="space-between"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">

        {currentPage > (1 + siblingsCount) &&
          <>
            <PaginationItem onPageChange={onPageChange} page={1} />
            {currentPage > (2 + siblingsCount) &&
              <Text
                color="gray.300"
                w="4"
                textAlign="center"
                userSelect="none"
              >
                ...
              </Text>
            }
          </>
        }

        {previousPages.length > 0 && previousPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} page={page} />
        })}

        <PaginationItem onPageChange={onPageChange} page={currentPage} isCurrent />

        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} page={page} />
        })}

        {currentPage < (lastPage - siblingsCount) &&
          <>
            {currentPage < (lastPage - siblingsCount - 1) &&
              <Text
                color="gray.300"
                w="4"
                textAlign="center"
                userSelect="none"
              >
                ...
              </Text>
            }
            <PaginationItem onPageChange={onPageChange} page={lastPage} />
          </>
        }

      </Stack>
    </Stack>
  );
}