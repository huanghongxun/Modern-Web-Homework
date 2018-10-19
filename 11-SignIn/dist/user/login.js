$(document).ready(function () {

    btnSubmit.onclick = function () {
        sha256(txtPassword.value).then(function (password) {
            let query = {
                username: txtUsername.value,
                password: password
            };

            let urlParams = new URLSearchParams(window.location.search);

            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(query)
            }).then(res => res.json())
            .then(obj => {
                if (obj.type == 'success') {
                    window.location.href = urlParams.get('nav_from') || '/user/profile';
                } else if (obj.type == 'not_found') {
                    lblError.textContent = '不存在该用户';
                } else if (obj.type == 'wrong_password') {
                    lblError.textContent = '密码错误';
                } else {
                    console.log(obj);
                }
            }).catch(err => {
                lblError.textContent = '服务器错误';
            })
        });

    };
});