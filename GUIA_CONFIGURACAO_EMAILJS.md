# 📚 Exercício Prático: Formulário de Satisfação com Axios
## Aula 03 - Fetch API + Axios | FIRJAN SENAI

---

## 🎯 Objetivo
Criar um formulário completo que envia dados via **Axios** (library HTTP) para uma **API de email** (EmailJS), permitindo que cada aluno receba uma cópia do seu formulário por email.

---

## 📋 Estrutura do Exercício

### ✅ Elementos HTML Utilizados

| Pergunta | Tipo de Input | Descrição |
|----------|--------------|-----------|
| 1 | `text` | Nome completo |
| 2 | `email` | Email de contato |
| 3 | `select` | Módulo preferido |
| 4 | `radio` | Qualidade do ensino |
| 5 | `checkbox` | Recursos úteis |
| 6 | `select` | Nível de dificuldade |
| 7 | `radio` | Recomendação |
| 8 | `checkbox` | Tópicos para aprofundar |
| 9 | `textarea` | Sugestões de melhoria |
| 10 | `textarea` | Comentários adicionais |

---

## 🚀 Passo a Passo de Configuração

### **PASSO 1: Criar Conta no EmailJS**

1. Acesse: **https://www.emailjs.com/**
2. Clique em **"Sign Up"** (canto superior direito)
3. Crie sua conta com:
   - Email
   - Nome de usuário
   - Senha
4. Confirme seu email

### **PASSO 2: Conectar um Serviço de Email**

1. Após login, vá para **"Email Services"** (menu esquerdo)
2. Clique em **"Add Service"**
3. Escolha seu provider:
   - **Gmail** (recomendado)
   - Outlook
   - Yahoo
   - Outro

#### Se escolher Gmail:
1. Clique em **"Gmail"** e **"Connect"**
2. Faça login na sua conta Google
3. Permita acesso do EmailJS
4. O serviço será criado com ID: `service_XXXXXXXXX`
   - **Salve este ID!**

### **PASSO 3: Criar um Template de Email**

1. Vá para **"Email Templates"** (menu esquerdo)
2. Clique em **"Create New Template"**
3. Use este template de exemplo:

```html
Olá {{nome}},

Obrigado por preencher nosso formulário de satisfação!

=== RESUMO DAS SUAS RESPOSTAS ===

Nome: {{nome}}
Email: {{email}}
Módulo Preferido: {{modulo}}
Qualidade do Ensino: {{qualidade}}
Recursos Úteis: {{recursos}}
Dificuldade: {{dificuldade}}
Recomendaria? {{recomendacao}}
Tópicos para Aprofundar: {{topicos}}
Sugestões: {{sugestoes}}
Comentários: {{comentarios}}
Data de Envio: {{data_envio}}

============================

Este é um email automático. Não responda.

Atenciosamente,
FIRJAN SENAI - Programador Frontend
```

4. Dê um nome ao template: `formulario_satisfacao`
5. Configure:
   - **To Email**: `{{to_email}}`
   - **Subject**: `Confirmação - Formulário de Satisfação | FIRJAN SENAI`
6. Clique em **"Save"**
7. O template terá um ID: `template_XXXXXXXXX`
   - **Salve este ID!**

### **PASSO 4: Obter Chave Pública**

1. Vá para **"Integration"** (menu esquerdo) ou clique no ícone de engrenagem
2. Copie sua **Public Key** (próximo a "Your Public Key")
   - Formato: `XXXXXXXXXXXXXXXX`
   - **Salve esta chave!**

---

## 🔧 Configurar no Código HTML

No arquivo `exercicio_formulario_satisfacao.html`, procure por:

```javascript
const EMAILJS_SERVICE_ID = 'service_seu_id';
const EMAILJS_TEMPLATE_ID = 'template_seu_id';
const EMAILJS_PUBLIC_KEY = 'sua_chave_publica';
```

Substitua pelos seus IDs:

**Exemplo:**
```javascript
const EMAILJS_SERVICE_ID = 'service_abc123def456';
const EMAILJS_TEMPLATE_ID = 'template_xyz789uvw012';
const EMAILJS_PUBLIC_KEY = 'u1a2b3c4d5e6f7g8h9i0j';
```

---

## 📚 Entendendo o Código Axios

