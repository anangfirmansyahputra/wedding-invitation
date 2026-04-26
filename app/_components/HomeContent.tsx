"use client";

import { Ucapan, UcapanStatus } from "@/generated/prisma/browser";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import ImageWithLoading from "./ImageWithLoading";
import { createPost } from "@/app/actions";

// Welcome Animations Component
function WelcomeAnimations() {
  const welcomeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = welcomeRef.current?.querySelectorAll(".animate-on-scroll");
    if (!elements) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(
              (entry.target as HTMLElement).dataset.delay || "0",
            );
            setTimeout(() => {
              (entry.target as HTMLElement).classList.add("visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={welcomeRef}
      className="relative h-screen flex flex-col px-6 py-16"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <ImageWithLoading
          src="/assets/img/HDVWn.jpg"
          alt="Welcome"
          className="w-full h-full object-cover"
          skeletonClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 to-black/85"></div>
      </div>

      {/* TOP CONTENT */}
      <div className="relative z-10 text-center space-y-5">
        <p className="text-white/50 text-[10px] tracking-[0.35em]">
          THE WEDDING OF
        </p>

        <h2
          className="text-4xl md:text-5xl text-white tracking-tight flex items-center justify-center gap-4"
          style={{
            fontFamily: "Great Vibes, Playfair Display, serif",
          }}
        >
          <span>Anang</span>
          <span className="text-white/40 text-lg">&</span>
          <span>Divana</span>
        </h2>

        {/* DATE */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-10 bg-white/20"></div>
          <span className="text-white/70 text-xs tracking-[0.25em]">
            29.05.2026
          </span>
          <div className="h-px w-10 bg-white/20"></div>
        </div>

        {/* GREETING */}
        <p
          className="text-white/80 text-sm font-light"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Assalamu'alaikum Warahmatullahi Wabarakatuh
        </p>
      </div>

      {/* PUSH BOTTOM */}
      <div className="mt-auto"></div>

      {/* BOTTOM (AR-RUM) */}
      <div className="relative z-10 text-center max-w-sm mx-auto mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-px w-10 bg-white/20"></div>
          <span className="text-white/40 text-[9px] tracking-wider">
            Ar-Rum: 21
          </span>
          <div className="h-px w-10 bg-white/20"></div>
        </div>

        <p
          className="text-white/70 text-xs italic leading-relaxed font-light"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
          pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung
          dan merasa tenteram (sakinah) kepadanya, dan Dia menjadikan di
          antaramu rasa kasih (mawaddah) dan sayang (rahmah). Sungguh, pada yang
          demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi
          kaum yang berpikir"
        </p>
      </div>
    </div>
  );
}

const galleryImages = [
  { id: 1, src: "/assets/img/AEgWD.jpg", alt: "Anang & Diva Wedding" },
  { id: 2, src: "/assets/img/jbzIz.jpg", alt: "Anang & Diva Wedding" },
  { id: 3, src: "/assets/img/iTIcJ.jpg", alt: "Anang & Diva Wedding" },
  { id: 4, src: "/assets/img/gpYoE.jpg", alt: "Anang & Diva Wedding" },
  { id: 5, src: "/assets/img/SyHNK.jpg", alt: "Anang & Diva Wedding" },
  { id: 6, src: "/assets/img/oupaF.jpg", alt: "Anang & Diva Wedding" },
  { id: 7, src: "/assets/img/lYW2M.jpg", alt: "Anang & Diva Wedding" },
  { id: 8, src: "/assets/img/9nLEY.jpg", alt: "Anang & Diva Wedding" },
];

// Gallery Lightbox component
function GalleryLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
}: {
  images: typeof galleryImages;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        setIndex((i) => (i > 0 ? i - 1 : images.length - 1));
      if (e.key === "ArrowRight")
        setIndex((i) => (i < images.length - 1 ? i + 1 : 0));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length]);

  if (!isOpen) return null;

  const goToPrevious = () =>
    setIndex((i) => (i > 0 ? i - 1 : images.length - 1));
  const goToNext = () => setIndex((i) => (i < images.length - 1 ? i + 1 : 0));

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Image counter */}
      <div className="absolute top-4 left-4 z-10 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
        <p className="text-white/80 text-xs">
          {index + 1} / {images.length}
        </p>
      </div>

      {/* Previous button */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all group"
      >
        <svg
          className="w-6 h-6 text-white group-hover:-translate-x-0.5 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Main image */}
      <div className="w-full h-full flex items-center justify-center p-8">
        <img
          src={images[index].src}
          alt={images[index].alt}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Next button */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all group"
      >
        <svg
          className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Thumbnails */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 max-w-[90%] overflow-x-auto">
        {images.map((image, i) => (
          <button
            key={image.id}
            onClick={() => setIndex(i)}
            className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
              i === index
                ? "border-white scale-110"
                : "border-white/20 hover:border-white/50"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          height: 4px;
        }
        div::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

function InvitationContent({
  to,
  event,
  ucapan,
}: {
  to: string;
  event: "Akad" | "Resepsi" | null;
  ucapan: Ucapan[];
}) {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "Tamu Undangan";
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicBtn, setShowMusicBtn] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showWishForm, setShowWishForm] = useState(false);
  const [wishForm, setWishForm] = useState({
    name: to || "",
    status: "Hadir" as "Hadir" | "Tidak Hadir",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [wishes, setWishes] = useState(ucapan);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSubmitWish = async (formData: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await createPost(formData);

      if (result.success && result.data) {
        // Add the new wish to the local state
        const newWish = {
          id: result.data.id,
          nama: result.data.nama,
          ucapan: result.data.ucapan,
          status: result.data.status,
          createdAt: result.data.createdAt,
          updatedAt: result.data.updatedAt,
        };

        setWishes([newWish, ...wishes]);
        setSubmitStatus({
          type: "success",
          message: "Ucapan berhasil dikirim!",
        });

        // Reset form and close after delay
        setTimeout(() => {
          setWishForm({ name: to || "", status: "Hadir", message: "" });
          setShowWishForm(false);
          setSubmitStatus(null);
        }, 1500);
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Terjadi kesalahan",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Terjadi kesalahan saat mengirim ucapan",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Event details
  const eventDetails =
    event === "Akad"
      ? {
          title: "AKAD NIKAH",
          date: "Jum'at, 29 Mei 2026",
          time: "14.00 - 16.00 WITA",
          location: "The Grand Santhi Hotel",
          address: "Ballroom Lt. 2",
          countdownDate: new Date("2026-05-29T08:00:00").getTime(),
        }
      : {
          title: "Resepsi",
          date: "Jum'at, 29 Mei 2026",
          time: "17.00 - 20.30 WITA",
          location: "The Grand Santhi Hotel",
          address: "Ballroom Lt. 2",
          countdownDate: new Date("2026-05-29T15:00:00").getTime(),
        };

  // Countdown Timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = eventDetails.countdownDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [eventDetails.countdownDate]);

  useEffect(() => {
    setShowMusicBtn(true);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const openInvitation = () => {
    // Direct open without animation
    setIsOpened(true);
    toggleMusic();
    document.body.style.overflow = "auto";
  };

  if (!isOpened) {
    return (
      <>
        <audio ref={audioRef} loop preload="auto">
          <source src="/assets/music/paul.mp3" type="audio/mpeg" />
        </audio>

        <div className="fixed inset-0 bg-black flex items-center justify-center">
          <div className="relative w-full max-w-md h-screen mx-auto overflow-hidden flex flex-col items-center justify-center text-center">
            {/* Photo Background */}
            <div className="absolute inset-0">
              <ImageWithLoading
                src="/assets/img/DSC00813.jpg"
                alt="Wedding Couple"
                className="w-full h-full object-cover"
                skeletonClassName="w-full h-full"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.8) 100%)",
                }}
              ></div>
            </div>

            {/* Corner ornaments */}
            <div
              className="absolute top-8 right-8 w-12 h-12 z-10"
              style={{
                borderTop: "0.5px solid rgba(255,255,255,0.25)",
                borderRight: "0.5px solid rgba(255,255,255,0.25)",
              }}
            ></div>
            <div
              className="absolute top-8 left-8 w-12 h-12 z-10"
              style={{
                borderTop: "0.5px solid rgba(255,255,255,0.25)",
                borderLeft: "0.5px solid rgba(255,255,255,0.25)",
              }}
            ></div>

            {/* Center Content */}
            <div className="relative z-10 px-10" style={{ marginTop: "40px" }}>
              <p
                className="text-white/50 mb-6"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "10px",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  fontWeight: 300,
                }}
              >
                Wedding Invitation
              </p>
              <div
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: 300,
                  lineHeight: 1.1,
                }}
              >
                <span
                  style={{
                    fontSize: "58px",
                    display: "block",
                    letterSpacing: "-0.02em",
                    fontWeight: 600,
                    color: "white",
                  }}
                >
                  Anang
                </span>
                <span
                  style={{
                    fontSize: "32px",
                    display: "block",
                    color: "rgba(255,255,255,0.4)",
                    fontWeight: 200,
                    marginLeft: "4px",
                    marginTop: "4px",
                  }}
                >
                  &amp;
                </span>
                <span
                  style={{
                    fontSize: "58px",
                    display: "block",
                    letterSpacing: "-0.02em",
                    fontWeight: 600,
                    color: "white",
                  }}
                >
                  Divana
                </span>
              </div>
            </div>

            {/* Date divider */}
            <div className="relative z-10 flex items-center gap-4 mt-6">
              <div
                className="flex-1"
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.15)",
                }}
              ></div>
              <span
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  color: "rgba(255,255,255,0.5)",
                  whiteSpace: "nowrap",
                  lineHeight: "1.4",
                  fontWeight: 300,
                }}
              >
                29 MEI 2026
              </span>
              <div
                className="flex-1"
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.15)",
                }}
              ></div>
            </div>

            {/* Spacer */}
            <div className="flex-1"></div>

            {/* BOTTOM — Button */}
            <div className="relative z-10 pb-12 text-center">
              {/* Guest */}
              <p
                className="text-white/40 mb-2"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 300,
                }}
              >
                Kepada Yth.
              </p>

              <p
                className="text-white/60 mb-4"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: 300,
                }}
              >
                Bapak / Ibu / Saudara / I
              </p>

              <p
                className="text-white mb-6"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "16px",
                  letterSpacing: "0.08em",
                  fontWeight: 500,
                }}
              >
                {guestName}
              </p>

              {/* Button */}
              <button
                onClick={openInvitation}
                className="inline-flex items-center gap-3 transition-all duration-300 bg-white hover:bg-white/90 text-black"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "11px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  padding: "16px 32px",
                  fontWeight: 300,
                }}
              >
                <span>Buka Undangan</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/assets/music/paul.mp3" type="audio/mpeg" />
      </audio>

      <div className="min-h-screen bg-black flex justify-center">
        <div className="w-full max-w-md bg-black relative">
          {/* Music Control Button */}
          {showMusicBtn && (
            <button
              onClick={toggleMusic}
              className="fixed bottom-4 right-4 z-50 w-10 h-10 bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20"
              style={{ right: "calc(50% - 190px)" }}
            >
              {isPlaying ? (
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          )}

          {/* Guest Name Welcome Section */}
          <WelcomeAnimations />

          {/* Couple Section */}
          <section id="couple">
            {/* Groom */}
            <AnimatedSection
              id="groom"
              className="relative min-h-screen flex items-end"
            >
              <img
                src="/assets/img/pengantin-pria.jpg"
                alt="Anang Firmansyah"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>

              <div className="relative z-10 w-full px-6 pb-16">
                <p className="text-white/40 tracking-[0.35em] text-[10px] uppercase font-light mb-4">
                  The Groom
                </p>
                <h2
                  className="text-4xl font-semibold mb-4 tracking-tight text-white"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                >
                  Anang Firmansyah, S.Kom
                </h2>

                <div className="border-l border-white/20 pl-4">
                  <p className="text-white/50 text-[10px] mb-2 tracking-wider uppercase">
                    Putra pertama dari
                  </p>
                  <p className="text-sm text-white/90">
                    Bapak Sudirman (Alm) &amp; Ibu Khoriah
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Divider */}
            <AnimatedSection
              id="couple-divider"
              className="flex items-center justify-center gap-4 py-12 bg-black"
            >
              <div className="h-px w-16 bg-white/10"></div>
              <span
                className="text-white/30 text-2xl font-light"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                &amp;
              </span>
              <div className="h-px w-16 bg-white/10"></div>
            </AnimatedSection>

            {/* Bride */}
            <AnimatedSection
              id="bride"
              className="relative min-h-screen flex items-end"
            >
              <img
                src="/assets/img/pengantin-wanita.jpg"
                alt="Divana Faradila"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>

              <div className="relative z-10 w-full px-6 pb-16">
                <p className="text-white/40 tracking-[0.35em] text-[10px] uppercase font-light mb-4">
                  The Bride
                </p>
                <h2
                  className="text-4xl font-semibold mb-4 tracking-tight text-white"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                >
                  Divana Faradila, S.Kom
                </h2>

                <div className="border-l border-white/20 pl-4">
                  <p className="text-white/50 text-[10px] mb-2 tracking-wider uppercase">
                    Putri Kedua dari
                  </p>
                  <p className="text-white/90 text-sm font-light">
                    Bapak Haririk, SE &amp; Ibu Ida Rosalia
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Countdown Section */}
          <AnimatedSection
            id="countdown"
            className="relative py-20 px-6 overflow-hidden"
          >
            {/* BACKGROUND IMAGE */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop"
                alt="Wedding background"
                className="w-full h-full object-cover"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/70"></div>

              {/* GRADIENT BIAR CINEMATIC */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
            </div>

            {/* CONTENT */}
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2
                  className="text-3xl font-semibold mb-4 tracking-tight text-white"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  COUNTDOWN
                </h2>

                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-12 bg-white/10"></div>
                  <div className="w-1 h-1 bg-white/30"></div>
                  <div className="h-px w-12 bg-white/10"></div>
                </div>
              </div>

              {/* COUNTDOWN */}
              <div className="grid grid-cols-4 gap-3 mb-10 max-w-md mx-auto">
                {[
                  { value: countdown.days, label: "HARI" },
                  { value: countdown.hours, label: "JAM" },
                  { value: countdown.minutes, label: "MENIT" },
                  { value: countdown.seconds, label: "DETIK" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-black/40 backdrop-blur-sm border border-white/10 p-4 text-center hover:bg-black/50 transition-all duration-500"
                  >
                    <div
                      className="text-3xl font-light text-white mb-1"
                      style={{ fontFamily: "Cormorant Garamond, serif" }}
                    >
                      {String(item.value).padStart(2, "0")}
                    </div>

                    <p className="text-white/40 text-[10px] tracking-wider">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* DATE */}
              <div className="text-center">
                <div className="inline-block border border-white/20 px-6 py-3 bg-black/30 backdrop-blur-sm">
                  <p className="text-white/70 tracking-[0.15em] text-[10px] font-light">
                    {eventDetails.date} • {eventDetails.time}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Event Details (Only ONE event based on URL) */}
          <AnimatedSection id="event" className="relative py-20 px-6">
            <div className="absolute inset-0">
              <img
                src="/assets/img/VBjtK.jpg"
                alt="Event Venue"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/90"></div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <p className="text-white/40 tracking-[0.35em] text-[10px] mb-4 uppercase font-light">
                  Acara Pernikahan
                </p>
                <h2
                  className="text-3xl font-semibold mb-4 tracking-tight text-white"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                >
                  WAKTU &amp; TEMPAT
                </h2>
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-12 bg-white/10"></div>
                  <div className="w-1 h-1 bg-white/30"></div>
                  <div className="h-px w-12 bg-white/10"></div>
                </div>
              </div>

              <div className="bg-black/50 border border-white/10 p-8 md:p-10 hover:bg-black/60 transition-all duration-500">
                <div className="text-center">
                  {/* Ornament */}
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="w-10 h-px bg-white/20"></div>
                    <span className="text-white/30 text-xs tracking-[0.3em]">
                      EVENT
                    </span>
                    <div className="w-10 h-px bg-white/20"></div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl md:text-3xl font-semibold text-white mb-6 tracking-tight"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}
                  >
                    {eventDetails.title}
                  </h3>

                  {/* Date & Time */}
                  <div className="space-y-1 mb-8">
                    <p className="text-white/90 text-sm font-light tracking-wide">
                      {eventDetails.date}
                    </p>
                    <p className="text-white/70 text-sm font-light tracking-wide">
                      {eventDetails.time}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-12 h-px bg-white/10 mx-auto mb-6"></div>

                  {/* Location */}
                  <div>
                    <p
                      className="text-white text-lg mb-1"
                      style={{ fontFamily: "Cormorant Garamond, serif" }}
                    >
                      {eventDetails.location}
                    </p>
                    <p className="text-white/50 text-xs leading-relaxed max-w-xs mx-auto">
                      {eventDetails.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-black/60 border border-white/10 p-6 hover:bg-black/70 transition-all duration-500">
                <div className="text-center">
                  <h3 className="text-sm font-light text-white/60 mb-3 tracking-wider">
                    LOKASI
                  </h3>

                  {/* PLACE NAME */}
                  <h4
                    className="text-white text-lg mb-1"
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      letterSpacing: "0.05em",
                    }}
                  >
                    The Grand Santhi Hotel
                  </h4>

                  <p className="text-white/50 text-xs mb-4 tracking-wide">
                    Denpasar, Bali
                  </p>

                  {/* MAP */}
                  <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                    <iframe
                      src="https://www.google.com/maps?q=grand+santhi&output=embed"
                      className="w-full h-full border-0"
                      loading="lazy"
                    ></iframe>

                    {/* overlay biar nyatu sama theme */}
                    <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
                  </div>

                  {/* BUTTON */}
                  <a
                    href="https://www.google.com/maps/place/grand+santhi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-black font-light py-3 px-8 transition-all hover:bg-white/90 text-xs tracking-wider"
                  >
                    BUKA GOOGLE MAPS
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Gallery */}
          <AnimatedSection
            id="gallery"
            className="py-20 relative px-6 bg-black overflow-hidden"
          >
            {/* BACKGROUND */}
            <div className="absolute inset-0">
              <img
                src="/assets/img/1yMae.jpg"
                alt="Gallery Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/95"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
              {/* HEADER */}
              <div className="text-center mb-14">
                <p className="text-white/40 tracking-[0.35em] text-[10px] mb-4 uppercase font-light">
                  Galeri
                </p>

                <h2
                  className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight text-white"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  MOMEN KAMI
                </h2>

                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-12 bg-white/10"></div>
                  <div className="w-1 h-1 bg-white/30"></div>
                  <div className="h-px w-12 bg-white/10"></div>
                </div>

                <p className="text-white/30 text-[10px] mt-4 font-light tracking-wide">
                  Klik foto untuk memperbesar
                </p>
              </div>

              {/* GRID SIMPLE */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {galleryImages.map((image, index) => (
                  <div
                    key={image.id}
                    onClick={() => {
                      setLightboxIndex(index);
                      setLightboxOpen(true);
                    }}
                    className="relative overflow-hidden rounded-lg group cursor-pointer border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <ImageWithLoading
                      src={image.src}
                      alt={image.alt}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition duration-500"
                      skeletonClassName="w-full aspect-square"
                    />

                    {/* overlay hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition"></div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* RSVP & Wishes */}
          <AnimatedSection id="rsvp" className="relative py-20 px-6 bg-black">
            <div className="absolute inset-0 z-[-1]">
              <img
                src="/assets/img/lYW2M.jpg"
                alt="Event Venue"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/90"></div>
            </div>
            <div>
              <div className="text-center mb-10">
                <p className="text-white/40 tracking-[0.35em] text-[10px] mb-4 uppercase font-light">
                  RSVP
                </p>
                <h2
                  className="text-3xl font-semibold mb-4 tracking-tight text-white"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                >
                  UCAPAN &amp; DOA
                </h2>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-12 bg-white/10"></div>
                  <div className="w-1 h-1 bg-white/30"></div>
                  <div className="h-px w-12 bg-white/10"></div>
                </div>
                <p className="text-white/50 text-xs font-light">
                  Sampaikan ucapan hangat, doa, dan harapan untuk kedua
                  mempelai.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  onClick={() => setShowWishForm(!showWishForm)}
                  className={`flex-1 inline-flex items-center justify-center gap-3 font-light py-3 px-6 transition-all text-xs tracking-wider ${
                    showWishForm
                      ? "bg-white text-black"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span className="tracking-wider text-xs">TULIS UCAPAN</span>
                </button>
              </div>

              {/* Wish Form */}
              {showWishForm && (
                <div className="mb-8">
                  <form
                    action={handleSubmitWish}
                    className="bg-black/40 border border-white/10 p-6 space-y-4 backdrop-blur-sm"
                  >
                    {/* Status message */}
                    {submitStatus && (
                      <div
                        className={`p-3 text-center text-xs ${
                          submitStatus.type === "success"
                            ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                            : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
                        }`}
                      >
                        {submitStatus.message}
                      </div>
                    )}

                    <div>
                      <label className="block text-white/50 text-[10px] tracking-wider mb-2">
                        NAMA
                      </label>
                      <input
                        name="nama"
                        type="text"
                        value={wishForm.name}
                        onChange={(e) =>
                          setWishForm({ ...wishForm, name: e.target.value })
                        }
                        placeholder="Nama Anda"
                        disabled={isSubmitting}
                        className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/30 transition-all disabled:opacity-50"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-white/50 text-[10px] tracking-wider mb-2">
                        KONFIRMASI KEHADIRAN
                      </label>
                      <div className="flex gap-2">
                        {(["Hadir", "Tidak Hadir"] as const).map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() =>
                              !isSubmitting &&
                              setWishForm({ ...wishForm, status })
                            }
                            disabled={isSubmitting}
                            className={`flex-1 py-3 px-4 text-xs font-light tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                              wishForm.status === status
                                ? "bg-white text-black"
                                : "bg-black/50 text-white/50 border border-white/10 hover:border-white/20"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                      <input
                        type="hidden"
                        name="status"
                        value={wishForm.status}
                      />
                    </div>

                    <div>
                      <label className="block text-white/50 text-[10px] tracking-wider mb-2">
                        UCAPAN &amp; DOA
                      </label>
                      <textarea
                        name="ucapan"
                        value={wishForm.message}
                        onChange={(e) =>
                          setWishForm({ ...wishForm, message: e.target.value })
                        }
                        placeholder="Tuliskan ucapan dan doa untuk kedua mempelai..."
                        rows={4}
                        disabled={isSubmitting}
                        className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/30 transition-all resize-none disabled:opacity-50"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-black font-light py-3 px-6 transition-all hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs tracking-wider"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="w-4 h-4 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span className="tracking-wider text-xs">
                            MENGIRIM...
                          </span>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                          <span className="tracking-wider text-xs">
                            KIRIM UCAPAN
                          </span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <p className="text-white/40 text-[10px] tracking-wider">
                  {wishes.length} UCAPAN
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
                  <p className="text-white/30 text-[10px]">Live</p>
                </div>
              </div>

              {/* Custom Scrollbar Wishes List */}
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2 wishes-scroll">
                {wishes.map((wish) => (
                  <div
                    key={wish.id}
                    className="bg-black/60 border border-white/10 p-4 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/10 flex items-center justify-center border border-white/10">
                          <span className="text-white text-xs font-medium">
                            {wish.nama.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-white text-xs font-medium">
                            {wish.nama}
                          </p>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 text-[8px] tracking-wider mt-0.5 ${
                              wish.status === UcapanStatus.HADIR
                                ? "text-emerald-400/80 bg-emerald-500/10 border border-emerald-500/20"
                                : "text-rose-400/80 bg-rose-500/10 border border-rose-500/20"
                            }`}
                          >
                            {wish.status === UcapanStatus.HADIR ? (
                              <svg
                                className="w-2.5 h-2.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="w-2.5 h-2.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                            {wish.status.replaceAll("_", " ").toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white/40 text-[10px]">
                          {wish.createdAt.toDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-white/60 leading-relaxed text-xs font-light pl-10">
                      {wish.ucapan}
                    </p>
                  </div>
                ))}
              </div>

              <style jsx>{`
                .wishes-scroll::-webkit-scrollbar {
                  width: 4px;
                }
                .wishes-scroll::-webkit-scrollbar-track {
                  background: rgba(255, 255, 255, 0.05);
                  border-radius: 10px;
                }
                .wishes-scroll::-webkit-scrollbar-thumb {
                  background: rgba(255, 255, 255, 0.2);
                  border-radius: 10px;
                }
                .wishes-scroll::-webkit-scrollbar-thumb:hover {
                  background: rgba(255, 255, 255, 0.3);
                }
              `}</style>
            </div>
          </AnimatedSection>

          {/* Closing */}
          <AnimatedSection
            id="closing"
            className="py-20 px-6 bg-black text-center relative"
          >
            <div className="absolute inset-0 z-[-1]">
              <img
                src="/assets/img/VBjtK.jpg"
                alt="Event Venue"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/90"></div>
            </div>

            <div>
              <p
                className="text-white/80 text-base font-light leading-relaxed mb-6"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Merupakan suatu kebahagiaan bagi kami apabila
                Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu
                kepada kami.
              </p>
              <p className="text-white/50 text-xs mb-8 font-light">
                Wassalamualaikum Warahmatullahi Wabarakatuh
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-10 bg-white/10"></div>
                <span
                  className="text-white/30 text-2xl font-light"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  &amp;
                </span>
                <div className="h-px w-10 bg-white/10"></div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection
            id="footer"
            className="relative py-20 px-6 text-center overflow-hidden"
          >
            {/* BACKGROUND IMAGE */}
            <div className="absolute inset-0">
              <img
                src={"/assets/img/DSC00986.jpg"}
                alt="Wedding Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/95"></div>
            </div>

            <div className="relative z-10 max-w-xl mx-auto">
              {/* NAMES */}
              <p
                className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Anang <span className="text-white/40">&</span> Divana
              </p>

              {/* DATE */}
              <p className="text-white/50 text-[11px] tracking-[0.3em] mb-8">
                29 MEI 2026
              </p>

              {/* DIVIDER */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-px w-12 bg-white/10"></div>
                <div className="w-1 h-1 bg-white/30"></div>
                <div className="h-px w-12 bg-white/10"></div>
              </div>

              {/* QUOTE / CLOSING */}
              <p
                className="text-white/60 text-xs leading-relaxed font-light max-w-sm mx-auto mb-10"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan
                pasangan untukmu agar kamu menemukan ketenangan di dalamnya."
              </p>

              {/* SMALL TEXT */}
              <p className="text-white/30 text-[10px] tracking-wide">
                Terima kasih atas doa dan kehadiran Anda
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Gallery Lightbox */}
      <GalleryLightbox
        images={galleryImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}

function HomeWrapper({ ucapan }: { ucapan: Ucapan[] }) {
  const searchParams = useSearchParams();
  const to = searchParams.get("to") || "Tamu Undangan";
  const event = searchParams.get("event") as "Akad" | "Resepsi" | null;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black text-white/50">
          Loading...
        </div>
      }
    >
      <InvitationContent to={to} event={event} ucapan={ucapan} />
    </Suspense>
  );
}

export default function HomeContent({ ucapan }: { ucapan: Ucapan[] }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black text-white/50">
          Loading...
        </div>
      }
    >
      <HomeWrapper ucapan={ucapan} />
    </Suspense>
  );
}
