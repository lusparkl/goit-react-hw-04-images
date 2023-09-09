import { GalleryItemImg, GalleryListItem } from "./GalleryItem.styled"

export const GalleryItem = ({ imageInfo, modalOpen }) => {
  return (
      <GalleryListItem onClick={() => modalOpen(imageInfo)}>
      <GalleryItemImg src={imageInfo.largeImageURL} alt={imageInfo.tags} />
    </GalleryListItem>
  )
}