### Importação via CDN
```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

### Requisição Axios POST
```javascript
const resposta = await axios.post(
    'https://api.emailjs.com/api/v1.0/email/send',
    {
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
            // Dados que serão inseridos no template
            to_email: dados.email,
            nome: dados.nome,
            // ... outros campos
        }
    }
);
```

### Estrutura da Resposta
```javascript
if (resposta.status === 200) {
    // Sucesso! Email enviado
    console.log('Email enviado');
} else {
    // Erro
    console.log('Falha ao enviar');
}
```

---

## 🎓 Conceitos Aprendidos

### 1. **Formulários HTML**
- Diferentes tipos de inputs (`text`, `email`, `radio`, `checkbox`, `select`, `textarea`)
- Validação básica com atributo `required`
- Evento `submit`

### 2. **JavaScript (Manipulação do DOM)**
```javascript
// Coletar valor de um input
document.getElementById('nome').value

// Coletar checkboxes selecionados
Array.from(document.querySelectorAll('input[name="recursos"]:checked'))
    .map(el => el.value)

// Coletar radio selecionado
document.querySelector('input[name="qualidade"]:checked').value
```

### 3. **Axios (Requisições HTTP)**
```javascript
// Sintaxe básica
axios.post(URL, DADOS)
    .then(resposta => { /* sucesso */ })
    .catch(erro => { /* erro */ })

// Com async/await
async function enviar() {
    try {
        const resposta = await axios.post(URL, DADOS);
        console.log(resposta.data);
    } catch(erro) {
        console.error(erro);
    }
}
```

### 4. **Tratamento de Erros**
```javascript
try {
    // Código que pode dar erro
    const resposta = await axios.post(...);
} catch(erro) {
    // Trata o erro
    console.error('Erro:', erro.message);
} finally {
    // Sempre executa (limpeza)
    botao.disabled = false;
}
```

### 5. **Feedback Visual**
- Estados: loading, success, error
- Spinners de carregamento
- Mensagens ao usuário

---

## ✨ Funcionalidades Extras

### Validação de Checkboxes
```javascript
const grupoCheckbox = document.querySelectorAll('input[name="recursos"]:checked');
if (grupoCheckbox.length === 0) {
    console.warn('Selecione pelo menos um recurso');
}
```

### Coleta de Dados Dinâmica
```javascript
const dados = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    recursos: Array.from(document.querySelectorAll('input[name="recursos"]:checked'))
        .map(el => el.value)
        .join(', '),
    // ... outros campos
};
```

### Desabilitar Botão Durante Envio
```javascript
botao.disabled = true;
botao.textContent = 'Enviando...';

try {
    // ... enviar dados
} finally {
    botao.disabled = false;
    botao.textContent = 'Enviar';
}
```

---

## 🐛 Troubleshooting (Solução de Problemas)

| Problema | Solução |
|----------|---------|
| ❌ "401 Unauthorized" | Verifique a chave pública (Public Key) |
| ❌ "Invalid service/template" | Confirme que service_id e template_id estão corretos |
| ❌ Email não chega | Verifique spam/lixo eletrônico |
| ❌ "CORS error" | O EmailJS CDN resolve isso, não é problema seu |
| ❌ Formulário não submete | Verifique console (F12) para mensagens de erro |

---

## 📞 Teste Rápido

Para testar sem preencher tudo:

1. Abra o arquivo HTML no navegador
2. Abra o console (F12 → Console)
3. Digite:
```javascript
axios.get('https://api.emailjs.com/api/v1.0/templates')
    .then(r => console.log('EmailJS carregado', r))
    .catch(e => console.log('Erro:', e))
```

Se funcionar, o Axios está OK.

---

## 🎯 Tarefa dos Alunos

1. ✅ Registrar-se no EmailJS
2. ✅ Criar conta Gmail (se não tiver)
3. ✅ Conectar Gmail ao EmailJS
4. ✅ Criar template de email
5. ✅ Obter os 3 IDs necessários
6. ✅ Substituir no arquivo HTML
7. ✅ Testar preenchendo o formulário
8. ✅ Verificar email recebido

---

## 🚀 Próximos Passos

Após dominar este exercício, os alunos podem:

- Usar **Fetch API** em vez de Axios
- Conectar a um **backend Node.js/Express** real
- Adicionar validação mais robusta com **bibliotecas como Yup**
- Implementar **autenticação**
- Salvar dados em **banco de dados**

---

**Criado para:** Aula 03 - Fetch API + Axios  
**Nível:** Básico/Intermediário  
**Tempo:** 2-3 horas  
**Requisitos:** HTML, CSS, JavaScript, conhecimento de Axios
