// --- 1. DADOS (Cardápio Completo com as Novas Pizzas) ---
const menuPadrao = [
    // --- PIZZAS TRADICIONAIS ---
    { id: 1, name: "Calabresa", price: 60.00, category: "pizza", desc: "Mussarela, calabresa, cebola e orégano.", img: "https://img.freepik.com/fotos-gratis/pizza-fresca-com-cogumelos-e-calabresa_140725-1152.jpg" },
    { id: 2, name: "Frango c/ Catupiry", price: 60.00, category: "pizza", desc: "Frango desfiado, catupiry original e milho.", img: "https://img.freepik.com/fotos-premium/deliciosa-pizza-brasileira-de-frango-com-catupiry_284424-490.jpg" },
    { id: 3, name: "Arrumadinho", price: 60.00, category: "pizza", desc: "Carne do sol, calabresa, queijo coalho e cebola.", img: "https://pizzariadomleo.com.br/wp-content/uploads/2017/05/nordestina-2.jpg" },
    { id: 4, name: "Top Baiana", price: 60.00, category: "pizza", desc: "A especial da casa: Tudo que você tem direito.", img: "https://s2.glbimg.com/wM0lwa9Xcfq_X4vM94TSu_TKyBw=/620x455/e.glbimg.com/og/ed/f/original/2020/07/09/pizza_de_liquidificador_de_calabresa_bacon_e_milho.jpg" },

    // --- NOVAS PIZZAS ADICIONADAS (IDs 9 a 12) ---
    { id: 9, name: "Portuguesa", price: 65.00, category: "pizza", desc: "Presunto, ovos, cebola, ervilha e mussarela.", img: "https://pizzariadomleo.com.br/wp-content/uploads/2017/05/portuguesa-2.jpg" },
    { id: 10, name: "Quatro Queijos", price: 68.00, category: "pizza", desc: "Mussarela, provolone, parmesão e gorgonzola.", img: "https://claudia.abril.com.br/wp-content/uploads/2020/02/pizza-quatro-queijos-1.jpg" },
    { id: 11, name: "Marguerita", price: 60.00, category: "pizza", desc: "Mussarela, rodelas de tomate e manjericão fresco.", img: "https://s2.glbimg.com/7tM-vP9j-jYlC6d02HqMvD8M9a8=/0x0:1280x853/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e3b9d70419497b71236132252d5/internal_photos/bs/2022/e/1/6e2z70S62qX0A2qJgB2A/pizza-margherita.jpg" },
    { id: 12, name: "Bacon com Milho", price: 62.00, category: "pizza", desc: "Mussarela, bacon crocante em cubos e milho.", img: "https://www.receiteria.com.br/wp-content/uploads/receitas-de-pizza-de-bacon-0.png" },
    { id: 77, name: "Teste", price: 100.00, category: "pizza", desc: "Teste.", img: "https://www.receiteria.com.br/wp-content/uploads/receitas-de-pizza-de-bacon-0.png" },

    // --- COMBOS ---
    { id: 5, name: "Combo Mozão", price: 80.00, category: "combo", desc: "Pizza Coração + Refri. Perfeito para casal.", img: "https://i.pinimg.com/736x/21/16/d7/2116d783ae50d58ae258984415b1084e.jpg" },

    // --- BEBIDAS (IDs 6 e 7 usados no HTML) ---
    { id: 6, name: "Pepsi 1L", price: 8.00, category: "bebida", desc: "Gelada", img: "https://m.media-amazon.com/images/I/61N80N48JJS._AC_UF1000,1000_QL80_.jpg" },
    { id: 7, name: "Guaraná 1L", price: 8.00, category: "bebida", desc: "Gelada", img: "https://ibassets.com.br/ib.item.image.big/b-28ec7a229fb442159261971424554e5d.jpg" },

    // --- PROMOÇÕES (IDs usados nos botões do HTML) ---
    { id: 99, name: "PROMO: 2 Calabresas", price: 100.00, category: "promo", desc: "Promoção Dupla Calabresa", img: "" },
    { id: 30, name: "PROMO: Combo Família", price: 85.00, category: "promo", desc: "1 Pizza G + 1 Refri 2L", img: "" },
    { id: 31, name: "PROMO: Trio Galera", price: 160.00, category: "promo", desc: "3 Pizzas Tradicionais", img: "" },
    { id: 32, name: "PROMO: Pizza + Broto", price: 80.00, category: "promo", desc: "1 Salgada + 1 Broto Doce", img: "" }
];

