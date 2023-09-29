import { Dialog } from '@headlessui/react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'
import type { ImageProps } from '../utils/types'
import SharedModal from './SharedModal'

export default function Modal({
  images,
  onClose,
}: {
  images: ImageProps[]
  onClose: () => void
}) {
  let overlayRef = useRef(null)
  const router = useRouter()

  // const { photoId } = router.query
  const searchParams = useSearchParams();
  console.log('Modal::searchParams: ', searchParams.get('photoId'))
  let index = Number(1)

  const [direction, setDirection] = useState(0)
  const [curIndex, setCurIndex] = useState(index)

  function handleClose() {
    router.push('/', {scroll: false})
    onClose()
  }

  // function changePhotoId(newVal: number) {
  //   if (newVal > index) {
  //     setDirection(1)
  //   } else {
  //     setDirection(-1)
  //   }
  //   setCurIndex(newVal)
  //   router.push(
  //     {
  //       query: { photoId: newVal },
  //     },
  //     `/p/${newVal}`
  //   )
  // }


//   useKeypress('ArrowRight', () => {
//     if (index + 1 < images.length) {
//       changePhotoId(index + 1)
//     }
//   })

//   useKeypress('ArrowLeft', () => {
//     if (index > 0) {
//       changePhotoId(index - 1)
//     }
//   })

console.log('modal::images: ', images)

  return (
    <Dialog
      static
      open={true}
      onClose={handleClose}
      initialFocus={overlayRef}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <Dialog.Overlay
        ref={overlayRef}
        as={motion.div}
        key="backdrop"
        className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <SharedModal
        index={curIndex}
        direction={direction}
        images={images}
        changePhotoId={() => {}}
        closeModal={handleClose}
        navigation={true}
      />
    </Dialog>
  )
}