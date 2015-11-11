var RxOld = require('rx');
var RxNew = require('../../../../index');

var source = Array.apply(null, { length: 25 });

module.exports = function (suite) {
  var oldSwitchWithCurrentThreadScheduler = RxOld.Observable.fromArray(
    source.map(function () { return RxOld.Observable.range(0, 25, RxOld.Scheduler.currentThread); }),
    RxOld.Scheduler.currentThread
  )
    .switch();
  var newSwitchWithCurrentThreadScheduler = RxNew.Observable.fromArray(
    source.map(function () { return RxNew.Observable.range(0, 25, RxNew.Scheduler.immediate); }),
    RxNew.Scheduler.immediate
  )
    .switch();

  function _next(x) { }
  function _error(e) { }
  function _complete() { }
  return suite
    .add('old switch with current thread scheduler', function () {
      oldSwitchWithCurrentThreadScheduler.subscribe(_next, _error, _complete);
    })
    .add('new switch with current thread scheduler', function () {
      newSwitchWithCurrentThreadScheduler.subscribe(_next, _error, _complete);
    });
};
