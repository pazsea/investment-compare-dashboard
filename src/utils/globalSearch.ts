export const OPEN_GLOBAL_SEARCH_EVENT = 'investmentCompareOpenGlobalSearch'

export const openGlobalSearch = () => {
  window.dispatchEvent(new Event(OPEN_GLOBAL_SEARCH_EVENT))
}
