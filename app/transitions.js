export default function () {
  const duration = 100;

  this.transition(
    this.hasClass('toLeft'),
    this.fromRoute('setup'),
    this.toRoute('setup.index'),
    this.use('fade'),
    this.reverse('fade'),
  );

  this.transition(
    this.hasClass('toLeft'),
    this.fromRoute('setup.index'),
    this.toRoute('setup.backup'),
    this.use('toLeft', { duration }),
    this.reverse('toRight', { duration }),
  );

  this.transition(
    this.hasClass('toLeft'),
    this.fromRoute('setup.index'),
    this.toRoute('setup.import'),
    this.use('toLeft', { duration }),
    this.reverse('toRight', { duration }),
  );

  this.transition(
    this.hasClass('toLeft'),
    this.fromRoute('setup.backup'),
    this.toRoute('setup.password'),
    this.use('toLeft', { duration }),
    this.reverse('toRight', { duration }),
  );
}
