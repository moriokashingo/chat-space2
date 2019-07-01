$(function() {
  if ($(".Main-header")[0]) setInterval(reloadMessages, 5000) //jqueryの存在確認。jqueryの場合.main-headerの要素を確認する。あったら右の指揮を実行。
  

    var buildMessageHTML = function(message) {
      if (message.content && message.image) {
        //data-idが反映されるようにしている
        var html = `<div class="message" data-id=${message.id} >
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name} 
            </div>
            <div class="upper-message__date">
              ${message.created_at} 
            </div>
          </div>' 
          <div class="lower-message">
            <p class="lower-message__content>
              ${message.content} 
            </p>' 
            <img src="${message.image}" class="lower-message__image" >
          </div> 
        </div>`
      } else if (message.content) {
        //同様に、data-idが反映されるようにしている
        var html = `<div class="message" data-id=${message.id}>
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name} 
            </div>
            <div class="upper-message__date">
              ${message.created_at} 
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content"> 
              ${message.content} 
            </p>
          </div>
        </div>`
      } else if (message.image) {
        //同様に、data-idが反映されるようにしている
        var html = `<div class="message" data-id=${message.id}>
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name} 
            </div>
            '<div class="upper-message__date"> 
              ${message.created_at}
            </div>
          </div>
          <div class="lower-message">
            <img src= ${message.image} class="lower-message__image" >
          </div>
        </div>`
      };
      return html;
    };
  

  
  function reloadMessages() {
     last_message_id = $('.Messages__Message:last').data('id');
     var group_id = $('.Main-header__left-box__current-group').data('group-id');//{data: {group_id: @group.id}}で指定したのがwebで観たらdata-group-idに変わる。だから記載はこれ。

      $.ajax({
        url: `/groups/${group_id}/api/messages`,//バッククォテーションは文字列に変数を入れたい時。
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })

      .done(function(messages) {
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
         $.each(messages,function(index,message){
          var html = buildMessageHTML(message);
          $('.Messages').append(html)
          $('.Messages').animate({scrollTop: 100000});          
        });
      })
      .fail(function() {
        alert('error');
      });
    };
  });