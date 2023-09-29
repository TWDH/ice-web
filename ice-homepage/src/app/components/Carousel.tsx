import Image from 'next/image'
import { useRouter } from 'next/navigation'
// import useKeypress from 'react-use-keypress'
import type { ImageProps } from '../utils/types'
import { useLastViewedPhoto } from '../utils/useLastViewedPhoto'
import SharedModal from './SharedModal'
import { allImages } from '../paintings/page'

export default function Carousel({
  index,
  currentPhoto,
}: {
  index: number
  currentPhoto: ImageProps
}) {
  const router = useRouter()
  const [, setLastViewedPhoto] = useLastViewedPhoto()

  function closeModal() {
    setLastViewedPhoto(currentPhoto.id as any)
    router.push('/paintings', {scroll: false})
  }

  function changePhotoId(newVal: number) {
    return newVal
  }

  // useKeypress('Escape', () => {
  //   closeModal()
  // })

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <button
        className="absolute inset-0 z-30 cursor-default bg-black backdrop-blur-2xl"
        onClick={closeModal}
      >
        <Image
          src={'/blur.jpg'}
          className="pointer-events-none h-full w-full"
          alt="blurred background"
          fill
          priority={true}
        />
      </button>
      <SharedModal
        index={index}
        images = {allImages}
        changePhotoId={changePhotoId}
        currentPhoto={currentPhoto}
        closeModal={closeModal}
        navigation={false}
      />
    </div>
  )
}