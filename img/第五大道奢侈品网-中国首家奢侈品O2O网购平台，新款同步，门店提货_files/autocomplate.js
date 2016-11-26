$(function() {
                        
            var source = '/search/getkey';
		$( "#tags" ).autocomplete({
                    source: source,
                     //html: true, // optional (jquery.ui.autocomplete.html.js required)
                    appendTo: ".ui-autocomplete",
                    select:function(ev,ui){
                        if(ui.item.cid){
                            $('#search form').append('<input type=hidden name=cid value='+ui.item.cid+' />');
                            $('#search form').append('<input type=hidden name=is_type value='+ui.item.is_type+' />');
                        }
                        global.record_keywords(ui.item.label, ui.item.is_type);
                        return false;
                     },
                    //minLength:2,
                    //autoFocus: true,
                    //disabled: true,
                    // optional (if other layers overlap autocomplete list)
                    open: function(event, ui) {
                        $(".ui-autocomplete").css("z-index", 1000);
                    }
		})
                .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
                    var str = '';
                    if(item.store_total!=undefined && item.store_total >0){
                        str += "<li class='is_store'><b></b><span>找</span><span class='s_key'>“<a>" + item.label + "</a>“</span><span>相关实体店</span><span class='s_num'>&nbsp;约"+item.store_total+"个线下实体店在售</span></li>" ;
                    }
                    if(item.is_type == 0){
                        str += "<li class='is_cata'><span>直接在</span><span class='s_key'>“<a>" + item.cname + "</a>“</span><span>分类搜索</span><span class='s_num'>&nbsp;约"+item.total+"个商品</span></li>" ;

                     }else if(item.is_type == -1){
                         str += "<li class='is_keyword'>搜索 <a>" + item.label + "</a><span class='s_num'>&nbsp;大约"+item.total+"个商品</span></li>" ;

                     }else if(item.is_type == 1){
                         str += "<li class='is_cata' id='cata_"+item.cid+"'>直接进入 <span class='s_key'><a>" + item.label + "</a>&nbsp;</span>分类中查看</li>";
                     }else if(item.is_type == 2){
                         str += "<li class='is_brand' id='cata_"+item.cid+"'><a><dl><dt><img src='"+item.brand_logo+"'></dt><dd><span>" + item.label + "&nbsp;</span><b></b></dd></dl></a></li>";

                    }else if(item.is_type == 3){
                         str += "<li class='is_store' id='cata_"+item.cid+"'>直接在 <span class='s_key'><a>" + item.label + "</a></span>&nbsp;查找相关实体店</li>";
                     }
                    return $(str).appendTo( ul );
                  };
                  
                  var search_history = $.cookie('search_history');
                    $( "#tags" ).focus(function(){
                        if($(this).val() === ''){
                            //console.log(123);
                            
                            var left = $(this).offset().left;
                            left = (left-2)+"px";
                            $(".ui-autocomplete ul").css({'top':'101px','left':left,"width":"412px"});
                            var searchs_history = eval("("+search_history+")");
                            var search = '';
                            $(searchs_history).each(function(){
                                if(this.value !== ''){
                                    $(".ui-autocomplete ul").html("<li><a>"+this.value+"</a></li>");
                                    search += "<li><a>"+this.value+"</a></li>";
                                }
                                
                            });
                            if(search !==''){
                                $(".ui-autocomplete ul").html(search);
                                $(".ui-autocomplete").show();
                            $(".ui-autocomplete ul").show();
                            }
                            
                            $(".ui-autocomplete ul li a").click(function(){
                                $('#tags').val($(this).text());
                                global.record_keywords();
                                //console.log($(this).text());
                                //window.location.href="/search/index?keyword="+$(this).text();
                            });
                            
                        }else{
                            $(".ui-autocomplete").show();
                        }
                    
                });
                

                
});