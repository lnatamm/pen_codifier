# Disclaimer

Frontend desenvolvido com a ajuda do github copilot.

# Créditos
🎵 [@igormathbr](https://www.tiktok.com/@igormathbr?_r=1&_t=ZS-93en39XAnUj) no TikTok

# 🖊️ Pen Codifier

Uma aplicação web interativa para codificar frases em frações decimais usando uma caneta de altura fixa de 1cm como referência.

## 🌟 Funcionalidades

- ✨ **Codificar Texto**: Converta frases em frações decimais
- 🔓 **Decodificar Frações**: Converta frações de volta para texto
- 📊 **Visualização de Altura**: Veja a altura correspondente em centímetros
- ⚡ **Modo Standalone**: Funciona sem necessidade de backend (versão JavaScript pura)

## 🎯 Como Funciona

Cada letra do alfabeto é codificada em um número de dois dígitos:
- a=01, b=02, c=03, ..., z=26
- espaço=00

A fração decimal representa a "altura" proporcional a uma caneta de 1cm.

**Exemplo:**
- Entrada: "mago"
- Fração: 0.13010715
- Altura: 0.13010715 cm

## 🚀 Demo Online

Acesse a aplicação em: `https://lnatamm.github.io/pen_codifier/`

## 💻 Desenvolvimento Local

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse: http://localhost:5173

### Backend (Opcional)

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Acesse a documentação da API: http://localhost:8000/docs

## 📦 Tecnologias

### Frontend
- React + Vite
- CSS3 com animações
- JavaScript ES6+

### Backend
- FastAPI (Python)
- Pydantic para validação
- CORS habilitado

## 📖 Estrutura do Projeto

```
pen_codifier/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PenCodifier.jsx
│   │   │   └── PenCodifier.css
│   │   ├── utils/
│   │   │   └── pen.js (lógica standalone)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
├── backend/
│   ├── routes/
│   │   └── pen_routes.py
│   ├── models/
│   │   └── pen_models.py
│   ├── utils/
│   │   └── pen.py
│   └── main.py
├── .github/
│   └── workflows/
│       └── deploy.yml
└── README.md
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto é de código aberto e está disponível sob a Licença Pública Geral GNU (GPL).

---

## 🔧 Guia de Uso Original do Template

Este repositório é um template para integração entre **React** e **Python (FastAPI)**. Siga as instruções abaixo para criar novas rotas e modelos, além de testar sua API localmente.

---

## ⚙️ Requisitos

- **Node.js** (para rodar o frontend React)
- **Python** (para rodar o backend FastAPI)

---

## 🚀 Criando o App React

Para criar o app React utilizado neste projeto, execute o comando abaixo na raiz do repositório:

```bash
npm create vite@latest frontend --template react
```

Após criar o app, entre na pasta `frontend` e instale as dependências necessárias:

```bash
cd frontend
npm install
npm install axios
```

---

## 📁 Estrutura de Rotas

Para adicionar uma nova rota:

1. Crie um novo arquivo `.py` na pasta `routes`.
2. No arquivo, defina seu roteador:

    ```python
    from fastapi import APIRouter

    api_criada = APIRouter(
         prefix="/prefixo",
         tags=["Tag"]
    )

    # Exemplo de rota
    @api_criada.get("/")
    async def exemplo():
         return {"mensagem": "Rota funcionando!"}
    ```

3. No arquivo `main.py`, inclua o novo roteador:

    ```python
    from routes.seuarquivo import api_criada

    api.include_router(api_criada)
    ```

---

## 🗃️ Estrutura de Modelos

Para adicionar um novo modelo:

1. Crie um novo arquivo `.py` na pasta `models`.
2. Defina suas classes herdando de `BaseModel`:

    ```python
    from pydantic import BaseModel

    class MinhaClasse(BaseModel):
         parametro: str
         outro_parametro: int
    ```

---

## 🧪 Testando as Rotas

Após iniciar o servidor FastAPI, acesse a documentação interativa em:

```
http://localhost:porta/docs
```

Substitua `porta` pela porta configurada no seu projeto (por padrão, 8000).

---

## 📌 Observações

- Sempre inclua novas rotas no `main.py` usando `api.include_router(...)`.
- Mantenha a organização dos arquivos para facilitar a manutenção do projeto.

---

> Sinta-se à vontade para contribuir ou sugerir melhorias!