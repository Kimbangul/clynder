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
  console.log(nextEl.classList);
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
const onScrollCard = () => {
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
      //  x: () => '-50vw',
      left: () => 'calc(50vw - 28rem)',
      // x: () => '50vw',
    },
    'slide'
  );

  // tl.to(
  //   '.card',
  //   {
  //     opacity: 1,
  //     stagger: 0.1,
  //   },
  //   'slide'
  // );

  // cardList.forEach((el, idx) => {
  //   tl.to(el, {
  //     opacity: 1,
  //     delay: 0 + 0.1 * idx,
  //   });
  // });

  // tl.to('.card', {}, '+=0.5');
};

// FUNCTION motion load
window.addEventListener('load', () => {
  console.log('motion load');
  setHeaderFix();

  wordUpList.forEach((el) => {
    setWordUpMotion(el);
  });

  onScrollCard();
});
