// --- DADOS DO CARDÁPIO ---
const menuPadrao = [
    { id: 1, name: "Calabresa", price: 60.00, category: "pizza", desc: "Mussarela, calabresa, cebola e orégano.", img: "" },
    { id: 2, name: "Frango c/ Catupiry", price: 60.00, category: "pizza", desc: "Frango desfiado, catupiry original e milho.", img: "" },
    { id: 3, name: "Arrumadinho", price: 60.00, category: "pizza", desc: "Carne do sol, calabresa, queijo coalho e cebola.", img: "" },
    { id: 4, name: "Top Baiana", price: 60.00, category: "pizza", desc: "A especial da casa: Tudo que você tem direito.", img: "" },
    { id: 9, name: "Portuguesa", price: 65.00, category: "pizza", desc: "Presunto, ovos, cebola, ervilha e mussarela.", img: "" },
    { id: 10, name: "Quatro Queijos", price: 68.00, category: "pizza", desc: "Mussarela, provolone, parmesão e gorgonzola.", img: "" },
    { id: 11, name: "Marguerita", price: 60.00, category: "pizza", desc: "Mussarela, rodelas de tomate e manjericão fresco.", img: "" },
    { id: 12, name: "Bacon com Milho", price: 62.00, category: "pizza", desc: "Mussarela, bacon crocante em cubos e milho.", img: "" },
    { id: 5, name: "Combo Mozão", price: 80.00, category: "combo", desc: "Pizza Coração + Refri.", img: "" },
    { id: 6, name: "Pepsi 1L", price: 8.00, category: "bebida", desc: "Gelada", img: "" },
    { id: 7, name: "Guaraná 1L", price: 8.00, category: "bebida", desc: "Gelada", img: "" }
];

const opcionais = [
    { name: "Borda de Catupiry", price: 10.00 },
    { name: "Borda de Cheddar", price: 10.00 },
    { name: "Bacon Extra", price: 8.00 },
    { name: "Queijo Extra", price: 8.00 }
];

let menuItems = menuPadrao; 
let cart = [];
let itemSelecionado = null; 
let cliente = null;

try {
    cliente = JSON.parse(localStorage.getItem('clienteTopBaiana'));
} catch (e) {
    console.log("Erro ao carregar cliente", e);
}

// --- FUNÇÕES GLOBAIS ---

function abrirCardapio() {
    const home = document.getElementById('home-screen');
    const app = document.getElementById('app-screen');
    if(home && app) {
        home.classList.remove('active');
        setTimeout(() => {
            home.style.display = 'none';
            app.classList.add('active');
            mudarAba('tab-pedidos');
        }, 200);
    }
}

function irParaCarrinho() { mudarAba('tab-carrinho'); }

function mudarAba(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => {
        t.style.display = 'none'; 
        t.classList.remove('active');
    });
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    const tab = document.getElementById(tabId);
    if(tab) {
        tab.style.display = 'block';
        setTimeout(() => tab.classList.add('active'), 10); 
    }
    
    const nav = document.querySelector(`.nav-item[data-target="${tabId}"]`);
    if(nav) nav.classList.add('active');

    const titulos = {
        'tab-pedidos': 'Cardápio',
        'tab-promocoes': 'Ofertas',
        'tab-carrinho': 'Carrinho',
        'tab-perfil': 'Meu Perfil'
    };
    const headerTitle = document.getElementById('header-title');
    if(headerTitle && titulos[tabId]) headerTitle.innerText = titulos[tabId];
}

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    reativarBotoesAdicionar();
    setupNavigation();
    updateCartUI();
    carregarDadosPerfil();

    const checkoutBtn = document.getElementById('checkout-btn');
    if(checkoutBtn) checkoutBtn.addEventListener('click', finalizarPedido);
    
    // --- LÓGICA DE PAGAMENTO ---
    const paySelect = document.getElementById('payment-select');
    if(paySelect) {
        togglePagamento(paySelect.value);
        paySelect.addEventListener('change', (e) => {
            togglePagamento(e.target.value);
        });
    }

    aplicarMascaraTelefone('client-phone');
    aplicarMascaraTelefone('perfil-phone');
});

