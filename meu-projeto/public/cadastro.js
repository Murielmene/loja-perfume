async function cadastrar() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    console.log(nome)
    
    console.log(email)
    
    console.log(senha)
    try {
        if(!nome || !email|| !senha){
            alert("preencha todos os campos")
            return
        }
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });

        const data = await response.json();
        alert(`Usuario cadastrado`)
        window.location.href = "./login.html"
        document.getElementById('msg').innerText = data.message || data.error;
    } catch (err) {
        document.getElementById('msg').innerText = 'Erro no cadastro';
    }
}