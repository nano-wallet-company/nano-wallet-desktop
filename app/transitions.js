export default function () {
  this.transition(
    this.hasClass('hide-history'),

    // this makes our rule apply when the liquid-if transitions to the
    // true state.
    this.toValue(false),
    this.use('fade', { duration: 400 }),
    this.reverse('fade', { duration: 400 }),
  );
  this.transition(
    this.hasClass('balance'),

    // this makes our rule apply when the liquid-if transitions to the
    // true state.
    this.toValue(false),
    this.use('fade', { duration: 400 }),
    this.reverse('fade', { duration: 250 }),
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
}