// Lista de adicionais pagos
const opcionais = [
    { name: "Borda de Catupiry", price: 10.00 },
    { name: "Borda de Cheddar", price: 10.00 },
    { name: "Bacon Extra", price: 8.00 },
    { name: "Queijo Extra", price: 8.00 }
];

// Variável para saber qual item estamos editando no modal
let itemSelecionado = null; 

// --- 2. CARREGA OS DADOS (Forçando atualização v5) ---
let menuItems = menuPadrao; 
localStorage.setItem('topBaiana_v6', JSON.stringify(menuPadrao));

let cart = [];

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    // Como você inseriu o HTML manualmente, vamos apenas ativar os botões
    // sem apagar o seu HTML. Mas se o HTML estiver vazio, o renderizar preenche.
    renderizarCardapio(); 
    setupNavigation();    
    
    const checkoutBtn = document.getElementById('checkout-btn');
    if(checkoutBtn) checkoutBtn.addEventListener('click', finalizarPedido);
    
    const paySelect = document.getElementById('payment-select');
    if(paySelect) {
        paySelect.addEventListener('change', (e) => {
            const trocoDiv = document.getElementById('troco-div');
            if(trocoDiv) trocoDiv.style.display = e.target.value === 'Dinheiro' ? 'block' : 'none';
        });
    }
});

// --- 3. FUNÇÃO DE RENDERIZAÇÃO ---
function renderizarCardapio() {
    // Nota: Como você colocou o HTML manual, esta função vai checar se precisa desenhar
    // ou apenas ativar os botões. Para garantir que tudo funcione, vamos manter a lógica
    // de ativar os botões que já existem na tela.
    reativarBotoesAdicionar();
}

// --- 4. LÓGICA DE BOTÕES ---
function reativarBotoesAdicionar() {
    const btns = document.querySelectorAll('.add-btn');
    btns.forEach(btn => {
        const novoBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(novoBtn, btn);
        
        novoBtn.addEventListener('click', (e) => {
            const card = e.target.closest('.item-card');
            const id = parseInt(card.getAttribute('data-id'));
            
            // Procura o item na lista de dados (menuPadrao)
            const item = menuItems.find(i => i.id === id);
            
            if(item) {
                if (item.category === 'pizza') {
                    abrirModalOpcoes(item);
                } else {
                    addItemToCart(item);
                }
            } else {
                console.error("Item não encontrado no JS. ID:", id);
                showToast("Erro: Item não cadastrado no sistema");
            }
        });
    });
}

// --- MODAL DE PERSONALIZAÇÃO ---
function abrirModalOpcoes(item) {
    itemSelecionado = item;
    const modal = document.getElementById('modal-opcoes');
    
    document.getElementById('modal-item-name').innerText = item.name;
    document.getElementById('obs-item').value = ''; 
    
    const lista = document.getElementById('lista-adicionais');
    lista.innerHTML = '<p class="section-label">Turbine sua pizza:</p>';
    
    opcionais.forEach((op, index) => {
        lista.innerHTML += `
            <div class="opcao-row">
                <label>
                    <input type="checkbox" class="check-adicional" value="${index}" onchange="calcularTotalModal()">
                    ${op.name}
                </label>
                <span>+ ${formatMoney(op.price)}</span>
            </div>
        `;
    });

    atualizarTotalModal(item.price);
    modal.classList.add('active');
}

