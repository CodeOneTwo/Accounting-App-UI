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
var message_bus_1 = require("./message_bus");
var lang_1 = require("../../facade/lang");
var async_1 = require("../../facade/async");
var collection_1 = require("../../facade/collection");
var serializer_1 = require("./serializer");
var di_1 = require("../../core/di");
var lang_2 = require("../../facade/lang");
var lang_3 = require("../../facade/lang");
exports.Type = lang_3.Type;
var ClientMessageBrokerFactory = (function() {
  function ClientMessageBrokerFactory() {}
  return ClientMessageBrokerFactory;
})();
exports.ClientMessageBrokerFactory = ClientMessageBrokerFactory;
var ClientMessageBrokerFactory_ = (function(_super) {
  __extends(ClientMessageBrokerFactory_, _super);
  function ClientMessageBrokerFactory_(_messageBus, _serializer) {
    _super.call(this);
    this._messageBus = _messageBus;
    this._serializer = _serializer;
  }
  ClientMessageBrokerFactory_.prototype.createMessageBroker = function(channel, runInZone) {
    if (runInZone === void 0) {
      runInZone = true;
    }
    this._messageBus.initChannel(channel, runInZone);
    return new ClientMessageBroker_(this._messageBus, this._serializer, channel);
  };
  ClientMessageBrokerFactory_ = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [message_bus_1.MessageBus, serializer_1.Serializer])], ClientMessageBrokerFactory_);
  return ClientMessageBrokerFactory_;
})(ClientMessageBrokerFactory);
exports.ClientMessageBrokerFactory_ = ClientMessageBrokerFactory_;
var ClientMessageBroker = (function() {
  function ClientMessageBroker() {}
  return ClientMessageBroker;
})();
exports.ClientMessageBroker = ClientMessageBroker;
var ClientMessageBroker_ = (function(_super) {
  __extends(ClientMessageBroker_, _super);
  function ClientMessageBroker_(messageBus, _serializer, channel) {
    var _this = this;
    _super.call(this);
    this.channel = channel;
    this._pending = new Map();
    this._sink = messageBus.to(channel);
    this._serializer = _serializer;
    var source = messageBus.from(channel);
    async_1.ObservableWrapper.subscribe(source, function(message) {
      return _this._handleMessage(message);
    });
  }
  ClientMessageBroker_.prototype._generateMessageId = function(name) {
    var time = lang_1.stringify(lang_1.DateWrapper.toMillis(lang_1.DateWrapper.now()));
    var iteration = 0;
    var id = name + time + lang_1.stringify(iteration);
    while (lang_1.isPresent(this._pending[id])) {
      id = "" + name + time + iteration;
      iteration++;
    }
    return id;
  };
  ClientMessageBroker_.prototype.runOnService = function(args, returnType) {
    var _this = this;
    var fnArgs = [];
    if (lang_1.isPresent(args.args)) {
      args.args.forEach(function(argument) {
        if (argument.type != null) {
          fnArgs.push(_this._serializer.serialize(argument.value, argument.type));
        } else {
          fnArgs.push(argument.value);
        }
      });
    }
    var promise;
    var id = null;
    if (returnType != null) {
      var completer = async_1.PromiseWrapper.completer();
      id = this._generateMessageId(args.method);
      this._pending.set(id, completer);
      async_1.PromiseWrapper.catchError(completer.promise, function(err, stack) {
        lang_1.print(err);
        completer.reject(err, stack);
      });
      promise = async_1.PromiseWrapper.then(completer.promise, function(value) {
        if (_this._serializer == null) {
          return value;
        } else {
          return _this._serializer.deserialize(value, returnType);
        }
      });
    } else {
      promise = null;
    }
    var message = {
      'method': args.method,
      'args': fnArgs
    };
    if (id != null) {
      message['id'] = id;
    }
    async_1.ObservableWrapper.callEmit(this._sink, message);
    return promise;
  };
  ClientMessageBroker_.prototype._handleMessage = function(message) {
    var data = new MessageData(message);
    if (lang_2.StringWrapper.equals(data.type, "result") || lang_2.StringWrapper.equals(data.type, "error")) {
      var id = data.id;
      if (this._pending.has(id)) {
        if (lang_2.StringWrapper.equals(data.type, "result")) {
          this._pending.get(id).resolve(data.value);
        } else {
          this._pending.get(id).reject(data.value, null);
        }
        this._pending.delete(id);
      }
    }
  };
  return ClientMessageBroker_;
})(ClientMessageBroker);
exports.ClientMessageBroker_ = ClientMessageBroker_;
var MessageData = (function() {
  function MessageData(data) {
    this.type = collection_1.StringMapWrapper.get(data, "type");
    this.id = this._getValueIfPresent(data, "id");
    this.value = this._getValueIfPresent(data, "value");
  }
  MessageData.prototype._getValueIfPresent = function(data, key) {
    if (collection_1.StringMapWrapper.contains(data, key)) {
      return collection_1.StringMapWrapper.get(data, key);
    } else {
      return null;
    }
  };
  return MessageData;
})();
var FnArg = (function() {
  function FnArg(value, type) {
    this.value = value;
    this.type = type;
  }
  return FnArg;
})();
exports.FnArg = FnArg;
var UiArguments = (function() {
  function UiArguments(method, args) {
    this.method = method;
    this.args = args;
  }
  return UiArguments;
})();
exports.UiArguments = UiArguments;