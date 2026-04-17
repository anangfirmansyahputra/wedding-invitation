"use client";

import { Suspense, useState, useEffect, useRef } from "react";

// Guest Wishes Data (simulated)
const guestWishes = [
  { id: 1, name: "Risyam", status: "Tidak Hadir", message: "happy wedding maymayy, masyaallah alhamdulillah sampai di titik ini yaa, ending yg bahagia. Selamat memulai hubungan rumah tangga mayy, insyaallah sakinah mawaddah wa rahmah. Aamiin", date: "9 February 2026", time: "06.24" },
  { id: 2, name: "Menaka Neok", status: "Tidak Hadir", message: "Selamat ya niko dan istri atas pernikahannya, Maaf belum bisa hadir, tapi doa selalu menyertai. Semoga jadi pasangan yang bahagia dan saling menguatkan sampai tua nanti. rahayu", date: "7 February 2026", time: "18.30" },
  { id: 3, name: "Adel", status: "Hadir", message: "masyaAllah amay sayaang lancar sampai hari h dan semoga menjadi keluarga yang samawa", date: "7 February 2026", time: "09.47" },
  { id: 4, name: "Dewi", status: "Hadir", message: "Congratsss ameee, lancar\"pokoknya sampe jadi keluarga sakinah mawaddah warahmah till jannah yaaa", date: "3 February 2026", time: "20.12" },
];

