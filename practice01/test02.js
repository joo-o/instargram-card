window.addEventListener('load', function () {
    var carousels = document.getElementsByClassName('carousel')


    // 캐러셀 이벤트를 등록하는 로직 //

    for (var i = 0; i < carousels.length; i++) {
        // 내가 만드는 함수명👇// 
        addEventToCarousel(carousels[i]);
    }

});


// ul, li 태그 가져오기 //
function addEventToCarousel(carouselElem) {
    var ulElem = carouselElem.querySelector('ul');
    var liElems = carouselElem.querySelectorAll('li');

    // 너비값 조정 // 
    var liWidth = liElems[0].clientWidth;
    var adjustedWidth = liWidth * liElems.length;
    ulElem.style.width = adjustedWidth + 'px';


    // 슬라이드 버튼 이벤트 등록하기 //
    var slideBtns = carouselElem.querySelectorAll('.slide')
    for (var i = 0; i < slideBtns.length; i++) {
        //?? 왜 createListenerSlide에 carouselElem를 넘겨야 하는지? //
        slideBtns[i].addEventListener('click', createListenerSlide(carouselElem));
    }
}


// 슬라이드 버튼 함수 클로져를 사용하여 만들기 //
function createListenerSlide(carouselElem) {
    return function (event) {
        var clickBtns = event.currentTarget;

        // 값 가져오기
        var liElems = carouselElem.querySelectorAll('li');
        var liCount = liElems.length;
        var currentIndex = carouselElem.attributes.data.value;

        // 슬라이드 체크 버튼
        if (clickBtns.className.includes('right') && currentIndex < liCount - 1) {

            console.log(currentIndex);
            currentIndex++;
            console.log(currentIndex);
            scrollDiv(carouselElem, currentIndex);
        } else if (clickBtns.className.includes('left') && currentIndex > 0) {
            currentIndex--;
            scrollDiv(carouselElem, currentIndex);
        }


        // 인디게이터 업데이트
        updateInldicator(carouselElem, currentIndex)


        // 슬라이드 버튼 보여줌 업데이트
        updateSlideBtnVisible(carouselElem, currentIndex, liCount)




        //??  새롭게 보여지는 이미지 인덱스 업데이트
        carouselElem.attributes.data.value = currentIndex;

    }

}


// scrollDiv 등록 //
function scrollDiv(carouselElem, nextIndex) {

    console.log(nextIndex);
    // * 👇 스크롤 가능한 친구 가져오기. hidden 되있던건 div //
    var scrollable = carouselElem.querySelector('div')
    var liWidth = scrollable.clientWidth;
    var newLeft = liWidth * nextIndex;

    // * 👇 스크롤 이동시키는 함수 //
    scrollable.scrollTo({ left: newLeft, behavior: 'smooth' })
}




function updateInldicator(carouselElem, currentIndex) {
    var indicators = carouselElem.querySelectorAll('footer > div');
    for (var i = 0; i < indicators.length; i++) {
        if (currentIndex == i) {
            indicators[i].className = 'active';
        } else {
            indicators[i].className = '';
        }
    }

}



function updateSlideBtnVisible(carouselElem, currentIndex, liCount) {
    var left = carouselElem.querySelector('.slide-left');
    var right = carouselElem.querySelector('.slide-right');

    if (currentIndex > 0) {
        left.style.display = 'block';
    } else {
        left.style.display = 'none';
    }

    if (currentIndex < liCount - 1) {
        right.style.display = 'block';
    } else {
        right.style.display = 'none';
    }
}