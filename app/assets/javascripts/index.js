$(function() {
  var preWord;


  function editElement(element) {
    var result = "^" + element;
    return result;
  }

    var search_list = $("#user-search-result");
    var selected_list = $("#chat-group-users");
　　//検索に合致するユーザーを表示
    function appendList(user) {
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${ user.name }</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                  </div>`

      search_list.append(html)
    }

　　//検索後、選択されたユーザーをグループリストに追加
    function appendUser(name, user_id) {
      console.log("tata")
      var html = `<div class='chat-group-user clearfix js-chat-member' id='newmember'>
                    <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                    <p class='chat-group-user__name'>${ name }</p>
                    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn',id="delete">削除</div>
                  </div>`
      selected_list.append(html)
    }


    $(function () {
      $(document).on("click", '.user-search-add', function () {
          console.log("papa")
          var name = $(this).attr("data-user-name");
          var user_id = $(this).attr("data-user-id");
          $(this).parent().remove();
          appendUser(name, user_id);
      });
    });

    $(selected_list).on("click", '.js-remove-btn', function() {
      console.log("haha")
     $(this).parent().detach();
    });

    $("#user-search-field").on("keyup paste", function() {
      var input = $("#user-search-field").val();
      var inputs = input.split(" ").filter(function(e) { return e; });
      var newInputs = inputs.map(editElement);
      var word = newInputs.join("|");
      var reg = RegExp(word);

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input},
        dataType: 'json'
      })

      .done(function(users) {
        $(search_list).empty() 
        if (word != preWord && input.length !== 0) {
            if(users.length !== 0) {
              //user検索し、合致するユーザーを表示。後にグループに追加するユーザーを選択する際に使うidにuser.idを指定
              $.each(users, function(i, user) {
                appendList(user);
              })
            }
          }else{
          $(search_list).empty() 
          }
        preWord = word;
      })

      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    });
  });