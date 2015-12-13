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
var di_1 = require("../di");
var lang_1 = require("../../facade/lang");
var collection_1 = require("../../facade/collection");
var reflection_1 = require("../reflection/reflection");
var ComponentUrlMapper = (function() {
  function ComponentUrlMapper() {}
  ComponentUrlMapper.prototype.getUrl = function(component) {
    return reflection_1.reflector.isReflectionEnabled() ? reflection_1.reflector.importUri(component) : './';
  };
  ComponentUrlMapper = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [])], ComponentUrlMapper);
  return ComponentUrlMapper;
})();
exports.ComponentUrlMapper = ComponentUrlMapper;
var RuntimeComponentUrlMapper = (function(_super) {
  __extends(RuntimeComponentUrlMapper, _super);
  function RuntimeComponentUrlMapper() {
    _super.call(this);
    this._componentUrls = new collection_1.Map();
  }
  RuntimeComponentUrlMapper.prototype.setComponentUrl = function(component, url) {
    this._componentUrls.set(component, url);
  };
  RuntimeComponentUrlMapper.prototype.getUrl = function(component) {
    var url = this._componentUrls.get(component);
    if (lang_1.isPresent(url))
      return url;
    return _super.prototype.getUrl.call(this, component);
  };
  return RuntimeComponentUrlMapper;
})(ComponentUrlMapper);
exports.RuntimeComponentUrlMapper = RuntimeComponentUrlMapper;
