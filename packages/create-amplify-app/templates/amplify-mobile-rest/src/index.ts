try {
  // tslint:disable-next-line
  require('./AwakeInDevApp');
} catch (e) {
  if (typeof ErrorUtils !== 'undefined') {
    (ErrorUtils as any).reportFatalError(e);
  } else {
    console.error(e);
  }
}
