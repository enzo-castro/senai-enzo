/**
 * ============================================
 * EXEMPLOS PRÁTICOS DE AXIOS
 * Aula 03 - Fetch API + Axios
 * FIRJAN SENAI - Programador Frontend
 * ============================================
 */

// ==========================================
// 1. REQUISIÇÃO GET SIMPLES
// ==========================================

// Buscar dados de um API público
axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(resposta => {
        console.log('Dados recebidos:', resposta.data);
    })
    .catch(erro => {
        console.error('Erro ao buscar:', erro);
    });


// ==========================================
// 2. REQUISIÇÃO GET COM ASYNC/AWAIT
// ==========================================

async function buscarDados() {
    try {
        const resposta = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        console.log('Dados:', resposta.data);
    } catch(erro) {
        console.error('Erro:', erro.message);
    }
}

buscarDados();


// ==========================================
// 3. REQUISIÇÃO POST - ENVIANDO DADOS
// ==========================================

// Dados a enviar
const novoPost = {
    title: 'Meu título',
    body: 'Meu conteúdo',
    userId: 1
};

axios.post('https://jsonplaceholder.typicode.com/posts', novoPost)
    .then(resposta => {
        console.log('Criado com sucesso:', resposta.data);
    })
    .catch(erro => {
        console.error('Erro ao criar:', erro);
    });


// ==========================================
// 4. REQUISIÇÃO COM HEADERS CUSTOMIZADOS
// ==========================================

axios.post(
    'https://api.exemplo.com/dados',
    { nome: 'João', idade: 25 },
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer seu_token_aqui'
        }
    }
)
.then(resposta => console.log(resposta.data))
.catch(erro => console.error(erro));


// ==========================================
// 5. REQUISIÇÃO PUT - ATUALIZAR DADOS
// ==========================================

axios.put('https://jsonplaceholder.typicode.com/posts/1', {
    id: 1,
    title: 'Título atualizado',
    body: 'Novo conteúdo',
    userId: 1
})
.then(resposta => {
    console.log('Atualizado:', resposta.data);
})
.catch(erro => console.error(erro));


// ==========================================
// 6. REQUISIÇÃO DELETE - DELETAR DADOS
// ==========================================

axios.delete('https://jsonplaceholder.typicode.com/posts/1')
    .then(resposta => {
        console.log('Deletado com sucesso');
    })
    .catch(erro => console.error(erro));


// ==========================================
// 7. MÚLTIPLAS REQUISIÇÕES PARALELAS
// ==========================================

async function buscarMultiplos() {
    try {
        const [posts, usuarios, comentarios] = await Promise.all([
            axios.get('https://jsonplaceholder.typicode.com/posts'),
            axios.get('https://jsonplaceholder.typicode.com/users'),
            axios.get('https://jsonplaceholder.typicode.com/comments')
        ]);

        console.log('Posts:', posts.data.length);
        console.log('Usuários:', usuarios.data.length);
        console.log('Comentários:', comentarios.data.length);
    } catch(erro) {
        console.error('Erro:', erro);
    }
}

buscarMultiplos();


// ==========================================
// 8. REQUISIÇÃO COM PARÂMETROS (QUERY)
// ==========================================

// URL: https://api.exemplo.com/usuarios?pagina=1&limite=10
axios.get('https://jsonplaceholder.typicode.com/posts', {
    params: {
        userId: 1,
        _limit: 5
    }
})
.then(resposta => {
    console.log('Posts do usuário 1:', resposta.data);
})
.catch(erro => console.error(erro));


// ==========================================
// 9. OBJETO RESPOSTA DO AXIOS
// ==========================================

axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(resposta => {
        console.log('Status HTTP:', resposta.status);        // 200, 201, etc
        console.log('Headers:', resposta.headers);            // Cabeçalhos da resposta
        console.log('Dados:', resposta.data);                 // Corpo da resposta
        console.log('URL:', resposta.config.url);             // URL da requisição
    });


// ==========================================
// 10. TRATAMENTO DE ERROS DETALHADO
// ==========================================

axios.get('https://jsonplaceholder.typicode.com/posts/999999')
    .catch(erro => {
        if (erro.response) {
            // Servidor respondeu com erro (4xx, 5xx)
            console.log('Status:', erro.response.status);      // 404, 500, etc
            console.log('Dados erro:', erro.response.data);    // Mensagem do servidor
        } else if (erro.request) {
            // Requisição foi feita mas sem resposta
            console.log('Sem resposta do servidor');
        } else {
            // Erro antes de enviar
            console.log('Erro:', erro.message);
        }
    });


// ==========================================
// 11. FORM DATA (ENVIAR FORMULÁRIOS)
// ==========================================

const formData = new FormData();
formData.append('nome', 'João Silva');
formData.append('email', 'joao@email.com');
formData.append('arquivo', document.getElementById('input-arquivo').files[0]);

axios.post('https://api.exemplo.com/upload', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})
.then(resposta => console.log('Enviado:', resposta.data))
.catch(erro => console.error(erro));


// ==========================================
// 12. TIMEOUT - LIMITE DE TEMPO
// ==========================================

axios.get('https://jsonplaceholder.typicode.com/posts', {
    timeout: 5000  // 5 segundos
})
.then(resposta => console.log(resposta.data))
.catch(erro => {
    if (erro.code === 'ECONNABORTED') {
        console.log('Requisição ultrapassou o tempo limite');
    }
});


// ==========================================
// 13. INTERCEPTADORES
// ==========================================

