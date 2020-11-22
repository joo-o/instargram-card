window.addEventListener('load',function(){
    var carousels = document.getElementsByClassName('carousel')

    /// 캐러셀 이벤트 등록 로직 ///
    for (var i=0; i < carousels.length; i++) {
        addEventToCarousel(carousels[i]);
    }
});


function addEventToCarousel(carouselElem) {
    var ulElem = carouselElem.querySelector('ul');
    var liElem = ulElem.querySelectorAll('li');

    // 너비값 조정
    var liwidth = liElem[0].clientWidth;
    // * clientWidth : 실제 보여지는 컨텐츠가 차지하는 공간을 확인하는 속성 //
    var adjustwidth =  liElem.length * liwidth
    ulElem.style.width = adjustwidth + 'px';


    // 슬라이드 버튼 이벤트 등록 //
    var slideButton = carouselElem.querySelectorAll('.slide')
    for (var i = 0; i < slideButton.length; i++) {
        slideButton[i].addEventListener('click', createListenerSlide(carouselElem));
    }

}


function createListenerSlide(carouselElem) {
    return function(event) {
        var clickedButton = event.currentTarget;

        // 값 가져오기
        var liElema = carouselElem.querySelectorAll('li');
        var liCount = liElema.length;
        //? 캐러셀엘리먼트에서 데이터 속성값????? ?//
        var currentIndex = carouselElem.attributes.data.value;

        // 슬라이드 체크 버튼
        if (clickedButton.className.includes('right') && currentIndex < liCount - 1) {
            currentIndex ++;
            scrollDiv(carouselElem, currentIndex);
        } else if (clickedButton.className.includes('left') && currentIndex > 0) {
            currentIndex --;
            scrollDiv(carouselElem, currentIndex); 
        }

        // 인디게이터 업데이트
        updateIndicator(carouselElem, currentIndex);

        // 슬라이드 버튼 보여줌 업데이트
        updateSlideButton(carouselElem, currentIndex, liCount);

        // 새롭게 보여지는 이미지 인덱스
        carouselElem.attributes.data.value = currentIndex;
    }
}


function scrollDiv(carouselElem, nextIndex) {
    // * 👇 스크롤 가능한 친구 가져오기. hidden 되있던건 div //
    var scrollable = carouselElem.querySelector ('div');
    var liwidth = scrollable.clientWidth;
    var newLeft = liwidth * nextIndex;
    // ? nextIndex는 기본 속성인가? //
    
              // * 👇 스크롤 이동시키는 함수 //
    scrollable.scrollTo({left: newLeft, behavior:'smooth'})

}

function updateIndicator(carouselElem, currentIndex) {
    var indicators = carouselElem.querySelectorAll('footer > div');
    for (var i = 0; i < indicators.length; i++ ) {
        if (currentIndex == i) {
            indicators[i].className = 'active';
        } else {
            indicators[i].className = '';
        }


    }
}


function updateSlideButton(carouselElem, currentIndex, liCount){
    var left = carouselElem.querySelector ('.slide-left');
    var right = carouselElem.querySelector ('.slide-right');

    if (currentIndex > 0) {
        left.style.display = 'block';
        
    } else {
        left.style.display = 'none';
    }

    if (currentIndex < liCount -1 ) {
        right.style.display = 'block';
    } else {
        right.style.display = 'none';
    }


}