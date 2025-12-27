import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Banner = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, setScrollSnaps, onSelect]);

  const slides = [
    {
      id: 1,
      image: "/events/tech_conf.png",
      title: "The Future of Tech",
      subtitle: "Join the biggest innovators in the industry.",
      cta: "Register Now",
    },
    {
      id: 2,
      image: "/events/marathon.png",
      title: "City Marathon 2024",
      subtitle: "Run for a cause. Join thousands of runners.",
      cta: "Join the Race",
    },
    {
      id: 3,
      image: "/events/food_fest.png",
      title: "Global Tastes",
      subtitle: "Experience flavors from around the world.",
      cta: "Get Tickets",
    },
  ];

  return (
    <div className="relative group overflow-hidden rounded-xl shadow-2xl mb-12">
      <div className="embla" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative min-w-full h-[250px] md:h-[500px]"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-12 text-white">
                <div className="container mx-auto">
                  <h1 className="text-[18px] md:text-5xl font-extrabold mb-2 md:mb-4 tracking-tight drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-[14px] md:text-xl text-slate-200 mb-4 md:mb-8 max-w-2xl drop-shadow-md">
                    {slide.subtitle}
                  </p>
                  <div className="flex gap-2 md:gap-4">
                    <Link to="/events">
                      <Button className="h-8 text-xs px-4 md:h-auto md:text-lg md:px-8 md:py-6">
                        {slide.cta}
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="h-8 text-xs px-4 md:h-auto md:text-lg md:px-8 md:py-6 bg-transparent text-white border-white hover:bg-white hover:text-slate-900"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
