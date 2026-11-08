# textos.etc.br — página provisória

Uma tela só, até a versão definitiva: o cabeçalho (Contato e logotipo) e o rodapé da
capa, com um "Em breve." no lugar dos serviços. HTML e CSS num arquivo só e **um único
JavaScript**, o `contato.js` da capa, que monta o e-mail para que ele não apareça no
código (ver "Proteção do e-mail"). Nada é carregado de terceiros. A página pesa 34 KB no
total, sem contar este arquivo (o HTML, 5 KB comprimido; o script, 2 KB; as quatro
fontes, 14 KB).

Feita em 08/11/2026 com o Claude Code (modelo Sonnet 5.5), a partir da capa do sítio
(`..\index.html` e `..\estilo.css`). Esta pasta é independente do resto do projeto:
tudo o que sobe para o GitHub está aqui dentro, e nada daqui aponta para `..\`.
Conferida no Chrome a 1440 e a 390 px: sem rolagem lateral e sem erro no console.
Em 08/11/2026 o e-mail passou a ser montado por JavaScript; conferido a 1280 e a 390 px, o
cabeçalho e o rodapé ficaram na mesma posição, ao pixel, de antes da mudança.

## O que há na pasta

| Arquivo | Para quê |
| --- | --- |
| `index.html` | A página inteira. O CSS está em `<style>`; os selos do WhatsApp e do Instagram são SVG no próprio HTML. |
| `contato.js` | Cópia exata do `..\contato.js` da capa: monta o endereço de e-mail no navegador e o copia no clique. |
| `fontes\*.woff2` | Austin News Headline (logotipo), Deck ("Em breve."), Text roman (rodapé) e Text italic No 2 ("Contato"), cortadas para as letras que a página usa. Têm os mesmos nomes das de `..\fontes`. |
| `favicon.svg`, `icone-180.png` | Ícone da aba e da tela inicial do celular (os do sítio). |
| `.nojekyll` | Arquivo vazio: o GitHub Pages publica os arquivos como estão, sem processá-los. |
| `CNAME` | Criado pelo GitHub em 08/11/2026, ao registrar o domínio em Settings → Pages. Uma linha só; não apague, senão o domínio sai do Pages. |
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
   `index.html`, `contato.js`, `favicon.svg`, `icone-180.png`, `.nojekyll` e a pasta `fontes`
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

## Atualizar o que já está no ar

Depois de mexer em qualquer arquivo desta pasta, uma linha no terminal manda tudo (troque
o texto entre aspas por uma frase sobre a mudança):

```bash
cd C:/Projetos/textos.etc.br/provisoria; git add -A; git commit -m "Descreva a mudança"; git -c credential.helper= -c 'credential.helper=!gh auth git-credential' push
```

O trecho com `credential.helper` usa o login do GitHub CLI (`gh`): não pede senha e não
mexe na configuração do git. O Pages republica sozinho em cerca de um minuto. Para ver
antes o que vai subir, rode `git status` e `git diff`. Se o push for recusado (`rejected`,
`fetch first`), o GitHub tem um commit que a pasta não tem (foi o caso do `CNAME`): rode
`git pull --ff-only` e repita a linha.

## Usar o domínio textos.etc.br

**Feito em 08/11/2026: `https://textos.etc.br/` está no ar, com HTTPS.** A ordem que
funcionou, e a que o GitHub recomenda, é DNS primeiro e domínio no GitHub depois: com o
`CNAME` no repositório antes de o DNS apontar, o endereço `github.io` redirecionaria para
um domínio que ainda não abre.

1. No painel de DNS do domínio (o do Registro.br, que hospeda o DNS), quatro registros
   **A** para `textos.etc.br` apontando para os IPs do GitHub Pages: `185.199.108.153`,
   `185.199.109.153`, `185.199.110.153` e `185.199.111.153`. Para IPv6, quatro registros
   **AAAA**: `2606:50c0:8000::153` até `2606:50c0:8003::153` (não foram usados). Os números
   são da documentação do GitHub ("Managing a custom domain for your GitHub Pages site") e
   podem mudar: confira lá antes de digitar. Para ver se já valem:
   `Resolve-DnsName textos.etc.br -Type A -Server 8.8.8.8`.
2. **Settings → Pages → Custom domain**: `textos.etc.br`, **Save**. Pelo terminal:
   `gh api -X PUT repos/<usuário>/<repositório>/pages -f cname=textos.etc.br`. O GitHub cria
   um commit "Create CNAME" no repositório: rode `git pull --ff-only` na pasta, senão o
   próximo push é recusado.