// Interceptar requisições antes de enviar
axios.interceptors.request.use(config => {
    console.log('Enviando requisição para:', config.url);
    // Adicionar token automaticamente
    config.headers.Authorization = 'Bearer seu_token';
    return config;
});

// Interceptar respostas
axios.interceptors.response.use(
    resposta => {
        console.log('Resposta recebida:', resposta.status);
        return resposta;
    },
    erro => {
        console.error('Erro na resposta:', erro.response?.status);
        return Promise.reject(erro);
    }
);


// ==========================================
// 14. EXEMPLO PRÁTICO - BUSCAR USUÁRIOS
// ==========================================

class GerenciadorUsuarios {
    constructor() {
        this.baseURL = 'https://jsonplaceholder.typicode.com';
    }

    // Buscar todos os usuários
    async buscarTodos() {
        try {
            const resposta = await axios.get(`${this.baseURL}/users`);
            return resposta.data;
        } catch(erro) {
            console.error('Erro ao buscar usuários:', erro);
            return [];
        }
    }

    // Buscar um usuário por ID
    async buscarPorId(id) {
        try {
            const resposta = await axios.get(`${this.baseURL}/users/${id}`);
            return resposta.data;
        } catch(erro) {
            console.error(`Erro ao buscar usuário ${id}:`, erro);
            return null;
        }
    }

    // Criar novo usuário
    async criar(dados) {
        try {
            const resposta = await axios.post(`${this.baseURL}/users`, dados);
            return resposta.data;
        } catch(erro) {
            console.error('Erro ao criar usuário:', erro);
            return null;
        }
    }

    // Atualizar usuário
    async atualizar(id, dados) {
        try {
            const resposta = await axios.put(`${this.baseURL}/users/${id}`, dados);
            return resposta.data;
        } catch(erro) {
            console.error(`Erro ao atualizar usuário ${id}:`, erro);
            return null;
        }
    }

    // Deletar usuário
    async deletar(id) {
        try {
            await axios.delete(`${this.baseURL}/users/${id}`);
            return true;
        } catch(erro) {
            console.error(`Erro ao deletar usuário ${id}:`, erro);
            return false;
        }
    }
}

// Usando a classe
const usuarios = new GerenciadorUsuarios();

// Exemplos de uso:
// usuarios.buscarTodos().then(dados => console.log(dados));
// usuarios.buscarPorId(1).then(usuario => console.log(usuario));
// usuarios.criar({ name: 'Novo Usuário' }).then(novo => console.log(novo));


// ==========================================
// 15. EXEMPLO COM FORMULÁRIO HTML
// ==========================================

/*
HTML:
<form id="meuFormulario">
    <input type="text" name="nome" required>
    <input type="email" name="email" required>
    <button type="submit">Enviar</button>
</form>

JavaScript:
*/

const formulario = document.getElementById('meuFormulario');

if (formulario) {
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Coletar dados do formulário
        const dados = {
            nome: formulario.querySelector('[name="nome"]').value,
            email: formulario.querySelector('[name="email"]').value
        };

        try {
            // Enviar com Axios
            const resposta = await axios.post(
                'https://api.exemplo.com/contato',
                dados
            );

            console.log('Sucesso:', resposta.data);
            alert('Formulário enviado com sucesso!');
            formulario.reset();

        } catch(erro) {
            console.error('Erro:', erro);
            alert('Erro ao enviar formulário');
        }
    });
}


// ==========================================
// 16. COMPARAÇÃO: AXIOS vs FETCH
// ==========================================

/*
AXIOS:
- Sintaxe mais simples
- Transformação automática JSON
- Interceptadores nativos
- Timeout nativo
- Melhor tratamento de erros

FETCH:
- API nativa do navegador
- Sem dependências externas
- Precisa converter JSON manualmente
- Mais verboso
*/

// FETCH API (para comparação)
async function comFetch() {
    try {
        const resposta = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const dados = await resposta.json();  // Precisa converter
        console.log(dados);
    } catch(erro) {
        console.error(erro);
    }
}

// AXIOS (mais simples)
async function comAxios() {
    try {
        const resposta = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        console.log(resposta.data);  // Já é objeto
    } catch(erro) {
        console.error(erro);
    }
}


// ==========================================
// 17. RESUMO DAS OPERAÇÕES CRUD
// ==========================================

const CRUD = {
    // CREATE (POST)
    criar: async (dados) => {
        return await axios.post('https://api.exemplo.com/itens', dados);
    },

    // READ (GET)
    ler: async (id) => {
        return await axios.get(`https://api.exemplo.com/itens/${id}`);
    },

    // UPDATE (PUT)
    atualizar: async (id, dados) => {
        return await axios.put(`https://api.exemplo.com/itens/${id}`, dados);
    },

    // DELETE
    deletar: async (id) => {
        return await axios.delete(`https://api.exemplo.com/itens/${id}`);
    }
};


// ==========================================
// TESTES NO CONSOLE DO NAVEGADOR
// ==========================================

/*
Cole no console do navegador (F12):

// Teste 1: GET simples
axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(r => console.log('Sucesso:', r.data))
    .catch(e => console.log('Erro:', e))

// Teste 2: POST
axios.post('https://jsonplaceholder.typicode.com/posts', {
    title: 'Teste',
    body: 'Testando Axios',
    userId: 1
}).then(r => console.log('Criado:', r.data))

// Teste 3: Com await
const dados = await axios.get('https://jsonplaceholder.typicode.com/users/1');
console.log(dados.data);

*/

console.log('✅ Exemplos de Axios carregados. Veja console para mais detalhes.');
