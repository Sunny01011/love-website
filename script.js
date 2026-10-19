
/* =====================================
   1. PHONG THƯ BÍ MẬT
===================================== */

const envelopeButton = document.getElementById("envelopeButton");
const envelopeLabel = document.getElementById("envelopeLabel");
const letter = document.getElementById("letter");

envelopeButton.addEventListener("click", function () {
  const isOpening = letter.hidden;

  letter.hidden = !isOpening;

  envelopeButton.classList.toggle("opened", isOpening);
  envelopeButton.setAttribute("aria-expanded", String(isOpening));

  envelopeLabel.textContent = isOpening
    ? "Đóng phong thư lại"
    : "Mở phong thư nhé";

  if (isOpening) {
    letter.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
});


/* =====================================
   2. TRÁI TIM BAY KHI NHẤN CHUỘT
===================================== */

document.addEventListener("click", function (event) {
  // Không tạo tim khi bấm vào nút hoặc liên kết.
  if (event.target.closest("button, a")) {
    return;
  }

  // Không tạo tim khi bấm trong nội dung bức thư.
  if (event.target.closest(".letter")) {
    return;
  }

  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = ["♥", "♡", "❤"][Math.floor(Math.random() * 3)];

  heart.style.left = event.clientX + "px";
  heart.style.top = event.clientY + "px";
  heart.style.fontSize = (16 + Math.random() * 18) + "px";
  heart.style.setProperty(
    "--drift",
    (Math.random() * 100 - 50) + "px"
  );

  document.body.appendChild(heart);

  heart.addEventListener("animationend", function () {
    heart.remove();
  });
});


/* =====================================
   3. ALBUM ẢNH
===================================== */

// Thay URL bằng ảnh của m nếu muốn.
const photos = [
  {
    src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=85",
    caption: "Có những khoảnh khắc chỉ cần nhớ lại cũng thấy vui."
  },
  {
    src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=85",
    caption: "Mong những ngày bình thường cũng trở nên đặc biệt."
  },
  {
    src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1000&q=85",
    caption: "Và mong những điều tốt đẹp sẽ luôn ở phía trước."
  }
];

let currentPhoto = 0;

const galleryImage = document.getElementById("galleryImage");
const photoCaption = document.getElementById("photoCaption");
const photoNumber = document.getElementById("photoNumber");
const galleryDots = document.getElementById("galleryDots");

function showPhoto(index) {
  currentPhoto = (index + photos.length) % photos.length;

  const photo = photos[currentPhoto];

  galleryImage.style.opacity = "0";

  const newImage = new Image();

  newImage.onload = function () {
    galleryImage.src = photo.src;
    galleryImage.alt = photo.caption;
    galleryImage.style.opacity = "1";
  };

  newImage.onerror = function () {
    galleryImage.style.opacity = "1";
    photoCaption.textContent =
      "Không tải được ảnh. Hãy kiểm tra đường dẫn ảnh.";
  };

  newImage.src = photo.src;

  photoCaption.textContent = photo.caption;

  photoNumber.textContent =
    String(currentPhoto + 1).padStart(2, "0") +
    " / " +
    String(photos.length).padStart(2, "0");

  document.querySelectorAll(".gallery-dot").forEach(function (dot, i) {
    dot.classList.toggle("active", i === currentPhoto);
  });
}

photos.forEach(function (_, index) {
  const dot = document.createElement("button");

  dot.className = "gallery-dot";
  dot.type = "button";
  dot.setAttribute("aria-label", "Xem ảnh " + (index + 1));

  dot.addEventListener("click", function () {
    showPhoto(index);
  });

  galleryDots.appendChild(dot);
});

document.getElementById("prevPhoto").addEventListener("click", function () {
  showPhoto(currentPhoto - 1);
});

document.getElementById("nextPhoto").addEventListener("click", function () {
  showPhoto(currentPhoto + 1);
});

showPhoto(0);


/* =====================================
   4. NHẠC NỀN BẬT / TẮT
===================================== */

const musicButton = document.getElementById("musicButton");
const backgroundMusic = document.getElementById("backgroundMusic");

musicButton.addEventListener("click", async function () {
  if (!backgroundMusic.paused) {
    backgroundMusic.pause();
    musicButton.textContent = "♫ Bật nhạc";
    return;
  }

  try {
    await backgroundMusic.play();
    musicButton.textContent = "♫ Tắt nhạc";
  } catch (error) {
    musicButton.textContent = "Chưa phát được nhạc";
    console.error("Không thể phát nhạc:", error);
  }
});

backgroundMusic.addEventListener("error", function () {
  musicButton.textContent = "Thêm file music.mp3";
});


/* =====================================
   5. ĐẾM NGÀY ĐẶC BIỆT
===================================== */

// Đổi ngày này thành ngày m muốn kỷ niệm.
// Định dạng: NĂM-THÁNG-NGÀY
const specialDate = "2026-01-01";

function updateCountdown() {
  const [year, month, day] = specialDate.split("-").map(Number);

  const start = new Date(year, month - 1, day);
  const today = new Date();

  // Chỉ so sánh ngày, không tính chênh lệch theo giờ.
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const difference = today.getTime() - start.getTime();

  const dayCount = document.getElementById("dayCount");
  const countdownLabel = document.getElementById("countdownLabel");

  if (Number.isNaN(start.getTime())) {
    dayCount.textContent = "—";
    countdownLabel.textContent = "Ngày được chọn không hợp lệ.";
    return;
  }

  if (difference < 0) {
    dayCount.textContent = "♡";
    countdownLabel.textContent =
      "Ngày đặc biệt ấy vẫn đang ở phía trước.";
    return;
  }

  dayCount.textContent = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  ).toLocaleString("vi-VN");

  countdownLabel.textContent =
    "Thời gian kể từ ngày " +
    String(day).padStart(2, "0") + "/" +
    String(month).padStart(2, "0") + "/" +
    year + ".";
}

updateCountdown();
