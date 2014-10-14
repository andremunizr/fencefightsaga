
function Player(name,avatar,enemy,nick){
    
    this.name = name;
    
    this.avatar = avatar;
    
    this.points = 0;
    
    this.enemy = enemy;
    
    this.nick = nick;
    
    this.setName = function(name){
        
        this.name = name;        
    }
    
    this.setNick = function(nick){
        
        this.nick = nick;        
    }
    
    this.setAvatar = function(avatar){
        
        this.avatar = avatar;        
    }
    
    this.getPoints = function(){
        
        return this.points;
    }
    
    this.addPoint = function(){
        
        this.points++;
    }
    
    this.subPoint = function(){
        
        this.points--;
    }
    
    this.setEnemy = function(enemy){
        
        this.enemy = enemy;
    }
    
}

function Master(){
    
    this.changePlayer = function(player,p1,p2){
        
        return player.nick == p1.nick ? p2 : p1;       
    }
}

function Robot(){

    this.randomChoice = function( array ){
        
        if( array.length == 0) 
            return null;
        
        var obj = {};
        
        obj.pos = Math.floor( Math.random() * array.length );
        
        obj.idx = array[ obj.pos ].idx;
                
        return obj;        
    }

    this.once = function( wood ){
       
        var fence = cage[ woods[ wood ].cage[ 0 ] ].count;
       
        switch( fence ){
            case 0 :
                return 6;
            case 1 :
                return 8;
            case 2 :
                return 12;
            case 3 :
                return 0;
        }
       
    }
    
    this.twice = function( wood ){
        
        var fence1 = cage[ woods[ wood ].cage[ 0 ] ].count;
        var fence2 = cage[ woods[ wood ].cage[ 1 ] ].count;
        
        if( fence1 == 3 && fence2 == 3 ) return 1;
        else if( fence1 == 0 && fence2 == 0 ) return 5;
        else if( fence1 == 1 && fence2 == 1 ) return 9;
        else if( fence1 == 2 && fence2 == 2 ) return 13;
        else if( (fence1 == 0 && fence2 == 3) || (fence1 == 3 && fence2 == 0)) return 2;
        else if( (fence1 == 1 && fence2 == 3) || (fence1 == 3 && fence2 == 1)) return 3;
        else if( (fence1 == 0 && fence2 == 1) || (fence1 == 1 && fence2 == 0)) return 7;
        else if( (fence1 == 3 && fence2 == 2) || (fence1 == 2 && fence2 == 3)) return 4;
        else if( (fence1 == 0 && fence2 == 2) || (fence1 == 2 && fence2 == 0)) return 10;
        else if( (fence1 == 1 && fence2 == 2) || (fence1 == 2 && fence2 == 1)) return 11;
        
        return null;        
    }
    
    this.toggleHamper = function( wood ){
    
        var token;
    
        if( woods[ wood ].cage.length == 1 ){
            token = this.once( wood );
        }        
        else if( woods[ wood ].cage.length == 2 ){
            token = this.twice( wood );
        }
        
        return token;
    }
    
    this.choose = function(){
        
        var wich;
        var hp = [ [],[],[],[],[],[],[],[],[],[],[],[],[],[] ];
        
        for( var k = 0; k < h0.length; k++ )
        {
            wich = this.toggleHamper( h0[ k ].idx );                          
            hp[ wich ].push( h0[ k ].idx );
        }
        
        return this.perfect( hp );
        
    }
    
    this.perfect = function( array ){
        
        for( var k = 0; k < array.length; k++  ){                 
            if( array[ k ].length == 0 ) continue;            
            break;                       
        }
        
        var p = array[ k ][ Math.floor( Math.random() * array[ k ].length ) ]; 
        
//        var y = '';
//        
//        for(var z = 0; z < h0.length; z++ )
//        {
//            y += ', ' + h0[ z ].idx;
//        }
//        y += ' Escolha: ' + p + '; length:' + h0.length;
//        
//        y += woods[p].length == 1 ? ' count :' +  cage[woods[p].cage[0]].count : ' count :' +  
//            cage[woods[p].cage[0]].count + ' count :' +  cage[woods[p].cage[1]].count;
//        
//        $('.information').html(y);
        return p;
    }
   
}