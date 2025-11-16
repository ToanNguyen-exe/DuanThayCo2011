function createStars() {
    const starsContainer = document.getElementById('stars');
    const numberOfStars = 100;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';

        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';

        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';

        starsContainer.appendChild(star);
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const stars = document.querySelectorAll('.star');

    stars.forEach((star, index) => {
        const speed = (index % 3 + 1) * 0.1;
        star.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.info-card, .hobby-item').forEach(el => {
    observer.observe(el);
});

document.addEventListener('click', (e) => {
    if (e.target.closest('.social-link, .info-card, .hobby-item')) {
        createParticles(e.clientX, e.clientY);
    }
});

function createParticles(x, y) {
    const colors = ['#4fc3f7', '#81c784', '#ffb74d', '#f48fb1'];

    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.boxShadow = '0 0 6px currentColor';

        const angle = (Math.PI * 2 * i) / 6;
        const velocity = 150;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        let opacity = 1;
        let currentX = x;
        let currentY = y;

        function animate() {
            currentX += vx * 0.02;
            currentY += vy * 0.02;
            particle.style.left = currentX + 'px';
            particle.style.top = currentY + 'px';
            opacity -= 0.03;
            particle.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }

        document.body.appendChild(particle);
        animate();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createStars();
    const cards = document.querySelectorAll('.info-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.2) + 's';
    });

    const hobbies = document.querySelectorAll('.hobby-item');
    hobbies.forEach((hobby, index) => {
        hobby.style.animationDelay = (index * 0.1) + 's';
    });
});

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'rainbow 2s ease-in-out';

        const toast = document.createElement('div');
        toast.className = 'position-fixed top-50 start-50 translate-middle bg-primary text-white p-3 rounded-3';
        toast.style.zIndex = '9999';
        toast.innerHTML = '<i class="bi bi-star-fill me-2"></i>Konami Code Activated! 🎉';
        document.body.appendChild(toast);

        setTimeout(() => {
            document.body.style.animation = '';
            toast.remove();
        }, 3000);

        if (!document.getElementById('rainbow-style')) {
            const style = document.createElement('style');
            style.id = 'rainbow-style';
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
});

const lazyElements = document.querySelectorAll('.info-card, .hobby-item');
const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

lazyElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    lazyObserver.observe(el);
});

document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });

    link.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

function typeWriter(element, text, speed = 100) {
    element.innerHTML = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    setTimeout(type, 1000);
}

const iconSVGs = {
    book: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
    star: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
    heart: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
    award: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>',
    graduation: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>',
    pencil: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>',
    flower: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15"></path><circle cx="12" cy="12" r="1"></circle><path d="m12 16 1 6"></path></svg>',
    trophy: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>',
    lightbulb: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>',
    sparkles: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>'
};

const colors = [
    '#FFD700', '#FF69B4', '#FF6B6B', '#4ECDC4',
    '#95E1D3', '#F8B500', '#FF85A1', '#A8E6CF', '#FFFFFF'
];

function createShootingStar() {
    const star = document.createElement('div');
    star.classList.add('shooting-star');

    const startLeft = Math.random() * window.innerWidth;
    star.style.left = `${startLeft}px`;
    const iconKeys = Object.keys(iconSVGs);
    const randomIcon = iconSVGs[iconKeys[Math.floor(Math.random() * iconKeys.length)]];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    star.innerHTML = randomIcon;

    const width = Math.random() * 20 + 30;
    const height = width;
    star.style.width = `${width}px`;
    star.style.height = `${height}px`;
    star.style.color = randomColor;

    const duration = Math.random() * 2 + 6;
    star.style.animationDuration = `${duration}s`;

    document.body.appendChild(star);

    star.addEventListener('animationend', () => {
        star.remove();
    });
}

function startMeteorShower() {
    setInterval(() => {
        const count = Math.floor(Math.random() * 10) + 1;
        for (let i = 0; i < count; i++) {
            createShootingStar();
        }
    }, 350);
}

startMeteorShower();

