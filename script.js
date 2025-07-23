document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('scrollable-gallery');

    let isDown = false; // Flag para saber se o botão do mouse está pressionado
    let startX;         // Posição X inicial do mouse
    let scrollLeft;     // Posição de rolagem inicial da galeria

    // Quando o botão do mouse é pressionado (inicia o arrasto)
    gallery.addEventListener('mousedown', (e) => {
        isDown = true;
        gallery.classList.add('active-drag'); // Adiciona classe para mudar o cursor
        startX = e.pageX - gallery.offsetLeft; // Calcula onde o clique começou na galeria
        scrollLeft = gallery.scrollLeft;       // Pega a posição de rolagem atual
    });

    // Quando o botão do mouse é solto (termina o arrasto)
    gallery.addEventListener('mouseleave', () => {
        isDown = false;
        gallery.classList.remove('active-drag');
    });

    // Quando o mouse sai da galeria (termina o arrasto)
    gallery.addEventListener('mouseup', () => {
        isDown = false;
        gallery.classList.remove('active-drag');
    });

    // Quando o mouse se move (durante o arrasto)
    gallery.addEventListener('mousemove', (e) => {
        if (!isDown) return; // Não faz nada se o botão do mouse não estiver pressionado
        e.preventDefault();  // Previne o comportamento padrão (ex: seleção de texto)
        const x = e.pageX - gallery.offsetLeft; // Posição X atual do mouse na galeria
        const walk = (x - startX) * 2; // Distância que o mouse se moveu (multiplicado por 2 para um scroll mais rápido)
        gallery.scrollLeft = scrollLeft - walk; // Ajusta a posição de rolagem
    });

    // --- Suporte para Toque em Dispositivos Móveis ---
    gallery.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - gallery.offsetLeft;
        scrollLeft = gallery.scrollLeft;
    });

    gallery.addEventListener('touchend', () => {
        isDown = false;
    });

    gallery.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - gallery.offsetLeft;
        const walk = (x - startX) * 1;
        gallery.scrollLeft = scrollLeft - walk;
    });
});