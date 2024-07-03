// PARAM selector
const mbOpenBtn = document.querySelector('.menu-btn');
const topBtn = document.querySelector('.footer__top');
const menuItem = document.querySelectorAll('.menu-item a');
const mbGroupBtn = document.querySelectorAll('.team-list__btn.mb-only');

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
  const section = document.querySelector(menu);
  section.scrollIntoView();

  const menuWrap = document.querySelector(".menu-wrap[data-open='true']");

  if (menuWrap) {
    console.log('mobile menu open');
    setOpenMenu();
  }
};

// FUNCTION group 버튼 상태 변경
const setGroupBtnState = (target) => {
  const list = target.offsetParent.offsetParent;
  const title = document.querySelector('.team-list .team-list__title');
  const isOpen = JSON.parse(target.getAttribute('data-open'));

  if (isOpen) {
    list.style.height = 'auto';
  } else {
    list.style.height = `${title.offsetHeight}px`;
  }
};

// FUNCTION group 버튼 클릭 시 실행
const onClickGroupBtn = (target) => {
  const isOpen = JSON.parse(target.getAttribute('data-open'));

  target.setAttribute('data-open', !isOpen);
  setGroupBtnState(target);
};

// FUNCTION After window load
window.addEventListener('load', () => {
  console.log('load');

  mbOpenBtn.addEventListener('click', setOpenMenu);
  topBtn.addEventListener('click', onClickTopBtn);
  menuItem.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      //const section = document.querySelector(href);
      // // window.scrollTo({
      // //   top: section.getBoundingClientRect().top,
      // //   behavior: 'smooth',
      // // });
      onClickMenu(href);
    });
  });
  mbGroupBtn.forEach((el, idx) => {
    el.addEventListener('click', (e) => {
      onClickGroupBtn(e.currentTarget);
    });
  });

  // FUNCTION 리사이즈시 list height 다시 조절
  const resizeObserver = new ResizeObserver(
    debounce(([entry]) => {
      if (window.innerWidth > 720) {
        const list = document.querySelectorAll('.team-list__item');

        list.forEach((el) => {
          el.style.height = 'auto';
        });
        return;
      }
      mbGroupBtn.forEach((el, idx) => {
        setGroupBtnState(el);
      });
    }, 500)
  );
  resizeObserver.observe(document.querySelector('.team-list'));
});
