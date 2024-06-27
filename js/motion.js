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

//  FUNCTION
const setWordUpMotion = (selector) => {
  // selector: string
  const wordList = gsap.utils.toArray(`${selector} .word`);
  const lineList = gsap.utils.toArray(`${selector} .line`);
  gsap.set(wordList, { y: () => 100 });
  gsap.to(wordList, {
    y: () => 0,
    duration: 1,
    stagger: 0.01,
    scrollTrigger: {
      trigger: selector,
      start: () => `top center`,
      markers: true,
      invalidateOnRefresh: true,
    },
    onComplete: () => {
      el.style.overflow = 'unset';
    },
  });

  // ScrollTrigger.create({
  //   trigger: selector,
  //   start: () => `top center`,
  //   markers: true,
  // });

  console.log(wordList);
};

// FUNCTION motion load
window.addEventListener('load', () => {
  console.log('motion load');
  setHeaderFix();
  setWordUpMotion(`[data-area='1'] [data-text='1'] .text-eng`);
});
