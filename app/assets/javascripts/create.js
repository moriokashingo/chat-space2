$(function(){
  function buildHTML(message){
    var img = message.image ? `<img src= ${ message.image }>` : "";
    // 三項演算子。message.imageがあればimgのやつ作る。なければからにする。
    var html = `<div class="Messages__Message">
                  <div class="Messages__Message__upper-info">
                    ${message.user_name}
                    ${message.created_at}
                  </div>
                  <div class="Messages__Message__text">
                    <p class="Messages__Messge__text">
                    ${message.content}
                    </p>
                    ${img}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    
    var formData = new FormData(this);
    var url = $(this).attr('action'); 
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
      
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.Messages').append(html)
      $('#message_content').val('')
      $('.Form__submit').prop('disabled', false);
      $('.Messages').animate({scrollTop: 100000});
      
    })
    .fail(function(){
      alert('error');
      $('.Form__submit').prop('disabled', false);
    })
  })
});
