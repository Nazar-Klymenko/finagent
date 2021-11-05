function PaginationHelper(page, size) {
  if (!page || page == 0) {
    page = 1;
  }
  if (!size) {
    size = 4;
  }
  const skip = (page - 1) * size;
  const limit = parseInt(size);

  return { limit, skip };
}

export { PaginationHelper };
