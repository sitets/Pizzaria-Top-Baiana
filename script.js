// --- 1. DADOS (Cardápio Completo) ---
const menuPadrao = [
    // --- PIZZAS TRADICIONAIS ---
    { id: 1, name: "Calabresa", price: 60.00, category: "pizza", desc: "Mussarela, calabresa, cebola e orégano.", img: "https://img.freepik.com/fotos-gratis/pizza-fresca-com-cogumelos-e-calabresa_140725-1152.jpg" },
    { id: 2, name: "Frango c/ Catupiry", price: 60.00, category: "pizza", desc: "Frango desfiado, catupiry original e milho.", img: "https://img.freepik.com/fotos-premium/deliciosa-pizza-brasileira-de-frango-com-catupiry_284424-490.jpg" },
    { id: 3, name: "Portuguesa", price: 65.00, category: "pizza", desc: "Presunto, ovos, cebola, ervilha e mussarela.", img: "https://pizzariadomleo.com.br/wp-content/uploads/2017/05/portuguesa-2.jpg" },
    { id: 4, name: "Quatro Queijos", price: 68.00, category: "pizza", desc: "Mussarela, provolone, parmesão e gorgonzola.", img: "https://claudia.abril.com.br/wp-content/uploads/2020/02/pizza-quatro-queijos-1.jpg" },
    { id: 5, name: "Marguerita", price: 60.00, category: "pizza", desc: "Mussarela, rodelas de tomate e manjericão fresco.", img: "https://s2.glbimg.com/7tM-vP9j-jYlC6d02HqMvD8M9a8=/0x0:1280x853/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e3b9d70419497b71236132252d5/internal_photos/bs/2022/e/1/6e2z70S62qX0A2qJgB2A/pizza-margherita.jpg" },
    { id: 6, name: "Baiana Picante", price: 65.00, category: "pizza", desc: "Calabresa moída, pimenta, cebola e ovo.", img: "https://www.receiteria.com.br/wp-content/uploads/receitas-de-pizza-baiana-0.png" },
    { id: 7, name: "Carne de Sol", price: 70.00, category: "pizza", desc: "Carne do sol desfiada, queijo coalho e cebola roxa.", img: "https://pizzariadomleo.com.br/wp-content/uploads/2017/05/nordestina-2.jpg" },
    { id: 8, name: "Top Baiana (Especial)", price: 75.00, category: "pizza", desc: "A moda da casa: Tudo que você tem direito!", img: "https://s2.glbimg.com/wM0lwa9Xcfq_X4vM94TSu_TKyBw=/620x455/e.glbimg.com/og/ed/f/original/2020/07/09/pizza_de_liquidificador_de_calabresa_bacon_e_milho.jpg" },
    
    // --- NOVAS PIZZAS ---
    { id: 9, name: "Bacon com Milho", price: 62.00, category: "pizza", desc: "Mussarela, bacon crocante em cubos e milho.", img: "https://www.receiteria.com.br/wp-content/uploads/receitas-de-pizza-de-bacon-0.png" },
    { id: 10, name: "Lombo Canadense", price: 65.00, category: "pizza", desc: "Lombo canadense, cebola roxa e catupiry.", img: "https://media-cdn.tripadvisor.com/media/photo-s/0f/42/60/5e/pizza-de-lombo-canadense.jpg" },
    { id: 11, name: "Vegetariana", price: 58.00, category: "pizza", desc: "Brócolis, palmito, milho, tomate e cebola.", img: "https://pizzariadomleo.com.br/wp-content/uploads/2017/05/vegetariana-2.jpg" },
    { id: 12, name: "Moda do Chefe", price: 72.00, category: "pizza", desc: "Presunto, calabresa, bacon, ovo, milho e ervilha.", img: "https://s2.glbimg.com/wM0lwa9Xcfq_X4vM94TSu_TKyBw=/620x455/e.glbimg.com/og/ed/f/original/2020/07/09/pizza_de_liquidificador_de_calabresa_bacon_e_milho.jpg" },

    // --- COMBOS ---
    { id: 15, name: "Combo Mozão", price: 80.00, category: "combo", desc: "Pizza Coração + Refri. Perfeito para casal.", img: "https://i.pinimg.com/736x/21/16/d7/2116d783ae50d58ae258984415b1084e.jpg" },

    // --- PROMOÇÕES (Ids usados nos botões do HTML) ---
    { id: 99, name: "PROMO: 2 Calabresas", price: 100.00, category: "promo", desc: "Promoção Dupla Calabresa", img: "" },
    { id: 30, name: "PROMO: Combo Família", price: 85.00, category: "promo", desc: "1 Pizza G + 1 Refri 2L", img: "" },
    { id: 31, name: "PROMO: Trio Galera", price: 160.00, category: "promo", desc: "3 Pizzas Tradicionais", img: "" },
    { id: 32, name: "PROMO: Pizza + Broto", price: 80.00, category: "promo", desc: "1 Salgada + 1 Broto Doce", img: "" },

    // --- BEBIDAS ---
    { id: 20, name: "Pepsi 1L", price: 8.00, category: "bebida", desc: "Gelada", img: "https://m.media-amazon.com/images/I/61N80N48JJS._AC_UF1000,1000_QL80_.jpg" },
    { id: 21, name: "Guaraná 1L", price: 8.00, category: "bebida", desc: "Gelada", img: "https://ibassets.com.br/ib.item.image.big/b-28ec7a229fb442159261971424554e5d.jpg" },
    { id: 22, name: "Coca-Cola 2L", price: 12.00, category: "bebida", desc: "Gelada", img: "https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/16336/medium.jpg" }
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

// --- 2. CARREGA OS DADOS (MODO FORÇAR ATUALIZAÇÃO) ---
// Ignoramos o que estava salvo antes e usamos a lista nova (menuPadrao)
console.log("Forçando atualização do cardápio...");
let menuItems = menuPadrao; 

// Salva a versão nova na memória para o futuro
localStorage.setItem('topBaiana_v4', JSON.stringify(menuPadrao));

// Se não existir ou se a lista salva for menor que a nova, atualiza tudo!
if (!menuItems || menuItems.length < menuPadrao.length) {
    console.log("Atualizando cardápio...");
    menuItems = menuPadrao;
    localStorage.setItem('topBaiana_v2', JSON.stringify(menuPadrao));
}

let cart = [];

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    renderizarCardapio(); 
    setupNavigation();    
    
    // Configura carrinho e finalização
    const checkoutBtn = document.getElementById('checkout-btn');
    if(checkoutBtn) checkoutBtn.addEventListener('click', finalizarPedido);
    
    // Troco
    const paySelect = document.getElementById('payment-select');
    if(paySelect) {
        paySelect.addEventListener('change', (e) => {
            const trocoDiv = document.getElementById('troco-div');
            if(trocoDiv) trocoDiv.style.display = e.target.value === 'Dinheiro' ? 'block' : 'none';
        });
    }
});

