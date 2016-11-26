//正则；
var psw = /^\w{6,18}$/;
var tel = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
var pword = /^\w{8,12}$/;
//初始化;
$('#mphone').val('');
$('#mphone-conf-code').val('');
$('#mphone-psw').val('');
$('#conf-mphone-psw').val('');

// conf-code
function getCode(obj){
	var num;
	var str=[];
	for (var i = 0; i<6; i++) {
		 num = Math.floor(Math.random()*10);
		 str.push(num);	
	}
	var code = str.join('');
	$('.'+obj).html(code);
}

//获取验证码同时验证输入的手机号格式；
$('.get-conf-code').click(function(){
	if(!(tel.test($('#mphone').val()))){
		$('#mphone').val('').attr('placeholder','格式有误，请重新输入').css('border','1px solid red');
	}else{
		$('#mphone').css('border','1px solid #3e9');
		
		getCode('get-conf-code');
	}	
})
$('#mphone-conf-code').blur(function(){
	if($(this).val() != $('.get-conf-code').html()){
		getCode('get-conf-code');
		$(this).attr('placeholder','验证码错误，请重新输入').val('').css('border','1px solid red');
	}else{
		$(this).css('border','1px solid #3e9');
	}
})
$('#mphone').blur(function(){
	if(!(tel.test($('#mphone').val()))){
		$('#mphone').val('').attr('placeholder','格式有误，请重新输入').css('border','1px solid red');
	}else{
		$('#mphone').css('border','1px solid #3e9');
	}
})
//验证密码格式以及重复密码时是否一致；
$('#mphone-psw').blur(function(){
	if(!(psw.test($(this).val()))){
		$(this).val('').attr('placeholder','格式有误，请重新输入').css('border','1px solid red');
	}else{
		$(this).css('border','1px solid #3e9');
	}
})
$('#conf-mphone-psw').blur(function(){
	if($(this).val()!=$('#mphone-psw').val()){
		$(this).val('').attr('placeholder','两次密码不一致，请重新输入').css('border','1px solid red');
	}else{
		$(this).css('border','1px solid #3e9');
	}
})
//agree栏不被选中时禁止提交；
var remember = document.getElementById('remember');
var btn = document.getElementsByClassName('register-btn')[0];
if (remember.checked == false){
    btn.disabled =true;
    btn.style.opacity = 0.5;
}
remember.onchange = function(){
    if(this.checked == false){
      	btn.disabled =true;
        btn.style.opacity = 0.5;
    } else{
        btn.disabled = false;
        btn.style.opacity = 1;
    }
}   
//提交时验证各项不为空；     	
 $('.register-btn').click(function(){
 	if($('#conf-mphone-psw').val()!=$('#mphone-psw').val()){
		$('#conf-mphone-psw').val('').attr('placeholder','两次密码不一致，请重新输入').css('border','1px solid red');
	}
	var $val1 = $('#mphone').val();
 	var $val2 = $('#mphone-conf-code').val();
 	var $val3 = $('#mphone-psw').val();
 	var $val4 = $('#conf-mphone-psw').val();
 	if($val1!=''&&$val2!=''&&$val3!=''&&$val4!=''){
 		setCookie('userPhoneNumber',$val1,7);
 		setCookie('passWord',$val3,7);
 		setTimeout(function(){
 			window.location.href="login.html";
 		},3000);
		
 	}else{
 		if ($val1 == '') {
 			$('#mphone').css('border','1px solid red');
 		}else if ($val2 == '') {
 			$('#mphone-conf-code').css('border','1px solid red');
 		}else if($val3 == ''){
 			$('#mphone-psw').css('border','1px solid red');
 		}else if ($val4 == '') {
 			$('#conf-mphone-psw').css('border','1px solid red');
 		}
 	}
 })
 