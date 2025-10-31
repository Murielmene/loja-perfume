async function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
      }
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();
        if(response.ok){
            alert("Login realizado com sucesso!");
            console.log("Usuário logado:", data.user);

            window.location.href = "./index.html";
        }else {
        alert(data.message || "Email ou senha incorretos!");
      }
    } catch (err) {
        document.getElementById('msg').innerText = 'Erro no login';
    }
}