window.fecharModalOpcoes = () => {
    document.getElementById('modal-opcoes').classList.remove('active');
}

window.calcularTotalModal = () => {
    let total = itemSelecionado.price;
    const checks = document.querySelectorAll('.check-adicional:checked');
    checks.forEach(c => {
        total += opcionais[c.value].price;
    });
    atualizarTotalModal(total);
}

function atualizarTotalModal(valor) {
    document.getElementById('modal-item-total').innerText = formatMoney(valor);
}

window.confirmarAdicaoCarrinho = () => {
    const checks = document.querySelectorAll('.check-adicional:checked');
    let extrasEscolhidos = [];
    let precoExtras = 0;

    checks.forEach(c => {
        const op = opcionais[c.value];
        extrasEscolhidos.push(op.name);
        precoExtras += op.price;
    });

    const obs = document.getElementById('obs-item').value;

    const itemParaCarrinho = {
        ...itemSelecionado,
        uniqueId: Date.now(), 
        price: itemSelecionado.price + precoExtras,
        extras: extrasEscolhidos,
        observacao: obs,
        qty: 1
    };

    cart.push(itemParaCarrinho);
    updateCartUI();
    showToast(`${itemSelecionado.name} adicionada!`);
    fecharModalOpcoes();
}

// --- 5. LÓGICA DE CARRINHO ---
function addItemToCart(item) {
    const existing = cart.find(i => i.id === item.id && (!i.extras || i.extras.length === 0));
    if(existing) {
        existing.qty++;
    } else {
        cart.push({ ...item, qty: 1, extras: [], observacao: '' });
    }
    updateCartUI();
    showToast(`+1 ${item.name} add!`);
}