// --- 3. FUNÇÃO QUE DESENHA OS CARDS ---
function renderizarCardapio() {
    const gridPizzas = document.getElementById('grid-pizzas');
    const gridCombos = document.getElementById('grid-combos');
    const gridBebidas = document.getElementById('grid-bebidas');

    if(gridPizzas) gridPizzas.innerHTML = '';
    if(gridCombos) gridCombos.innerHTML = '';
    if(gridBebidas) gridBebidas.innerHTML = '';

    menuItems.forEach(item => {
        // Só desenha se tiver as divs no HTML
        const card = criarHTMLCard(item);
        
        if(item.category === 'pizza' && gridPizzas) {
            gridPizzas.innerHTML += card;
        }
        else if(item.category === 'combo' && gridCombos) {
            gridCombos.innerHTML += card;
        }
        else if(item.category === 'bebida' && gridBebidas) {
            gridBebidas.innerHTML += card;
        }
    });

    // IMPORTANTE: Reativa TODOS os botões, inclusive os das PROMOÇÕES manuais
    reativarBotoesAdicionar();
}

function criarHTMLCard(item) {
    // Card de Bebida (Mini)
    if (item.category === 'bebida') {
        return `
            <div class="item-card mini" data-id="${item.id}">
                <div class="card-img" style="width:60px;height:60px;margin:0 auto 10px;">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div class="card-details row" style="height:auto;align-items:center;">
                    <h4>${item.name}</h4>
                    <div class="card-footer" style="width:100%;justify-content:center;gap:10px;">
                        <span class="price">${formatMoney(item.price)}</span>
                        <button class="add-btn icon-only"><i class="fas fa-plus"></i></button>
                    </div>
                </div>
            </div>`;
    }
    // Card de Pizza/Combo normal
    // Promoções não usam essa função pois já estão no HTML, mas usam a lógica de adicionar
    return `
        <div class="item-card" data-id="${item.id}">
            <div class="card-img"><img src="${item.img}" alt="${item.name}"></div>
            <div class="card-details">
                <h4>${item.name}</h4>
                <p>${item.desc}</p>
                <div class="card-footer">
                    <span class="price">${formatMoney(item.price)}</span>
                    <button class="add-btn">Adicionar</button>
                </div>
            </div>
        </div>`;
}

// --- 4. LÓGICA DE BOTÕES E MODAL DE OPÇÕES ---
function reativarBotoesAdicionar() {
    // Pega TODOS os botões "Adicionar" ou "Eu Quero" da tela inteira
    const btns = document.querySelectorAll('.add-btn');
    
    btns.forEach(btn => {
        // Remove listener antigo para não duplicar (caso renderize 2x)
        const novoBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(novoBtn, btn);
        
        novoBtn.addEventListener('click', (e) => {
            const card = e.target.closest('.item-card');
            const id = parseInt(card.getAttribute('data-id'));
            
            // Procura o item na lista completa
            const item = menuItems.find(i => i.id === id);
            
            if(item) {
                // Se for pizza, abre personalização. 
                // Se for Bebida ou Promoção (combo), adiciona direto.
                if (item.category === 'pizza') {
                    abrirModalOpcoes(item);
                } else {
                    addItemToCart(item);
                }
            } else {
                console.error("Item não encontrado ID:", id);
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
    // Adiciona item direto (bebidas e promos)
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