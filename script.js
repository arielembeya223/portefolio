document.addEventListener('DOMContentLoaded', function() {
    // Configuration des chemins selon votre structure
    const CONFIG = {
        certificationsPath: 'certifications/',
        fraudImagesPath: 'images/fraud/',
        freeImagesPath: 'images/free/',
        githubProfile: 'https://github.com/arielembeya223',
        projectRepos: {
            fraud: 'https://github.com/arielembeya223/fraude-detection',
            free: 'https://github.com/arielembeya223/free-project'
        }
    };

    // Gestion du thème sombre/clair
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Menu burger pour mobile
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
        
        document.querySelectorAll('.burger div').forEach((line, index) => {
            line.style.transition = `transform 0.3s ease ${index * 0.1}s`;
        });
    });
    
    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
        });
    });
    
    // Charger les certifications
    function loadCertifications() {
        const grid = document.querySelector('.certifications-grid');
        if (!grid) return;
        
        // Noms de vos certifications réelles
        const certifications = [
            { 
                name: "Certification Data Science", 
                date: "2024",
                filename: "certif-1.jpeg"
            },
            { 
                name: "Certification Fullstack Development", 
                date: "2024",
                filename: "certif-2.jpeg"
            }
        ];
        
        certifications.forEach((cert, index) => {
            const card = document.createElement('div');
            card.className = 'certification-card';
            card.innerHTML = `
                <div class="certification-image">
                    <img src="${CONFIG.certificationsPath}${cert.filename}" alt="${cert.name}"
                         onerror="this.onerror=null; this.src='https://via.placeholder.com/400x200/6c5ce7/ffffff?text=${encodeURIComponent(cert.name)}'">
                </div>
                <div class="certification-info">
                    <h3>${cert.name}</h3>
                    <p>Certification obtenue en ${cert.date}</p>
                    <span class="certification-date">${cert.date}</span>
                </div>
            `;
            grid.appendChild(card);
            
            // Observer la carte
            observer.observe(card);
        });
    }
    
    // Configurer les carrousels de projets avec vos images réelles
    function setupProjectCarousels() {
        const carousels = document.querySelectorAll('.project-carousel');
        
        // Images pour le projet fraud detection (basées sur vos noms de fichiers)
        const fraudImages = [
            'fraud1.jpeg',
            'fraud2.jpeg',
            'fraud3.jpeg',
            'fraud4.jpeg'
        ];
        
        // Images pour le projet free
        const freeImages = [
            'free1.jpeg',
            'free2.jpeg',
            'free3.jpeg'
        ];
        
        carousels.forEach(carousel => {
            const projectType = carousel.dataset.project;
            const imagePath = projectType === 'fraud' ? CONFIG.fraudImagesPath : CONFIG.freeImagesPath;
            const images = projectType === 'fraud' ? fraudImages : freeImages;
            
            // Créer les slides
            images.forEach((img, index) => {
                const slide = document.createElement('div');
                slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
                slide.innerHTML = `<img src="${imagePath}${img}" alt="Image ${index + 1} du projet ${projectType}"
                                     onerror="this.onerror=null; this.src='https://via.placeholder.com/600x400/6c5ce7/ffffff?text=${projectType === 'fraud' ? 'Fraud+Detection' : 'Free+Project'}+${index + 1}'">`;
                carousel.appendChild(slide);
            });
            
            // Ajouter les contrôles
            const controls = document.createElement('div');
            controls.className = 'carousel-controls';
            images.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
                dot.addEventListener('click', () => showSlide(carousel, index));
                controls.appendChild(dot);
            });
            carousel.appendChild(controls);
            
            // Démarrer le carousel automatique
            startCarousel(carousel);
        });
    }
    
    function showSlide(carousel, index) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.carousel-dot');
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    function startCarousel(carousel) {
        let currentIndex = 0;
        const slides = carousel.querySelectorAll('.carousel-slide');
        
        if (slides.length === 0) return;
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(carousel, currentIndex);
        }, 3000);
    }
    
    // Animation des compétences
    const animateSkills = () => {
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level + '%';
        });
    };
    
    // Animation au défilement
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skill-bar')) {
                    animateSkills();
                }
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    // Observer tous les éléments
    document.querySelectorAll('.section, .skill-bar, .project-card, .certification-card').forEach(el => {
        observer.observe(el);
    });
    
    // Effet parallaxe sur les photos
    const imageContainer = document.querySelector('.image-container');
    if (imageContainer) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            imageContainer.style.transform = `translateY(${scrollY * 0.1}px)`;
        });
    }
    
    // Mise à jour de l'année dans le footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Animation des cartes de projet au survol
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const x = e.clientX - card.getBoundingClientRect().left;
            const y = e.clientY - card.getBoundingClientRect().top;
            
            const centerX = card.offsetWidth / 2;
            const centerY = card.offsetHeight / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // Gestion du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message envoyé! (Fonctionnalité à implémenter)');
            contactForm.reset();
        });
    }
    
    // Ajouter le lien GitHub sur les photos de profil
    document.querySelectorAll('.profile-link, .about-image a').forEach(link => {
        link.href = CONFIG.githubProfile;
        link.target = '_blank';
    });
    
    // Initialiser les fonctionnalités
    loadCertifications();
    setupProjectCarousels();
    
    // Vérifier les chemins des images dans la console pour déboguer
    console.log('Configuration des chemins:');
    console.log('- Certifications:', CONFIG.certificationsPath);
    console.log('- Images fraud:', CONFIG.fraudImagesPath);
    console.log('- Images free:', CONFIG.freeImagesPath);
});