function togglePagamento(metodo) {
    const pixArea = document.getElementById('pix-area');
    const trocoDiv = document.getElementById('troco-div');
    
    // 1. Esconde tudo primeiro
    if(pixArea) pixArea.style.display = 'none';
    if(trocoDiv) trocoDiv.style.display = 'none';

    // 2. Se for Pix, SÓ MOSTRA a caixa (a imagem já está no HTML)
    if (metodo === 'Pix' && pixArea) {
        pixArea.style.display = 'block';
    }

    // 3. Se for Dinheiro, mostra o troco
    if (metodo === 'Dinheiro' && trocoDiv) {
        trocoDiv.style.display = 'block';
    }
}

window.copiarChavePix = () => {
    const keyInput = document.getElementById('pix-key');
    if(keyInput) {
        keyInput.select();
        keyInput.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(keyInput.value).then(() => {
            showToast("Chave PIX copiada!");
        }).catch(() => {
            showToast("Erro ao copiar. Tente selecionar.");
        });
    }
};

function setupNavigation() {
    const back = document.getElementById('back-home-btn');
    if(back) back.addEventListener('click', () => {
        document.getElementById('app-screen').classList.remove('active');
        document.getElementById('home-screen').classList.add('active');
        document.getElementById('home-screen').style.display = 'flex';
    });

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(nav => {
        nav.addEventListener('click', (e) => {
            e.preventDefault(); 
            const target = nav.getAttribute('data-target');
            mudarAba(target);
        });
    });
}

function reativarBotoesAdicionar() {
    const btns = document.querySelectorAll('.add-btn');
    btns.forEach(btn => {
        if(btn.innerHTML.includes('Copiar')) return;
        const novoBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(novoBtn, btn);
        novoBtn.addEventListener('click', (e) => {
            const card = e.target.closest('.item-card');
            if (!card) return; 
            const id = parseInt(card.getAttribute('data-id'));
            let item = menuItems.find(i => i.id === id);
            if(!item) {
                const name = card.getAttribute('data-name');
                const price = parseFloat(card.getAttribute('data-price'));
                if(name && price) item = { id: id, name: name, price: price, category: 'promo' };
            }
            if(item) {
                if (item.category === 'pizza') abrirModalOpcoes(item);
                else addItemToCart(item);
            }
        });
    });
}

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
                <label style="display:flex; align-items:center; gap:10px; color:#fff;">
                    <input type="checkbox" class="check-adicional" value="${index}" onchange="calcularTotalModal()" style="width:20px; height:20px;">
                    ${op.name}
                </label>
                <span>+ ${formatMoney(op.price)}</span>
            </div>`;
    });
    atualizarTotalModal(item.price);
    modal.classList.add('active');
}

window.fecharModalOpcoes = () => document.getElementById('modal-opcoes').classList.remove('active');

window.calcularTotalModal = () => {
    let total = itemSelecionado.price;
    document.querySelectorAll('.check-adicional:checked').forEach(c => {
        total += opcionais[c.value].price;
    });
    atualizarTotalModal(total);
}

function atualizarTotalModal(valor) {
    document.getElementById('modal-item-total').innerText = formatMoney(valor);
}

window.confirmarAdicaoCarrinho = () => {
    let extras = [];
    let precoExtras = 0;
    document.querySelectorAll('.check-adicional:checked').forEach(c => {
        extras.push(opcionais[c.value].name);
        precoExtras += opcionais[c.value].price;
    });
    const obs = document.getElementById('obs-item').value;
    const itemFinal = {
        ...itemSelecionado,
        uniqueId: Date.now(),
        price: itemSelecionado.price + precoExtras,
        extras: extras,
        observacao: obs,
        qty: 1
    };
    cart.push(itemFinal);
    updateCartUI();
    showToast(`${itemSelecionado.name} adicionada!`);
    fecharModalOpcoes();
}

function addItemToCart(item) {
    const existing = cart.find(i => i.id === item.id && (!i.extras || i.extras.length === 0));
    if(existing) existing.qty++;
    else cart.push({ ...item, qty: 1, extras: [], observacao: '' });
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
        list.innerHTML = '<div class="empty-cart" style="text-align:center; padding:20px; color:#aaa;"><p>Seu carrinho está vazio.</p></div>';
        if(checkoutBtn) checkoutBtn.disabled = true;
    } else {
        if(checkoutBtn) checkoutBtn.disabled = false;
        cart.forEach((item, index) => {
            total += item.price * item.qty;
            count += item.qty;
            let extrasHtml = item.extras && item.extras.length ? `<div class="cart-extras" style="font-size:0.8rem; color:#00e676;">+ ${item.extras.join(', ')}</div>` : '';
            let obsHtml = item.observacao ? `<div class="cart-obs" style="font-size:0.8rem; color:#aaa;">" ${item.observacao} "</div>` : '';
            list.innerHTML += `
                <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center;">
                    <div class="cart-item-info">
                        <h4 style="color:#fff;">${item.name}</h4>
                        ${extrasHtml}
                        ${obsHtml}
                        <small style="color:#ffb700;">${formatMoney(item.price)} x ${item.qty}</small>
                    </div>
                    <div class="cart-controls">
                        <button class="delete-btn" onclick="removerItemCarrinho(${index})" style="background:#d32f2f;"><i class="fas fa-trash"></i></button>
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

