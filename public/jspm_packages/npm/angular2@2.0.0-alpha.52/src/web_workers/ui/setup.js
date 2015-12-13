/* */ 
'use strict';
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
};
var messaging_api_1 = require("../shared/messaging_api");
var async_1 = require("../../facade/async");
var message_bus_1 = require("../shared/message_bus");
var anchor_based_app_root_url_1 = require("../../compiler/anchor_based_app_root_url");
var lang_1 = require("../../facade/lang");
var di_1 = require("../../core/di");
var WebWorkerSetup = (function() {
  function WebWorkerSetup(_bus, anchorBasedAppRootUrl) {
    this._bus = _bus;
    this.rootUrl = anchorBasedAppRootUrl.value;
  }
  WebWorkerSetup.prototype.start = function() {
    var _this = this;
    this._bus.initChannel(messaging_api_1.SETUP_CHANNEL, false);
    var sink = this._bus.to(messaging_api_1.SETUP_CHANNEL);
    var source = this._bus.from(messaging_api_1.SETUP_CHANNEL);
    async_1.ObservableWrapper.subscribe(source, function(message) {
      if (lang_1.StringWrapper.equals(message, "ready")) {
        async_1.ObservableWrapper.callEmit(sink, {"rootUrl": _this.rootUrl});
      }
    });
  };
  WebWorkerSetup = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [message_bus_1.MessageBus, anchor_based_app_root_url_1.AnchorBasedAppRootUrl])], WebWorkerSetup);
  return WebWorkerSetup;
})();
exports.WebWorkerSetup = WebWorkerSetup;
