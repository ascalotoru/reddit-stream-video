// ==UserScript==
// @name        reddit-stream video
// @description Add a video stream to reddit-stream web.
// @namespace   http://asiercl.com/reddit-stream-video
// @include     http://reddit-stream.com/comments/*
// @version     1
// @grant       none
// ==/UserScript==

function removeSidebar() {
    var elem = document.getElementById('sidebar-wrap');
    elem.parentNode.removeChild(elem);
}
function addVideo(embed){
	removeSidebar();
    var newDiv = document.createElement('div');
    newDiv.id = 'twitchEmbedd';
    newDiv.innerHTML=embed;
    document.getElementById('sidebar').appendChild(newDiv);
}
function showInputBox() {
    var embed = window.prompt('Insert video URL:');
    if (embed !== null && embed !== ''){
        addEmbed(embed);
    } else {
        alert('Type a valid embedd code.');
    }
}
function getLocation(href){
    var l = document.createElement("a");
    l.href = href;
    return l;
}
function getObjectWidth(){
    w = screen.availWidth;
    return Math.round(800 / 1366 * w);
}
function getObjectHeigth(objW){
    return Math.round(9 / 16 * objW);
}
function addEmbed(embed) {
    var l = getLocation(embed);
	var main = document.getElementById('c-main');
    var sidebar = document.getElementById('sidebar');
    main.style.width="36%";
    main.style.margin="0px 0px 0px 30px";
    sidebar.style.width="60%";
    sidebar.style.left="40%";
    if(l.hostname.localeCompare("www.twitch.tv") == 0 || l.hostname.localeCompare('twitch.tv') == 0){
        embed = "<object type='application/x-shockwave-flash' width='"+getObjectWidth()+"' height='"+getObjectHeigth(getObjectWidth())+"' id='live_embed_player_flash' data='http://www.twitch.tv/widgets/live_embed_player.swf?channel=" + l.pathname + "' bgcolor='#000000'><param name='allowFullScreen' value='true' /><param name='allowScriptAccess' value='always' /><param name='allowNetworking' value='all' /><param name='movie' value='http://www.twitch.tv/widgets/live_embed_player.swf' /><param name='flashvars' value='hostname=www.twitch.tv&channel=" + l.pathname + "&auto_play=true&start_volume=25' /></object>";
		addVideo(embed);
	}else if(l.hostname.localeCompare("www.youtube.com")== 0 || l.hostname.localeCompare("youtube.com") == 0){
		embed = "<iframe width='"+ getObjectWidth()+"' height='"+getObjectHeigth(getObjectWidth())+"' src='https://www.youtube.com/embed/" + embed.substring(embed.indexOf('=')+1) + "' frameborder='0' allowfullscreen></iframe>"
		addVideo(embed);
    }else{
        alert("Please type a valid URL.");
    }
}
function addButton() {
    var bar = document.getElementById('user-bar');
    var div = document.createElement('div');
    div.id = 'inputButton';
    div.className = 'account-info';
    div.style.margin = '10px 0px 0px';
    div.innerHTML="<span id='btnAddVideo'>Add Video Stream</span>";
    bar.childNodes[3].appendChild(div);
    var s = document.getElementById('btnAddVideo');
    s.style.cursor='pointer'; s.style.color='#09F';
    s.style.fontWeight='bold'; s.style.border = '2px solid #09F';
    s.style.padding = '6px 14px';
    document.getElementById('btnAddVideo').addEventListener("click", showInputBox, false);
}
addButton();
