# worker-thread

An image-composition API that moves CPU-intensive work away from the Node.js event loop using **worker threads** and **Piscina**.

## What it demonstrates

- Downloading foreground and background images.
- Combining images with Sharp inside a worker pool.
- Keeping the HTTP server responsive while CPU-intensive work runs separately.
- Comparing direct worker threads with a managed Piscina pool.
- Load testing with Autocannon and profiling with `0x`.

## Requirements

- Node.js 16 (the current dependency set is scheduled for modernization)
- Native dependencies required by Sharp

## Run

```sh
npm ci
npm start
```

Call the API with URL-encoded image URLs:

```text
http://localhost:3712/joinImages?image=<image-url>&background=<background-url>
```

## Benchmark and profile

With the server running:

```sh
npm run autocannon
npm run flame-0x
```

The benchmark depends on remote image latency and machine resources; compare results on the same environment rather than treating the historical numbers as universal.

## Current limitations

- Remote URLs should be treated as untrusted input; production use requires SSRF protection and response-size limits.
- Dependencies and the Node.js runtime still need modernization.
- The repository currently demonstrates the architecture but does not yet include automated tests.

---

<details>
<summary><strong>🇧🇷 Ver documentação em Português (Brasil)</strong></summary>

# worker-thread

API de composição de imagens que remove trabalho intensivo em CPU do event loop do Node.js usando **worker threads** e **Piscina**.

## O que o projeto demonstra

- Download das imagens principal e de fundo.
- Composição com Sharp dentro de um pool de workers.
- Servidor HTTP responsivo enquanto o processamento ocorre separadamente.
- Comparação entre worker threads diretas e um pool gerenciado pelo Piscina.
- Teste de carga com Autocannon e profiling com `0x`.

## Requisitos

- Node.js 16 (as dependências atuais ainda serão modernizadas)
- Dependências nativas exigidas pelo Sharp

## Execução

```sh
npm ci
npm start
```

Acesse a API usando URLs codificadas:

```text
http://localhost:3712/joinImages?image=<url-da-imagem>&background=<url-do-fundo>
```

## Benchmark e profiling

Com o servidor em execução:

```sh
npm run autocannon
npm run flame-0x
```

O resultado depende da latência das imagens remotas e dos recursos da máquina. Compare execuções no mesmo ambiente em vez de considerar os números históricos universais.

## Limitações atuais

- URLs remotas são entradas não confiáveis; uso em produção exige proteção contra SSRF e limites de tamanho.
- As dependências e a versão do Node.js ainda precisam ser modernizadas.
- O repositório demonstra a arquitetura, mas ainda não possui testes automatizados.

</details>
