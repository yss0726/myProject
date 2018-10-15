(function(){
    var OLi = $('li');
    var num = 1;
    var flag = false;
    getData ();
    function getData() {
        if(!flag){
            flag = true;
            $.ajax({
                type:'GET',
                url:'http://localhost/web/waterfall/src/getPics.php?cPage=' + num,
                success:addDom,
                error:function(){
                    console.log('error')
                },
                beforeSend:function() {
                    $('.load').show();
                }
            })
            num++;
        }
        
    };
    function addDom(data) {
       
        $('.load').hide();
        var dataList = JSON.parse(data);
        if(dataList.length > 0){
          dataList.forEach(function(ele,index){
          var Odiv = $('<div class="item"></div>');
          var OImg = new Image();
          var Op = $('<p></p>');
          Op.text('我是title')
          OImg.src = ele.preview;
          OImg.onload = function() {
              Odiv.append(OImg).append(Op);
              var index = getMinIndex();
            $(OLi[index]).append(Odiv);
             console.log(index);
          }
          })
        }
        flag = false;
    };
    function getMinIndex() {
      var minH = parseInt($(OLi[0]).css('height'));
      var index = 0;
      for(var i = 1; i < OLi.length; i++){
          var h = parseInt($(OLi[i]).css('height'));
          if(h < minH){
              minH = h;
              index = i;
          }
      }
      return index;
     
    }
    $(window).scroll(function(){
        var scrollH = $(this).scrollTop();
        var clientH = $(window).height();
        var minLiH = parseInt($(OLi[getMinIndex()]).css('height'));
        if(scrollH + clientH > minLiH){
            getData();
        }
    })
})()