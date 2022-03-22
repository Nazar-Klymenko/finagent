function pagination(page: string, size: string) {
  let _page = parseInt(page);
  let _size = parseInt(size);

  if (!_page || _page == 0) {
    _page = 1;
  }
  if (!_size) {
    _size = 4;
  }
  const skip = (_page - 1) * _size;
  const limit = _size;

  return { limit, skip };
}

export { pagination };