function carregarDadosPerfil() {
    if (cliente) {
        setValue('perfil-name', cliente.nome);
        setValue('perfil-phone', cliente.telefone);
        setValue('perfil-address', cliente.endereco);
        setValue('address-input', cliente.endereco);
    }
}

window.salvarPerfilCompleto = () => {
    const nome = document.getElementById('perfil-name').value;
    const telefone = document.getElementById('perfil-phone').value;
    const endereco = document.getElementById('perfil-address').value;
    if (!nome || telefone.length < 14) {
        alert("Preencha nome e telefone corretamente.");
        return;
    }
    cliente = { nome, telefone, endereco };
    localStorage.setItem('clienteTopBaiana', JSON.stringify(cliente));
    setValue('address-input', endereco);
    showToast("Dados salvos!");
};

window.fazerLogout = () => {
    if(confirm("Deseja desconectar e limpar os dados deste aparelho?")) {
        localStorage.removeItem('clienteTopBaiana');
        cliente = null;
        setValue('perfil-name', '');
        setValue('perfil-phone', '');
        setValue('perfil-address', '');
        showToast("Desconectado.");
        setTimeout(() => location.reload(), 1000);
    }
};

function finalizarPedido() {
    if(!cliente) {
        document.getElementById('modal-cadastro').classList.add('active');
        return;
    }
    const address = document.getElementById('address-input').value;
    const pay = document.getElementById('payment-select').value;
    const troco = document.getElementById('troco-input').value;
    if(!address || address.length < 5) {
        alert('Digite o endereço de entrega!');
        return;
    }
    let msg = `*PEDIDO TOP BAIANA*\n*Cliente:* ${cliente.nome}\n------------------\n`;
    let total = 0;
    cart.forEach(i => {
        msg += `${i.qty}x ${i.name} ............ ${formatMoney(i.price * i.qty)}\n`;
        if(i.extras && i.extras.length) msg += `   + ${i.extras.join(', ')}\n`;
        if(i.observacao) msg += `   (Obs: ${i.observacao})\n`;
        total += i.price * i.qty;
    });
    msg += `------------------\n*TOTAL: ${formatMoney(total)}*\n`;
    msg += `Pagamento: ${pay}`;
    if(pay === 'Dinheiro' && troco) msg += ` (Troco p/ ${troco})`;
    if(pay === 'Pix') msg += ` (Comprovante em anexo)`;
    msg += `\n\n*Entrega:*\n${address}\nTel: ${cliente.telefone}`;
    window.open(`https://wa.me/5571999999999?text=${encodeURIComponent(msg)}`);
}

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
        alert("Preencha os dados corretamente.");
    }
};

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
function setValue(id, val) {
    const el = document.getElementById(id);
    if(el) el.value = val || '';
}
function aplicarMascaraTelefone(id) {
    const el = document.getElementById(id);
    if(el) {
        el.addEventListener('input', (e) => {
            let x = e.target.value.replace(/\D/g, '');
            if (x.length > 11) x = x.substring(0, 11);
            x = x.replace(/^(\d{2})(\d)/g, '($1) $2');
            x = x.replace(/(\d)(\d{4})$/, '$1-$2');
            e.target.value = x;
        });
    }
}
