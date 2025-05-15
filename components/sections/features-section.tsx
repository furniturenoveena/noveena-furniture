"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  AnimatePresence,
  useScroll,
} from "framer-motion";
import { Truck, Award, ShieldCheck, ChevronRight, Star } from "lucide-react";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  index,
  isHovered,
  onHover,
  scrollYProgress,
}: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.2 + index * 0.1, 0.4 + index * 0.1],
    [0, 0, 1]
  );

  const scrollY = useTransform(
    scrollYProgress,
    [0, 0.2 + index * 0.1, 0.4 + index * 0.1],
    [40, 20, 0]
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.15,
      },
    },
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const starPositions = [
    { top: "-10px", right: "10px", delay: 0 },
    { top: "40%", right: "-15px", delay: 0.3 },
    { bottom: "-5px", left: "30%", delay: 0.6 },
  ];

  return (
    <motion.div
      ref={ref}
      className={`relative p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 
                ${
                  isHovered === index
                    ? "bg-primary/15 shadow-lg shadow-primary/20"
                    : "bg-primary/5 hover:bg-primary/10"
                }`}
      style={{
        opacity: scrollOpacity,
        y: scrollY,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)",
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <motion.div
        className="absolute inset-0 border border-primary/20 rounded-2xl overflow-hidden"
        style={{
          borderWidth: useTransform(
            scrollYProgress,
            [0.2 + index * 0.05, 0.3 + index * 0.05],
            [0, 1]
          ),
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0"
          style={{
            left: useTransform(
              scrollYProgress,
              [0.3 + index * 0.05, 0.5 + index * 0.05, 0.7 + index * 0.05],
              ["-100%", "100%", "200%"]
            ),
            opacity: useTransform(
              scrollYProgress,
              [0.3 + index * 0.05, 0.5 + index * 0.05],
              [0, 0.5]
            ),
          }}
        />
      </motion.div>

      {starPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            ...pos,
            opacity: useTransform(
              scrollYProgress,
              [0.3 + index * 0.05 + i * 0.03, 0.4 + index * 0.05 + i * 0.03],
              [0, isHovered === index ? 1 : 0.4]
            ),
            scale: useTransform(
              scrollYProgress,
              [0.3 + index * 0.05 + i * 0.03, 0.4 + index * 0.05 + i * 0.03],
              [0, isHovered === index ? 1 : 0.8]
            ),
            rotate: useTransform(
              scrollYProgress,
              [0.3 + index * 0.05 + i * 0.03, 0.5 + index * 0.05 + i * 0.03],
              [0, i % 2 === 0 ? 45 : -45]
            ),
          }}
        >
          <Star className="h-3 w-3 text-primary/70 fill-primary/30" />

          <motion.div
            className="absolute inset-0 bg-primary/10 rounded-full blur-md"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 2 + i,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>
      ))}

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          className={`p-5 rounded-full mb-6 relative ${
            isHovered === index ? "bg-primary/30" : "bg-primary/10"
          }`}
          variants={iconVariants}
          whileHover="hover"
          style={{
            boxShadow: useTransform(
              scrollYProgress,
              [0.25 + index * 0.05, 0.35 + index * 0.05],
              ["0 0 0 rgba(0,0,0,0)", "0 10px 25px rgba(0,0,0,0.1)"]
            ),
            transform: useTransform(
              scrollYProgress,
              [0.25 + index * 0.05, 0.4 + index * 0.05],
              ["translateY(20px) scale(0.8)", "translateY(0px) scale(1)"]
            ),
            rotateY: useTransform(
              scrollYProgress,
              [0.25 + index * 0.05, 0.4 + index * 0.05],
              [45, 0]
            ),
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/40 z-10"
            animate={{
              scale: isHovered === index ? [1, 1.2, 1] : 1,
              opacity: isHovered === index ? [1, 0, 1] : 1,
            }}
            transition={{
              duration: 1.5,
              repeat: isHovered === index ? Infinity : 0,
              repeatDelay: 0.5,
            }}
          />

          <AnimatePresence>
            {isHovered === index && (
              <motion.div
                className="absolute inset-0 bg-primary rounded-full z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>

          <motion.div
            className="relative z-30"
            animate={{
              scale: isHovered === index ? 1.2 : 1,
              rotate: isHovered === index ? [0, -5, 5, 0] : 0,
            }}
            style={{
              rotate: useTransform(
                scrollYProgress,
                [0, 0.3 + index * 0.1, 0.6 + index * 0.1, 0.9],
                [0, -15, 15, 0]
              ),
            }}
            transition={{
              scale: { duration: 0.3 },
              rotate: { duration: 0.5 },
            }}
          >
            <Icon
              className={`h-10 w-10 ${
                isHovered === index
                  ? "text-white stroke-[2]"
                  : "text-primary stroke-[1.5]"
              }`}
            />
          </motion.div>
        </motion.div>

        <motion.h3
          className="text-2xl font-semibold mb-3 font-cormorant tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-muted-foreground leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
        >
          {description}
        </motion.p>

        <AnimatePresence>
          {isHovered === index && (
            <motion.div
              className="mt-4 mb-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="text-sm text-left space-y-2">
                {index === 0 ? (
                  <>
                    <li className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>Careful handling of all furniture</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>Room and placement planning</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>Packaging disposal service</span>
                    </li>
                  </>
                ) : index === 1 ? (
                  <>
                    <li className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>Hand-selected by interior designers</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>Exclusive designer collections</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>Limited edition pieces available</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>2-year comprehensive warranty</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>Free maintenance checks</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>30-day satisfaction guarantee</span>
                    </li>
                  </>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="mt-6 flex items-center text-primary font-medium text-sm cursor-pointer group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.2 + 0.7, duration: 0.5 }}
        >
          <span>Learn more</span>
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ChevronRight className="h-4 w-4 ml-1 group-hover:text-primary/80" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function FeaturesSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scrollOpacityBg = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8],
    [0, 1, 1]
  );
  const scrollScaleBg = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8],
    [0.8, 1, 1.05]
  );

  const y = useMotionValue(0);
  const x = useMotionValue(0);

  const handleMouseMove = (e: any) => {
    const rect = sectionRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) / (rect.width / 2);
    const distanceY = (e.clientY - centerY) / (rect.height / 2);

    x.set(distanceX * -20);
    y.set(distanceY * -20);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollPercentage = 1 - rect.top / window.innerHeight;

        if (scrollPercentage > 0 && scrollPercentage < 1.5) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const features = [
    {
      icon: Truck,
      title: "White Glove Delivery",
      description:
        "Complimentary premium delivery service for all furniture within Colombo and suburbs, with expert placement and setup by our trained specialists.",
    },
    {
      icon: Award,
      title: "Curated Excellence",
      description:
        "Each piece in our collection is personally selected for exceptional quality, craftsmanship, and timeless design that elevates your living spaces.",
    },
    {
      icon: ShieldCheck,
      title: "Quality Assurance",
      description:
        "Every furniture piece comes with our 2-year quality guarantee, ensuring lasting beauty and durability for years to come.",
    },
  ];

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const lineVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const decorations = [
    { top: "10%", left: "5%", size: "150px", delay: 0.3, rotate: 15 },
    { top: "70%", left: "2%", size: "100px", delay: 0.5, rotate: -20 },
    { top: "20%", right: "3%", size: "120px", delay: 0.2, rotate: -10 },
    { bottom: "10%", right: "5%", size: "180px", delay: 0.6, rotate: 25 },
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
      style={{
        opacity: scrollOpacityBg,
        scale: scrollScaleBg,
      }}
    >
      {decorations.map((dec, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/10 backdrop-blur-xl"
          style={{
            ...dec,
            width: dec.size,
            height: dec.size,
            transform: `rotate(${dec.rotate}deg)`,
            x: x,
            y: y,
            opacity: useTransform(
              scrollYProgress,
              [0, 0.2 + i * 0.05, 0.7],
              [0, 0.2, 0.3]
            ),
            scale: useTransform(
              scrollYProgress,
              [0, 0.3 + i * 0.1, 0.6],
              [0.6, 1, 1.1]
            ),
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.p
            className="text-primary font-medium tracking-wider uppercase text-sm mb-3"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 0, 1]),
              y: useTransform(scrollYProgress, [0, 0.1, 0.2], [20, 10, 0]),
            }}
          >
            Why Choose Us
          </motion.p>

          <motion.h2
            className="text-3xl md:text-4xl font-bold font-italiana mb-5 text-foreground"
            style={{
              opacity: useTransform(
                scrollYProgress,
                [0, 0.15, 0.25],
                [0, 0, 1]
              ),
              y: useTransform(scrollYProgress, [0, 0.15, 0.25], [30, 15, 0]),
            }}
          >
            The Luxurian Experience
          </motion.h2>

          <div className="flex justify-center">
            <div className="relative h-0.5 w-24 bg-gray-200/30 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-primary/70"
                style={{
                  width: useTransform(
                    scrollYProgress,
                    [0, 0.2, 0.3],
                    ["0%", "0%", "100%"]
                  ),
                }}
              />
            </div>
          </div>

          <motion.p
            className="max-w-2xl mx-auto text-foreground/80 mt-6"
            style={{
              opacity: useTransform(
                scrollYProgress,
                [0, 0.25, 0.35],
                [0, 0, 1]
              ),
              y: useTransform(scrollYProgress, [0, 0.25, 0.35], [20, 10, 0]),
            }}
          >
            We believe exceptional furniture transcends mere function to become
            an expression of personal style and aspiration. Our commitment to
            excellence touches every aspect of your experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
                isHovered={hoveredCard}
                onHover={setHoveredCard}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"
        style={{
          opacity: useTransform(scrollYProgress, [0.6, 0.8], [0, 1]),
        }}
      />
    </motion.section>
  );
}
