// PARAM 마지막 스크롤 위치
let lastScrollTop = 0;
const headerNav = document.querySelector('.header__nav');

// FUNCTION 스크롤에 따른 header 포지션 변경
const setHeaderPosition = throttle(() => {
  const currentScrollTop = window.scrollY;

  if (currentScrollTop > lastScrollTop) {
    // 아래로 스크롤할 때
    headerNav.classList.remove('show');
  } else {
    // 위로 스크롤할 때
    headerNav.classList.add('show');
  }

  lastScrollTop = currentScrollTop;
}, 500);

// FUNCTION pc header 고정시키기
const setHeaderFix = () => {
  ScrollTrigger.create({
    trigger: headerNav,
    invalidateOnRefresh: true,
    start: () => `-=2rem start`,
    onEnter: () => {
      headerNav.classList.add('fix');
    },
    onLeaveBack: () => {
      headerNav.classList.remove('fix');
    },
  });
};

// FUNCTION 헤더 색상 변경
const setHeaderColor = () => {
  const header = document.querySelector('.header');
  // 헤더 색상 반전
  ScrollTrigger.create({
    invalidateOnRefresh: true,
    trigger: "[data-area='8']",
    endTrigger: "[data-area='10']",
    start: () => `bottom top`,
    end: () => '+=3000vh',
    onToggle: (self) => {
      if (self.isActive) {
        header.classList.add('revert');
      } else {
        header.classList.remove('revert');
      }
    },
  });

  const sectionList = ['.introduce', '.work', '.recruit'];
  const menuItem = gsap.utils.toArray('.menu-item');
  // 페이지 섹션에 따른 메뉴
  sectionList.forEach((el, idx) => {
    ScrollTrigger.create({
      invalidateOnRefresh: true,
      trigger: el,
      start: () => `top top`,
      end: () => `bottom top`,
      markers: true,
      onToggle: (self) => {
        if (self.isActive) {
          menuItem.forEach((el) => {
            el.classList.remove('active');
          });
          menuItem[idx].classList.add('active');
        }
      },
    });
  });
};

// FUNCTION fade-up 되는 텍스트
const setFadeUpMotion = (selector) => {
  const tl = gsap.timeline({
    repeatRefresh: true,
  });
  tl.to(selector, {
    y: () => 0,
    opacity: 1,
    duration: 1,
  });

  return tl;
};

//  FUNCTION word들이 약간의 시간차를 두고 올라오는 모션
const setWordUpMotion = (selector) => {
  // selector: string
  const tl = gsap.timeline({
    repeatRefresh: true,
    scrollTrigger: {
      trigger: selector,
      start: () => `top center`,
      invalidateOnRefresh: true,
    },
  });

  const wordList = gsap.utils.toArray(`${selector} .word`);

  // text-eng의 word들을 시차를 두고 fade-up
  tl.to(wordList, {
    y: () => 0,
    duration: 1,
    stagger: 0.03,
  });

  const nextEl = document.querySelector(selector).nextElementSibling;
  if (nextEl && nextEl.classList.contains('text-ko')) {
    // 다음 dom이 존재하고, 다음 dom에 text-ko 클래스가 존재하면
    tl.add(setFadeUpMotion(nextEl), '-=0.3');
  }
};
// PARAM setWordUpMotion을 적용할 리스트
// TODO before 부분에도 motion 추가될 수 있게 수정해야함.
const wordUpList = [
  `[data-area='1'] [data-text='1'] .text-eng`,
  `[data-area='1'] [data-text='2'] .text-eng`,
  `[data-area='1'] [data-text='3'] .text-eng`,
  `[data-area='4'] [data-text='2'] .text-eng`,
  `[data-area='12'] [data-text='1'] .text-eng`,
  `[data-area='12'] [data-text='2'] .text-eng`,
];

// FUNCTION 카드 스크롤 애니메이션
const setScrollCard = () => {
  const cardList = gsap.utils.toArray('.card');
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.card-slider .card-slider__inner',
      scrub: 1,
      endTrigger: ".area[data-area='1'] .text-box[data-text='3']",
      end: () => `top center`,
      onUpdate: (self) => {
        const progress = Math.round(self.progress * 100) / 25;
        const index = Math.round(progress);
        const otherCardList = cardList.filter((el, idx) => idx !== index);
        otherCardList.forEach((el) => {
          el.classList.remove('active');
        });
        cardList[index].classList.add('active');
      },
    },
  });

  tl.to(
    '.card-slider__inner',
    {
      xPercent: () => -100,
      left: () => 'calc(50vw - 28rem)',
    },
    'slide'
  );
};

