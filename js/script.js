// PARAM selector
const mbOpenBtn = document.querySelector('.menu-btn');
const topBtn = document.querySelector('.footer__top');
const menuItem = document.querySelectorAll('.menu-item a');
const mbGroupBtn = document.querySelectorAll('.team-list__btn.mb-only');

/** FUNCTION Lenis Scroll */
const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// PARAM splittype 라인 옵션
const lineUpSplitOption = {
  types: 'lines, words',
  tagName: 'span',
  lineClass: 'line-wrap',
  wordClass: 'word',
};
// FUNCTION 텍스트에 장식용 dot 추가
const splitedText = [new SplitType('.text-eng', lineUpSplitOption)];
splitedText[0].elements.forEach((el) => {
  const firstLine = el.querySelector('.line-wrap:first-child');
  const node = `<span class="dot"></span>`;
  firstLine.insertAdjacentHTML('afterbegin', node);
});

// FUNCTION 요소의 절대 좌표 구하기
const getAbsoluteTop = (element) => {
  return window.scrollY + element.getBoundingClientRect().top;
};

// FUNCTION 모바일에서 메뉴 버튼 여닫기
const setOpenMenu = () => {
  // isOpen: boolean
  const menuWrap = document.querySelector('.menu-wrap');
  const isOpenMbMenu = menuWrap.getAttribute('data-open');
  const isOpen = JSON.parse(isOpenMbMenu);

  if (!isOpen === true) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = 'unset';
  }
  menuWrap.setAttribute('data-open', !isOpen);
  menuWrap.setAttribute('aria-expanded', !isOpen);
  // mbOpenBtn.setAttribute('data-open', !isOpen);
};

// FUNCTION top 버튼 클릭 시 실행
const onClickTopBtn = (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// FUNCTION 메뉴 아이템 클릭 시 실행
const onClickMenu = (menu) => {
  const section = document.querySelector(menu);
  window.scrollTo({ top: getAbsoluteTop(section) + 1, behavior: 'smooth' });

  const menuWrap = document.querySelector(".menu-wrap[data-open='true']");

  if (menuWrap) {
    setOpenMenu();
  }
};

// FUNCTION group 버튼 상태 변경
const setGroupBtnState = (target) => {
  const list = target.offsetParent.offsetParent;
  const title = document.querySelector('.team-list .team-list__title');
  const isOpen = JSON.parse(target.getAttribute('data-open'));

  if (isOpen) {
    gsap.to(list, {
      height: `auto`,
    });
  } else {
    gsap.to(list, {
      height: `${title.offsetHeight}px`,
    });
  }
};

// FUNCTION group 버튼 클릭 시 실행
const onClickGroupBtn = (target) => {
  const isOpen = JSON.parse(target.getAttribute('data-open'));

  target.setAttribute('data-open', !isOpen);
  target.setAttribute('aria-expanded', !isOpen);
  setGroupBtnState(target);
};

// FUNCTION After window load
window.addEventListener('load', () => {
  mbOpenBtn.addEventListener('click', setOpenMenu);
  topBtn.addEventListener('click', onClickTopBtn);
  document
    .querySelector('.home__icon')
    .addEventListener('click', onClickTopBtn);
  menuItem.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
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
        document.body.style.overflowY = 'unset';
        const list = document.querySelectorAll('.team-list__item');

        list.forEach((el) => {
          el.style.height = 'auto';
        });
        return;
      }
      mbGroupBtn.forEach((el, idx) => {
        setGroupBtnState(el);
      });

      ScrollTrigger.refresh();
    }, 500)
  );
  resizeObserver.observe(document.querySelector('.team-list'));
});
