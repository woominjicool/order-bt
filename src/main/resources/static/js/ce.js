document.addEventListener("DOMContentLoaded", function () {
    $('.appbar .toggle_btn').click(function(){
        $('.toggle_wrap').toggleClass('active');
        $('.toggle_wrap .toggle_cont').toggle(300);
    });



    $('.recent_tab_trigger').click(function(){
        $(this).toggleClass('active');
        $(this).next().slideToggle(300);
    });
})

function question_toggle(){
    $('.question_toggle').slideToggle(300);
    $('.question_toggle_bg').toggle();
}



// 문제풀이 모달창
