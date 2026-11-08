# textos.etc.br — página provisória

Uma tela só, até a versão definitiva: o cabeçalho (Contato e logotipo) e o rodapé da
capa, com um "Em breve." no lugar dos serviços. HTML e CSS num arquivo só, **sem
JavaScript** e sem nada carregado de terceiros. A página pesa 26 KB no total, sem contar
este arquivo (o HTML, 4 KB comprimido; as quatro fontes, 13 KB).

Feita em 08/11/2026 com o Claude Code (modelo Sonnet 5.5), a partir da capa do sítio
(`..\index.html` e `..\estilo.css`). Esta pasta é independente do resto do projeto:
tudo o que sobe para o GitHub está aqui dentro, e nada daqui aponta para `..\`.
Conferida no Chrome a 1440 e a 390 px: sem rolagem lateral e sem erro no console.

## O que há na pasta

| Arquivo | Para quê |
| --- | --- |
| `index.html` | A página inteira. O CSS está em `<style>`; os selos do WhatsApp e do Instagram são SVG no próprio HTML. |
| `fontes\*.woff2` | Austin News Headline (logotipo), Deck ("Em breve."), Text roman (rodapé) e Text italic No 2 ("Contato"), cortadas para as letras que a página usa. Têm os mesmos nomes das de `..\fontes`. |
| `favicon.svg`, `icone-180.png` | Ícone da aba e da tela inicial do celular (os do sítio). |
| `.nojekyll` | Arquivo vazio: o GitHub Pages publica os arquivos como estão, sem processá-los. |
| `LEIAME.md` | Este arquivo. Pode ficar de fora do upload. |

Todos os caminhos são relativos. É isso que faz a página abrir igual em
`usuario.github.io/repositorio/` e no domínio próprio.

## Ver no seu computador

Dar dois cliques no `index.html` funciona: a página aparece certa e as fontes carregam.
O console do Chrome, porém, mostra erros de CORS nos `preload`; é só o `file://` (no
GitHub Pages não há erro nenhum). Para ver sem esse ruído, use o servidor do projeto:

```bash
cd C:/Projetos/textos.etc.br
node servidor.cjs
```

e abra `http://127.0.0.1:4173/provisoria/`.

## Publicar no GitHub Pages

Sobe o **conteúdo** desta pasta, não a pasta `provisoria` em si: o `index.html` tem de
ficar na raiz do repositório.

1. No GitHub, **New repository**. O nome é livre (por exemplo, `textos.etc.br`). Marque
   **Public**: o Pages gratuito só publica repositório público.
2. Na página do repositório vazio, **uploading an existing file**. Arraste para lá
   `index.html`, `favicon.svg`, `icone-180.png`, `.nojekyll` e a pasta `fontes`
   (e o `LEIAME.md`, se quiser) e confirme em **Commit changes**.
3. **Settings → Pages → Build and deployment**: Source **Deploy from a branch**;
   Branch **main**, pasta **/ (root)**; **Save**.
4. Em um ou dois minutos o endereço aparece no alto da página do Pages:
   `https://<usuário>.github.io/<repositório>/`.

Pelo terminal, no lugar dos passos 2 e 3 (troque `<usuário>` e `<repositório>`):

```bash
cd C:/Projetos/textos.etc.br/provisoria
git init -b main
git add .
git commit -m "Página provisória"
git remote add origin https://github.com/<usuário>/<repositório>.git
git push -u origin main
```

## Usar o domínio textos.etc.br

Não há arquivo `CNAME` aqui, de propósito: com ele no lugar, o endereço `github.io`
passa a redirecionar para `textos.etc.br`, e a página só abriria depois que o DNS
apontasse. Para ver a página antes de mexer no DNS, publique primeiro sem ele.

1. **Settings → Pages → Custom domain**: `textos.etc.br`, **Save**. O GitHub cria o
   `CNAME` no repositório. (Também serve criar à mão um arquivo `CNAME` com uma única
   linha: `textos.etc.br`.)
2. No painel de DNS do domínio (o do Registro.br, se for ele quem hospeda o DNS), quatro
   registros **A** apontando para os IPs do GitHub Pages: `185.199.108.153`,
   `185.199.109.153`, `185.199.110.153` e `185.199.111.153`. Para IPv6, quatro
   registros **AAAA**: `2606:50c0:8000::153` até `2606:50c0:8003::153`. Os números são
   da documentação do GitHub ("Managing a custom domain for your GitHub Pages site") e
   podem mudar: confira lá antes de digitar.
3. Quando o GitHub validar o domínio (de minutos a algumas horas), marque
   **Enforce HTTPS** em Settings → Pages. O certificado é gratuito.

O `<link rel="canonical">` e o `og:url` já apontam para `https://textos.etc.br/`.

## Mudar o texto ou as fontes

O "Em breve." e o ano do rodapé estão no `index.html`, em texto simples.

**Cada fonte só tem as letras que a página usa.** Se trocar um texto e uma letra
aparecer em outra fonte (Georgia), refaça o corte da fonte daquele texto, a partir da
fonte completa em `..\fontes`, com as letras novas. Precisa de `pip install fonttools brotli`.
O que cada arquivo cobre hoje (todos incluem também o espaço e o espaço sem quebra):

| Arquivo | Texto |
| --- | --- |
| `headline-roman` | `textos.etc.br` |
| `deck-roman` | `Em breve.` |
| `text-roman` | `textos.etc.br · 2026`, o e-mail, `WhatsApp`, `Instagram` e os algarismos 0 a 9 |
| `text-no2-italic` | `Contato` |

O comando (aqui para o Deck; troque o arquivo e o `--text`):

```bash
cd C:/Projetos/textos.etc.br/provisoria
python -m fontTools.subset ../fontes/deck-roman.woff2 --output-file=fontes/deck-roman.woff2 --flavor=woff2 --text="Em breve. " "--layout-features=kern,liga,calt,locl,ccmp,mark,mkmk,rlig,clig" "--name-IDs=*" --notdef-outline "--drop-tables+=hdmx"
```

Ele mantém o kerning e o hinting e descarta só o que a página não usa: versaletes,
números antigos, frações e alternativas. Para usar os arquivos completos, copie-os para
`fontes\` com os mesmos nomes; nada mais muda.

## Quando a versão definitiva sair

Troque o conteúdo do repositório pelo do sítio (ou aponte o domínio para a hospedagem
nova). A capa definitiva traz o `contato.js` e as páginas internas; a provisória não
tem nada disso.

## Diferenças em relação à capa

- **O e-mail é um link `mailto:` comum.** Na capa ele é um botão que copia o endereço,
  montado por `contato.js`; sem JavaScript isso não existe. Para não deixar a arroba
  solta no código, ela está escrita como `&#64;`. O navegador mostra e abre o endereço
  normalmente.
- **"Contato", no alto, abre o e-mail** (na capa, abre `contato.html`).
- **"Em breve."** ocupa o lugar da linha de serviços e da grade, em Austin Deck, no
  corpo dos nomes da capa (`100cqw / 28`).
- **O rodapé tem o filete de 2 px por cima** e desce até o pé da tela. Na capa, o filete
  de cima é o que fecha a grade. Para tirá-lo, apague a linha `border-top` da regra
  `.rodape`.
- **`overflow-x: clip`** na folha: se o logotipo chegar com uma fonte de reserva mais
  larga (um Android sem Georgia, por exemplo), a página não ganha barra de rolagem lateral.
- O título e a descrição dizem "em breve"; o resto dos metadados é o da capa.
