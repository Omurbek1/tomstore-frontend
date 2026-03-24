import React from "react";
import { Testimonial } from "@/types/testimonial";
import Image from "next/image";

const SingleItem = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="m-1 h-full rounded-[26px] border border-white/80 bg-[linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)] px-5 py-6 shadow-[0_24px_52px_-36px_rgba(15,23,42,0.34)]">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1">
        <Image
          src="/images/icons/icon-star.svg"
          alt="star icon"
          width={15}
          height={15}
        />
        <Image
          src="/images/icons/icon-star.svg"
          alt="star icon"
          width={15}
          height={15}
        />
        <Image
          src="/images/icons/icon-star.svg"
          alt="star icon"
          width={15}
          height={15}
        />
        <Image
          src="/images/icons/icon-star.svg"
          alt="star icon"
          width={15}
          height={15}
        />
        <Image
          src="/images/icons/icon-star.svg"
          alt="star icon"
          width={15}
          height={15}
        />
        </div>

        <span className="text-4xl font-semibold leading-none text-blue/20">”</span>
      </div>

      <p className="mb-6 text-dark">{testimonial.review}</p>

      <a href="#" className="flex items-center gap-4">
        <div className="h-12.5 w-12.5 overflow-hidden rounded-full ring-4 ring-white">
          <Image
            src={testimonial.authorImg}
            alt="author"
            className="w-12.5 h-12.5 rounded-full overflow-hidden"
            width={50}
            height={50}
          />
        </div>

        <div>
          <h3 className="font-medium text-dark">{testimonial.authorName}</h3>
          <p className="text-custom-sm">{testimonial.authorRole}</p>
        </div>
      </a>
    </div>
  );
};

export default SingleItem;
