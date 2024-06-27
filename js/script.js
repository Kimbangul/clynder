// PARAM selector
const mbOpenBtn = document.querySelector('.menu-btn');

// PARAM splittype 라인 옵션
const lineUpSplitOption = {
  types: 'lines, words',
  tagName: 'span',
  lineClass: 'line-wrap',
  wordClass: 'word',
};
const splitedText = [new SplitType('.text-eng', lineUpSplitOption)];

// FUNCTION 모바일에서 메뉴 버튼 여닫기
const setOpenMenu = () => {
  // isOpen: boolean
  const menuWrap = document.querySelector('.menu-wrap');
  const isOpenMbMenu = menuWrap.getAttribute('data-open');
  const isOpen = JSON.parse(isOpenMbMenu);

  menuWrap.setAttribute('data-open', !isOpen);
  mbOpenBtn.setAttribute('data-open', !isOpen);
};

// FUNCTION After window load
window.addEventListener('load', () => {
  console.log('load');

  mbOpenBtn.addEventListener('click', setOpenMenu);
});
