//var product_id = $('#js_current_product_id').val();
var product_id = $('#ntalkerparam_product_id').val();
var user_id = $('#js_current_user_id').val();
var username = $('#js_current_user_name').val();
var userlevel = $('#js_current_user_ranklevel').val();
var order_id = $('#js_current_order_id').val();
var order_price = $('#js_current_order_price').val();
var brand_name = $('#ntalkerparam_brand_name').val();
var cata_name = $('#ntalkerparam_cata_name').val();
var cart_price = $('#ntalkerparam_cart_total').val();
var cart_items = $('#ntalkerparam_cart_items').val();
if((product_id =='' && product_id == undefined) && (order_id =='' && order_id == undefined) && (order_price =='' && order_price == undefined) && ((brand_name == '' && brand_name == undefined) || (cata_name == '' && cata_name == undefined)) &&  (cart_items == '' && cart_items == undefined)){
	NTKF_PARAM = {
	  siteid:"kf_9823",
	  settingid: "kf_9823_1377055050101",
	  uid:user_id,
	  uname:username,
	  userlevel:userlevel
	}
}else if((product_id !='' && product_id != undefined)){
	NTKF_PARAM = {
	  siteid:"kf_9823",
	  settingid: "kf_9823_1377055050101",
	  //itemid:product_id,
	  uid:user_id,
	  uname:username,
	  userlevel:userlevel,
	  ntalkerparam:{
		item:{
			id:product_id
		}
	  }
	}
}else if((brand_name != '' && brand_name != undefined) || (cata_name != '' && cata_name != undefined)){
	NTKF_PARAM = {
	  siteid:"kf_9823",
	  settingid: "kf_9823_1377055050101",
	  uid:user_id,
	  uname:username,
	  userlevel:userlevel,
	  ntalkerparam:{
			category:cata_name,
			brand:brand_name
		}
	}
}else if((cart_items != '' && cart_items != undefined)){
	var f=eval('('+cart_items+')')
	var len = f.length;
	var items = new Array();
	for(i=0;i<len;i++){
		items[i] = f[i];
	}
	if((cart_price!='' && cart_price!=undefined)){
		NTKF_PARAM = {
		  siteid:"kf_9823",
		  settingid: "kf_9823_1377055050101",
		  //itemid:product_id,
		  uid:user_id,
		  uname:username,
		  userlevel:userlevel,
		  ntalkerparam:{
				cartprice:cart_price,
				items:items
		  }
		}
	}else if((order_id !='' && order_id != undefined)){
		NTKF_PARAM = {
		  siteid:"kf_9823",
		  settingid: "kf_9823_1377055050101",
		  //itemid:product_id,
		  uid:user_id,
		  uname:username,
		  userlevel:userlevel,
		  orderid:order_id,
		  orderprice:order_price,
		  ntalkerparam:{
			items:items
		  }
		}
	}else{
		NTKF_PARAM = {
		  siteid:"kf_9823",
		  settingid: "kf_9823_1377055050101",
		  //itemid:product_id,
		  uid:user_id,
		  uname:username,
		  userlevel:userlevel,
		  ntalkerparam:{
			items:items
		  }
		}	
	}
}else{
	NTKF_PARAM = {
	  siteid:"kf_9823",
	  settingid: "kf_9823_1377055050101",
	  uid:user_id,
	  uname:username,
	  userlevel:userlevel
	}
}

