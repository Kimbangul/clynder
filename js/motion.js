const setHeaderFix = () => {
  const header = document.querySelector('.header__nav');

  ScrollTrigger.create({
    trigger: header,
    markers: true,
    endTrigger: document.querySelector('body'),
    end: () => `bottom top`,
    invalidateOnRefresh: true,
    onToggle: (self) => console.log(self),
    // onUpdate: (self) => {
    //     console.log(
    //         'progress:',
    //         self.progress.toFixed(3),
    //         'direction:',
    //         self.direction,
    //         'velocity',
    //         self.getVelocity()
    //     );
    // }
  });
};

// FUNCTION motion load
window.addEventListener('load', () => {
  console.log('motion load');
  setHeaderFix();
});
