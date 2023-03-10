/*
JavaScript Plugin 
Written By: Arjun AdhiQari
Github Repo: https://github.com/arjunadhikari789/MultiSelect.js
Written Date: 3-8-2019
License: Free for Everyone
:)

NOTE: This Plugin requires HTML, css and PHP files too.
*/
function MultiSelect( id , colors = {}){
	this.className = "multi-select";
	this.color = {
		background: '',
		selected: ''
	};
	this.data = {} ;
	this.id = id ;
	this.max = null ;
	this.min = null ;
	var self = this ;
	this.errors = {
		all : [] ,
		codes: {
			'minErr': "More items should be selected.",
			'maxErr':"Cannot select more items.",
			'domReadErr':"Error Reading MultiSelect Element from DOM.",
			'chooseAllErr':"Cannot Choose All Items when there is a limit." 
		},
		add : function( errCode ){
			if(this.all.indexOf( errCode ) == -1){
				this.all.push( errCode ) ;
			}
		},
		remove: function( errCode ){
			if(this.all.indexOf( errCode ) != -1){
				this.all.splice( this.indexOf(errCode, 1) );
			}
		},
		getAll : function(){
			let toReturn = [] ;
			this.all.forEach( function( errCode ){
				if(this.codes.hasOwnProperty( errCode )){
					toReturn.push( this.codes[errCode] ) ;
				}else{
					toReturn.push( errCode ) ;
				}
			}, this);
			return toReturn ;
		},
		show : function(){
			if( this.all.length > 0 ){
				let str = "Errors: " + this.getAll().join(", ") ;
				this.all.splice(0, this.all.length);
				// console.log(str);
				alert( str );				
			}
		} 
	};
	// chosen keys must be strings
	this.chosen = [] ;
	this.domNode = null ;
	this.colorsUpdated = false ;


	// Functions
	
	this.getNewSn = function(){
		var previous = this.getPreviousMss() ;
		var highestId = 1 ;
		switch(previous.length){
			case 0 :
				return 1 ;
				break ;
			default:
				for( mss in previous){
					if( previous[mss] instanceof HTMLDivElement ){
						if( this.findSnOfMs(previous[mss]) > highestId ){
							highestId = this.findSnOfMs(previous[mss]) ;
						} 
					}
				}
				return highestId + 1 ;
		}
	}

	this.findSnOfMs = function( multiSelect ){
		return Number(multiSelect.dataset.sn) ;
	}
	this.getPreviousMss = function(){
		return document.querySelectorAll("." + this.className ); 
	}	


	this.isValidKey = function(key){
		if(this.data[key] != undefined){
			return true 
		}
		return false ;	
	}	
	this.choose = function( key ){
		if( this.max != null ){
			if(this.chosen.length < this.max ){
				if(this.isValidKey(key)){
					this.chosen.push(key.toString());
				}				
			}else{
				this.errors.add('maxErr') ;
			}
		}else{
			if(this.isValidKey(key)){
				this.chosen.push(key.toString());
			}			
		}
		this.updateGUI();
	}
	this.unChoose = function( key ){
		if( this.isValidKey(key) ){
			if(this.isChosenKey(key)){
				let n = this.chosen.length ;
				for( let i = 0 ; i < n ; i++){
					if( key == this.chosen[i]){
						this.chosen.splice(i, 1);
						i-- ;
						n-- ;
					}
				}
			}
		}
		this.updateGUI() ;
	}

	this.chooseAll = function( ){
		if(this.max == null){
			for( key in this.data){
				this.choose( key );
			}
		}else{
			this.errors.add('chooseAllErr') ;
			this.errors.show() ;
		}

	}
	this.unChooseAll = function(){
		this.chosen.splice(0, this.chosen.length ) ;
		this.updateGUI() ;
	}
	this.isChosenKey = function( key ){
		if( ( this.chosen.indexOf( key ) > -1 ) || ( this.chosen.indexOf( key.toString() ) > -1 ) ){	
			return true ;
		}else{
			return false ;
		}
	}
	this.findOptionByKey = function( key ){
		return this.domNode.querySelector("div[data-value='"+ key +"']");
	}	
	this.updateGUI = function(){
		for( key in this.data ){
			let opt = this.findOptionByKey( key );
			if( this.isChosenKey(key) ){
				this.showIcon(opt );
			}else{
				this.hideIcon( opt );
			}
		}
		this.errors.show() ;
		this.updateColors() ;
		this.updateInputValue() ;
	}

	this.forceColorUpdate = function(){
		this.colorsUpdated = false ;
		this.updateColors() ;
	}
	this.showIcon = function ( opt ){
		opt.querySelector("div.ms-option-icon").style.display = "flex";
		opt.style.border = "1px solid "+ this.color.selected ;
	}
	this.hideIcon = function ( opt ){
		opt.querySelector("div.ms-option-icon").style.display = "none";
		opt.style.border = "0px";
	}
	this.bindEvents = function(){
		var that = this ;
		for( key in this.data ){
			this.findOptionByKey(key).addEventListener("click", function(){
				let keyVal = this.dataset.value ;
				if(that.isChosenKey(keyVal)){
					that.unChoose( keyVal );
				}else{
					that.choose( keyVal );
				}
				});
		}
		this.domNode.querySelector("div.ms-select-all").addEventListener("click", function(){
			that.chooseAll() ;
		});
		this.domNode.querySelector("div.ms-reset").addEventListener("click", function(){
			that.unChooseAll() ;
		});		
	}

	this.read = function ( multiSelect ){
		this.domNode = multiSelect ;
		this.sn = multiSelect.dataset.sn ;
		if( this.domNode.dataset.min != undefined){
			this.min = this.domNode.dataset.min ;
		}
		if( this.domNode.dataset.max != undefined){
			this.max = this.domNode.dataset.max ;
		}		
		var options = multiSelect.querySelectorAll("div.ms-option");
		this.data = {} ;
		for( opt in options ){
			if(options[opt] instanceof HTMLDivElement){
				this.data[ options[opt].dataset.value ] = options[opt].querySelector("div.ms-option-text").innerText ;
				if(options[opt].dataset.chosen == 1){
					this.chosen.push(options[opt].dataset.value); 
				}
			}
		}
		this.bindEvents() ;
	}
	this.updateInputValue = function(){
		document.querySelector("input[name='"+ this.id + "'").value = this.chosen.join(", ") ;
	}
	/*
	Reading ID from param of constructor function
	*/
	this.read( document.querySelector("#"+ this.id ) );	
	this.updateGUI() ;
}
