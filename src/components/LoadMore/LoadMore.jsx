import { LoadMoreButton } from "./LoadMore.styled"

export const LoadMore = ({onLoadMore}) => {
  return (
    <LoadMoreButton onClick={() => onLoadMore()}>Load more</LoadMoreButton>
  )
}
