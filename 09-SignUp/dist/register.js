$(document).ready(function () {

    btnSubmit.onclick = function () {
        let query = {
            username: txtUsername.value,
            stuId: txtStudentID.value,
            tel: txtPhone.value,
            email: txtEmail.value
        };

        let usernameRegex = /^[a-zA-Z]\w{5,17}$/;
        let stuIdRegex = /^[1-9]\d{7}$/;
        let telRegex = /^[1-9]\d{10}$/;
        let emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

        let flag = true;

        if (!usernameRegex.test(query.username)) {
            txtUsername.setCustomValidity('用户名需要');
            flag = false;
        } else {
            txtUsername.setCustomValidity('');
        }

        if (!stuIdRegex.test(query.stuId)) {
            txtStudentID.setCustomValidity('invalid');
            flag = false;
        } else {
            txtStudentID.setCustomValidity('');
        }

        if (!telRegex.test(query.tel)) {
            txtPhone.setCustomValidity('invalid');
            flag = false;
        } else {
            txtPhone.setCustomValidity('');
        }

        if (!emailRegex.test(query.email)) {
            txtEmail.setCustomValidity('invalid');
            flag = false;
        } else {
            txtEmail.setCustomValidity('');
        }

        if (!flag) return;

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
                window.location.href = "/?username=" + query.username;
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
    };
});