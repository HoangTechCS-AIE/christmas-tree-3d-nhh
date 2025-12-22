# 🎄 3D Interactive Christmas Tree

An immersive 3D Christmas tree experience built with Three.js, featuring hand gesture controls, dynamic snow effects, and customizable color themes.

![Christmas Tree Demo](https://img.shields.io/badge/Three.js-v0.160.0-green) ![MediaPipe](https://img.shields.io/badge/MediaPipe-Hand_Tracking-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🎨 6 Color Themes

- **Midnight Aurora** 🌌 - Neon green cyberpunk aesthetic
- **Sakura Dream** 🌸 - Pink and violet romantic theme
- **Ocean Breeze** 🌊 - Turquoise tropical vibes
- **Sunset Fire** 🔥 - Warm orange and gold tones
- **Forest Mystic** 🌲 - Natural green and gold
- **Arctic Frost** ❄️ - Icy white and blue wonderland

### ❄️ Dynamic Snow System

- 1200+ realistic snowflakes with physics simulation
- Gravity, wind drift, and turbulence effects
- Interactive hand gesture wind control
- Toggle on/off with smooth animations

### 🤚 Hand Gesture Controls (MediaPipe)

- **Wave hand** - Blow snow particles
- **Pinch fingers** - Focus on a photo
- **Make fist** - Return to tree mode
- **Open palm** - Scatter particles in 3D space

### 📸 Photo Upload

- Upload multiple images
- Photos displayed in metallic frames
- Integrated into particle system
- Responsive to all interaction modes

### 🎯 Three Viewing Modes

1. **TREE** - Traditional tree shape with rotating ornaments
2. **SCATTER** - 3D explosion of particles for photo viewing
3. **FOCUS** - Zoom into individual photos

## 🎮 Controls

| Key               | Action                         |
| ----------------- | ------------------------------ |
| **H**             | Hide/show UI controls          |
| **S**             | Toggle snow on/off             |
| **C**             | Cycle through color themes     |
| **Hand gestures** | Interactive control via webcam |

## 🚀 Quick Start

### Run Locally

Simply open `noel_nhh.html` in a modern web browser:

```bash
# Clone the repository
git clone git@github.com:HoangTechCS-AIE/christmas-tree-3d-nhh.git
cd christmas-tree-3d-nhh

# Open in browser (Linux)
xdg-open noel_nhh.html

# Or just double-click the file
```

### Requirements

- Modern web browser (Chrome, Firefox, Edge)
- Webcam (optional, for hand gesture controls)
- Internet connection (loads Three.js and MediaPipe from CDN)

## 🛠️ Technology Stack

- **Three.js** - 3D rendering and WebGL
- **MediaPipe** - Hand tracking AI
- **Vanilla JavaScript** - No framework dependencies
- **CDN-based** - No build process required

## 📦 Project Structure

```
christmas-tree-3d-nhh/
├── noel_nhh.html         # Main application (single file)
└── README.md             # This file
```

## 🎨 Technical Highlights

### Particle System

- 1500 ornaments (spheres, boxes, candy canes)
- 2500 ambient dust particles
- 1200 dynamic snowflakes
- **Total: 5200+ particles at 60 FPS**

### Graphics Features

- UnrealBloomPass post-processing
- PBR materials (metallic, emissive)
- Dynamic lighting (ambient, spot, directional)
- Tone mapping for realistic colors
- Exponential fog for depth

### Performance Optimizations

- Instanced rendering for snow
- Distance-based particle culling
- Smooth lerp animations
- Efficient material references

## 🎥 Demo

[Add screenshots or GIF here]

## 📝 License

MIT License - Feel free to use and modify!

## 👨‍💻 Author

Created with ❤️ by HoangTechCS-AIE

## 🙏 Credits

- Original code concept: anhduc.onlien
- Enhanced and extended with AI assistance
- Three.js library
- MediaPipe by Google

## 🌟 Future Ideas

- [ ] Snowflake texture variations
- [ ] Music visualizer integration
- [ ] Mobile touch controls
- [ ] VR mode support
- [ ] Save/share custom themes

---

**Merry Christmas! 🎅🎄✨**