// FUNCTION 양쪽으로 움직이는 텍스트
const setMoveHorizontalText = (array) => {
  // array: selector list

  const tl = gsap.timeline({});

  array.forEach((el, idx) => {
    tl.to(
      el,
      {
        x: () => (idx % 2 === 0 ? '-10rem' : '10rem'),
        repeatRefresh: true,
      },
      `text+=${idx * 0.05}`
    );
  });

  return tl;
};

// FUNCTION 스크롤에 따라 시계를 움직이는 애니메이션
const setMoveClock = () => {
  const textList = gsap.utils.toArray(".introduce [data-area='2'] .time__text");

  const tl = gsap.timeline({
    repeatRefresh: true,
    scrollTrigger: {
      trigger: ".introduce [data-area='2']",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  // 시계 이동시키기
  tl.to(
    ".introduce [data-area='2'] .clock",
    {
      y: () => '-20rem',
      stagger: 0.05,
    },
    'clock'
  );

  tl.add(setMoveHorizontalText(textList), 'clock');
};

// FUNCTION 배경 fadein 애니메이션
const setFadeInBg = () => {
  const tl = gsap.timeline({
    repeatRefresh: true,
    scrollTrigger: {
      trigger: '.area[data-area="3"] .img-box',
      end: 'center top',
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  tl.to('.area[data-area="3"] .img-box', {
    opacity: 1,
  });
};

// FUNCTION 스크롤에 따른 이미지 변경
const setArea4Motion = () => {
  const bg = document.querySelector("[data-area='4'] .img-box img");

  const tl = gsap.timeline({
    repeatRefresh: true,
    scrollTrigger: {
      trigger: "[data-area='4'] .img-box",
      start: () => 'center center',
      end: () => 'bottom center',
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = Math.round(self.progress * 100) / 10 + 1;
        const src = `assets/images/area4/bg${padToDigit(Math.round(progress))}.jpg`;

        bg.setAttribute('src', src);
      },
    },
  });
};

// FUNCTION group 부분 모션
const setGroupMotion = () => {
  const section = document.querySelector(".area[data-area='5']");
  const targetList = section.querySelectorAll(' .text-eng-rg, .text-ko, .team-list__sub-desc,  h4, .team-list__line, .team-list__main-desc');
  const mm = gsap.matchMedia();

  mm.add('(min-width: 721px)', () => {
    // pc화면에서만 실행
    targetList.forEach((el) => {
      gsap.to(el, {
        y: () => 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: el,
          start: () => `start bottom`,
          end: () => `end center`,
          invalidateOnRefresh: true,
          scrub: 1.5,
        },
      });
    });
  });
};

// FUNCTION value section 모션
const setValueMotion = () => {
  const section = document.querySelector(".area[data-area='6']");
  const tl = gsap.timeline({
    repeatRefresh: true,
    scrollTrigger: {
      trigger: "[data-area='6']",
      start: () => `center center`,
      end: () => `bottom bottom`,
      scrub: 1,
    },
  });
  const mm = gsap.matchMedia();

  // circle fadein motion
  tl.to(
    section.querySelector('.horizontal-section'),
    {
      clipPath: () => `circle(max(100vw, 100vh))`,
      duration: 2.5,
      // ease: 'power1.inOut',
    },
    'fadein'
  );

  mm.add('(min-width: 721px)', () => {
    tl.to(
      section.querySelector('.horizontal-scroller'),
      {
        x: () => 0,
      },
      'fadein'
    );
  });

  // fadein other text
  tl.to(
    section.querySelectorAll('.text-box, .value__fromto'),
    {
      opacity: 1,
    },
    'fadetext'
  );
  tl.to(
    section.querySelector('.svg-logo-dim'),
    {
      opacity: 0.15,
    },
    'fadetext'
  );

  // text rotate
  const roller = section.querySelectorAll('.value__roller');
  const rollerItem = [roller[0].querySelector('.value__item').children, roller[1].querySelector('.value__item').children];
  Array.from(rollerItem[0]).forEach((el, idx) => {
    if (idx !== 0) {
      tl.to(
        rollerItem[0][idx - 1],
        {
          rotateX: 90,
          opacity: 0,
          duration: 1,
          transformOrigin: `50% 0%`,
        },
        `from-text-${idx}`
      );
      tl.to(
        rollerItem[1][idx - 1],
        {
          rotateX: 90,
          opacity: 0,
          duration: 1,
          transformOrigin: `50% 0%`,
        },
        `to-text-${idx}`
      );
    }

    tl.to(
      el,
      {
        rotateX: 0,
        opacity: 1,
        duration: 1,
      },
      `from-text-${idx}`
    );

    tl.to(
      rollerItem[1][idx],
      {
        rotateX: 0,
        opacity: 1,
        duration: 1,
      },
      `to-text-${idx}`
    );
  });

  // 애니메이션 완료 후 delay 추가
  tl.add(() => {}, '+=0.5');
};

// FUNCTION data-area7 부분 모션
const setArea7Motion = () => {
  const bgTarget = document.querySelectorAll("[data-area='6'] .horizontal-section, [data-area='7']");
  const textList = gsap.utils.toArray(".introduce [data-area='7'] .horizontal-mover__line");

  const tl = gsap.timeline({
    repeatRefresh: true,
    scrollTrigger: {
      trigger: "[data-area='7']",
      scrub: 1,
      start: () => `start center`,
      end: () => `start top`,

      invalidateOnRefresh: true,
    },
  });

  tl.to(
    bgTarget,
    {
      background: `#000`,
    },
    'scroller'
  );

  // tl.add(setMoveHorizontalText(textList), 'scroller');
  const tl2 = gsap.timeline({
    repeatRefresh: true,
    ease: 'none',
    scrollTrigger: {
      trigger: "[data-area='7'] .horizontal-mover",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });
  const scroll = ['80rem', '-160rem', '120rem', '-112rem', '56rem', '-72rem', '96rem'];
  textList.forEach((el, idx) => {
    tl2.to(
      el,
      {
        x: () => scroll[idx],
        repeatRefresh: true,
      },
      `scroller+=${idx * 0.02}`
    );
  });
};

// FUNCTION data-area8 부분 모션
const setArea8Motion = () => {
  const section = document.querySelector("[data-area='8']");
  const mm = gsap.matchMedia();
  const tl = gsap.timeline({
    repeatRefresh: true,
    scrollTrigger: {
      trigger: "[data-area='8']",
      scrub: 1,
      start: () => `start start`,
      end: () => `center center`,
      invalidateOnRefresh: true,
    },
  });

  tl.to(
    section.querySelector('.img-box'),
    {
      width: `100vw`,
    },
    'img'
  );

  const img = section.querySelectorAll('img');
  mm.add('(max-width: 720px)', () => {
    // pc화면에서만 실행
    tl.to(
      img,
      {
        width: `1600px`,
      },
      'img+=0.05'
    );
  });

  tl.to(
    img,
    {
      opacity: 1,
      stagger: 0.1,
    },
    `img+=0.05`
  );

  tl.to(
    section.querySelector('.horizontal-scroller'),
    {
      transform: `translateX(calc(-100vw - 2rem))`,
      duration: 0.5,
    },
    '-=0.05'
  );
};

// FUNCTION data-area9 부분 모션
const setArea9Motion = () => {
  const tl = gsap.timeline({
    repeatRefresh: true,
    scrollTrigger: {
      trigger: "[data-area='9']",
      scrub: 1,
      start: () => `+=400vh start`,
      end: () => `bottom start`,
      ease: 'none',
      invalidateOnRefresh: true,
    },
  });

  tl.to("[data-area='9'] .page-container", {
    xPercent: () => '-100',
    x: () => `-1px`,
  });

  // 애니메이션 완료 후 delay 추가
  tl.add(() => {}, '+=0.5');
};

// FUNCTION method motion
const setMethodMotion = () => {
  const tl = gsap.timeline({
    repeatRefresh: true,
    scrollTrigger: {
      trigger: "[data-area='10']",
      scrub: 1,
      start: () => `+=4800vh start`,
      end: () => `bottom bottom`,
      invalidateOnRefresh: true,
    },
  });

  const scene = document.querySelectorAll("[data-area='10'] .method");

  scene.forEach((el, idx) => {
    if (idx !== 0) {
      tl.to(
        scene[idx - 1],
        {
          opacity: 0,
          delay: 1,
        },
        `scene-change${idx}`
      );
      tl.to(
        el,
        {
          opacity: 1,
          // delay: idx,
        },
        `scene-change${idx}+=2`
      );
    }
  });
  // 애니메이션 완료 후 delay 추가
  tl.add(() => {}, '+=1');
};

// FUNCTION data-area11 부분 모션
const setArea11Motion = () => {
  const bg = document.querySelector("[data-area='11'] .member__img-container img");

  const tl = gsap.timeline({
    repeatRefresh: true,
    scrollTrigger: {
      trigger: "[data-area='11']",
      start: () => 'top top',
      end: () => 'bottom bottom',
      scrub: 0,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = Math.round(self.progress * 100) / 1.78 + 1;
        const src = `assets/images/area11/member-${Math.round(progress)}.jpg`;

        bg.setAttribute('src', src);
      },
    },
  });
};

// FUNCTION creator motion
const setCreatorMotion = () => {
  const imgList = gsap.utils.toArray("[data-area='12'] .img-box");
  const moveList = ['-40%', '-36%', '-64%', '-32%'];

  imgList.forEach((el, idx) => {
    gsap.to(el, {
      y: () => moveList[idx],
      scrollTrigger: {
        trigger: el,
        scrub: 1,
        start: () => `start bottom`,
        end: () => `bottom start`,
        invalidateOnRefresh: true,
      },
    });
  });
};

// FUNCTION work motion
const setWorkMotion = () => {
  const workItem = gsap.utils.toArray('.work__item');

  const tl = gsap.timeline({
    repeatRefresh: true,
    scrollTrigger: {
      trigger: '.work',
      start: () => 'top top',
      end: () => 'bottom bottom',
      ease: 'none',
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  workItem.forEach((el, idx) => {
    tl.to(
      el,
      {
        y: () => `-100%`,
      },
      `img${idx}`
    );

    tl.to(
      el.querySelector('a'),
      {
        borderRadius: () => `0px`,
      },
      `img${idx}+0.05`
    );
    tl.to(
      el.querySelector('img'),
      {
        scale: () => 1.05,
      },
      `img${idx}+0.05`
    );
  });

  // 애니메이션 완료 후 delay 추가
  tl.add(() => {}, '+=0.1');
};

// FUNCTION recruit motion
const setRecruitMotion = () => {
  const cardWrap = document.querySelector('.recruit__card');

  const tl = gsap.timeline({
    repeatRefresh: true,
    scrollTrigger: {
      trigger: '.recruit',
      start: () => 'top center',
      end: () => 'top top',
      ease: 'none',
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  tl.to(cardWrap, {
    y: () => `0`,
  });

  tl.to(cardWrap.querySelector('img'), {
    rotate: () => `15deg`,
  });
};

// FUNCTION
const setCardRotation = () => {
  const xPos = event.clientX / $(window).width() - 0.5;
  const yPos = event.clientY / $(window).height() - 0.5;
  const box = element;

  TweenLite.to(box, 0.6, {
    rotationY: xPos * 100,
    rotationX: -yPos * 100,
    ease: Power4.easeOut,
  });
};

// FUNCTION progress bar
const setProgress = () => {
  const tl = gsap.timeline({
    repeatRefresh: true,
    scrollTrigger: {
      trigger: 'body',
      start: () => 'top top',
      end: () => 'bottom bottom',
      ease: 'none',
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  tl.to('.progress__bar', {
    transform: () => `scaleX(1)`,
  });
};

// FUNCTION motion load
window.addEventListener('load', () => {
  setHeaderFix();
  setHeaderColor();
  window.addEventListener('scroll', setHeaderPosition);

  wordUpList.forEach((el) => {
    setWordUpMotion(el);
  });

  // introduce
  setScrollCard();
  setMoveClock();
  setFadeInBg();
  setArea4Motion();
  setGroupMotion();
  setValueMotion();
  setArea7Motion();
  setArea8Motion();
  setArea9Motion();
  setMethodMotion();
  setArea11Motion();
  setCreatorMotion();
  // // introduce

  // work
  setWorkMotion();
  //// work

  // recruit
  setRecruitMotion();
  // // recruit

  setProgress();
});
