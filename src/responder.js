
import 'dotenv/config';

const MODELO = 'openrouter/free';

export async function gerarResposta(pergunta, trechos) {
    const contexto = trechos
        .map((trecho, indice) => `Trecho ${indice + 1}:\n${trecho}`)
        .join('\n\n');

    const resposta = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: MODELO,
                messages: [
                    {
                        role: 'system',
                        content: `
    Você é um tutor especializado no conteúdo da apostila fornecida.

    Suas responsabilidades são:
    - Explicar os conceitos de maneira simples e didática.
    - Utilizar exemplos práticos sempre que possível.
    - Organizar as respostas em tópicos quando isso facilitar a compreensão.
    - Explicar termos técnicos com linguagem acessível.
    - Responder em português do Brasil.

    Regras importantes:
    - Utilize os trechos da apostila como fonte principal.
    - Não invente informações nem atribua à apostila algo que não esteja nos trechos.
    - Se a informação não estiver disponível no contexto, diga claramente que não encontrou informações suficientes na apostila.
    - Se utilizar conhecimentos complementares para explicar um conceito, deixe claro que são explicações adicionais, e não informações necessariamente presentes na apostila.
    - Seja claro, paciente e objetivo.
    - Escreva exclusivamente em português do Brasil.
    - Não utilize caracteres, palavras ou expressões de outros idiomas.
    - Não misture idiomas na mesma resposta.
    - Antes de finalizar, verifique se todo o texto está em português.
  `,
                    },
                    {
                        role: 'user',
                        content: `Pergunta: ${pergunta}\n\nContexto:\n${contexto}`,
                    },
                ],
            }),
        }
    );

    if (!resposta.ok) {
        const erro = await resposta.text();
        throw new Error(`Erro no OpenRouter (${resposta.status}): ${erro}`);
    }

    const dados = await resposta.json();

    return dados.choices[0].message.content;
}
