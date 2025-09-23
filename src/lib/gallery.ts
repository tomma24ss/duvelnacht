import 'server-only'
import fs from 'fs'
import path from 'path'
import type { GalleryItem } from '@/lib/data'
import { withCdn } from '@/lib/cdn'

export const getGallery = (): GalleryItem[] => {
  const galleryDir = path.join(process.cwd(), 'public', 'media', 'gallery')
  let files: string[] = []
  try {
    files = fs.readdirSync(galleryDir)
  } catch {
    return []
  }

  const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])
  const videoExtensions = new Set(['.mp4', '.webm', '.mov'])

  const items: GalleryItem[] = files
    .filter((filename) => {
      const ext = path.extname(filename).toLowerCase()
      return imageExtensions.has(ext) || videoExtensions.has(ext)
    })
    .map((filename) => {
      const ext = path.extname(filename).toLowerCase()
      const type: 'image' | 'video' = imageExtensions.has(ext) ? 'image' : 'video'
      const base = path.basename(filename, ext)
      return {
        id: base,
        type,
        src: withCdn(`/media/gallery/${filename}`),
        thumbnail: undefined,
        alt: base,
        year: '',
      } as GalleryItem
    })

  return items
}

export const getSponsorImages = (): GalleryItem[] => {
  const sponsorsDir = path.join(process.cwd(), 'public', 'media', 'sponsors')
  let files: string[] = []
  try {
    files = fs.readdirSync(sponsorsDir)
  } catch {
    return []
  }

  const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'])

  const items: GalleryItem[] = files
    .filter((filename) => imageExtensions.has(path.extname(filename).toLowerCase()))
    .map((filename) => {
      const ext = path.extname(filename).toLowerCase()
      const base = path.basename(filename, ext)
      return {
        id: base,
        type: 'image',
        src: withCdn(`/media/sponsors/${filename}`),
        thumbnail: undefined,
        alt: base,
        year: '',
      } as GalleryItem
    })

  return items
}


