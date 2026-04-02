/* Tema Toggle - Dark/Light Mode */

/**
 * Função para inicializar o tema
 * Verifica se há preferência salva no localStorage ou usa a preferência do sistema
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme'); /* Recupera tema salvo */
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; /* Detecta preferência do sistema */
    const theme = savedTheme || systemTheme; /* Usa tema salvo ou preferência do sistema */

    document.documentElement.setAttribute('data-theme', theme); /* Aplica tema ao elemento raiz */
    updateThemeButton(theme); /* Atualiza ícone do botão */
}

/**
 * Função para alternar entre temas
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme'); /* Obtém tema atual */
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'; /* Alterna o tema */

    document.documentElement.setAttribute('data-theme', newTheme); /* Aplica novo tema */
    localStorage.setItem('theme', newTheme); /* Salva preferência no localStorage */
    updateThemeButton(newTheme); /* Atualiza ícone do botão */
}

/**
 * Função para atualizar o ícone do botão de tema
 * @param {string} theme - Tema atual ('dark' ou 'light')
 */
function updateThemeButton(theme) {
    const button = document.getElementById('theme-toggle'); /* Encontra botão */
    if (button) {
        /* Alterna ícone: sol para light mode, lua para dark mode */
        button.textContent = theme === 'dark' ? '☀️' : '🌙';
        button.setAttribute('aria-label', theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
    }
}

/* Inicializa o tema quando a página carrega */
document.addEventListener('DOMContentLoaded', () => {
    initTheme(); /* Carrega tema salvo ou preferência do sistema */
    
    /* Adiciona listener ao botão de alternância */
    const themeToggle = document.getElementById('theme-toggle'); /* Encontra botão */
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme); /* Chama toggleTheme ao clicar */
    }
});

/* Monitora mudanças nas preferências do sistema operacional */
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light'; /* Responde às mudanças do sistema */
        document.documentElement.setAttribute('data-theme', newTheme);
        updateThemeButton(newTheme);
    }
});
