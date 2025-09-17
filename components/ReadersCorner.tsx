import React from 'react';
import { GalleryImage1, GalleryImage2, GalleryImage3, GalleryImage4, GalleryImage5, GalleryImage6 } from './illustrations/GalleryIllustrations';

const galleryItems = [
  { component: GalleryImage1, alt: 'A character reading in a cozy armchair by a window.', caption: 'Cozy Afternoons' },
  { component: GalleryImage2, alt: 'A character reading under a tree in a park.', caption: 'Park Escapes' },
  { component: GalleryImage3, alt: 'A character enjoying a book in a bustling cafe.', caption: 'Cafe Contemplation' },
  { component: GalleryImage4, alt: 'A character reading on a balcony overlooking a city at night.', caption: 'Nightly Chapters' },
  { component: GalleryImage5, alt: 'A character reading in a library surrounded by books.', caption: 'Library Whispers' },
  { component: GalleryImage6, alt: 'Two friends reading together on a picnic blanket.', caption: 'Shared Stories' },
];

const ReadersCorner: React.FC = () => {
  return (
    <section id="gallery" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
            Our Readers' Corner
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Moments of peace, discovery, and connection captured from our community. Find your quiet corner.
          </p>
        </div>
        <div className="masonry-gallery">
          {galleryItems.map((item, index) => (
            <div key={index} className="gallery-item group">
                <div className="overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1">
                    <item.component className="w-full h-auto block" aria-label={item.alt} />
                </div>
                <p className="mt-2 text-center text-slate-600 dark:text-slate-400 font-medium">{item.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReadersCorner;