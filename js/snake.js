/**
 * Created by acmen on 16-11-17.
 */
function snake(){
  return {
    options: {
      last_draw_time: 0,
      speed_time: 50,
      canvas: false,
      ctx: false,
      animation: false,
      width: 0,
      height: 0,
      init_snake_length: 3,
      snake_conf: {
        head_width: 0,
        head_height: 0,
        body_width: 0,
        body_height: 0,
        snake_body_distance: 0,
        snake_head_img: "./img/game/green-snake-head.png",
        snake_body_img: [
          "./img/game/green-snake-body1.png",
          "./img/game/green-snake-body2.png"
        ],
        snake_body_length: 2,
        snake_angle: 0,
        direction_data: []
      },
      init_food_num: 4,
      foods_num: 20,
      food_conf: {
        width: 25,
        height: 25
      },
      food_list: [
        {
          score: 1,
          img: "./img/game/green-pepper.png"
        }
      ],
      init_obstacle_num: 2,
      obstacle_num: 20,
      obstacle_conf: {
        width: 25,
        height: 25
      },
      obstacle_list: [
        {
          score: 1,
          img: "./img/game/red-pepper.png"
        }
      ],
      run_time: -1,
      snake_head_data: {

      },
      snake_data: [],
      food_data: [
      ],
      obstacle_data: [

      ],
      score: 0,
      touch_conf: {
        start_x: 0,
        start_y: 0,
      }
    },
    init: function(){
      // 创建画布
      this.options.width = document.body.clientHeight;
      this.options.height = document.body.clientWidth;
      this.options.canvas = document.createElement("canvas");
      this.options.canvas.setAttribute("class", "rotate90");
      this.options.canvas.setAttribute("stype", "margin-left: "+this.options.height+"px");
      this.options.canvas.width = this.options.width;
      this.options.canvas.height = this.options.height;
      this.options.ctx = this.options.canvas.getContext("2d");
      document.body.appendChild(this.options.canvas);

      this.options.snake_conf.body_width = Math.floor(this.options.width / 30);
      this.options.snake_conf.body_height = Math.floor(this.options.width / 30);
      this.options.snake_conf.head_width = this.options.snake_conf.body_width + 4;
      this.options.snake_conf.head_height = this.options.snake_conf.body_height + 4;
      this.options.snake_conf.snake_body_distance = Math.floor(this.options.snake_conf.body_width * 8 / 10);

      this.options.food_conf.width = Math.floor(this.options.width / this.options.foods_num);
      this.options.food_conf.height = Math.floor(this.options.width / this.options.foods_num);

      this.options.obstacle_conf.width = Math.floor(this.options.width / this.options.obstacle_num);
      this.options.obstacle_conf.height = Math.floor(this.options.width / this.options.obstacle_num);
      this.init_img();

      // 定义蛇的数据
      this.init_snake();
      this.build_snake();

      // 定义食物的数据
      this.build_food(this.options.init_food_num);

      // define obstacle info
      this.build_obstacle(this.options.init_obstacle_num);
    },
    init_img: function(){
      var snake_head_img = this.options.snake_conf.snake_head_img;
      this.options.snake_conf.snake_head_img = new Image();
      this.options.snake_conf.snake_head_img.src = snake_head_img;
      for(var i = 0 ; i < this.options.snake_conf.snake_body_img.length ; i++){
        var img_url = this.options.snake_conf.snake_body_img[i];
        this.options.snake_conf.snake_body_img[i] = new Image();
        this.options.snake_conf.snake_body_img[i].src = img_url;
      }

      for(var i = 0 ; i < this.options.food_list.length ; i++){
        var img_url = this.options.food_list[i]["img"];
        this.options.food_list[i]["img"] = new Image();
        this.options.food_list[i]["img"].src = img_url;
      }

      for(var i = 0 ; i < this.options.obstacle_list.length ; i++){
        var img_url = this.options.obstacle_list[i]["img"];
        this.options.obstacle_list[i]["img"] = new Image();
        this.options.obstacle_list[i]["img"].src = img_url;
      }

    },
    init_snake: function(){
      this.options.snake_head_data = {
        x: Math.floor(this.options.width / 2),
        y: Math.floor(this.options.height / 2)
      };
      var x = this.options.snake_head_data.x;
      var y = this.options.snake_head_data.y;
      var length = this.options.snake_conf.snake_body_distance / 4;
      for(var i = (this.options.init_snake_length - 1) * 4 ; i >= 0 ; i--){
        x = x - length;
        this.options.snake_data[i] = {
          x: x,
          y: y
        };
      }
    },
    build_snake: function(){
      for(var i = 0, y= 0; i < this.options.snake_data.length ; i += 4, y++){
        if(i == 0){
          this.draw_image(
            this.options.snake_conf.snake_head_img,
            this.options.snake_data[this.options.snake_data.length - i - 1].x - this.options.snake_conf.head_width / 2,
            this.options.snake_data[this.options.snake_data.length - i - 1].y - this.options.snake_conf.head_height / 2,
            this.options.snake_conf.head_width,
            this.options.snake_conf.head_height
          );
        }else{
          this.draw_image(
            this.options.snake_conf.snake_body_img[y % this.options.snake_conf.snake_body_length],
            this.options.snake_data[this.options.snake_data.length - i - 1].x - this.options.snake_conf.body_width / 2,
            this.options.snake_data[this.options.snake_data.length - i - 1].y - this.options.snake_conf.body_height / 2,
            this.options.snake_conf.body_width,
            this.options.snake_conf.body_height
          );
        }

      }
    },
    /**
     * 随机产生n个食物，
     */
    build_food: function(n) {
      for(var i = 0 ; i < n ; i ++){
        var index = Math.floor(Math.random() * this.options.food_list.length);
        var food_info = this.options.food_list[index];
        var food_data = {
          score: food_info.score,
          img: food_info.img,
          x: Math.floor(Math.random() * (this.options.width - this.options.food_conf.width)) + this.options.food_conf.width / 2,
          y: Math.floor(Math.random() * (this.options.height - this.options.food_conf.height)) + this.options.food_conf.height / 2
        };
        this.options.food_data.push(food_data);
        this.draw_food(food_data);
      }
    },
    draw_food: function(data){
      this.draw_image(
        data.img,
        data.x - this.options.food_conf.width / 2,
        data.y - this.options.food_conf.height / 2,
        this.options.food_conf.width,
        this.options.food_conf.height
      );
    },
    build_obstacle: function(n) {
      for(var i = 0 ; i < n ; i ++){
        var index = Math.floor(Math.random() * this.options.obstacle_list.length);
        var obstacle_info = this.options.obstacle_list[index];
        var obstacle_data = {
          img: obstacle_info.img,
          x: Math.floor(Math.random() * (this.options.width - this.options.obstacle_conf.width)) + this.options.obstacle_conf.width / 2,
          y: Math.floor(Math.random() * (this.options.height - this.options.obstacle_conf.height)) + this.options.obstacle_conf.height / 2
        };
        this.options.obstacle_data.push(obstacle_data);
        this.draw_obstacle(obstacle_data);
      }
    },
    draw_obstacle: function(data){
      this.draw_image(data.img, data.x - this.options.obstacle_conf.width / 2, data.y - this.options.obstacle_conf.height / 2, this.options.obstacle_conf.width, this.options.obstacle_conf.height);
    },
    draw_image: function(img, x, y, width, height){
      this.options.ctx.drawImage(img, x, y, width, height);
    },
    score_change: function(){
      console.log("当前分数%d", this.options.score);
    },
    start: function(_snake){
      this.options.canvas.addEventListener("touchstart", function(e){
        _snake.options.snake_conf.direction_data = [];
        _snake.options.touch_conf.start_x = e.targetTouches[0].clientX;
        _snake.options.touch_conf.start_y = e.targetTouches[0].clientY;
      });
      this.options.canvas.addEventListener("touchmove", function(e){
        var x = e.targetTouches[0].clientX;
        var y = e.targetTouches[0].clientY;
        if(Math.sqrt(Math.pow(x-_snake.options.touch_conf.start_x, 2) + Math.pow(y-_snake.options.touch_conf.start_y, 2)) > _snake.options.snake_conf.snake_body_distance){
          var x_gap = (x-_snake.options.touch_conf.start_x) / 4;
          var y_gap = (y-_snake.options.touch_conf.start_y) / 4;
          for(var i = 1 ; i <= 4; i++){
            _snake.options.snake_conf.direction_data.push({
              x: x_gap,
              y: y_gap
            });
          }
          _snake.options.touch_conf.start_x = x;
          _snake.options.touch_conf.start_y = y;
        }
      });
      this.options.animation = window.requestAnimationFrame(function(){
        _snake.run(_snake);
      });
    },
    run: function(_snake){
      var current_time = new Date().getTime();
      if(current_time - this.options.last_draw_time > this.options.speed_time){
        this.options.last_draw_time = current_time;
        var gap = {
          x: 0,
          y: 0
        };
        if(this.options.snake_conf.direction_data.length != 0){
          gap = this.options.snake_conf.direction_data[0];
          this.options.snake_conf.direction_data.splice(0, 1);
          var data = this.options.snake_data[this.options.snake_data.length - 1];
          this.options.snake_data.push({
            x: data.x + gap.x,
            y: data.y + gap.y
          });
        }else{
          var first_data = this.options.snake_data[this.options.snake_data.length - 1];
          var second_data = this.options.snake_data[this.options.snake_data.length - 2];
          this.options.snake_data.push({
            x: first_data.x + (first_data.x - second_data.x),
            y: first_data.y + (first_data.y - second_data.y)
          });
        }

        var head_data = this.options.snake_data[this.options.snake_data.length - 1];
        if(this.check_obstacle(head_data.x, head_data.y)){
          this.stop_game();
          return;
        }
        var food_index = this.check_food(head_data.x, head_data.y);
        if(food_index !== false){
          this.eat_food(food_index);
        }
        if(4 * (this.options.init_snake_length - 1) + 1 < this.options.snake_data.length){
          this.options.snake_data.splice(0,1);
        }
        this.options.ctx.clearRect(0,0, this.options.width, this.options.height);
        this.draw();
      }
      this.options.animation = window.requestAnimationFrame(function(){
        _snake.run(_snake);
      });
    },
    draw: function(){
      for(var i = 0 ; i < this.options.food_data.length; i++){
        this.draw_food(this.options.food_data[i]);
      }
      for(var i = 0 ; i < this.options.obstacle_data.length; i++){
        this.draw_food(this.options.obstacle_data[i]);
      }
      this.build_snake();
    },
    check_obstacle: function(x, y){
      if(x - this.options.snake_conf.head_width / 2 < 0 || y - this.options.snake_conf.head_height / 2 < 0 ||
         x + this.options.snake_conf.head_width / 2 > this.options.width || y + this.options.snake_conf.head_height / 2 > this.options.height){
        return true;
      }
      for(var i = 0 ; i < this.options.obstacle_data.length; i++){
        var obstacle_item = this.options.obstacle_data[i];
        if(Math.abs(x - obstacle_item["x"]) <= this.options.obstacle_conf.width / 2 && Math.abs(y - obstacle_item["y"]) <= this.options.obstacle_conf.height / 2){
          return true;
        }
      }
      return false;
    },
    stop_game: function(){
      window.cancelAnimationFrame(this.options.animation);
      alert("游戏结束");
    },
    check_food: function(x, y){
      for(var i = 0 ; i < this.options.food_data.length; i++){
        var food_item = this.options.food_data[i];
        if(Math.abs(x - food_item["x"]) <= this.options.food_conf.width / 2 && Math.abs(y - food_item["y"]) <= this.options.food_conf.height / 2){
          return i;
        }
      }
      return false;
    },
    eat_food: function(i){
      var food_item = this.options.food_data[i];
      this.options.food_data.splice(i, 1);
      this.options.score += food_item["score"];
      this.options.init_snake_length += 1;
      this.score_change();
    }
  };
}
