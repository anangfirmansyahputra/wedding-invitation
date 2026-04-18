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
  const [isOpened, setIsOpened] = useState(false);
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
    // if (audioRef.current) {
    //   if (isPlaying) {
    //     audioRef.current.pause();
    //   } else {
    //     audioRef.current.play();
    //   }
    //   setIsPlaying(!isPlaying);
    // }
  };

  const openInvitation = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
    document.body.style.overflow = "auto";
  };

  // COVER SECTION (Before Opening)
  if (!isOpened) {
    return (
      <>
        <audio
          ref={audioRef}
          loop
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        />
        {/* Desktop/ Tablet Background */}
        <div className="fixed inset-0 bg-black flex items-center justify-center">
          {/* Mobile Container */}
          <div className="relative w-full max-w-md h-screen bg-black mx-auto overflow-hidden">
            {/* Photo Background */}
            <div className="absolute inset-0">
              <img
                src="/assets/undangan.jpg"
                alt="Wedding Couple"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 w-full h-full flex flex-col items-center justify-center">
              {/* Names */}
              <h1 className="text-5xl font-black text-white mb-3 tracking-tighter" style={{ fontFamily: 'Playfair Display, serif' }}>
                ANANG
              </h1>
              <div className="flex items-center justify-center gap-4 my-4">
                <div className="h-px w-12 bg-white/60"></div>
                <span className="text-white/80 text-2xl">&</span>
                <div className="h-px w-12 bg-white/60"></div>
              </div>
              <h1 className="text-5xl font-black text-white mb-10 tracking-tighter" style={{ fontFamily: 'Playfair Display, serif' }}>
                DIVA
              </h1>

              {/* Open Button */}
              <button
                onClick={openInvitation}
                className="inline-flex items-center gap-3 bg-white text-black font-medium py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <span className="tracking-[0.2em] text-sm">Buka Undangan</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
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

      {/* Desktop/ Tablet Background */}
      <div className="min-h-screen bg-black flex justify-center">
        {/* Mobile Container - Fixed max width */}
        <div className="w-full max-w-md bg-black relative">
          {/* Music Control Button */}
          {showMusicBtn && (
            <button
              onClick={toggleMusic}
              className="fixed bottom-4 right-4 z-50 w-10 h-10 bg-white/10 backdrop-blur-md rounded-none flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20"
              style={{ right: 'calc(50% - 190px)' }}
            >
              {isPlaying ? (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          )}
          {/* Hero Section with Animation */}
          <section className={`relative h-screen flex items-end px-6 transition-all duration-1000 ease-out ${isOpened ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}>
            {/* Video Background */}
            <div className="absolute inset-0">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/assets/IMG_0225.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full pb-20">
              <div className="text-center">
                {/* Names */}
                <h1 className="text-6xl font-black text-white mb-3 tracking-tighter" style={{ fontFamily: 'Playfair Display, serif' }}>
                  ANANG
                </h1>
                <div className="flex items-center justify-center gap-4 my-4">
                  <div className="h-px w-16 bg-white/50"></div>
                  <span className="text-white/70 text-3xl font-light">&</span>
                  <div className="h-px w-16 bg-white/50"></div>
                </div>
                <h1 className="text-6xl font-black text-white tracking-tighter mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                  DIVA
                </h1>

                {/* Date */}
                <div className="inline-block border border-white/40 px-8 py-3">
                  <p className="text-white/90 tracking-[0.25em] text-sm font-light">
                    SABTU • 29 MEI 2026
                  </p>
                </div>
              </div>

              {/* Scroll Indicator */}
              <div className="flex justify-center mt-12 animate-bounce">
                <p className="text-white/40 text-[10px] tracking-[0.2em] mb-2">SCROLL</p>
                <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </section>

          {/* Mempelai Section */}
          <section>
            {/* Groom Section */}
            <div className="relative min-h-screen flex items-end">
              {/* Background Photo */}
              <img
                src="/assets/DSC00933.jpg"
                alt="Anang Firmansyah"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>

              {/* Content */}
              <div className="relative z-10 w-full px-6 pb-16">
                <p className="text-white/50 tracking-[0.3em] text-[10px] mb-4 uppercase font-light">Mempelai Pria</p>
                <h2 className="text-4xl font-black text-white mb-2 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  ANANG
                </h2>
                <h2 className="text-4xl font-black text-white mb-3 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  FIRMANSYAH
                </h2>
                <p className="text-white/60 mb-6 text-sm tracking-wide">S.Kom</p>

                <div className="mb-6">
                  <p className="text-white/50 text-[10px] mb-2 tracking-wider">Putra dari:</p>
                  <p className="text-white text-sm">Bpk. Sudirman (Alm)</p>
                  <p className="text-white/60 text-xs">&</p>
                  <p className="text-white text-sm">Ibu Khoriah</p>
                </div>

                <p className="text-white/60 leading-relaxed text-xs font-light max-w-xs">
                  Seorang yang bertanggung jawab, penyabar, dan berkomitmen. Siap menjadi imam yang bijak untuk keluarga kecil kami.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 py-8 bg-black">
              <div className="h-px w-12 bg-white/20"></div>
              <span className="text-white/40 text-xl">&</span>
              <div className="h-px w-12 bg-white/20"></div>
            </div>

            {/* Bride Section */}
            <div className="relative min-h-screen flex items-end">
              {/* Background Photo */}
              <img
                src="/assets/DSC00952.jpg"
                alt="Divana Faradila"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>

              {/* Content */}
              <div className="relative z-10 w-full px-6 pb-16">
                <p className="text-white/50 tracking-[0.3em] text-[10px] mb-4 uppercase font-light">Mempelai Wanita</p>
                <h2 className="text-4xl font-black text-white mb-2 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  DIVA
                </h2>
                <h2 className="text-4xl font-black text-white mb-3 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  FARADILA
                </h2>
                <p className="text-white/60 mb-6 text-sm tracking-wide">S.Kom</p>

                <div className="mb-6">
                  <p className="text-white/50 text-[10px] mb-2 tracking-wider">Putri dari:</p>
                  <p className="text-white text-sm">Bpk. Haririk</p>
                  <p className="text-white/60 text-xs">&</p>
                  <p className="text-white text-sm">Ibu Ida Rosalia</p>
                </div>

                <p className="text-white/60 leading-relaxed text-xs font-light max-w-xs">
                  Wanita yang berjiwa lembut, penyayang, dan selalu positif. Siap menjadi pendamping setia untuk keluarga kecil kami.
                </p>
              </div>
            </div>
          </section>

          {/* Countdown Section */}
          <section className="py-16 px-6 bg-black">
            <div className="text-center mb-10">
              <p className="text-white/30 tracking-[0.3em] text-[10px] mb-3 uppercase font-light">Menuju Bahagia</p>
              <h2 className="text-2xl font-black text-white mb-4 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                COUNTDOWN
              </h2>
              <div className="w-12 h-px bg-white/20 mx-auto"></div>
            </div>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-3 mb-8">
              {[
                { value: countdown.days, label: "HARI" },
                { value: countdown.hours, label: "JAM" },
                { value: countdown.minutes, label: "MENIT" },
                { value: countdown.seconds, label: "DETIK" },
              ].map((item, index) => (
                <div key={index} className="border border-white/10 p-4 text-center">
                  <div className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <p className="text-white/40 text-[10px] tracking-wider">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Date */}
            <div className="text-center">
              <div className="inline-block border border-white/20 px-6 py-2">
                <p className="text-white/70 tracking-[0.15em] text-[10px] font-light">
                  SABTU, 29 MEI 2026 • 15.00 WIB
                </p>
              </div>
            </div>
          </section>

          {/* Event Details */}
          <section className="py-16 px-6 bg-neutral-950">
            <div className="text-center mb-10">
              <p className="text-white/30 tracking-[0.3em] text-[10px] mb-3 uppercase font-light">Acara Pernikahan</p>
              <h2 className="text-2xl font-black text-white mb-4 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                WAKTU & TEMPAT
              </h2>
              <div className="w-12 h-px bg-white/20 mx-auto"></div>
            </div>

            <div className="space-y-4">
              {/* Akad */}
              <div className="bg-black border border-white/10 p-6">
                <div className="text-center">
                  <div className="text-3xl mb-4">◯</div>
                  <h3 className="text-lg font-black text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>AKAD NIKAH</h3>
                  <div className="w-8 h-px bg-white/20 mx-auto mb-4"></div>
                  <div className="space-y-2">
                    <p className="text-white/60 text-xs">Sabtu, 29 Mei 2026</p>
                    <p className="text-white/60 text-xs">08.00 - 10.00 WIB</p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <p className="text-white text-sm">Masjid Agung Al-Hikmah</p>
                    <p className="text-white/40 text-[10px] mt-1">Jl. Keberkahan No. 99</p>
                  </div>
                </div>
              </div>

              {/* Resepsi */}
              <div className="bg-black border border-white/10 p-6">
                <div className="text-center">
                  <div className="text-3xl mb-4">◯</div>
                  <h3 className="text-lg font-black text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>RESEPSI</h3>
                  <div className="w-8 h-px bg-white/20 mx-auto mb-4"></div>
                  <div className="space-y-2">
                    <p className="text-white/60 text-xs">Sabtu, 29 Mei 2026</p>
                    <p className="text-white/60 text-xs">15.00 WIB - Selesai</p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <p className="text-white text-sm">Grand Santi Hotel</p>
                    <p className="text-white/40 text-[10px] mt-1">Ballroom Lt. 3</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-4 bg-black border border-white/10 p-6">
              <div className="text-center">
                <h3 className="text-lg font-black text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>LOKASI</h3>
                <p className="text-white/50 mb-4 text-xs">Grand Santi Hotel, Kota Bahagia</p>
                <a
                  href="https://www.google.com/maps/place/grand+santhi/data=!4m2!3m1!1s0x2dd24094ea62bf41:0xcdde62985b9e300e?sa=X&ved=1t:242&ictx=111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-black font-medium py-2 px-6 transition-all hover:bg-white/90"
                >
                  <span className="tracking-wider text-xs">GOOGLE MAPS</span>
                </a>
              </div>
            </div>
          </section>

          {/* Gallery */}
          <section className="py-16 px-6 bg-black">
            <div className="text-center mb-10">
              <p className="text-white/30 tracking-[0.3em] text-[10px] mb-3 uppercase font-light">Galeri</p>
              <h2 className="text-2xl font-black text-white mb-4 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                MOMEN KAMI
              </h2>
              <div className="w-12 h-px bg-white/20 mx-auto"></div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                '/assets/DSC00933.jpg',
                '/assets/DSC01231.jpg',
                '/assets/DSC01107.jpg',
                '/assets/DSC00952.jpg',
                '/assets/DSC00979.jpg',
                '/assets/DSC01129.jpg',
                '/assets/DSC01153.jpg',
                '/assets/DSC01184.jpg',
              ].map((src, index) => (
                <div key={index}>
                  <img
                    src={src}
                    alt={`Gallery ${index + 1}`}
                    className="w-full aspect-square object-cover border border-white/5 hover:scale-105 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Wedding Gift */}
          <section className="py-16 px-6 bg-neutral-950">
            <div className="text-center mb-8">
              <p className="text-white/30 tracking-[0.3em] text-[10px] mb-3 uppercase font-light">Wedding Gift</p>
              <h2 className="text-2xl font-black text-white mb-4 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                TANDA KASIH
              </h2>
              <div className="w-12 h-px bg-white/20 mx-auto mb-6"></div>
              <p className="text-white/50 text-xs font-light">
                Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
              </p>
            </div>

            <div className="space-y-3">
              {/* BCA */}
              <div className="bg-black border border-white/10 p-5 text-center">
                <p className="text-white/40 tracking-[0.15em] text-[10px] mb-2">BANK BCA</p>
                <p className="text-xl font-black text-white mb-1 tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>1234567890</p>
                <p className="text-white/50 text-xs mb-3">a.n Anang Firmansyah</p>
                <button className="text-white/60 hover:text-white text-[10px] tracking-wider border-b border-white/20 hover:border-white transition-all pb-0.5">
                  SALIN NOMOR
                </button>
              </div>

              {/* Mandiri */}
              <div className="bg-black border border-white/10 p-5 text-center">
                <p className="text-white/40 tracking-[0.15em] text-[10px] mb-2">BANK MANDIRI</p>
                <p className="text-xl font-black text-white mb-1 tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>0987654321</p>
                <p className="text-white/50 text-xs mb-3">a.n Putri Ayu</p>
                <button className="text-white/60 hover:text-white text-[10px] tracking-wider border-b border-white/20 hover:border-white transition-all pb-0.5">
                  SALIN NOMOR
                </button>
              </div>
            </div>
          </section>

          {/* RSVP & Wishes */}
          <section className="py-16 px-6 bg-black">
            <div className="text-center mb-8">
              <p className="text-white/30 tracking-[0.3em] text-[10px] mb-3 uppercase font-light">RSVP</p>
              <h2 className="text-2xl font-black text-white mb-4 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                UCAPAN & DOA
              </h2>
              <div className="w-12 h-px bg-white/20 mx-auto mb-6"></div>
              <p className="text-white/50 text-xs font-light">
                Sampaikan ucapan hangat, doa, dan harapan untuk kedua mempelai.
              </p>
            </div>

            {/* WhatsApp Button */}
            <div className="text-center mb-8">
              <a
                href={`https://wa.me/6281234567890?text=Assalamualaikum,%20saya%20${encodeURIComponent(to || 'Tamu Undangan')}%20konfirmasi%20akan%20hadir%20di%20acara%20pernikahan%20Anang%20%26%20Diva`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white text-black font-medium py-3 px-6 transition-all hover:bg-white/90"
              >
                <span className="tracking-wider text-xs">KIRIM VIA WHATSAPP</span>
              </a>
            </div>

            {/* Wishes Counter */}
            <div className="text-center mb-6">
              <p className="text-white/40 text-[10px] tracking-wider">{wishes.length} UCAPAN</p>
            </div>

            {/* Wishes List */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {wishes.map((wish) => (
                <div key={wish.id} className="bg-neutral-950 border border-white/10 p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                        <span className="text-white text-xs">
                          {wish.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-white text-xs">{wish.name}</p>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[8px] tracking-wider mt-0.5 ${wish.status === 'Hadir'
                            ? 'text-white/60 border border-white/20'
                            : 'text-white/40 border border-white/10'
                          }`}>
                          {wish.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-white/30 text-[10px]">
                      <p>{wish.date}</p>
                      <p>{wish.time}</p>
                    </div>
                  </div>
                  <p className="text-white/50 leading-relaxed text-xs font-light pl-10">
                    {wish.message}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Closing */}
          <section className="py-16 px-6 bg-neutral-950 text-center">
            <div className="text-2xl mb-6 text-white/30">◯</div>
            <p className="text-white/70 text-base font-light leading-relaxed mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
              berkenan hadir dan memberikan doa restu kepada kami.
            </p>
            <p className="text-white/40 text-xs mb-6">Wassalamualaikum Warahmatullahi Wabarakatuh</p>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-white/10"></div>
              <span className="text-white/20">&</span>
              <div className="h-px w-10 bg-white/10"></div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 px-6 bg-black text-center border-t border-white/10">
            <p className="text-3xl font-black text-white mb-3 tracking-tighter" style={{ fontFamily: 'Playfair Display, serif' }}>
              ANANG & DIVA
            </p>
            <p className="text-white/30 text-[10px] tracking-[0.2em] mb-6">29 MEI 2026</p>
            <div className="w-12 h-px bg-white/10 mx-auto mb-6"></div>
            <p className="text-white/30 text-[10px]">Dibuat untuk momen spesial</p>
          </footer>
        </div>
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
