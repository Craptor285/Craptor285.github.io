/* =========================================================
   Toast (reemplaza al alert original)
   ========================================================= */
function out(){
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
}

document.addEventListener('DOMContentLoaded', () => {

    /* =====================================================
       Nav: aparece/oculta fondo al hacer scroll
       ===================================================== */
    const nav = document.getElementById('nav');
    const hero = document.querySelector('.hero');

    if (nav && hero) {
        const navObserver = new IntersectionObserver(([entry]) => {
            nav.classList.toggle('active', !entry.isIntersecting);
        }, { rootMargin: `-${nav.offsetHeight}px 0px 0px 0px`, threshold: 0 });
        navObserver.observe(hero);
    }

    /* =====================================================
       Menú móvil
       ===================================================== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* =====================================================
       Scroll suave para enlaces internos
       ===================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    /* =====================================================
       Revelado de elementos al hacer scroll
       ===================================================== */
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealEls.forEach(el => revealObserver.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('in-view'));
    }

    /* =====================================================
       Línea de progreso del timeline (estilo git log)
       ===================================================== */
    const timelineSection = document.getElementById('timelineSection');
    const timelineProgress = document.getElementById('timelineProgress');

    function updateTimelineProgress() {
        if (!timelineSection || !timelineProgress) return;
        const rect = timelineSection.getBoundingClientRect();
        const viewportH = window.innerHeight;

        const total = rect.height;
        const visible = Math.min(Math.max(viewportH * 0.5 - rect.top, 0), total);
        const percent = total > 0 ? (visible / total) * 100 : 0;

        timelineProgress.style.height = `${percent}%`;
    }

    window.addEventListener('scroll', updateTimelineProgress, { passive: true });
    window.addEventListener('resize', updateTimelineProgress);
    updateTimelineProgress();

    /* =====================================================
       Terminal: efecto de escritura en el hero
       ===================================================== */
    const terminalBody = document.getElementById('terminalBody');
    const terminalLines = [
        { type: 'prompt', text: '$ whoami' },
        { type: 'output', text: '> carlos_lara — estudiante de Ing. en TI' },
        { type: 'prompt', text: '$ cat pasiones.txt' },
        { type: 'output', text: '> programación · ciencia de datos · dev web · IA · videojuegos' },
        { type: 'prompt', text: '$ echo $STATUS' },
        { type: 'output', text: '> disponible para prácticas y proyectos' }
    ];

    function typeTerminal() {
        if (!terminalBody) return;
        let lineIndex = 0;
        let charIndex = 0;
        const cursor = document.createElement('span');
        cursor.className = 'cursor';

        function typeChar() {
            if (lineIndex >= terminalLines.length) {
                terminalBody.appendChild(cursor);
                return;
            }
            const line = terminalLines[lineIndex];

            if (charIndex === 0) {
                const lineEl = document.createElement('div');
                lineEl.className = line.type;
                lineEl.dataset.lineIndex = lineIndex;
                terminalBody.appendChild(lineEl);
            }

            const lineEl = terminalBody.querySelector(`[data-line-index="${lineIndex}"]`);
            if (lineEl) lineEl.textContent = line.text.slice(0, charIndex + 1);

            charIndex++;
            if (charIndex < line.text.length) {
                setTimeout(typeChar, 18);
            } else {
                lineIndex++;
                charIndex = 0;
                setTimeout(typeChar, 260);
            }
        }
        typeChar();
    }

    if (terminalBody) {
        if ('IntersectionObserver' in window) {
            const terminalObserver = new IntersectionObserver(([entry], obs) => {
                if (entry.isIntersecting) {
                    typeTerminal();
                    obs.disconnect();
                }
            }, { threshold: 0.3 });
            terminalObserver.observe(terminalBody);
        } else {
            typeTerminal();
        }
    }
});