window.removerItemCarrinho = (index) => {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const list = document.getElementById('cart-items-list');
    const countBadge = document.getElementById('cart-count');
    const totalEl = document.getElementById('cart-total-value');
    const subtotalEl = document.getElementById('cart-subtotal');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if(!list) return;

    list.innerHTML = '';
    let total = 0;
    let count = 0;

    if(cart.length === 0) {
        list.innerHTML = '<div class="empty-cart"><p>Carrinho vazio :(</p></div>';
        if(checkoutBtn) checkoutBtn.disabled = true;
    } else {
        if(checkoutBtn) checkoutBtn.disabled = false;
        
        cart.forEach((item, index) => {
            total += item.price * item.qty;
            count += item.qty;

            let detalhesHtml = '';
            if(item.extras && item.extras.length > 0) {
                detalhesHtml += `<div class="cart-extras">+ ${item.extras.join(', ')}</div>`;
            }
            if(item.observacao) {
                detalhesHtml += `<div class="cart-obs">" ${item.observacao} "</div>`;
            }

            list.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        ${detalhesHtml}
                        <small>${formatMoney(item.price)} x ${item.qty} = ${formatMoney(item.price * item.qty)}</small>
                    </div>
                    <div class="cart-controls">
                        <button class="qty-btn delete-btn" onclick="removerItemCarrinho(${index})" style="background: #d32f2f;"><i class="fas fa-trash"></i></button>
                    </div>
                </div>`;
        });
    }

    if(countBadge) {
        countBadge.innerText = count;
        countBadge.style.display = count > 0 ? 'flex' : 'none';
    }
    if(totalEl) totalEl.innerText = formatMoney(total);
    if(subtotalEl) subtotalEl.innerText = formatMoney(total);
}

// --- UTILITÁRIOS ---
function formatMoney(val) { return val.toLocaleString('pt-BR', {style:'currency', currency:'BRL'}); }

function showToast(msg) {
    const box = document.getElementById('toast-box');
    if(box) {
        const t = document.createElement('div');
        t.className = 'toast';
        t.innerHTML = `<i class="fas fa-check"></i> ${msg}`;
        box.appendChild(t);
        setTimeout(() => t.remove(), 3000);
    }
}

// --- NAVEGAÇÃO ---
function setupNavigation() {
    const back = document.getElementById('back-home-btn');
    if(back) back.addEventListener('click', () => {
        document.getElementById('app-screen').classList.remove('active');
        document.getElementById('home-screen').classList.add('active');
        document.getElementById('home-screen').style.display = 'flex';
    });

    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.addEventListener('click', () => mudarAba(nav.getAttribute('data-target')));
    });
}

function mudarAba(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    const tab = document.getElementById(tabId);
    if(tab) tab.classList.add('active');
    
    const nav = document.querySelector(`.nav-item[data-target="${tabId}"]`);
    if(nav) nav.classList.add('active');
}

function abrirCardapio() {
    document.getElementById('home-screen').classList.remove('active');
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('app-screen').classList.add('active');
    mudarAba('tab-pedidos');
}
window.abrirCardapio = abrirCardapio;

window.irParaCarrinho = function() {
    mudarAba('tab-carrinho'); 
}

// --- MÁSCARA DE TELEFONE ---
const inputTelefone = document.getElementById('client-phone');
if(inputTelefone) {
    inputTelefone.addEventListener('input', (e) => {
        let x = e.target.value.replace(/\D/g, '');
        if (x.length > 11) x = x.substring(0, 11);
        x = x.replace(/^(\d{2})(\d)/g, '($1) $2');
        x = x.replace(/(\d)(\d{4})$/, '$1-$2');
        e.target.value = x;
    });
}

// --- FINALIZAÇÃO DO PEDIDO ---
let cliente = JSON.parse(localStorage.getItem('clienteTopBaiana'));

function finalizarPedido() {
    if(!cliente) {
        document.getElementById('modal-cadastro').classList.add('active');
        return;
    }
    
    const address = document.getElementById('address-input').value;
    const pay = document.getElementById('payment-select').value;
    const troco = document.getElementById('troco-input').value;

    if(!address || address.length < 5) {
        alert('Digite o endereço completo!');
        return;
    }

    let msg = `*NOVO PEDIDO - ${cliente.nome}*\n------------------\n`;
    let total = 0;
    
    cart.forEach(i => {
        msg += `${i.qty}x ${i.name} - ${formatMoney(i.price)}\n`;
        if(i.extras && i.extras.length > 0) msg += `   + ${i.extras.join(', ')}\n`;
        if(i.observacao) msg += `   (Obs: ${i.observacao})\n`;
        msg += `\n`;
        total += i.price * i.qty;
    });

    msg += `------------------\n*TOTAL: ${formatMoney(total)}*\n`;
    msg += `Pagamento: ${pay}`;
    if(pay === 'Dinheiro' && troco) msg += ` (Troco p/ ${troco})`;
    msg += `\n\n*Entrega:*\n${address}\nTel: ${cliente.telefone}`;

    window.open(`https://wa.me/5571999999999?text=${encodeURIComponent(msg)}`);
}

// Funções do Modal de Cadastro
window.fecharModal = () => document.getElementById('modal-cadastro').classList.remove('active');
window.salvarCliente = () => {
    const nome = document.getElementById('client-name').value;
    const tel = document.getElementById('client-phone').value;
    if(nome && tel.length >= 14) { 
        cliente = { nome, telefone: tel };
        localStorage.setItem('clienteTopBaiana', JSON.stringify(cliente));
        fecharModal();
        finalizarPedido();
    } else {
        alert("Preencha o nome e o telefone completo (com DDD)!");
    }
};

// --- SEGURANÇA: BLOQUEIO DE F12 E BOTÃO DIREITO ---
document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
    // Bloqueia F12
    if(e.keyCode == 123) {
        return false;
    }
    // Bloqueia Ctrl+I (Inspecionar)
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
        return false;
    }
    // Bloqueia Ctrl+J (Console)
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
        return false;
    }
    // Bloqueia Ctrl+U (Ver Fonte)
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
        return false;
    }
}
