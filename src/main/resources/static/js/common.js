// cms 공통 스트립트 입니다 
// 해당 스크립트는 페이지의 원활한 이해를 돕기 위한 참고용으로 봐주세요

// 팝업
$(function(){
  $('.popup_trigger').on('click',function(e){

      var trigger_type = $(this).attr("data-trigger");

      $('.popup[data-modal="'+trigger_type+'"]').addClass("is_on")
      e.preventDefault();
  });
  $('.popup_close').on('click',function(e){
      $('.popup').removeClass("is_on")
      e.preventDefault();
  });
});

// 탭 메뉴
$(document).ready(function() {
  $(".tabpanel").hide(); 
  $(".tabpanel:first").show();
  $('.tablist > a').click(function(){
    $('.tablist > a').removeClass('on');
    $(this).addClass('on');
    var tab_id = $(this).attr('data-id');
    $("#" + tab_id).show();
    $("#" + tab_id).siblings().hide();
  })
});





