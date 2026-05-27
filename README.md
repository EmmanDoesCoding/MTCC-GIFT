# Gift Website — How to Use

A private, blue-themed gift website. One home page (password-locked) and 17 personal pages — each with a song, portrait, name, and a hidden message card.

## 📁 Folder structure

```
gift_website/
├── index.html              ← home page (password-locked, only you use it)
├── styles.css              ← shared styles for all pages
├── script.js               ← shared script (music + message modal) for all pages
├── _template.html          ← reference template (not used at runtime, safe to delete)
├── pages/
│   ├── Akiko.html
│   ├── Adelaida.html
│   ├── Christian.html
│   ├── ... (17 total)
│   └── Doc_Bryan.html
└── assets/
    ├── images/             ← put portrait photos here (see naming below)
    └── music/              ← put mp3 song files here (see naming below)
```

## 🔐 Setting the home page password

Open `index.html` and find this line (around line 70):

```js
const PASSWORD = "myprivatekey";
```

Change `myprivatekey` to whatever you want. Save the file.

**Important:** this is a client-side gate. Anyone technical enough to view the page source can find the password. Use it as a friendly lock to keep accidental visitors out, not as real security.

## 🎵 Adding songs (mp3)

Place each person's song in `assets/music/` using this exact filename:

| Person          | Filename                          |
|-----------------|-----------------------------------|
| Akiko           | `assets/music/Akiko.mp3`          |
| Adelaida        | `assets/music/Adelaida.mp3`       |
| Christian       | `assets/music/Christian.mp3`      |
| Deo             | `assets/music/Deo.mp3`            |
| Johanna         | `assets/music/Johanna.mp3`        |
| Key             | `assets/music/Key.mp3`            |
| Cielo           | `assets/music/Cielo.mp3`          |
| Carlo           | `assets/music/Carlo.mp3`          |
| Gwy             | `assets/music/Gwy.mp3`            |
| Russel          | `assets/music/Russel.mp3`         |
| Russ            | `assets/music/Russ.mp3`           |
| Josh            | `assets/music/Josh.mp3`           |
| Sir Miguii      | `assets/music/Sir_Miguii.mp3`     |
| Sir Nheil       | `assets/music/Sir_Nheil.mp3`      |
| Ma'am Indira    | `assets/music/Maam_Indira.mp3`    |
| Ma'am Angelica  | `assets/music/Maam_Angelica.mp3`  |
| Doc Bryan       | `assets/music/Doc_Bryan.mp3`      |

If you'd rather use a different filename or extension, open the person's HTML file in `pages/` and update the line marked **`CHANGE THE FILE PATH BELOW`** (it's the `<audio>` tag near the top).

## 🖼️ Adding pictures

Each person needs **two images** in `assets/images/`:

| Image | Filename | Example |
|-------|----------|---------|
| Portrait photo (front of flip card) | `NAME.jpg` | `Akiko.jpg` |
| Album art (vinyl center label) | `NAME_album.jpg` | `Akiko_album.jpg` |

**Portrait:** square crop, 800×800px, face centered.
**Album art:** the square cover of the song you chose — download from Spotify, Apple Music, or a Google Image search. Any size works; it gets cropped circular.

The files below still follow the same naming as before (just add `_album` for the second image):

- `assets/images/Akiko.jpg`
- `assets/images/Adelaida.jpg`
- ... and so on

If your photo is a `.png` instead, open the person's HTML file and change `.jpg` to `.png` in the line marked **`CHANGE THE IMAGE PATH BELOW`**.

**Tip:** photos look best when they're roughly square (the frame is circular). 600×600 to 1200×1200 px works great.

## ✍️ Writing the messages

Open any person's HTML file in `pages/` (for example, `pages/Akiko.html`). Find the block marked:

```html
<!-- >>> WRITE THE MESSAGE BELOW <<< -->
<div class="card-body">Dear Akiko,

This is a placeholder message...
</div>
```

Replace the placeholder text with your own. Plain text works — press Enter for new paragraphs. The card stays the same size and scrolls if your message is long.

You can also change the signature at the bottom (`— with warmth`) and the title above the message (`For Akiko`).

## 📱 Generating QR codes

Once the site is hosted (GitHub Pages, Netlify, Vercel, etc.), each person's URL will look like:

```
https://yoursite.com/pages/Akiko.html
https://yoursite.com/pages/Adelaida.html
...
```

Paste each URL into any QR code generator (qr-code-generator.com, qrcode-monkey.com, etc.), download the QR, and give it to that person. They'll land directly on their page — no home page, no back button.

## 🎨 What's included

- **Aurora midnight-blue theme** with subtle starfield and animated gradients
- **Fully responsive** — works on phones, tablets, and desktops
- **Password-locked home page** (session-persistent so you don't re-enter on every refresh)
- **Auto-playing music** with a floating play/pause button (browsers may require one tap before audio starts — this is normal)
- **Rotating portrait frame** with a glowing aurora ring
- **Pop-up message card** with a fixed size and scroll for long letters
- **Staggered animations** on the home grid

## 🧪 Testing locally

Because of audio autoplay rules, simply double-clicking `index.html` may block music. To test properly, run a tiny local server from the `gift_website` folder:

```bash
# Python (any version 3.x)
python3 -m http.server 8000

# then visit
http://localhost:8000
```

Enjoy. 💙
