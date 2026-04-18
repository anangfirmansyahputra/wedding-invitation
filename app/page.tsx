"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

// Guest Wishes Data (simulated)
const guestWishes = [
  {
    id: 1,
    name: "Risyam",
    status: "Tidak Hadir",
    message:
      "happy wedding maymayy, masyaallah alhamdulillah sampai di titik ini yaa, ending yg bahagia. Selamat memulai hubungan rumah tangga mayy, insyaallah sakinah mawaddah wa rahmah. Aamiin",
    date: "9 February 2026",
    time: "06.24",
  },
  {
    id: 2,
    name: "Menaka Neok",
    status: "Tidak Hadir",
    message:
      "Selamat ya niko dan istri atas pernikahannya, Maaf belum bisa hadir, tapi doa selalu menyertai. Semoga jadi pasangan yang bahagia dan saling menguatkan sampai tua nanti. rahayu",
    date: "7 February 2026",
    time: "18.30",
  },
  {
    id: 3,
    name: "Adel",
    status: "Hadir",
    message:
      "masyaAllah amay sayaang lancar sampai hari h dan semoga menjadi keluarga yang samawa",
    date: "7 February 2026",
    time: "09.47",
  },
  {
    id: 4,
    name: "Dewi",
    status: "Hadir",
    message:
      'Congratsss ameee, lancar"pokoknya sampe jadi keluarga sakinah mawaddah warahmah till jannah yaaa',
    date: "3 February 2026",
    time: "20.12",
  },
];

const galleryImages = [
  { id: 1, src: "/assets/img/AEgWD.jpg", alt: "Anang & Diva Wedding" },
  { id: 2, src: "/assets/img/jbzIz.jpg", alt: "Anang & Diva Wedding" },
  { id: 3, src: "/assets/img/iTIcJ.jpg", alt: "Anang & Diva Wedding" },
  { id: 4, src: "/assets/img/gpYoE.jpg", alt: "Anang & Diva Wedding" },
  { id: 5, src: "/assets/img/SyHNK.jpg", alt: "Anang & Diva Wedding" },
  { id: 6, src: "/assets/img/oupaF.jpg", alt: "Anang & Diva Wedding" },
  { id: 7, src: "/assets/img/1yMae.jpg", alt: "Anang & Diva Wedding" },
  { id: 8, src: "/assets/img/lYW2M.jpg", alt: "Anang & Diva Wedding" },
  { id: 9, src: "/assets/img/9nLEY.jpg", alt: "Anang & Diva Wedding" },
];

