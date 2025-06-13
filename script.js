  document.addEventListener('DOMContentLoaded', function() {
    // Gestion du thème sombre/clair
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Vérifier la préférence utilisateur
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    // Basculer le thème
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
        
        // Animation des lignes du burger
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
    
    // Éléments à observer
    document.querySelectorAll('.section, .skill-bar, .project-card, .achievement-card').forEach(el => {
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
            
            // Ici vous pouvez ajouter le code pour envoyer le formulaire
            alert('Message envoyé! (Fonctionnalité à implémenter)');
            contactForm.reset();
        });
    }
});