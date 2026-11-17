const LEVELS = [
  { label: "Very weak", color: "#ef4444", width: "20%" },
  { label: "Weak", color: "#f97316", width: "40%" },
  { label: "Fair", color: "#eab308", width: "60%" },
  { label: "Strong", color: "#22c55e", width: "80%" },
  { label: "Very strong", color: "#15803d", width: "100%" },
];

const $ = (id) => document.getElementById(id);

// Strength check using zxcvbn
$("password").addEventListener("input", (e) => {
  const pw = e.target.value;
  const bar = $("bar");
  if (!pw) {
    bar.style.width = "0";
    $("score-label").textContent = "Start typing to check strength.";
    $("crack-time").textContent = "";
    $("suggestions").innerHTML = "";
    return;
  }
  const result = zxcvbn(pw);
  const level = LEVELS[result.score];
  bar.style.width = level.width;
  bar.style.background = level.color;
  $("score-label").textContent = `Strength: ${level.label}`;
  $("crack-time").textContent =
    `Estimated time to crack (offline, slow hash): ${result.crack_times_display.offline_slow_hashing_1e4_per_second}`;
  $("suggestions").innerHTML = "";
  const tips = [...(result.feedback.warning ? [result.feedback.warning] : []), ...result.feedback.suggestions];
  tips.forEach((tip) => {
    const li = document.createElement("li");
    li.textContent = tip;
    $("suggestions").appendChild(li);
  });
});

$("toggle").addEventListener("click", () => {
  const input = $("password");
  const show = input.type === "password";
  input.type = show ? "text" : "password";
  $("toggle").textContent = show ? "Hide" : "Show";
});

$("length").addEventListener("input", (e) => {
  $("length-value").textContent = e.target.value;
});

// Secure random password generator using Web Crypto API
function randomIndex(max) {
  // Rejection sampling avoids modulo bias
  const limit = Math.floor(0x100000000 / max) * max;
  const buf = new Uint32Array(1);
  let x;
  do {
    crypto.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return x % max;
}

function generatePassword() {
  let charset = "";
  if ($("upper").checked) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if ($("lower").checked) charset += "abcdefghijklmnopqrstuvwxyz";
  if ($("digits").checked) charset += "0123456789";
  if ($("symbols").checked) charset += "!@#$%^&*()-_=+[]{};:,.?";
  if (!charset) {
    alert("Select at least one character type.");
    return "";
  }
  const length = Number($("length").value);
  let pw = "";
  for (let i = 0; i < length; i++) {
    pw += charset[randomIndex(charset.length)];
  }
  return pw;
}

$("generate").addEventListener("click", () => {
  const pw = generatePassword();
  if (pw) $("generated").value = pw;
});

$("copy").addEventListener("click", async () => {
  const value = $("generated").value;
  if (!value) return;
  await navigator.clipboard.writeText(value);
  $("copy").textContent = "Copied!";
  setTimeout(() => ($("copy").textContent = "Copy"), 1200);
});
