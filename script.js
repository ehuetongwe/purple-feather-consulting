// ── Purple Feather Consulting — Interactive Scripts ──

document.addEventListener('DOMContentLoaded', () => {

    // ── SCROLL REVEAL ──
    // Elements with class "reveal" fade in when they enter the viewport
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ── NAV SHRINK ON SCROLL ──
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // ── HAMBURGER MENU ──
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');

            if (mobileNav.classList.contains('open')) {
                // Close: fade out then hide
                mobileNav.style.opacity = '0';
                setTimeout(() => {
                    mobileNav.classList.remove('open');
                    document.body.style.overflow = '';
                }, 350);
            } else {
                // Open: show then fade in
                mobileNav.classList.add('open');
                mobileNav.style.opacity = '0';
                document.body.style.overflow = 'hidden';
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        mobileNav.style.opacity = '1';
                    });
                });
            }
        });

        // Close mobile nav when a link is clicked
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileNav.style.opacity = '0';
                setTimeout(() => {
                    mobileNav.classList.remove('open');
                    document.body.style.overflow = '';
                }, 350);
            });
        });
    }

    // ── SMOOTH PARALLAX ON HERO ──
    const heroSection = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-feather-bg');

    if (heroSection && heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroHeight = heroSection.offsetHeight;
            if (scrolled < heroHeight) {
                const parallaxOffset = scrolled * 0.15;
                heroBg.style.transform = `translateY(calc(-50% + ${parallaxOffset}px))`;
            }
        }, { passive: true });
    }

    // ── STAT COUNTER ANIMATION ──
    // Animates stat numbers counting up when they become visible
    const statNums = document.querySelectorAll('.stat-num');

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const textContent = el.textContent.replace(/[^0-9]/g, '');
                const target = parseInt(textContent, 10);

                if (!isNaN(target) && target > 0) {
                    // Store original HTML to preserve spans
                    const originalHTML = el.innerHTML;
                    let current = 0;
                    const duration = 1200;
                    const increment = target / (duration / 16);

                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(counter);
                            el.innerHTML = originalHTML; // restore original with spans
                        } else {
                            el.innerHTML = originalHTML.replace(target.toString(), Math.floor(current).toString());
                        }
                    }, 16);
                }
                statObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(el => statObserver.observe(el));

});
