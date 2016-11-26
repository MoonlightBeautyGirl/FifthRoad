//匹配用户名密码登录
$('.login-btn').click(function(){
	var userName = $('.username').val();
	var userPsw = $('.user-psw').val();
	if(userName == getCookie('userPhoneNumber')&&userPsw == getCookie('passWord')){
			var remember = document.getElementById('remember');
			if(remember.checked == true){
				setCookie('remember',true,7);
			}else{
				setCookie('remember',false,7);
			}
			$('.user-psw').css('border','1px solid #ccc');
			setTimeout(function(){
			window.location.href="../index.html";
		},3000)
	}else{
		$('.user-psw').val('').attr('placeholder','账户密码不匹配，请重新输入').css('border','1px solid red');
	}
})
//记住我;