// Animated section component
function AnimatedSection({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function InvitationContent({
  to,
  event,
}: {
  to: string;
  event: "akad" | "resepsi" | null;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicBtn, setShowMusicBtn] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [wishes, setWishes] = useState(guestWishes);
  const [showWishForm, setShowWishForm] = useState(false);
  const [wishForm, setWishForm] = useState({
    name: to || "",
    status: "Hadir" as "Hadir" | "Tidak Hadir",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newWish = {
        id: wishes.length + 1,
        name: wishForm.name || "Anonim",
        status: wishForm.status,
        message: wishForm.message,
        date: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        time: new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      };

      setWishes([newWish, ...wishes]);
      setWishForm({ name: to || "", status: "Hadir", message: "" });
      setShowWishForm(false);
      setIsSubmitting(false);
    }, 1000);
  };

  // Event details
  const eventDetails =
    event === "akad"
      ? {
          title: "AKAD NIKAH",
          date: "Sabtu, 29 Mei 2026",
          time: "08.00 - 10.00 WIB",
          location: "Masjid Agung Al-Hikmah",
          address: "Jl. Keberkahan No. 99",
          countdownDate: new Date("2026-05-29T08:00:00").getTime(),
        }
      : {
          title: "RESEPSI",
          date: "Sabtu, 29 Mei 2026",
          time: "15.00 WIB - Selesai",
          location: "Grand Santi Hotel",
          address: "Ballroom Lt. 3",
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
    // Play audio langsung di gesture context

    setIsOpening(true);
    setTimeout(() => {
      setIsOpened(true);
      document.body.style.overflow = "auto";

      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 1800);
  };

  if (!isOpened) {
    return (
      <>
        <audio ref={audioRef} loop preload="auto">
          <source src="/assets/music/entrance.mp3" type="audio/mpeg" />
        </audio>

        <style jsx global>{`
          @keyframes coverZoomOut {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(1.15);
              opacity: 0;
            }
          }
          @keyframes coverTextUp {
            0% {
              transform: translateY(0);
              opacity: 1;
            }
            100% {
              transform: translateY(-40px);
              opacity: 0;
            }
          }
          @keyframes coverBtnDown {
            0% {
              transform: translateY(0);
              opacity: 1;
            }
            100% {
              transform: translateY(30px);
              opacity: 0;
            }
          }
          @keyframes whiteFlash {
            0% {
              opacity: 0;
            }
            60% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
          @keyframes curtainLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          @keyframes curtainRight {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>

        <div className="fixed inset-0 bg-black flex items-center justify-center">
          <div
            className="relative w-full max-w-md h-screen mx-auto overflow-hidden"
            style={
              isOpening
                ? {
                    animation:
                      "coverZoomOut 1.2s cubic-bezier(0.4,0,0.2,1) 0.3s forwards",
                  }
                : {}
            }
          >
            {/* Photo Background */}
            <div className="absolute inset-0">
              <img
                src="/assets/undangan.jpg"
                alt="Wedding Couple"
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(20%)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.75) 100%)",
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

            {/* TOP — Names */}
            <div
              className="relative z-10 px-10 pt-12"
              style={
                isOpening
                  ? {
                      animation:
                        "coverTextUp 0.8s cubic-bezier(0.4,0,0.2,1) 0s forwards",
                    }
                  : {}
              }
            >
              <p
                className="text-white/40 mb-5"
                style={{
                  fontFamily: "Tenor Sans, sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                }}
              >
                Undangan Pernikahan
              </p>
              <div
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "#fff",
                  lineHeight: 1.05,
                }}
              >
                <span
                  style={{
                    fontSize: "62px",
                    display: "block",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Anang
                </span>
                <span
                  style={{
                    fontSize: "36px",
                    display: "block",
                    color: "rgba(255,255,255,0.3)",
                    fontStyle: "normal",
                    fontWeight: 300,
                    marginLeft: "8px",
                    marginTop: "2px",
                  }}
                >
                  &
                </span>
                <span
                  style={{
                    fontSize: "62px",
                    display: "block",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Diva
                </span>
              </div>
            </div>

            {/* Date divider */}
            <div
              className="relative z-10 flex items-center gap-4 px-10 mt-5"
              style={
                isOpening
                  ? {
                      animation:
                        "coverTextUp 0.8s cubic-bezier(0.4,0,0.2,1) 0.05s forwards",
                    }
                  : {}
              }
            >
              <div
                className="flex-1"
                style={{
                  height: "0.5px",
                  background: "rgba(255,255,255,0.15)",
                }}
              ></div>
              <span
                style={{
                  fontFamily: "Tenor Sans, sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  color: "rgba(255,255,255,0.4)",
                  whiteSpace: "nowrap",
                }}
              >
                29 · V · 2026
              </span>
              <div
                className="flex-1"
                style={{
                  height: "0.5px",
                  background: "rgba(255,255,255,0.15)",
                }}
              ></div>
            </div>

            {/* Spacer */}
            <div className="flex-1"></div>

            {/* BOTTOM — Button */}
            <div
              className="absolute bottom-0 left-0 right-0 z-10 px-10 pb-12"
              style={
                isOpening
                  ? {
                      animation:
                        "coverBtnDown 0.7s cubic-bezier(0.4,0,0.2,1) 0s forwards",
                    }
                  : {}
              }
            >
              <button
                onClick={openInvitation}
                disabled={isOpening}
                className="inline-flex items-center gap-3 transition-all duration-300 hover:bg-white/10"
                style={{
                  border: "0.5px solid rgba(255,255,255,0.4)",
                  color: "#fff",
                  fontFamily: "Tenor Sans, sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  padding: "14px 28px",
                  background: "transparent",
                }}
              >
                <span>Buka Undangan</span>
                <svg
                  className="w-3 h-3 opacity-70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
              <p
                className="mt-5 text-white/25"
                style={{
                  fontFamily: "Tenor Sans, sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                }}
              >
                Sabtu • Grand Santi Hotel
              </p>
            </div>
          </div>

          {/* Curtain transition — splits open to reveal content */}
          {isOpening && (
            <>
              <div
                className="fixed inset-y-0 left-0 w-1/2 z-50 bg-black"
                style={{
                  animation:
                    "curtainLeft 0.7s cubic-bezier(0.76,0,0.24,1) 1.2s forwards",
                }}
              ></div>
              <div
                className="fixed inset-y-0 right-0 w-1/2 z-50 bg-black"
                style={{
                  animation:
                    "curtainRight 0.7s cubic-bezier(0.76,0,0.24,1) 1.2s forwards",
                }}
              ></div>
              {/* White flash between cover and content */}
              <div
                className="fixed inset-0 z-40 bg-white pointer-events-none"
                style={{
                  animation: "whiteFlash 0.5s ease-in-out 1.0s forwards",
                  opacity: 0,
                }}
              ></div>
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/assets/music/entrance.mp3" type="audio/mpeg" />
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
          <AnimatedSection
            id="welcome"
            className="relative h-screen flex items-center justify-center px-6"
          >
            <div className="absolute inset-0">
              <img
                src="/assets/img/HDVWn.jpg"
                alt="Welcome"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/70"></div>
            </div>

            <div className="relative z-10 text-center">
              <p className="text-white/50 text-[10px] tracking-[0.3em] mb-4">
                UNDANGAN PERNIKAHAN
              </p>
              <div className="w-12 h-px bg-white/20 mx-auto mb-6"></div>

              <p className="text-white/70 text-sm font-light mb-2">
                Kepada Yth.
              </p>
              <h2
                className="text-3xl font-black text-white mb-8 tracking-tight"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {to || "Tamu Undangan"}
              </h2>

              <p className="text-white/60 text-xs leading-relaxed mb-4 max-w-xs mx-auto">
                Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir
                dan memberikan doa restu pada pernikahan kami.
              </p>

              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3">
                <span className="text-white/60 text-xs">Anda diundang ke:</span>
                <span className="text-white text-sm font-bold tracking-wider">
                  {eventDetails.title}
                </span>
              </div>

              <div className="flex justify-center mt-12 animate-bounce">
                <p className="text-white/30 text-[10px] tracking-[0.2em] mb-2">
                  SCROLL
                </p>
                <svg
                  className="w-4 h-4 text-white/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>
          </AnimatedSection>

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
                <p className="text-white/50 tracking-[0.3em] text-[10px] mb-4 uppercase font-light">
                  Mempelai Pria
                </p>
                <h2
                  className="text-4xl font-black text-white mb-2 tracking-tight"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  ANANG
                </h2>
                <h2
                  className="text-4xl font-black text-white mb-3 tracking-tight"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  FIRMANSYAH
                </h2>
                <p className="text-white/60 mb-6 text-sm tracking-wide">
                  S.Kom
                </p>

                <div>
                  <p className="text-white/50 text-[10px] mb-2 tracking-wider">
                    Putra dari:
                  </p>
                  <p className="text-white text-sm">Bpk. Sudirman (Alm)</p>
                  <p className="text-white/60 text-xs">&</p>
                  <p className="text-white text-sm">Ibu Khoriah</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 py-8 bg-black">
              <div className="h-px w-12 bg-white/20"></div>
              <span className="text-white/40 text-xl">&</span>
              <div className="h-px w-12 bg-white/20"></div>
            </div>

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
                <p className="text-white/50 tracking-[0.3em] text-[10px] mb-4 uppercase font-light">
                  Mempelai Wanita
                </p>
                <h2
                  className="text-4xl font-black text-white mb-2 tracking-tight"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  DIVANA
                </h2>
                <h2
                  className="text-4xl font-black text-white mb-3 tracking-tight"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  FARADILA
                </h2>
                <p className="text-white/60 mb-6 text-sm tracking-wide">
                  S.Kom
                </p>

                <div>
                  <p className="text-white/50 text-[10px] mb-2 tracking-wider">
                    Putri dari:
                  </p>
                  <p className="text-white text-sm">Bpk. Haririk</p>
                  <p className="text-white/60 text-xs">&</p>
                  <p className="text-white text-sm">Ibu Ida Rosalia</p>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Countdown Section */}
          <AnimatedSection id="countdown" className="py-16 px-6 bg-black">
            <div className="text-center mb-10">
              <p className="text-white/30 tracking-[0.3em] text-[10px] mb-3 uppercase font-light">
                Menuju Bahagia
              </p>
              <h2
                className="text-2xl font-black text-white mb-4 tracking-tight"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                COUNTDOWN
              </h2>
              <div className="w-12 h-px bg-white/20 mx-auto"></div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-8">
              {[
                { value: countdown.days, label: "HARI" },
                { value: countdown.hours, label: "JAM" },
                { value: countdown.minutes, label: "MENIT" },
                { value: countdown.seconds, label: "DETIK" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="border border-white/10 p-4 text-center hover:border-white/20 transition-all duration-300"
                >
                  <div
                    className="text-2xl font-black text-white mb-1"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <p className="text-white/40 text-[10px] tracking-wider">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className="inline-block border border-white/20 px-6 py-2">
                <p className="text-white/70 tracking-[0.15em] text-[10px] font-light">
                  {eventDetails.date} • {eventDetails.time}
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Event Details (Only ONE event based on URL) */}
          <AnimatedSection id="event" className="relative py-16 px-6">
            <div className="absolute inset-0">
              <img
                src="/assets/img/VBjtK.jpg"
                alt="Event Venue"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/85"></div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-10">
                <p className="text-white/30 tracking-[0.3em] text-[10px] mb-3 uppercase font-light">
                  Acara Pernikahan
                </p>
                <h2
                  className="text-2xl font-black text-white mb-4 tracking-tight"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  WAKTU & TEMPAT
                </h2>
                <div className="w-12 h-px bg-white/20 mx-auto"></div>
              </div>

              <div className="bg-black/50 backdrop-blur-sm border border-white/10 p-8 hover:bg-black/60 transition-all duration-300">
                <div className="text-center">
                  <div className="text-4xl mb-4">◯</div>
                  <h3
                    className="text-xl font-black text-white mb-4"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {eventDetails.title}
                  </h3>
                  <div className="w-8 h-px bg-white/20 mx-auto mb-6"></div>
                  <div className="space-y-3 mb-6">
                    <p className="text-white/70 text-sm">{eventDetails.date}</p>
                    <p className="text-white/70 text-sm">{eventDetails.time}</p>
                  </div>
                  <div className="pt-5 border-t border-white/10">
                    <p className="text-white text-lg mb-1">
                      {eventDetails.location}
                    </p>
                    <p className="text-white/50 text-xs">
                      {eventDetails.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-black/50 backdrop-blur-sm border border-white/10 p-6 hover:bg-black/60 transition-all duration-300">
                <div className="text-center">
                  <h3
                    className="text-lg font-black text-white mb-3"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    LOKASI
                  </h3>
                  <a
                    href={
                      event === "akad"
                        ? "https://www.google.com/maps/search/?api=1&query=Masjid+Agung+Al-Hikmah"
                        : "https://www.google.com/maps/place/grand+santhi/data=!4m2!3m1!1s0x2dd24094ea62bf41:0xcdde62985b9e300e?sa=X&ved=1t:242&ictx=111"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-black font-medium py-2 px-6 transition-all hover:bg-white/90"
                  >
                    <span className="tracking-wider text-xs">
                      BUKA GOOGLE MAPS
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Gallery */}
          <AnimatedSection id="gallery" className="py-16 px-6 bg-black">
            <div className="text-center mb-10">
              <p className="text-white/30 tracking-[0.3em] text-[10px] mb-3 uppercase font-light">
                Galeri
              </p>
              <h2
                className="text-2xl font-black text-white mb-4 tracking-tight"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                MOMEN KAMI
              </h2>
              <div className="w-12 h-px bg-white/20 mx-auto"></div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {galleryImages.map((src, index) => (
                <div key={index} className="overflow-hidden">
                  <img
                    src={src.src}
                    alt={src.alt}
                    className="w-full aspect-square object-cover border border-white/5 hover:scale-110 transition-all duration-500 hover:border-white/20"
                  />
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* RSVP & Wishes */}
          <AnimatedSection id="rsvp" className="py-16 px-6 bg-black">
            <div className="text-center mb-8">
              <p className="text-white/30 tracking-[0.3em] text-[10px] mb-3 uppercase font-light">
                RSVP
              </p>
              <h2
                className="text-2xl font-black text-white mb-4 tracking-tight"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                UCAPAN & DOA
              </h2>
              <div className="w-12 h-px bg-white/20 mx-auto mb-6"></div>
              <p className="text-white/50 text-xs font-light">
                Sampaikan ucapan hangat, doa, dan harapan untuk kedua mempelai.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={`https://wa.me/6281234567890?text=Assalamualaikum,%20saya%20${encodeURIComponent(to || "Tamu Undangan")}%20konfirmasi%20akan%20hadir%20di%20acara%20${encodeURIComponent(eventDetails.title)}%20Anang%20%26%20Diva`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-3 bg-white text-black font-medium py-3 px-6 transition-all hover:bg-white/90 hover:scale-105"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="tracking-wider text-xs font-medium">
                  WHATSAPP
                </span>
              </a>

              <button
                onClick={() => setShowWishForm(!showWishForm)}
                className={`flex-1 inline-flex items-center justify-center gap-3 font-medium py-3 px-6 transition-all hover:scale-105 ${
                  showWishForm
                    ? "bg-neutral-800 text-white border-2 border-white/30"
                    : "bg-neutral-900 text-white/70 border border-white/10 hover:bg-neutral-800"
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
                <span className="tracking-wider text-xs font-medium">
                  TULIS UCAPAN
                </span>
              </button>
            </div>

            {/* Wish Form */}
            {showWishForm && (
              <div className="mb-8">
                <form
                  onSubmit={handleSubmitWish}
                  className="bg-neutral-900/50 border border-white/10 p-6 space-y-4"
                >
                  <div>
                    <label className="block text-white/50 text-[10px] tracking-wider mb-2">
                      NAMA
                    </label>
                    <input
                      type="text"
                      value={wishForm.name}
                      onChange={(e) =>
                        setWishForm({ ...wishForm, name: e.target.value })
                      }
                      placeholder="Nama Anda"
                      className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/30 transition-all"
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
                          onClick={() => setWishForm({ ...wishForm, status })}
                          className={`flex-1 py-3 px-4 text-xs font-medium tracking-wider transition-all ${
                            wishForm.status === status
                              ? "bg-white text-black"
                              : "bg-black/50 text-white/50 border border-white/10 hover:border-white/20"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/50 text-[10px] tracking-wider mb-2">
                      UCAPAN & DOA
                    </label>
                    <textarea
                      value={wishForm.message}
                      onChange={(e) =>
                        setWishForm({ ...wishForm, message: e.target.value })
                      }
                      placeholder="Tuliskan ucapan dan doa untuk kedua mempelai..."
                      rows={4}
                      className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/30 transition-all resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black font-medium py-3 px-6 transition-all hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                        <span className="tracking-wider text-xs font-medium">
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
                <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
                <p className="text-white/30 text-[10px]">Live</p>
              </div>
            </div>

            {/* Custom Scrollbar Wishes List */}
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2 wishes-scroll">
              {wishes.map((wish) => (
                <div
                  key={wish.id}
                  className="bg-neutral-950/80 border border-white/10 p-4 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10">
                        <span className="text-white text-xs font-medium">
                          {wish.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-white text-xs font-medium">
                          {wish.name}
                        </p>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 text-[8px] tracking-wider mt-0.5 ${
                            wish.status === "Hadir"
                              ? "text-emerald-400/80 bg-emerald-500/10 border border-emerald-500/20"
                              : "text-rose-400/80 bg-rose-500/10 border border-rose-500/20"
                          }`}
                        >
                          {wish.status === "Hadir" ? (
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
                          {wish.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white/40 text-[10px]">{wish.date}</p>
                      <p className="text-white/30 text-[10px]">{wish.time}</p>
                    </div>
                  </div>
                  <p className="text-white/60 leading-relaxed text-xs font-light pl-10">
                    {wish.message}
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
          </AnimatedSection>

          {/* Closing */}
          <AnimatedSection
            id="closing"
            className="py-16 px-6 bg-neutral-950 text-center"
          >
            <div className="text-2xl mb-6 text-white/30">◯</div>
            <p
              className="text-white/70 text-base font-light leading-relaxed mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
              berkenan hadir dan memberikan doa restu kepada kami.
            </p>
            <p className="text-white/40 text-xs mb-6">
              Wassalamualaikum Warahmatullahi Wabarakatuh
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-white/10"></div>
              <span className="text-white/20">&</span>
              <div className="h-px w-10 bg-white/10"></div>
            </div>
          </AnimatedSection>

          {/* Footer */}
          <footer className="py-12 px-6 bg-black text-center border-t border-white/10">
            <p
              className="text-3xl font-black text-white mb-3 tracking-tighter"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              ANANG & DIVA
            </p>
            <p className="text-white/30 text-[10px] tracking-[0.2em] mb-6">
              29 MEI 2026
            </p>
            <div className="w-12 h-px bg-white/10 mx-auto mb-6"></div>
            <p className="text-white/30 text-[10px]">
              Dibuat untuk momen spesial
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

function HomeWrapper() {
  const searchParams = useSearchParams();
  const to = searchParams.get("to") || "Tamu Undangan";
  const event = searchParams.get("event") as "akad" | "resepsi" | null;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black text-white/50">
          Loading...
        </div>
      }
    >
      <InvitationContent to={to} event={event} />
    </Suspense>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black text-white/50">
          Loading...
        </div>
      }
    >
      <HomeWrapper />
    </Suspense>
  );
}
