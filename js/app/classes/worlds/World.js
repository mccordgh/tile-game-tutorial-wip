define(['Class', 'TileLoader', 'Utils', 'Tree', 'EntityManager', 'Player', 'SpatialGrid'], function(Class, Tile, Utils, Tree, EntityManager, Player, SpatialGrid){

	var tree;

	var World = Class.extend({
		init:function(_path, _handler){
			this.tiles = [];
			this.handler = _handler;
			_handler.setWorld(this);
			// tree = new Tree(_handler, 400, 300);
			this.entityManager = new EntityManager(_handler, new Player(_handler, 20, 20));
			this.loadWorld(_path);
			
			this.spatialGrid = new SpatialGrid(this.width * Tile.TILE_WIDTH, this.height * Tile.TILE_HEIGHT, 64);
			
			this.entityManager.addEntity(new Tree(_handler, 225, 100));
			this.entityManager.addEntity(new Tree(_handler, 175, 400));
			this.entityManager.addEntity(new Tree(_handler, 275, 200));
			this.entityManager.addEntity(new Tree(_handler, 825, 300));
			this.entityManager.addEntity(new Tree(_handler, 875, 300));
			this.entityManager.addEntity(new Tree(_handler, 925, 300));
			this.entityManager.addEntity(new Tree(_handler, 675, 500));
			this.entityManager.addEntity(new Tree(_handler, 775, 800));

			this.entityManager.getPlayer().setX(this.spawnX);
			this.entityManager.getPlayer().setY(this.spawnY);

		},
		loadWorld: function(_path){
			var file = Utils.loadFileAsString(_path);
			var tokens = file.replace(/\n/g, " ").split(" ");
			this.width = tokens[0];
			this.height = tokens[1];
			this.spawnX = tokens[2] * Tile.TILE_WIDTH;
			this.spawnY = tokens[3] * Tile.TILE_HEIGHT;
			for(y=0; y < this.height; y++){
				for(x=0; x < this.width; x++){
					if(!this.tiles[x])
						this.tiles[x] = [];
					this.tiles[x][y] = parseInt(tokens[(x + (y * this.width)) + 4]);
				}
			}
		},
		tick: function(_dt){
			this.entityManager.tick(_dt);
		},
		render: function(_g){
			var xStart = parseInt(Math.max(0, this.handler.getGameCamera().getxOffset() / Tile.TILE_WIDTH));
			var xEnd = parseInt(Math.min(this.width, (this.handler.getGameCamera().getxOffset() + this.handler.getWidth()) / Tile.TILE_WIDTH + 1));
			var yStart = parseInt(Math.max(0, this.handler.getGameCamera().getyOffset() / Tile.TILE_HEIGHT));
			var yEnd = parseInt(Math.min(this.height, (this.handler.getGameCamera().getyOffset() + this.handler.getHeight()) / Tile.TILE_HEIGHT + 1));			

			for(y = yStart; y < yEnd; y++){
				for(x = xStart; x < xEnd; x++){
					this.getTile(x, y).render(_g, x * Tile.TILE_WIDTH - this.handler.getGameCamera().getxOffset(), y * Tile.TILE_HEIGHT -  this.handler.getGameCamera().getyOffset());
				}
			}

			this.entityManager.render(_g);
			// tree.render(_g);
		},
		getTile: function(_x, _y){
			return Tile.tiles[this.tiles[_x][_y]];
		},
		getWidth: function(){
			return this.width;
		},
		getHeight: function(){
			return this.height;
		},
		getEntityManager(){
			return this.entityManager;
		},
		getSpatialGrid(){
			return this.spatialGrid;
		}

	});

	return World;
});