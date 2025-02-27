const sair = () => {
    localStorage.clear();
    window.location.href = "/login.html"
}

const verificaRefreshToken = async () => {
    const refresh_token_expira = localStorage.getItem("refresh_token_expira")
    if(refresh_token_expira) {
        const data_refresh_token_expira = new Date(Number(refresh_token_expira));
        if(new Date() > data_refresh_token_expira){
            const refreshFunction = async () => {
                try {
                    const response = await fetch(`${API_URL}/login/refresh-token`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
            
                    const data = await response.json();
                
                    if (response.ok) {
                        localStorage.setItem("token", data.token);

                        const agora = new Date();
                        const expiraEm = agora.getTime() + 60000 * 60; // 1 hora para refazer token
                        localStorage.setItem("refresh_token_expira", expiraEm);
                    } else {
                        sair();
                    }
                } catch (error) {
                    sair();
                }
            };

            refreshFunction();
        }
    }
}

const verificaTokenLogado = async () => {
    try {
        const response = await fetch(`${API_URL}/logado`, {
            method: "HEAD",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            verificaRefreshToken();
        } else {
            sair();
        }
    } catch (error) {
        sair();
    }
};

const token = localStorage.getItem("token")
if(!token) {
    sair();
}
else {
    verificaTokenLogado();
}
