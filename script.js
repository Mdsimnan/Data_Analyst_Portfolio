const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle{
    constructor(){
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.vx = (Math.random()-0.5)*1;
        this.vy = (Math.random()-0.5)*1;
        this.radius = 2;
    }

    update(){
        this.x+=this.vx;
        this.y+=this.vy;

        if(this.x<0||this.x>canvas.width) this.vx*=-1;
        if(this.y<0||this.y>canvas.height) this.vy*=-1;
    }

    draw(){
        ctx.fillStyle="#37e2ff";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();
    }
}

function connect(){
    for(let a=0;a<particles.length;a++){
        for(let b=a;b<particles.length;b++){
            let dx=particles[a].x-particles[b].x;
            let dy=particles[a].y-particles[b].y;
            let dist=Math.sqrt(dx*dx+dy*dy);

            if(dist<120){
                ctx.strokeStyle="rgba(55,226,255,"+(1-dist/120)+")";
                ctx.lineWidth=0.5;
                ctx.beginPath();
                ctx.moveTo(particles[a].x,particles[a].y);
                ctx.lineTo(particles[b].x,particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function init(){
    for(let i=0;i<100;i++){
        particles.push(new Particle());
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
        p.update();
        p.draw();
    });
    connect();
    requestAnimationFrame(animate);
}

init();
animate();


// ===============================
// NAVIGATION SECTION SWITCHING
// ===============================

const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll(".section");

navLinks.forEach(link => {

    link.addEventListener("click", function () {

        let target = this.getAttribute("data-section");

        document.getElementById(target).scrollIntoView({
            behavior: "smooth"
        });

    });

});


// ===============================
// SMOOTH CONSTELLATION CURSOR
// ===============================

const cursorCanvas = document.getElementById("cursorCanvas");
const cctx = cursorCanvas.getContext("2d");

cursorCanvas.width = window.innerWidth;
cursorCanvas.height = window.innerHeight;

let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

let trail = [];

class CursorParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 2;
    }

    draw() {
        cctx.fillStyle = "#37e2ff";
        cctx.beginPath();
        cctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        cctx.fill();
    }
}

document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function animateCursor() {
    cctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);

    // Smooth follow (lerp effect)
    current.x += (mouse.x - current.x) * 0.15;
    current.y += (mouse.y - current.y) * 0.15;

    trail.push(new CursorParticle(current.x, current.y));

    if (trail.length > 25) {
        trail.shift();
    }

    for (let i = 0; i < trail.length; i++) {
        trail[i].draw();

        if (i > 0) {
            cctx.strokeStyle = "rgba(55,226,255,0.4)";
            cctx.lineWidth = 1;
            cctx.beginPath();
            cctx.moveTo(trail[i - 1].x, trail[i - 1].y);
            cctx.lineTo(trail[i].x, trail[i].y);
            cctx.stroke();
        }
    }

    requestAnimationFrame(animateCursor);
}

animateCursor();
// Show home section by default
window.addEventListener("DOMContentLoaded", () => {
    sections.forEach(section => section.classList.remove("active-section"));
    navLinks.forEach(link => link.classList.remove("active"));

    document.getElementById("home").classList.add("active-section");
    document.querySelector('[data-section="home"]').classList.add("active");
});
const toggleBtn = document.getElementById("themeToggle");

// Load saved theme
if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light-mode");
    toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem("theme", "light");
    } else {
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem("theme", "dark");
    }
});
ctx.fillStyle = document.body.classList.contains("light-mode")
    ? "#0077ff"
    : "#37e2ff";
    const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

navLinks.forEach(link=>{
link.classList.remove("active");
});

document.querySelector(`[data-section="${entry.target.id}"]`)
.classList.add("active");

}

});

},{
rootMargin: "-40% 0px -50% 0px"
});

sections.forEach(section=>{
observer.observe(section);
});

sections.forEach(section=>{
    observer.observe(section);
});
// HERO BUTTONS NAVIGATION

const heroProjectBtn = document.getElementById("view-project-btn");
const heroContactBtn = document.getElementById("contact-btn");

if(heroProjectBtn){
heroProjectBtn.addEventListener("click", function(e){
    e.preventDefault();

    document.getElementById("projects").scrollIntoView({
        behavior: "smooth"
    });
});
}

if(heroContactBtn){
heroContactBtn.addEventListener("click", function(e){
    e.preventDefault();

    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });
});
}