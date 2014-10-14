
var player1 = new Player();
var player2 = new Player();
var Master = new Master();
var rob = new Robot();
var current = null;
var mode = 'fast';
var begin = false;
var single = false;
var ready = false;
var name1, name2;
var avatar1, avatar2;
var strike = false;
var caged = 0;
var h0 = [], h1 = [];

(function(){
    for( idx in woods )
    {
        h0.push( woods[ idx ] );
    }
})();

function drawCage(){
	
    var cage = '<section class="cage"></section>';
	
    for( var k = 0; k < 72; k++ )
    {
        $('#farm').append(cage);
    //$('.cage:eq(' + k + ')').html( '<span style=" position: absolute; top: 20px;" >' + k + '</span>' );
    }
	
}

function drawWood(){
    
    var hup = '<section class="horizon-up wood"></section>';
    var hdown = '<section class="horizon-down wood"></section>';
    var veast = '<section class="vert-east wood"></section>';
    var vwest = '<section class="vert-west wood"></section>';
    var lcell = '<section class="lcell"></section>';
    var rcell = '<section class="rcell"></section>';
    var dcell = '<section class="dcell"></section>';	
    var scell = '<section class="scell"></section>';
	
    for( var k = 0; k < 72; k++ )
    {
        $('.cage:eq(' + k + ')').append(lcell + hup + vwest);
		
        if(k == 8 || k == 17 || k == 26 || k == 35 || k == 44 || k == 53 || k == 62 || k == 71)
        {
            $('.cage:eq(' + k + ')').append(rcell + veast).css('width', '74');	
        }
			
        if(k > 62)
            $('.cage:eq(' + k + ')').append(dcell + hdown).css('height','70');
			
        if(k == 71)
            $('.cage:eq(' + k + ')').append(scell);
    }	
}

function paintWood(wood){
	
    $('.wood:eq(' + wood + ')').addClass('built');
}

function paintCage(index){
    
    var image = 'url("' + current.avatar + '")';
    $('.cage:eq(' + index + ')').addClass('caged').css('background-image', image );    
}

function indicatePlayer(){
    
    if(current.nick == 'p1')
    {
        $('#mark2').fadeOut();
        $('#mark1').fadeIn();
    }
    else if(current.nick == 'p2')
    {
        $('#mark1').fadeOut();
        $('#mark2').fadeIn();
    }    
}

function manage( index ){
    
    cage[ index ].count++;
    
    if( cage[ index ].count == 4 && !$('.cage:eq(' + index + ')').hasClass('caged') )
        markFence( index );    
}

function countUp(obj){

    var wd = $('.wood').index(obj);
    
    paintWood(wd);    
    hamper( wd );
	
    for( var r = 0; r < woods[wd].cage.length; r++ )    
    {        
        manage( woods[wd].cage[ r ] );
    }
    
    if(caged == 72)
        gameEnd();
    
    changeCurrent();
        
    indicatePlayer();
    strike = false;
    
    if( single && current == player2 )
    {
        goRob();
    }
}

function markFence( index ){
    
    paintCage( index );            
    current.addPoint();                
    current.nick == 'p1' ? $('#p1pt').html(current.points) : $('#p2pt').html(current.points);
    strike = true;
    caged++;
}

function goRob(){
    
    var timer = 5;
    var tgt = rob.choose();
    
    var inter = setInterval(function(){
        
        timer--;
        if( timer == 0 )
        {
            clearInterval(inter);
            $('.wood:eq(' + tgt + ')').click();
        }
            
    },250);    
    
}

function changeCurrent(){
    
    if(mode == 'strat')        
        current = Master.changePlayer(current,player1,player2);
    
    else if(mode == 'fast')
    {
        if(strike == false)
            current = Master.changePlayer(current,player1,player2);
    }    
}

function hamper( index ){
    
    for( var k = 0; k < h0.length; k++ ){
        
        if( h0[ k ].idx == index )
        {   
            h1.push( h0.splice( k , 1 ) );
            return;  
        }        
              
    }    
}

function fence(){
    
	if( !begin ) return;
	
    if(!$(this).hasClass('built'))
        countUp(this);	
}

function constructPlayer(){
    
    var stop = 30;
    
    var t = setInterval(function(){
        
        $('.chooseAvatar:eq(' + Math.round(Math.random() * 4) + ')').click();
        stop--;
        
        if(stop == 0){
            clearInterval(t);
            name2 = $('.selected').find('figcaption').html();
            avatar2 = $('.selected').find('img').attr('src'); 
            player2.setName(name2);
            player2.setAvatar(avatar2);
            player2.setNick('p2');
            $('.avatar').find('#p2avatar').attr('src',player2.avatar);
            $('.second').html(player2.name);
            $('#p2').fadeIn(1300);
            $('.newGameContainer2').fadeOut();
            gameBegin();
        }        
    },100);
}

function holdPlayer(){
    
    $('.chooseAvatar').removeClass('selected').addClass('available');
    $(this).removeClass('available').addClass('selected');
    
    if(!ready){
    
        name1 = $('.selected').find('figcaption').html();
        avatar1 = $('.selected').find('img').attr('src');
        
    }
    
    if(ready && !single){
        
        name2 = $('.selected').find('figcaption').html();
        avatar2 = $('.selected').find('img').attr('src');
    }    
}

