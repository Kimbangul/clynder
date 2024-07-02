// PARAM selector
const mbOpenBtn = document.querySelector('.menu-btn');
const topBtn = document.querySelector('.footer__top');
const menuItem = document.querySelectorAll('.menu-item a');

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

// FUNCTION top 버튼 클릭 시 실행
const onClickTopBtn = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// FUNCTION 메뉴 아이템 클릭 시 실행
const onClickMenu = (menu) => {
  const top = document
    .querySelector(menu)
    .window.scrollTo({ top: 0, behavior: 'smooth' });
};

// FUNCTION After window load
window.addEventListener('load', () => {
  console.log('load');

  mbOpenBtn.addEventListener('click', setOpenMenu);
  topBtn.addEventListener('click', onClickTopBtn);
  // menuItem.forEach((el) => {
  //   el.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     const href = e.currentTarget.getAttribute('href');
  //     const section = document.querySelector(href);
  //     // window.scrollTo({
  //     //   top: section.getBoundingClientRect().top,
  //     //   behavior: 'smooth',
  //     // });
  //   });
  // });
});
