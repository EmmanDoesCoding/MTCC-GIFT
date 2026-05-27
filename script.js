/* ============================================
   SHARED SCRIPT — Gift Website
   Handles: music toggle, vinyl flip, vinyl spin
   ============================================ */

(function () {
  'use strict';

  const audio      = document.getElementById('bg-music');
  const musicBtn   = document.getElementById('music-toggle');
  const frame      = document.getElementById('portrait-frame');
  const vinylBack  = document.getElementById('vinyl-back');
  const revealBtn  = document.getElementById('reveal-btn');
  const modal      = document.getElementById('message-modal');
  const closeBtn   = document.getElementById('card-close');

// Tap to start overlay
  const tapOverlay = document.getElementById('tap-to-start');
  if (tapOverlay) {
    const hideTapOverlay = () => {
      tapOverlay.classList.add('hidden');
      
      // Try to play audio when user taps
      setTimeout(() => {
        const bgAudio = document.getElementById('bg-music');
        if (bgAudio && bgAudio.paused) {
          bgAudio.play().catch((err) => {
            console.log('Autoplay blocked:', err);
          });
        }
      }, 100);
      
      document.removeEventListener('click', hideTapOverlay);
      document.removeEventListener('touchstart', hideTapOverlay);
    };
    document.addEventListener('click', hideTapOverlay);
    document.addEventListener('touchstart', hideTapOverlay);
  }

  // ---------- VINYL SPIN (synced to music) ----------
  // The vinyl animation runs continuously in the background.
  // We only pause/play it based on music state, so it never "snaps" back.
  function setVinylSpin(playing) {
    if (!vinylBack) return;
    if (playing) {
      vinylBack.classList.add('spinning');
    } else {
      vinylBack.classList.remove('spinning');
    }
  }

  // ---------- PORTRAIT FLIP ----------
  if (frame) {
    frame.addEventListener('click', () => {
      frame.classList.toggle('flipped');
    });
  }

  // ---------- SONG SWITCHING ----------
  const songCard = document.querySelector('.song-card');
  const songCardTitle = document.querySelector('.song-card-title');
  let currentSongState = 'original'; // 'original', 'illbethere', 'leanonme'
  let originalSongInfo = null;

  function switchSong(newState) {
    if (!audio || !songCard) return;

    // Store original song info on first load
    if (!originalSongInfo) {
      originalSongInfo = {
        src: audio.src,
        title: songCardTitle.textContent,
        artist: document.querySelector('.song-card-artist').textContent,
        albumArt: document.querySelector('.song-card-art img').src,
      };
    }

    let songData = {};
    if (newState === 'illbethere') {
      songData = {
        src: '../assets/music/IllBeThere.mp3',
        title: "I'll Be There",
        artist: 'Jackson 5',
        albumArt: '../assets/images/IllBeThere_album.jpg',
      };
    } else if (newState === 'leanonme') {
      songData = {
        src: '../assets/music/LeanOnMe.mp3',
        title: 'Lean on Me',
        artist: 'Bill Withers',
        albumArt: '../assets/images/LeanOnMe_album.jpg',
      };
    } else {
      // Back to original
      songData = originalSongInfo;
    }

    // Update audio
    const wasPlaying = !audio.paused;
    audio.src = songData.src;
    audio.currentTime = 0;
    if (wasPlaying) audio.play();

    // Update card display
    songCardTitle.textContent = songData.title;
    document.querySelector('.song-card-artist').textContent = songData.artist;
    document.querySelector('.song-card-art img').src = songData.albumArt;

    // Update vinyl label (the album art on the spinning record)
    const vinylLabelImg = document.querySelector('.vinyl-label img');
    if (vinylLabelImg) {
      vinylLabelImg.src = songData.albumArt;
    }

    currentSongState = newState;
  }

  // Click song card title to return to original song
  if (songCardTitle) {
    songCardTitle.addEventListener('click', () => {
      if (currentSongState !== 'original') {
        switchSong('original');
      }
    });
  }

  // Album button clicks (3 album covers below the message button)
  const albumButtons = document.querySelectorAll('.album-button');
  albumButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const songName = btn.dataset.song;
      switchSong(songName);
      
      // Update active state on buttons
      albumButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ---------- MUSIC CONTROL ----------
  if (audio && musicBtn) {
    audio.loop   = true;
    audio.volume = 0.6;

    const playIcon = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <polygon points="6 4 20 12 6 20 6 4" fill="currentColor"/>
      </svg>`;
    const pauseIcon = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <rect x="6"  y="4" width="4" height="16" fill="currentColor"/>
        <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
      </svg>`;

    musicBtn.innerHTML = playIcon;

    function setPlaying(isPlaying) {
      if (isPlaying) {
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = pauseIcon;
        musicBtn.setAttribute('aria-label', 'Pause music');
      } else {
        musicBtn.classList.remove('playing');
        musicBtn.innerHTML = playIcon;
        musicBtn.setAttribute('aria-label', 'Play music');
      }
      setVinylSpin(isPlaying);
      setSongCardPlaying(isPlaying);
    }

    function setSongCardPlaying(isPlaying) {
      if (!songCard) return;
      if (isPlaying) {
        songCard.classList.add('playing');
      } else {
        songCard.classList.remove('playing');
      }
    }

    musicBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      } else {
        audio.pause();
        setPlaying(false);
      }
    });

    audio.addEventListener('play',  () => setPlaying(true));
    audio.addEventListener('pause', () => setPlaying(false));
    audio.addEventListener('ended', () => setPlaying(false));

    // Try autoplay; browsers may block until first interaction.
    const tryAutoplay = () => {
      const p = audio.play();
      if (p && typeof p.then === 'function') {
        p.then(() => setPlaying(true)).catch(() => setPlaying(false));
      }
    };
    tryAutoplay();

    // Kick off on first tap anywhere (mobile autoplay policy)
    const startOnce = () => {
      if (audio.paused) tryAutoplay();
      document.removeEventListener('click',      startOnce);
      document.removeEventListener('touchstart', startOnce);
    };
    document.addEventListener('click',      startOnce);
    document.addEventListener('touchstart', startOnce);
  }

  // ---------- MESSAGE CARD MODAL ----------
  if (revealBtn && modal) {
    const openModal  = () => { modal.classList.add('active');    document.body.style.overflow = 'hidden'; };
    const closeModal = () => { modal.classList.remove('active'); document.body.style.overflow = ''; };

    revealBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
  }

})();
