/* */ 
'use strict';
var __extends = (this && this.__extends) || function(d, b) {
  for (var p in b)
    if (b.hasOwnProperty(p))
      d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var app_root_url_1 = require("./app_root_url");
var dom_adapter_1 = require("../platform/dom/dom_adapter");
var di_1 = require("../core/di");
var AnchorBasedAppRootUrl = (function(_super) {
  __extends(AnchorBasedAppRootUrl, _super);
  function AnchorBasedAppRootUrl() {
    _super.call(this, "");
    var a = dom_adapter_1.DOM.createElement('a');
    dom_adapter_1.DOM.resolveAndSetHref(a, './', null);
    this.value = dom_adapter_1.DOM.getHref(a);
  }
  AnchorBasedAppRootUrl = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [])], AnchorBasedAppRootUrl);
  return AnchorBasedAppRootUrl;
})(app_root_url_1.AppRootUrl);
exports.AnchorBasedAppRootUrl = AnchorBasedAppRootUrl;
