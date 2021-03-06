define(['Class', 'Rectangle'], function(Class, Rectangle){

	var handler, player, entities;


	var EntityManager = Class.extend({
		init: function(_handler, _player){
			handler = _handler;
			player = _player;
			entities = new Array(player);
		},
		tick: function(_dt){
			entities.sort(compare);
			for(var i = 0; i < entities.length; i++){
				var e = entities[i];
				e.tick(_dt);
			}
		},
		render: function(_g){
			// handler.getWorld().getSpatialGrid().render(_g, handler);
			entities.forEach(function(e){
				e.render(_g);
			});
		},
		getPlayer: function(){
			return player;
		},
		getHandler: function(){
			return handler;
		},
		getEntities: function(){
			return entities;
		},
		addEntity: function(e){
			entities.push(e);
			handler.getWorld().getSpatialGrid().insert(new Rectangle(e.x + e.bounds.x, e.y + e.bounds.y, e.bounds.width, e.bounds.height), e);
		},
		removeEntity: function(_entity){
			for (let i = 0; i < entities.length; i++){
				var e = entities[i];
				if (e === _entity){
					entities.splice(i, 1);
				}
			}
		}

	});

	function compare(a, b){
		let aY = a.getY();
		let bY = b.getY();
		let aH = a.getHeight();
		let bH = b.getHeight();
		if (aY + aH === bY + bH)  return 0;
		if (aY + aH < bY + bH) return -1;
		return 1;
	}

	return EntityManager;
});