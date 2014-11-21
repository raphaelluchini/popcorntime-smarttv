var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

var Main =
{

};
Main.num = 0;
Main.last = 0;
Main.selected = 0;
Main.canBack = false;
Main.onLoad = function()
{
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();
};

Main.onUnload = function()
{

};

Main.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

Main.keyDown = function()
{
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);
	
	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("RETURN");
			if(Main.canBack){
				$('div.movie-detail > div.closer').trigger('click');
			}else{
				//widgetAPI.sendReturnEvent();
			}
			
			break;
		case tvKey.KEY_LEFT:
			
			if(Main.num > 0){
				Main.num -= 1;
			}
			console.log(Main.num);
			break;
		case tvKey.KEY_RIGHT:
			
			Main.num += 1;
			console.log(Main.num);
			break;
		case tvKey.KEY_UP:
			if(Main.num > 11)
			Main.num = Main.num - 11;
			break;
		case tvKey.KEY_DOWN:
			Main.num = Main.num + 11;
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			$('.movie-list > li').eq(Main.num).find('a').trigger('click');
			if(Main.selected == Main.num){
				$('.play-button').trigger('click');
				alert('PLAY')
			}
			Main.selected = Main.num;
			console.log(Main.num);
			break;
		default:
			alert("Unhandled key");
			break;
	}
	
	
	$('.movie-list > li').eq(Main.last).find('i').css('opacity','0');
	$('.movie-list > li').eq(Main.num).find('i').css('opacity','1');
	Main.last = Main.num;
	//$('.movie-list > li').eq(Main.num).find('a').trigger("mouseover");
};