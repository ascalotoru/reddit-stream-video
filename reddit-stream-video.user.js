// ==UserScript==
// @name        reddit-stream video
// @description Add a video stream to reddit-stream web.
// @namespace   http://asiercl.com/reddit-stream-video
// @include     http://reddit-stream.com/comments/*
// @version     1
// @grant       none
// ==/UserScript==
//addButton();

function removeSidebar() {
    var elem = document.getElementById('sidebar-wrap');
    elem.parentNode.removeChild(elem);
}
function showInputBox() {
    var embed = window.prompt('Insert Twitch.tv embedd code:');
    if (embed !== null && embed !== ''){
        addEmbed(embed);
    } else {
        alert('Type a valid embedd code.');
    }
}
var getLocation = function getLocation(href){
    var l = document.createElement("a");
    l.href = href;
    return l;
}
function addEmbed(embed) {
    var main = document.getElementById('c-main');
    var sidebar = document.getElementById('sidebar');
    main.style.width="36%";
    main.style.margin="0";
    sidebar.style.width="60%";
    sidebar.style.left="40%";
    var l = getLocation(embed);
    console.log(embed);
    embed = l.pathname;
    embed = "<object type='application/x-shockwave-flash' height='450' width='800' id='live_embed_player_flash' data='http://www.twitch.tv/widgets/live_embed_player.swf?channel=" + embed + "' bgcolor='#000000'><param name='allowFullScreen' value='true' /><param name='allowScriptAccess' value='always' /><param name='allowNetworking' value='all' /><param name='movie' value='http://www.twitch.tv/widgets/live_embed_player.swf' /><param name='flashvars' value='hostname=www.twitch.tv&channel=" + embed + "&auto_play=true&start_volume=25' /></object>"
    /*GM_xmlhttpRequest({
        method: "GET",
        url: embed,   
        onload: function(response){
            parser = new DOMParser();
            twitch = parser.parseFromString(response.responseText, "text/html");
            twitch.
        }
    });*/
    removeSidebar();
    var newDiv = document.createElement('div');
    newDiv.id = 'twitchEmbedd';
    newDiv.innerHTML=embed;
    document.getElementById('sidebar').appendChild(newDiv);
}
function addButton() {
    var bar = document.getElementById('user-bar');
    var div = document.createElement('div');
    div.id = 'inputButton';
    div.className = 'account-info';
    div.innerHTML="<span id='btnAddVideo'>Add Video Stream</span>";
    console.log(bar.childNode[1]);
    bar.appendChild(div);
    document.getElementById('btnAddVideo').className = "button";
    document.getElementById('btnAddVideo').addEventListener("click", showInputBox, false);
}
addButton();
