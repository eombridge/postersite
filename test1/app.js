// GSAP 애니메이션 설정
gsap.from(".big-title", {
    duration: 1,
    opacity: 0,
    y: -50,
    ease: "power2.out",
    onComplete: function() {
        gsap.to(".scroll-hint", { opacity: 1, duration: 0.5 });
        gsap.to(".down-arrow", { opacity: 1, duration: 0.5 });
    }
});

// ScrollTrigger와 snap 기능 적용
const colors = [
    '#1f300b',   // 첫 페이지 색상
    '#2d4734',   // 중간 색상 1
    '#4a6d43',   // 중간 색상 2
    '#a5d6a7',   // 중간 색상 3
    '#ffffff'    // 최종 페이지 색상
];

gsap.utils.toArray(".section-text").forEach((section, index) => {
    const nextColor = colors[index + 1] || colors[colors.length - 1];

    gsap.fromTo(section, 
    {
        opacity: 0,
        y: 100
    }, 
    {
        scrollTrigger: {
            trigger: section,
            start: "top top", // 스크롤 시작 지점
            end: "bottom top", // 스크롤 끝 지점
            toggleActions: "play none none reverse",
            snap: {
                snapTo: 1 / gsap.utils.toArray(".section-text").length, // snap 기능 추가
                duration: { min: 0.2, max: 0.3 },
                delay: 0.1,
                ease: "power1.inOut"
            },
            markers: false, // 디버깅 용도로 활성화 가능
            onEnter: () => {
                // 색상 전환 애니메이션
                gsap.to("body", { backgroundColor: nextColor, duration: 0.5 });
            }
        },
        opacity: 1,
        y: 0,
        duration: 0.5
    });
});

// 나뭇잎 애니메이션 생성
function createLeafAnimation() {
    for (let i = 0; i < 20; i++) {
        let leaf = document.createElement('div');
        leaf.className = 'leaf';
        leaf.style.left = Math.random() * 100 + 'vw';
        leaf.style.top = Math.random() * 100 + 'vh'; // 나뭇잎이 화면 안에 위치하도록
        leaf.style.animationDelay = Math.random() * 10 + 's';
        document.body.appendChild(leaf);
    }
}

createLeafAnimation();

// 마지막 페이지 전환 애니메이션
gsap.to(".final-page", {
    scrollTrigger: {
        trigger: ".final-page",
        start: "top top",
        end: "bottom top",
        scrub: 1
    },
    opacity: 1,
    duration: 0.5
});
