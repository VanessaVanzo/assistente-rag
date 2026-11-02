# Assistente RAG — Consulta Inteligente a Documentos

Projeto de um assistente inteligente desenvolvido com a arquitetura **RAG (Retrieval-Augmented Generation)**, capaz de responder perguntas com base no conteúdo de documentos PDF.

A aplicação utiliza busca semântica para localizar trechos relevantes do documento e um modelo de linguagem para elaborar respostas em linguagem natural.

## 🚀 Como funciona

O funcionamento do projeto é dividido em duas etapas principais:

### 1. Processamento do documento

- Leitura do conteúdo de um arquivo PDF.
- Divisão do texto em pequenos trechos (*chunks*).
- Geração de embeddings utilizando Transformers.js.
- Armazenamento dos trechos e seus vetores no banco de dados Neo4j.

### 2. Consulta ao assistente

Quando o usuário faz uma pergunta:

1. A pergunta é transformada em um embedding.
2. O Neo4j realiza uma busca vetorial para encontrar os trechos semanticamente semelhantes.
3. Os trechos encontrados são enviados como contexto ao modelo de linguagem.
4. O modelo gera uma resposta com base no conteúdo recuperado.
5. A resposta é apresentada na interface de chat.

## 🛠️ Tecnologias utilizadas

- **JavaScript / Node.js:** desenvolvimento da aplicação.
- **Express:** criação do servidor e da API.
- **Transformers.js:** geração local de embeddings.
- **Xenova/all-MiniLM-L6-v2:** modelo utilizado para gerar embeddings de 384 dimensões.
- **Neo4j:** armazenamento dos documentos e busca vetorial.
- **OpenRouter:** integração com modelos de linguagem.
- **HTML, CSS e JavaScript:** interface do usuário.
- **Marked e DOMPurify:** interpretação e sanitização de respostas em Markdown.
- **Docker:** execução do Neo4j em container.

## 📋 Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js
- npm
- Docker Desktop
- Uma conta no OpenRouter com uma chave de API.

## ⚙️ Configuração

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
cd assistente-rag
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
NEO4J_USER=neo4j
NEO4J_PASSWORD=sua_senha
OPENROUTER_API_KEY=sua_chave_api
```

Não compartilhe esse arquivo nem publique suas credenciais.

### 4. Iniciar o banco de dados

Com o Docker Desktop em execução, execute:

```bash
docker compose up -d
```

O Neo4j ficará disponível em:

- Interface web: http://localhost:7474
- Conexão Bolt: bolt://localhost:7687

### 5. Preparar o documento

Coloque o arquivo PDF na pasta `documentos/` e execute o script de processamento:

```bash
node src/lerPdf.js
```

Esse processo realiza a leitura do PDF, gera os embeddings e armazena os trechos no Neo4j.

### 6. Iniciar a aplicação

```bash
node src/server.js
```

Acesse a aplicação pelo navegador:

http://localhost:3000

## 📁 Estrutura do projeto

```text
assistente-rag/
│
├── documentos/          # Documentos PDF utilizados
├── neo4j/               # Dados e configurações locais do Neo4j
├── public/              # Interface do usuário
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── src/
│   ├── config/          # Configuração do banco de dados
│   ├── buscarTrechos.js # Busca semântica no Neo4j
│   ├── chunking.js      # Divisão do texto em chunks
│   ├── gerarEmbeddings.js
│   ├── lerPdf.js        # Processamento do PDF
│   ├── responder.js     # Geração das respostas
│   ├── salvarChunks.js  # Armazenamento no Neo4j
│   └── server.js        # Servidor Express
│
├── .env                 # Variáveis de ambiente (não versionado)
├── .gitignore
├── compose.yaml
├── package.json
└── README.md
```

## 🔒 Observações

- O arquivo `.env` não deve ser publicado, pois contém credenciais.
- Os documentos utilizados no processamento não fazem parte deste repositório.
- Os dados locais do Neo4j também não são versionados.
- O projeto utiliza o OpenRouter para acessar modelos de linguagem. A disponibilidade de modelos gratuitos pode variar.

## 🎯 Objetivo

Projeto desenvolvido como parte dos estudos de desenvolvimento de software e Inteligência Artificial, com o objetivo de compreender e aplicar na prática os conceitos de embeddings, busca vetorial e geração aumentada por recuperação (RAG).