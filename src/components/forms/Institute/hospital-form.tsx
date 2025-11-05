"use client";
import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useusersdataHook } from "@/context/user-values-updations";
import { InstituteForm } from "@/components/anmetedUI/Overlays-animated";
import { SkeletonCard } from "@/components/workFlow/workFlowSection/work-flow-list";

type props = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  imageSrc: string;
  imageAlt: string;
  stats: any[];
  variant: string;
  refetch: () => void;
};

export default function Hero({
  title,
  subtitle,

  secondaryCtaText,
  secondaryCtaHref,
  imageSrc,
  imageAlt,
  stats,
  variant,
  refetch,
}: props) {
  const isSplit = variant === "split";
  const { usersData , isLoading } = useusersdataHook();
  return (
    <section className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 overflow-hidden">
      <div className="container mx-auto px-6 py-16 lg:py-24">
        <div
          className={`flex flex-col-reverse gap-12 lg:gap-16 lg:flex-row items-center ${
            isSplit ? "lg:items-stretch" : "lg:items-center"
          }`}
        >
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <motion.h1
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-4 text-lg sm:text-xl max-w-2xl text-zinc-600 dark:text-zinc-300"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              {usersData ? (
                // <InstituteFormProvider>
                  <>
                  <InstituteForm  refetch={refetch}/>
             
                  </>
                // </InstituteFormProvider>
              ):(
                <SkeletonCard />
              )}

            </motion.div>

            {stats && stats.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4">
                {stats.map((s, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl px-4 py-2 text-sm"
                  >
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      {s.value}
                    </strong>
                    <span className="text-zinc-600 dark:text-zinc-300">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className={`w-full lg:w-1/2 ${
              isSplit ? "lg:flex lg:items-center" : ""
            }`}
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="relative mx-auto w-full max-w-3xl"
            >
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-indigo-400 via-pink-400 to-amber-300 opacity-20 blur-3xl pointer-events-none" />

              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-zinc-900">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full h-auto object-cover block"
                  />
                ) : (
                  <div className="w-full aspect-[16/10] bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                    <svg
                      width="56"
                      height="56"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 11l2 2 3-3 5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}

                <div
                  className="absolute inset-0 pointer-events-none"
                  aria-hidden
                >
                  <div className="absolute left-0 top-0 w-2/3 h-full bg-gradient-to-r from-white/0 to-white/30 dark:from-black/0 dark:to-black/20" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-8 text-sm text-zinc-500 dark:text-zinc-400">
          Built with Accessible · Powered by RedLife . Your Institution
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  ctaText: PropTypes.string,
  ctaHref: PropTypes.string,
  secondaryCtaText: PropTypes.string,
  secondaryCtaHref: PropTypes.string,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.node,
      label: PropTypes.node,
    })
  ),
  variant: PropTypes.oneOf(["split", "centered"]),
};

Hero.defaultProps = {
  subtitle: "",
  ctaText: "",
  ctaHref: "#",
  secondaryCtaText: "",
  secondaryCtaHref: "#",
  imageSrc: "",
  imageAlt: "",
  stats: [],
  variant: "split",
};
