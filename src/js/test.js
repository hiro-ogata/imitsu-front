
/*!---------- ファイル読み込み後 ----------*/
$(function(){

  /*!---------- スタート ----------*/
  $('.timer-btn-start').on('click', function() {
    count = getLocalStorage("remainTime");
    $('#stopwatch').text(count);
    countDown = setInterval(function(){
      count--;
      if(count <= 2){
        clearInterval(countDown);
      }
      $('#stopwatch').text(count);
    },1000);
    btnDisabled();

  });

  /*!---------- ストップ ----------*/
  $('.timer-btn-stop').on('click', function() {
    clearInterval(countDown);
    setLocalStorage("remainTime", $('#stopwatch').html());
    btnDisabled();
  });

  /*!---------- リセット ----------*/
  $('.timer-btn-reset').on('click', function() {
    clearInterval(countDown);
    var resetNum = getLocalStorage("initialTime");
    setLocalStorage("remainTime", resetNum);
    $('#stopwatch').html(resetNum);
    btnDisabled();
    $("#lap-list").empty();
  });

  /*!---------- ラップ ----------*/
  $('.timer-btn-lap').on('click', function() {

    if($('#lap-list li').length >= 3){
      $('#lap-list > li').last().remove();
    }
    var lap = $('#stopwatch').html();
    $('#lap-list').prepend('<li><span class=\"lap-title\">ラップ</span><span class=\"lap-time\">' + lap + '</span></li>');

  });


  function btnDisabled() {
    $('.timer-btn').not(this).removeClass('disabled');
    $(this).addClass('disabled');
  }
  function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }
  function getLocalStorage(key) {
    return localStorage.getItem(key);
  }

  setLocalStorage("initialTime", $('#stopwatch').html());
  setLocalStorage("remainTime", $('#stopwatch').html());

});
