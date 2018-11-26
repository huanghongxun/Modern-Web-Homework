$(document).ready(function () {

    btnSubmit.onclick = function () {
        let query = {
            username: txtUsername.value
        };

        let usernameRegex = /^[a-zA-Z]\w{5,17}$/;

        let flag = true;

        if (!usernameRegex.test(query.username)) {
            txtUsername.setCustomValidity('用户名需要');
            flag = false;
        } else {
            txtUsername.setCustomValidity('');
        }

        if (!flag) return;

        window.location.href = "/?username=" + query.username;
    };
});