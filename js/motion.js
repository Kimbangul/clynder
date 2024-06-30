// FUNCTION pc header 고정시키기
const setHeaderFix = () => {
  const header = document.querySelector('.header__nav');

  ScrollTrigger.create({
    trigger: header,
    invalidateOnRefresh: true,
    start: () => `-=2rem start`,
    onEnter: () => {
      header.classList.add('fix');
    },
    onLeaveBack: () => {
      header.classList.remove('fix');
    },
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
const setChangeBg = () => {
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
        const src = `assets/images/area4/bg${padToDigit(
          Math.round(progress)
        )}.jpg`;

        bg.setAttribute('src', src);
      },
    },
  });
};

// FUNCTION group 부분 모션
const setGroupMotion = () => {
  const section = document.querySelector(".area[data-area='5']");
  const targetList = section.querySelectorAll(
    ' .text-eng-rg, .text-ko, .team-list__sub-desc,  h4, .team-list__line, .team-list__main-desc'
  );

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
};

// FUNCTION motion load
window.addEventListener('load', () => {
  console.log('motion load');
  setHeaderFix();

  wordUpList.forEach((el) => {
    setWordUpMotion(el);
  });

  setScrollCard();
  setMoveClock();
  setFadeInBg();
  setChangeBg();
  setGroupMotion();
});
