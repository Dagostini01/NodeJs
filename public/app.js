document.addEventListener("DOMContentLoaded", () => {
    const livrosList = document.getElementById("livrosList");
    const addForm = document.getElementById("addForm");

    const listarLivros = async () => {
        const response = await fetch("http://localhost:3000/livros");
        const livros = await response.json();

        livrosList.innerHTML = ""; // Limpar a lista

        livros.forEach(livro => {
            const li = document.createElement("li");
            li.textContent = `${livro.id}: ${livro.titulo}`;

            // Botão para editar
            const editarBtn = document.createElement("button");
            editarBtn.textContent = "Editar";
            editarBtn.addEventListener("click", () => editarLivro(livro.id, livro.titulo));
            li.appendChild(editarBtn);

            // Botão para excluir
            const excluirBtn = document.createElement("button");
            excluirBtn.textContent = "Excluir";
            excluirBtn.addEventListener("click", () => excluirLivro(livro.id));
            li.appendChild(excluirBtn);

            livrosList.appendChild(li);
        });
    };

    const editarLivro = async (livroId, tituloAtual) => {
        const novoTitulo = prompt("Novo título:", tituloAtual);
        if (novoTitulo !== null) {
            try {
                await fetch(`http://localhost:3000/livros/${livroId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ titulo: novoTitulo }),
                });

                // Aguarde um curto período para garantir que a edição seja processada
                await new Promise(resolve => setTimeout(resolve, 100));

                // Listar os livros após a edição
                await listarLivros();
            } catch (error) {
                console.error("Erro ao editar livro:", error);
            }
        }
    };

    const excluirLivro = async (livroId) => {
        const confirmacao = confirm("Tem certeza que deseja excluir este livro?");
        if (confirmacao) {
            await fetch(`http://localhost:3000/livros/${livroId}`, {
                method: "DELETE",
            });

            // Atualizar a lista após a exclusão
            await listarLivros();
        }
    };

    addForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const titulo = document.getElementById("titulo").value;
        const id = document.getElementById("id").value;

        await fetch("http://localhost:3000/livros", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id:Number(id), titulo }),
        });

        // Atualizar a lista após a adição
        await listarLivros();
    });

    // Inicializar a lista de livros ao carregar a página
    listarLivros();
});
