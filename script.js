// ── Módulo: Navegación
const Nav = {
    init() {
        const toggle = document.getElementById('menu-toggle');
        const menu   = document.getElementById('nav-menu');
        const navbar = document.getElementById('main-nav');

        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggle.setAttribute('aria-expanded', menu.classList.contains('active'));
        });

        window.addEventListener('scroll', () => {
            navbar.style.backgroundColor = window.scrollY > 50 ? '#02445E' : '#267BB7';
            navbar.style.padding         = window.scrollY > 50 ? '10px 0' : '20px 0';
        });

        document.getElementById('scroll-top').addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
};

// ── Módulo: Tarjetas
const Cards = {
    init() {
        const cards      = document.querySelectorAll('.card');
        const searchInput = document.getElementById('site-search');

        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            cards.forEach(card => {
                card.style.display = card.getAttribute('data-title').toLowerCase().includes(term) ? 'block' : 'none';
            });
        });

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform  = 'scale(1.05)';
                card.style.boxShadow  = '0 10px 20px rgba(0,0,0,0.2)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform  = 'scale(1)';
                card.style.boxShadow  = 'none';
            });
            card.addEventListener('click', () => {
                const titulo = card.querySelector('h3').innerText;
                card.querySelector('p').innerText = `Seleccionado: ${titulo}`;
                card.setAttribute('data-seleccionado', 'true');
            });
        });
    }
};

// ── Módulo: Formulario
const Formulario = {
    mostrarError(id, msg) { document.getElementById(id).innerText = msg; },
    limpiarError(id)      { document.getElementById(id).innerText = ''; },

    init() {
        const form       = document.getElementById('contact-form');
        const formStatus = document.getElementById('form-status');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let valido = true;

            const nombre  = document.getElementById('nombre').value.trim();
            const email   = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            if (!nombre)                  { this.mostrarError('error-nombre',  'El nombre es obligatorio.'); valido = false; }
            else                            this.limpiarError('error-nombre');

            if (!emailRegex.test(email))  { this.mostrarError('error-email',   'Ingresa un correo válido.');  valido = false; }
            else                            this.limpiarError('error-email');

            if (!mensaje)                 { this.mostrarError('error-mensaje', 'El mensaje no puede estar vacío.'); valido = false; }
            else                            this.limpiarError('error-mensaje');

            if (!valido) return;

            formStatus.innerText = 'Enviando...';
            formStatus.style.color = 'blue';
            setTimeout(() => {
                formStatus.innerText = '¡Mensaje enviado con éxito!';
                formStatus.style.color = 'green';
                form.reset();
            }, 2000);
        });
    }
};

// ── Módulo: Avisos DOM
const Avisos = {
    contador: 1,

    init() {
        document.getElementById('btn-agregar-aviso').addEventListener('click', () => {
            const aviso = document.createElement('div');
            aviso.className = 'aviso-item';
            aviso.id = `aviso-${this.contador}`;
            aviso.innerHTML = `<p>Aviso municipal #${this.contador}</p>
                <button onclick="document.getElementById('aviso-${this.contador}').remove()">Eliminar</button>`;
            document.getElementById('avisos-container').appendChild(aviso);
            this.contador++;
        });
    }
};

// ── Inicio de la aplicación (ciclo de vida: DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => {
    Nav.init();
    Cards.init();
    Formulario.init();
    Avisos.init();
});