const modalData = {
    'tri-thuc': {
        title: 'Tri thức vô giá',
        message: 'Cảm ơn thầy cô đã truyền đạt những kiến thức quý báu, giúp chúng em có nền tảng vững chắc để bước vào đời. Mỗi bài học của thầy cô không chỉ là kiến thức mà còn là bài học về cuộc sống, về cách làm người.',
        images: [
            "img/triThuc/pngtree.jpg",
            'img/triThuc/transparent.png',
        ]
    },
    'dinh-huong': {
        title: 'Định hướng tương lai',
        message: 'Thầy cô đã giúp em tìm ra con đường phù hợp, soi sáng những ước mơ và khát vọng. Nhờ sự dìu dắt của thầy cô, em biết mình cần đi đâu và làm gì để đạt được thành công.',
        images: [
            'img/DinhHuong/2-loi-ich-cua-ky-nang-xac-dinh-muc-tieu.jpg',
            'img/DinhHuong/lap-ke-hoach-dinh-huong-nghe-nghiep-lau-dai.png'
        ]
    },
    'tinh-cam': {
        title: 'Tình thầy trò thiêng liêng',
        message: 'Tình cảm thầy trò là một trong những tình cảm đẹp đẽ nhất trên đời. Cảm ơn thầy cô đã không chỉ là người thầy mà còn là người bạn, người thân luôn quan tâm và chăm sóc chúng em.',
        images: [
            'img/tinhCam/tranh-ve-co-giao-dang-kinh_032049499.jpg'
        ]
    },
    'uoc-mo': {
        title: 'Ước mơ được thắp sáng',
        message: 'Thầy cô đã chắp cánh cho những ước mơ của em, giúp em tin tưởng vào bản thân và dám theo đuổi những điều mình mong muốn. Mỗi lời động viên của thầy cô là nguồn động lực để em tiến lên.',
        images: [
            'img/UocMo/Screenshot 2025-11-16 225441.png',
            'img/UocMo/Screenshot 2025-11-16 225914.png'
        ]
    },
    'cam-on': {
        title: 'Lời cảm ơn chân thành',
        message: 'Em xin gửi lời cảm ơn sâu sắc nhất đến thầy cô. Những gì thầy cô đã làm cho em không thể nào đo đếm được. Em sẽ luôn ghi nhớ công ơn dạy dỗ của thầy cô suốt cuộc đời.',
        images: [
            'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500',
            'https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=500',
            'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500'
        ]
    },
    'tuong-lai': {
        title: 'Tương lai tươi sáng',
        message: 'Nhờ có thầy cô, em tin rằng tương lai sẽ rất tươi sáng. Những kiến thức và kỹ năng thầy cô truyền đạt sẽ là nền tảng vững chắc giúp em vượt qua mọi thử thách trong cuộc sống.',
        images: [
            'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500',
            'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500',
            'https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=500'
        ]
    },
    'nho-mai': {
        title: 'Kỷ niệm không phai',
        message: 'Những kỷ niệm với thầy cô sẽ mãi mãi in đậm trong tâm trí em. Từng giờ học, từng lời dạy bảo đều là những kỷ niệm đẹp mà em sẽ không bao giờ quên.',
        images: [
            'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500',
            'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500',
            'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500'
        ]
    },
    'biet-on': {
        title: 'Tri ân sâu sắc',
        message: 'Em biết ơn thầy cô vô cùng. Thầy cô không chỉ dạy em kiến thức mà còn dạy em cách sống, cách yêu thương và quan tâm đến người khác. Công ơn thầy cô như biển trời bao la.',
        images: [
            'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500',
            'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=500'
        ]
    }
};

let currentImages = [];
let currentImageIndex = 0;
let imageInterval;

function openModal(type) {
    const data = modalData[type];
    const modal = document.getElementById('teacherModal');
    
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalMessage').textContent = data.message;
    
    currentImages = data.images;
    currentImageIndex = 0;
    document.getElementById('modalImage').src = currentImages[0];
    
    modal.classList.add('active');
    imageInterval = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
        const imgElement = document.getElementById('modalImage');
        imgElement.style.opacity = '0';
        
        setTimeout(() => {
            imgElement.src = currentImages[currentImageIndex];
            imgElement.style.opacity = '1';
        }, 300);
    }, 3000);
}

function closeModal() {
    const modal = document.getElementById('teacherModal');
    modal.classList.remove('active');
    clearInterval(imageInterval);
}
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('teacherModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
});