function createPlayer(){
          
    if(single){

        player1.setName(name1);
        player1.setAvatar(avatar1);
        player1.setNick('p1');

        $('.avatar').find('#p1avatar').attr('src',player1.avatar);
        $('.first').html(player1.name);
        $('#p1').fadeIn(1300);
        ready = true;
        callPlayer();

        player1.setEnemy(player2);
        player2.setEnemy(player1);  

        constructPlayer();  
    }
    
    else if(!single){         
        if(ready){
            
            player2.setName(name2);
            player2.setAvatar(avatar2);
            player2.setNick('p2');
    
            $('.avatar').find('#p2avatar').attr('src',player2.avatar);
            $('.second').html(player2.name);
            $('#p2').fadeIn(1300);
        
            player1.setEnemy(player2);
            player2.setEnemy(player1);                         
            
            $('.newGameContainer2').fadeOut(); 
            gameBegin();
        }
        if(!ready){
            
            player1.setName(name1);
            player1.setAvatar(avatar1);
            player1.setNick('p1');
            
            $('.avatar').find('#p1avatar').attr('src',player1.avatar);
            $('.first').html(player1.name);
            $('#p1').fadeIn(1300);
            ready = true;
            callPlayer();
            return;
        }        
    }
    
}

function ahead(){
    
    $('.modeContainer').fadeOut();
    $('.newGameContainer').fadeOut();
    $('.newGameContainer2').fadeIn();
    callPlayer();
    
}

function behind(){
    
    $('.modeContainer').fadeOut();
    $('.newGameContainer2').fadeOut();
    $('.newGameContainer').fadeIn();    
}

function front(){
    
    $('.newGameContainer2').fadeOut();
    $('.newGameContainer').fadeOut();
    $('.modeContainer').fadeIn();    
}

function gameBegin(){
    
    var modeIcon = mode == 'fast' ? 'img/fast-icon.png' : 'img/strat-icon.png';
    var modeText = mode == 'fast' ? 'Rápido' : 'Estratégico';
    $('#modeShow').append('<img src="' + modeIcon + '" />' + modeText );
    
    begin = true;
    current = player1;    
    $('#mark1').fadeIn();
    
}

function gameEnd(){
    
    var img;
    var winner;
    var score;
    
    if( player1.points > player2.points ){
        
        img = player1.avatar;
        winner = 'Vencedor: ' + player1.name;
        score = 'Pontos:' + player1.points;        
    }
    
    else if( player1.points < player2.points ){
        
        img = player2.avatar;
        winner = 'Vencedor: ' + player2.name;
        score = 'Pontos: ' + player2.points;        
    }
    
    else if( player1.points == player2.points ){
        
        img = 'img/db-icon.png';
        winner = 'Jogo empatado!';
        score = '';        
    }
    
    $('.congratsAvatar').find('img').attr('src',img);
    $('#win').html(winner);
    $('#score').html(score);
    $('.fog').show();
    $('.congrats').show();
    
    $('.ok').click(function(){
        location.reload();
    });
}

function finishHim(){
    
    var asdf = 0;
    var t = setInterval(function(){
            
        $('.wood:eq(' + asdf + ')').click();
        asdf++;
            
        if( asdf == 161 )
            clearInterval(t);
            
    },50);
}

function defineMode(){
    
    call = $(this).attr('id');
    
    mode = call == 'fast' ? 'fast' : 'strat';
    
    behind();    
}

function callPlayer(){
    
    if(!single)
    {
        if(!ready)
            $('#order').html('Selecione jogador 1:');
        
        else
            $('#order').html('Selecione jogador 2:');
    }

    else
    {
        if(!ready)            
            $('#order').html('Selecione jogador 1:');
        
        else
            $('#order').html('Selecionando jogador...');
    }    
}

function showPicker()
{
    $('.ballPicker').fadeIn(1000);
    
    $('.ballItem').click(function(){
        
        var ball = 'url("' + $(this).find('img').attr('src') + '")';
        $('.lcell, .rcell, .dcell, .scell').css('background-image',ball);
        $('.ballPicker').slideUp();
        
    });
}

$(document).ready(function(){
    drawCage();
    drawWood();
    
    //    (function(){
    //        
    //        for( var k = 0; k < 161; k++ ){
    //            
    //            if( $('.wood:eq(' + k + ')').hasClass('horizon-up') || $('.wood:eq(' + k + ')').hasClass('horizon-down') )
    //                $('.wood:eq(' + k + ')').append('<span style="position:absolute;left:20px;top:-1px;">' + k + '</span>');
    //            
    //            else if( $('.wood:eq(' + k + ')').hasClass('vert-west') || $('.wood:eq(' + k + ')').hasClass('vert-east') )
    //                $('.wood:eq(' + k + ')').append('<span style="position:absolute;top:10px;left:-1px;">' + k + '</span>');
    //            
    //        }
    //        
    //    })();
    
    $('#newGame').click(function(){
        $('.modeContainer').fadeToggle();        
        $('.newGameContainer1').fadeOut();
        $('.newGameContainer2').fadeOut();
    });
    
    $('.number').click(function(){
        single = $(this).hasClass('onePlayer') ? true : false;
        ahead(); 
    });
    
    $('#goGame').click(function(){
        $('.present,.whiteFog').fadeOut();
    });
	
    $(window).keypress(function(evt){
        
        if(evt.keyCode == 13)            
            $('.present,.whiteFog').fadeOut();        
    });
        
    $(document).on( 'click', '.wood', fence )
    .on( 'click', '#back', behind )
    .on( 'click', '.chooseAvatar', holdPlayer )
    .on( 'click', '#forward', ahead )
    .on( 'click', '#next', createPlayer )
    .on( 'click', '#custom', showPicker )
    .on( 'click', '.modeImg', defineMode )
    .on( 'click', '.finish', finishHim);
	
});