function InvitationContent({ to }: { to: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicBtn, setShowMusicBtn] = useState(false);
  const [isOpened, setIsOpened] = useState(true);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [wishes, setWishes] = useState(guestWishes);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Countdown Timer
  useEffect(() => {
    const weddingDate = new Date('2026-05-29T15:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

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
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
    document.body.style.overflow = "auto";
  };

  if (!isOpened) {
    return (
      <>
        <audio
          ref={audioRef}
          loop
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        />
        <div className="fixed inset-0 bg-black">
          {/* Animated Noise/Grain Overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
            {/* Corner Frames */}
            <div className="absolute top-8 left-8 w-32 h-32 border-l border-t border-white/30"></div>
            <div className="absolute top-8 right-8 w-32 h-32 border-r border-t border-white/30"></div>
            <div className="absolute bottom-8 left-8 w-32 h-32 border-l border-b border-white/30"></div>
            <div className="absolute bottom-8 right-8 w-32 h-32 border-r border-b border-white/30"></div>

            {/* Bismillah */}
            <p className="text-white/50 tracking-[0.4em] text-xs mb-16 font-light">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </p>

            {/* Wedding Announcement */}
            <div className="text-center">
              <p className="text-white/40 tracking-[0.5em] text-xs mb-12 uppercase">The Wedding Of</p>

              <h1 className="text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter" style={{ fontFamily: 'Playfair Display, serif' }}>
                ANANG
              </h1>

              <div className="flex items-center justify-center gap-6 my-10">
                <div className="h-px w-20 bg-white/40"></div>
                <span className="text-white/60 text-4xl font-light">&</span>
                <div className="h-px w-20 bg-white/40"></div>
              </div>

              <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter" style={{ fontFamily: 'Playfair Display, serif' }}>
                DIVANA
              </h1>

              <div className="mt-16 inline-block">
                <div className="border border-white/30 rounded-full px-10 py-4">
                  <p className="text-white/80 tracking-[0.3em] text-sm font-light">
                    SABTU • 29 MEI 2026
                  </p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="max-w-md text-center mt-16">
              <p className="text-white/50 leading-relaxed text-sm italic">
                "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu
                istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya"
              </p>
              <p className="text-white/30 text-xs mt-4 tracking-widest">— QS. AR-RUM: 21</p>
            </div>

            {/* Open Button */}
            <button
              onClick={openInvitation}
              className="mt-16 group inline-flex items-center gap-4 bg-white hover:bg-white/90 text-black font-medium py-4 px-12 rounded-none transition-all duration-300"
            >
              <span className="tracking-[0.3em] text-sm">OPEN</span>
              <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Background Music */}
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />

      {/* Music Control Button */}
      {showMusicBtn && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-md rounded-none flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20"
        >
          {isPlaying ? (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      )}

      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
          {/* Background Image with Dark Overlay */}
          <div className="absolute inset-0 h-[100vh]">
            <img
              src="/assets/DSC00840.jpg"
              alt="Wedding Background"
              className="w-full h-full object-cover object-bottom-right grayscale"
            />
            <div className="absolute inset-0 bg-black/70"></div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20zM20 0h20v20H20V0z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="max-w-4xl w-full text-center relative z-10">
            {/* Bismillah */}
            <p className="text-white/30 tracking-[0.4em] text-xs mb-12 font-light">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </p>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px w-16 bg-white/30"></div>
              <div className="w-2 h-2 border border-white/40 rotate-45"></div>
              <div className="h-px w-16 bg-white/30"></div>
            </div>

            {/* Title */}
            <p className="text-white/40 tracking-[0.5em] text-xs mb-10 uppercase">The Wedding Of</p>

            {/* Names */}
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter" style={{ fontFamily: 'Playfair Display, serif' }}>
              ANANG
            </h1>
            <div className="flex items-center justify-center gap-6 my-8">
              <div className="h-px w-16 bg-white/30"></div>
              <span className="text-white/50 text-3xl font-light">&</span>
              <div className="h-px w-16 bg-white/30"></div>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter" style={{ fontFamily: 'Playfair Display, serif' }}>
              DIVANA
            </h1>

            {/* Date */}
            <div className="mt-12">
              <div className="inline-block border border-white/30 rounded-none px-8 py-3">
                <p className="text-white/70 tracking-[0.3em] text-xs font-light">
                  SABTU • 29 MEI 2026
                </p>
              </div>
            </div>

            {/* Invitation Card */}
            <div className="mt-16 bg-white/5 backdrop-blur-sm border border-white/10 max-w-xl mx-auto">
              <div className="p-10 md:p-14">
                <p className="text-white/40 tracking-[0.3em] text-xs mb-6 uppercase">Undangan Kepada</p>
                <p className="text-3xl md:text-4xl font-black text-white mb-8 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {to || "Tamu Undangan"}
                </p>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-10 bg-white/20"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="h-px w-10 bg-white/20"></div>
                </div>
                <p className="text-white/50 leading-relaxed text-sm font-light">
                  Tanpa mengurangi rasa hormat, kami bermaksud mengundang Anda untuk hadir
                  di acara pernikahan kami.
                </p>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-16 animate-bounce">
              <p className="text-white/30 text-xs tracking-[0.3em] mb-3">SCROLL</p>
              <svg className="w-4 h-4 mx-auto text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* Mempelai Section */}
        <section className="py-24 px-4 bg-neutral-950">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-white/30 tracking-[0.3em] text-xs mb-4 uppercase font-light">Pasangan Pengantin</p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                MEMPELAI
              </h2>
              <div className="w-20 h-px bg-white/20 mx-auto"></div>
            </div>

            {/* Groom */}
            <div className="mb-16">
              <div className="bg-black border border-white/10">
                <div className="flex flex-col md:flex-row">
                  {/* Photo */}
                  <div className="md:w-2/5">
                    <img
                      src="/assets/DSC00933.jpg"
                      alt="Anang Firmansyah"
                      className="w-full h-96 md:h-full object-cover grayscale"
                    />
                  </div>

                  {/* Info */}
                  <div className="md:w-3/5 p-10 md:p-12 flex flex-col justify-center">
                    <p className="text-white/40 tracking-[0.3em] text-xs mb-4 uppercase">Mempelai Pria</p>
                    <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                      ANANG
                    </h3>
                    <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                      FIRMANSYAH
                    </h3>
                    <p className="text-white/50 mb-8 text-sm tracking-wide">S.Kom</p>

                    <div className="border-t border-white/10 pt-6 mb-6">
                      <p className="text-white/40 text-xs mb-3 tracking-wider">Putra dari:</p>
                      <p className="text-white font-medium text-lg">Bpk. Sudirman (Alm)</p>
                      <p className="text-white/60 text-sm">&</p>
                      <p className="text-white font-medium text-lg">Ibu Khoriah</p>
                    </div>

                    <p className="text-white/40 leading-relaxed text-sm font-light">
                      Seorang yang bertanggung jawab, penyabar, dan berkomitmen. Siap menjadi imam yang bijak untuk keluarga kecil kami.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-6 my-16">
              <div className="h-px w-24 bg-white/10"></div>
              <span className="text-white/20 text-2xl">&</span>
              <div className="h-px w-24 bg-white/10"></div>
            </div>

            {/* Bride */}
            <div>
              <div className="bg-black border border-white/10">
                <div className="flex flex-col md:flex-row-reverse">
                  {/* Photo */}
                  <div className="md:w-2/5">
                    <img
                      src="/assets/DSC00952.jpg"
                      alt="Divana Faradila"
                      className="w-full h-96 md:h-full object-cover grayscale"
                    />
                  </div>

                  {/* Info */}
                  <div className="md:w-3/5 p-10 md:p-12 flex flex-col justify-center">
                    <p className="text-white/40 tracking-[0.3em] text-xs mb-4 uppercase">Mempelai Wanita</p>
                    <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                      DIVANA
                    </h3>
                    <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                      FARADILA
                    </h3>
                    <p className="text-white/50 mb-8 text-sm tracking-wide">S.Kom</p>

                    <div className="border-t border-white/10 pt-6 mb-6">
                      <p className="text-white/40 text-xs mb-3 tracking-wider">Putri dari:</p>
                      <p className="text-white font-medium text-lg">Bpk. Haririk</p>
                      <p className="text-white/60 text-sm">&</p>
                      <p className="text-white font-medium text-lg">Ibu Ida Rosalia</p>
                    </div>

                    <p className="text-white/40 leading-relaxed text-sm font-light">
                      Wanita yang berjiwa lembut, penyayang, dan selalu positif. Siap menjadi pendamping setia untuk keluarga kecil kami.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Countdown Section */}
        <section className="py-24 px-4 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white/30 tracking-[0.3em] text-xs mb-4 uppercase font-light">Menuju Bahagia</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              COUNTDOWN
            </h2>
            <div className="w-20 h-px bg-white/20 mx-auto mb-12"></div>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto mb-12">
              {[
                { value: countdown.days, label: "HARI" },
                { value: countdown.hours, label: "JAM" },
                { value: countdown.minutes, label: "MENIT" },
                { value: countdown.seconds, label: "DETIK" },
              ].map((item, index) => (
                <div key={index} className="border border-white/10 p-6">
                  <div className="text-3xl md:text-5xl font-black text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <p className="text-white/40 text-xs tracking-wider">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Date */}
            <div className="inline-block border border-white/20 px-10 py-4">
              <p className="text-white/70 tracking-[0.2em] text-sm font-light">
                SABTU, 29 MEI 2026 • 15.00 WIB
              </p>
            </div>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-24 px-4 bg-neutral-950">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-white/30 tracking-[0.3em] text-xs mb-4 uppercase font-light">Acara Pernikahan</p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                WAKTU & TEMPAT
              </h2>
              <div className="w-20 h-px bg-white/20 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Akad */}
              <div className="bg-black border border-white/10 p-10 hover:border-white/20 transition-all">
                <div className="text-center">
                  <div className="text-5xl mb-6">◯</div>
                  <h3 className="text-2xl font-black text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>AKAD NIKAH</h3>
                  <div className="w-12 h-px bg-white/20 mx-auto mb-6"></div>
                  <div className="space-y-3">
                    <p className="text-white/60 text-sm">Sabtu, 29 Mei 2026</p>
                    <p className="text-white/60 text-sm">08.00 - 10.00 WIB</p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-white font-medium">Masjid Agung Al-Hikmah</p>
                    <p className="text-white/40 text-xs mt-2">Jl. Keberkahan No. 99</p>
                  </div>
                </div>
              </div>

              {/* Resepsi */}
              <div className="bg-black border border-white/10 p-10 hover:border-white/20 transition-all">
                <div className="text-center">
                  <div className="text-5xl mb-6">◯</div>
                  <h3 className="text-2xl font-black text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>RESEPSI</h3>
                  <div className="w-12 h-px bg-white/20 mx-auto mb-6"></div>
                  <div className="space-y-3">
                    <p className="text-white/60 text-sm">Sabtu, 29 Mei 2026</p>
                    <p className="text-white/60 text-sm">15.00 WIB - Selesai</p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-white font-medium">Grand Santi Hotel</p>
                    <p className="text-white/40 text-xs mt-2">Ballroom Lt. 3</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-6 bg-black border border-white/10 p-10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-black text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>LOKASI</h3>
                  <p className="text-white/50 mb-6 text-sm">Grand Santi Hotel, Kota Bahagia</p>
                  <a
                    href="https://www.google.com/maps/place/grand+santhi/data=!4m2!3m1!1s0x2dd24094ea62bf41:0xcdde62985b9e300e?sa=X&ved=1t:242&ictx=111"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white text-black font-medium py-3 px-8 transition-all hover:bg-white/90"
                  >
                    <span className="tracking-wider text-sm">GOOGLE MAPS</span>
                  </a>
                </div>
                <div className="flex-1">
                  <div className="bg-neutral-900 h-48 flex items-center justify-center border border-white/10">
                    <svg className="w-12 h-12 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-24 px-4 bg-black">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-white/30 tracking-[0.3em] text-xs mb-4 uppercase font-light">Galeri</p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                MOMEN KAMI
              </h2>
              <div className="w-20 h-px bg-white/20 mx-auto"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                '/assets/DSC00933.jpg',
                '/assets/DSC01231.jpg',
                '/assets/DSC01107.jpg',
                '/assets/DSC00952.jpg',
                '/assets/DSC00979.jpg',
                '/assets/DSC01129.jpg',
                '/assets/DSC01153.jpg',
                '/assets/DSC01184.jpg',
                '/assets/DSC01381.jpg',
                '/assets/DSC01452.jpg',
                '/assets/DSC01553.jpg',
                '/assets/DSC01560.jpg',
                '/assets/DSC01566.jpg',
              ].map((src, index) => (
                <div key={index} className={`${index % 4 === 0 || index % 4 === 3 ? 'row-span-2' : ''}`}>
                  <img
                    src={src}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover border border-white/5 grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wedding Gift */}
        <section className="py-24 px-4 bg-neutral-950">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-white/30 tracking-[0.3em] text-xs mb-4 uppercase font-light">Wedding Gift</p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                TANDA KASIH
              </h2>
              <div className="w-20 h-px bg-white/20 mx-auto mb-8"></div>
              <p className="text-white/50 max-w-xl mx-auto text-sm font-light">
                Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* BCA */}
              <div className="bg-black border border-white/10 p-10 text-center">
                <p className="text-white/40 tracking-[0.2em] text-xs mb-4">BANK BCA</p>
                <p className="text-3xl font-black text-white mb-2 tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>1234567890</p>
                <p className="text-white/50 text-sm mb-6">a.n Anang Firmansyah</p>
                <button className="text-white/60 hover:text-white text-xs tracking-wider border-b border-white/20 hover:border-white transition-all pb-1">
                  SALIN NOMOR
                </button>
              </div>

              {/* Mandiri */}
              <div className="bg-black border border-white/10 p-10 text-center">
                <p className="text-white/40 tracking-[0.2em] text-xs mb-4">BANK MANDIRI</p>
                <p className="text-3xl font-black text-white mb-2 tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>0987654321</p>
                <p className="text-white/50 text-sm mb-6">a.n Putri Ayu</p>
                <button className="text-white/60 hover:text-white text-xs tracking-wider border-b border-white/20 hover:border-white transition-all pb-1">
                  SALIN NOMOR
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP & Wishes */}
        <section className="py-24 px-4 bg-black">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-white/30 tracking-[0.3em] text-xs mb-4 uppercase font-light">RSVP</p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                UCAPAN & DOA
              </h2>
              <div className="w-20 h-px bg-white/20 mx-auto mb-8"></div>
              <p className="text-white/50 max-w-xl mx-auto text-sm font-light">
                Sampaikan ucapan hangat, doa, dan harapan untuk kedua mempelai.
              </p>
            </div>

            {/* WhatsApp Button */}
            <div className="text-center mb-12">
              <a
                href={`https://wa.me/6281234567890?text=Assalamualaikum,%20saya%20${encodeURIComponent(to || 'Tamu Undangan')}%20konfirmasi%20akan%20hadir%20di%20acara%20pernikahan%20Rizky%20%26%20Putri`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-4 bg-white text-black font-medium py-4 px-10 transition-all hover:bg-white/90"
              >
                <span className="tracking-wider text-sm">KIRIM VIA WHATSAPP</span>
              </a>
            </div>

            {/* Wishes Counter */}
            <div className="text-center mb-10">
              <p className="text-white/40 text-xs tracking-wider">{wishes.length} UCAPAN</p>
            </div>

            {/* Wishes List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {wishes.map((wish) => (
                <div key={wish.id} className="bg-neutral-950 border border-white/10 p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {wish.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{wish.name}</p>
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] tracking-wider mt-1 ${
                          wish.status === 'Hadir'
                            ? 'text-white/60 border border-white/20'
                            : 'text-white/40 border border-white/10'
                        }`}>
                          {wish.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-white/30 text-xs">
                      <p>{wish.date}</p>
                      <p>{wish.time}</p>
                    </div>
                  </div>
                  <p className="text-white/50 leading-relaxed text-sm font-light pl-13">
                    {wish.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="py-24 px-4 bg-neutral-950 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-4xl mb-8 text-white/30">◯</div>
            <p className="text-white/70 text-xl md:text-2xl font-light leading-relaxed mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
              berkenan hadir dan memberikan doa restu kepada kami.
            </p>
            <p className="text-white/40 text-sm mb-8">Wassalamualaikum Warahmatullahi Wabarakatuh</p>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-white/10"></div>
              <span className="text-white/20">&</span>
              <div className="h-px w-16 bg-white/10"></div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-4 bg-black text-center border-t border-white/10">
          <div className="max-w-xl mx-auto">
            <p className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter" style={{ fontFamily: 'Playfair Display, serif' }}>
              ANANG & DIVANA
            </p>
            <p className="text-white/30 text-xs tracking-[0.3em] mb-8">29 MEI 2026</p>
            <div className="w-20 h-px bg-white/10 mx-auto mb-8"></div>
            <p className="text-white/30 text-xs">Dibuat untuk momen spesial</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default function Home() {
  const to = "Tamu Undangan";

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black text-white/50">Loading...</div>}>
      <InvitationContent to={to} />
    </Suspense>
  );
}
