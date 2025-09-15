import Image from 'next/image';
import React from 'react';

// Main Component - now styled as a modal
export default function App() {
  const tags = ["2024", "18+", "Show", "Comedies", "Fantasy", "Mysteries"];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap');
          
          .font-wednesday {
            font-family: 'Cinzel Decorative', serif;
          }

          /* This pseudo-element creates the gradient fade at the bottom of the top image */
          .image-fade::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50%;
            z-index: 1;
            background: linear-gradient(to top, rgba(17, 24, 39, 1) 10%, rgba(17, 24, 39, 0));
          }
        `}
      </style>

      {/* Main container that provides the dark, blurred backdrop */}
      <div className="relative w-full min-h-screen bg-gray-900 overflow-hidden flex items-center justify-center p-4">
        {/* Background Image (simulating a blurred background) */}
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-sm scale-105"
          style={{ backgroundImage: "url('https://i.imgur.com/g0j42Iu.jpeg')" }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>


        {/* Modal Card */}
        <div className="relative z-10 w-full max-w-2xl bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
          
          {/* Top Image Section */}
        <div className="relative image-fade">
            <Image
                height={378}
                width={672}
                src="https://i.imgur.com/g0j42Iu.jpeg" 
                alt="Jenna Ortega as Wednesday Addams" 
                className="w-full h-auto object-cover"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => e.currentTarget.src='https://placehold.co/672x378/111827/ffffff?text=Image+Not+Found'}
            />
            {/* Close Button */}
            <button className="absolute top-4 right-4 z-20 text-white hover:text-gray-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

          {/* Content Section */}
          <div className="p-8">
            <h1 className="font-wednesday text-5xl md:text-6xl text-white text-center mb-4 tracking-wider">
              WEDNESDAY
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              {tags.map(tag => (
                <span key={tag} className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-sm">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-center text-gray-300 max-w-md mx-auto mb-6 leading-relaxed">
              Smart, sarcastic and a little dead inside, Wednesday Addams investigates twisted mysteries while making new friends — and foes — at Nevermore Academy.
            </p>

            {/* Action Button */}
            <div className="flex justify-center">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md flex items-center gap-2 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span>Get Started</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

