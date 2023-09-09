import { GalleryList } from './Gallery.styled'
import { GalleryItem } from './GalleryItem/GalleryItem'

export const Gallery = ({images, modalOpen}) => {
  return (
      <GalleryList>
      {images.map(image => <GalleryItem key={image.id} imageInfo={image} modalOpen={modalOpen} />)}
      </GalleryList>
  )
}

