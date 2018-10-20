function check(input) {
    if (input.value != document.getElementById('txtPassword').value) {
        input.setCustomValidity('password not matched');
    } else {
        input.setCustomValidity('');
    }
}

$(document).ready(function () {
    btnSubmit.onclick = function () {
        sha256(txtPassword.value).then(function (encryptedPwd) {
            let password = txtPassword.value;
            let query = {
                username: txtUsername.value,
                password: encryptedPwd,
                stuId: txtStudentID.value,
                tel: txtPhone.value,
                email: txtEmail.value
            };

            let usernameRegex = /^[a-zA-Z]\w{5,17}$/;
            let passwordRegex = /^[a-zA-Z0-9_\-]{6,12}$/;
            let stuIdRegex = /^[1-9]\d{7}$/;
            let telRegex = /^[1-9]\d{10}$/;
            let emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

            if (!usernameRegex.test(query.username) || !passwordRegex.test(password) || txtConfirmPassword.value !== password ||
                !stuIdRegex.test(query.stuId) || !telRegex.test(query.tel) || !emailRegex.test(query.email))
                return false;

            let formData = new FormData();
            for (let key in Object.keys(query)) {
                formData.append(key, query[key]);
            }

            let status;

            fetch('/api/register', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(query)
            }).then(res => {
                status = res.status;
                if (status == 200) {
                    window.location.href = "/user/profile";
                } else {
                    return res.json();
                }
            }).then(data => {
                if (!data) return;
                if (status == 409) {
                    switch (data.field) {
                        case 'username':
                            alert('用户名冲突');
                            break;
                        case 'stuId':
                            alert('学号冲突');
                            break;
                        case 'tel':
                            alert('电话冲突');
                            break;
                        case 'email':
                            alert('邮箱冲突');
                            break;
                    }
                } else {
                    alert(data.msg);
                }
            }).catch(err => {
                alert(err);
            })
        });
    };
});