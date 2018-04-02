export default function () {
  this.transition(
    this.hasClass('setup-step'),
    this.fromRoute('setup.index'),
    this.toRoute('setup.import'),
    this.use('toLeft', { duration: 100 }),
    this.reverse('toRight', { duration: 100 }),
  );
}
