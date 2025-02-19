import React, { useCallback, useEffect, useState } from "react";
import { BsLink, BsLink45Deg } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import { getHeroContent } from "../../services/functions";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [targetPost, setTargetPost] = useState("");

  const getHero = useCallback(async () => {
    const content = await getHeroContent();
    setTitle(content.title);
    setSubtitle(content.subtitle);
    setTargetPost(content.target_post);
    setIsLoading(false);
  });

  useEffect(() => {
    getHero();
  }, []);

  return (
    <div className="flex w-full justify-left items-center min-h-[430px] bg-gradient-to-r from-purple-500 to-blue-500 relative overflow-hidden container mx-auto md:rounded-md md:mt-[100px] mt-10 md:px-20 px-5">
      {!isLoading && (
        <motion.div
          className="flex flex-col gap-4 w-auto z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="text-4xl md:text-8xl font-bold text-white drop-shadow-lg">
            {title}
          </div>
          <div className="flex flex-col text-white text-xl md:text-3xl">
            {subtitle}
          </div>
          <a
            href={`/blog/${targetPost}`}
            className="flex justify-center items-center text-lg rounded-md border-2 border-white bg-white font-semibold text-[#6163d4] px-3 py-1 w-1/2 sm:w-1/3 transition duration-300 ease-in-out hover:bg-white hover:text-[#6163d4] hover:scale-105 gap-2"
          >
            <BsLink45Deg />
            Ver mas
          </a>
        </motion.div>
      )}
      <div className="z-10"></div>
    </div>
  );
};

export default HeroSection;
