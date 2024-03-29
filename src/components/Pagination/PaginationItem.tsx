import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  page: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void
}

export function PaginationItem({
  page, 
  isCurrent = false,
  onPageChange
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        w="4"
        size="sm"
        fontSize="xs"
        colorScheme="pink"
        disabled
        _disabled={{
          bg: 'pink.500',
          cursor: 'default'
        }}
      >
        {page}
      </Button>
    );
  }
  return (
    <Button
      w="4"
      size="sm"
      fontSize="xs"
      bg="gray.700"
      _hover={{
        bg: 'gray.500'
      }}
      onClick={() => onPageChange(page)}
    >
      {page}
    </Button>
  );
}