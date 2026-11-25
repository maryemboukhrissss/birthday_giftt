
const button = document.getElementById("unseal-button");
const welcome = document.getElementById("welcome");
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const kissScene = document.getElementById("kiss-scene");

const music = document.getElementById("background-music");
const musicButton = document.getElementById("music-button");
const video = document.getElementById("my-video");

const heartsContainer = document.getElementById("hearts");
const sparklesContainer = document.getElementById("sparkles");

let holdTimer;
let isOpened = false;

function startHolding() {
  if (isOpened) return;

  button.classList.add("is-holding");

  holdTimer = setTimeout(() => {
    openLetter();
  }, 1200);
}

function stopHolding() {
  clearTimeout(holdTimer);
  button.classList.remove("is-holding");
}

async function openLetter() {
  if (isOpened) return;

  isOpened = true;
  button.classList.remove("is-holding");

  envelope.classList.add("open");

  // Start the background music
  try {
    await music.play();
    musicButton.textContent = "♫ Pause music";
  } catch (error) {
    musicButton.textContent = "♫ Play music";
  }

  musicButton.hidden = false;

  setTimeout(() => {
    welcome.style.display = "none";

    letter.hidden = false;
    letter.classList.add("show-letter");

    startHearts();
    createSparkles();

    // Show the video after the letter
    setTimeout(() => {
      kissScene.hidden = false;
      kissScene.classList.add("show-kiss");

      video.play().catch(() => {
        console.log("Tap the video to play it.");
      });

      kissScene.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }, 3500);

  }, 850);
}

// Hold button events
button.addEventListener("pointerdown", startHolding);
button.addEventListener("pointerup", stopHolding);
button.addEventListener("pointerleave", stopHolding);
button.addEventListener("pointercancel", stopHolding);

// Music button
musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.textContent = "♫ Pause music";
    } catch (error) {
      musicButton.textContent = "♫ Play music";
    }
  } else {
    music.pause();
    musicButton.textContent = "♫ Play music";
  }
});

// Floating hearts
function createHeart() {
  const heart = document.createElement("div");

  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "♥" : "♡";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (15 + Math.random() * 25) + "px";
  heart.style.animationDuration = (5 + Math.random() * 5) + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 10000);
}

function startHearts() {
  setInterval(createHeart, 500);
}

// Sparkles
function createSparkles() {
  for (let i = 0; i < 35; i++) {
    const sparkle = document.createElement("div");

    sparkle.className = "sparkle";
    sparkle.textContent = "✦";

    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.top = Math.random() * 100 + "vh";
    sparkle.style.fontSize = (8 + Math.random() * 15) + "px";
    sparkle.style.animationDelay = Math.random() * 2 + "s";

    sparklesContainer.appendChild(sparkle);
  }
}

