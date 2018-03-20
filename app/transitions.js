export default function () {
  const duration = 100;
  this.transition(
    this.hasClass('hide-history'),

    // this makes our rule apply when the liquid-if transitions to the
    // true state.
    this.toValue(false),
    this.use('fade', { duration: 250 }),
    this.reverse('fade', { duration: 250 }),
  );
  this.transition(
    this.hasClass('hide-balance'),

    // this makes our rule apply when the liquid-if transitions to the
    // true state.
    this.toValue(false),
    this.use('toUp', { duration: 300 }),
    this.reverse('toUp', { duration: 300 }),
  );
  this.transition(
    this.hasClass('hide-qr'),

    // this makes our rule apply when the liquid-if transitions to the
    // true state.
    this.toValue(false),
    this.use('fade', { duration: 500 }),

    // which means we can also apply a reverse rule for transitions to
    // the false state.
    this.reverse('fade', { duration: 500 }),
  );

  this.transition(
    this.fromRoute('wallets.overview'),
    this.toRoute('wallets.overview.accounts.history'),
    this.hasClass('history'),
    this.use('wait', 3000, { then: 'toUp' }),
    this.reverse('wait', 3000, { then: 'toDown' }),
  );

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

  this.transition(
    this.fromRoute('wallets.overview'),
    this.toRoute('wallets.overview.accounts.send'),
    this.hasClass('send-outlet'),
    this.use('wait', 1000, { then: 'fade' }),
    this.reverse('wait', 1000, { then: 'fade' }),
  );
}