3. O certificado (Let's Encrypt, emitido pelo GitHub) saiu em cerca de 2 minutos; o atual
   vale até 06/02/2027 e o GitHub o renova sozinho. Então marque **Enforce HTTPS** em
   Settings → Pages, ou, pelo terminal:
   `gh api -X PUT repos/<usuário>/<repositório>/pages -F https_enforced=true`.

Como ficou: `http://` e `www` redirecionam para `https://textos.etc.br/`, e o endereço antigo
do `github.io` também. O domínio está com DNSSEC (servidores `*.sec.dns.br` do Registro.br);
o Pages funciona com ele. O `www` tem os mesmos 4 registros A, o que funciona (o certificado
cobre o `www`); o GitHub recomenda trocá-los por um `CNAME` do `www` para
`<usuário>.github.io`, mas é opcional.

O `<link rel="canonical">` e o `og:url` já apontam para `https://textos.etc.br/`.

## Proteção do e-mail

O endereço não existe inteiro em nenhum arquivo desta pasta. No HTML há só dois pedaços
separados (`data-a` e `data-b`); o `contato.js` os junta no navegador, e a arroba nasce
de `String.fromCharCode(64)`. Também não há link `mailto`, que é o primeiro padrão que os
coletores de spam procuram. Um clique em "Contato", no alto, ou no endereço do rodapé o
copia para a área de transferência, o que serve a qualquer webmail.

- **Protege de** quem lê o código sem executar JavaScript, que é o coletor comum: ele
  procura "nome, arroba, domínio" ou `mailto` e não encontra nada.
- **Não protege de** um robô que abre a página como um navegador de verdade, executa o
  script e lê o que aparece na tela. Contra esse só serve um formulário de contato com
  servidor, ou um serviço antispam: nenhuma técnica só de JavaScript é completa.
- **Sem JavaScript**, o `<noscript>` do rodapé mostra o endereço com a arroba escrita por
  extenso, como na capa: legível para gente, mas um coletor esperto pode reconhecer o
  "(arroba)". Para não deixar rastro nenhum, troque esse texto por um pedido de ativar o
  JavaScript (a pessoa ainda tem o WhatsApp e o Instagram ao lado).
- **Nunca escreva o endereço por extenso em arquivo nenhum deste repositório**, nem neste
  LEIAME: o repositório é público e o GitHub é raspado.
- Para conferir depois de qualquer mexida: o `index.html` e o `contato.js` não podem ter
  `mailto` nem arroba que não seja de regra CSS (`@font-face`, `@media`). A única menção
  ao endereço é o texto do `<noscript>`.

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
| `text-roman` | `textos.etc.br · 2026`, o endereço de e-mail (montado pelo script), os avisos "endereço copiado" e "selecione e copie", o texto do `<noscript>`, `WhatsApp`, `Instagram` e os algarismos 0 a 9 (38 letras e sinais) |
| `text-no2-italic` | `Contato` |

O comando (aqui para o Deck; troque o arquivo e o `--text`):

```bash
cd C:/Projetos/textos.etc.br/provisoria
python -m fontTools.subset ../fontes/deck-roman.woff2 --output-file=fontes/deck-roman.woff2 --flavor=woff2 --text="Em breve. " "--layout-features=kern,liga,calt,locl,ccmp,mark,mkmk,rlig,clig" "--name-IDs=*" --notdef-outline "--drop-tables+=hdmx"
```

O Text roman tem espaço sem quebra e `·`; para ele é mais seguro listar os códigos das
letras (`--unicodes`) do que digitá-las. Esta é a lista de hoje:

```bash
python -m fontTools.subset ../fontes/text-roman.woff2 --output-file=fontes/text-roman.woff2 --flavor=woff2 --unicodes="U+0020,U+0028,U+0029,U+002E,U+0030-0039,U+0040,U+0041,U+0049,U+0057,U+0061-0065,U+0067-0069,U+006C-006F,U+0070,U+0072-0074,U+0078,U+00A0,U+00B7,U+00E7" "--layout-features=kern,liga,calt,locl,ccmp,mark,mkmk,rlig,clig" "--name-IDs=*" --notdef-outline "--drop-tables+=hdmx"
```

Ele mantém o kerning e o hinting e descarta só o que a página não usa: versaletes,
números antigos, frações e alternativas. Para usar os arquivos completos, copie-os para
`fontes\` com os mesmos nomes; nada mais muda.

## Quando a versão definitiva sair

Troque o conteúdo do repositório pelo do sítio (ou aponte o domínio para a hospedagem
nova). A provisória já usa o mesmo `contato.js` da capa; a definitiva traz também as
páginas internas e o `formulario.js`.

## Diferenças em relação à capa

- **O e-mail é o da capa**: um botão que copia o endereço, montado pelo `contato.js`
  (ver "Proteção do e-mail").
- **"Contato", no alto, copia o e-mail** (na capa, abre `contato.html`). O aviso
  "endereço copiado" sobe acima da palavra, alinhado à direita para não passar da margem.
- **"Em breve."** ocupa o lugar da linha de serviços e da grade, em Austin Deck, no
  corpo dos nomes da capa (`100cqw / 28`).
- **O rodapé tem o filete de 2 px por cima** e desce até o pé da tela. Na capa, o filete
  de cima é o que fecha a grade. Para tirá-lo, apague a linha `border-top` da regra
  `.rodape`.
- **`overflow-x: clip`** na folha: se o logotipo chegar com uma fonte de reserva mais
  larga (um Android sem Georgia, por exemplo), a página não ganha barra de rolagem lateral.
- O título e a descrição dizem "em breve"; o resto dos metadados é o da capa.
