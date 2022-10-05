globalThis._importMeta_={url:import.meta.url,env:process.env};import 'file:///Users/yuyin/i/steam-card/node_modules/.pnpm/node-fetch-native@0.1.7/node_modules/node-fetch-native/dist/polyfill.mjs';
import { Server } from 'http';
import { tmpdir } from 'os';
import path, { join } from 'path';
import { mkdirSync } from 'fs';
import { parentPort, threadId } from 'worker_threads';
import { provider, isWindows } from 'file:///Users/yuyin/i/steam-card/node_modules/.pnpm/std-env@3.2.1/node_modules/std-env/dist/index.mjs';
import { createFetch as createFetch$1, Headers } from 'file:///Users/yuyin/i/steam-card/node_modules/.pnpm/ohmyfetch@0.4.19/node_modules/ohmyfetch/dist/node.mjs';
import destr from 'file:///Users/yuyin/i/steam-card/node_modules/.pnpm/destr@1.1.1/node_modules/destr/dist/index.mjs';
import { createRouter as createRouter$1 } from 'file:///Users/yuyin/i/steam-card/node_modules/.pnpm/radix3@0.1.2/node_modules/radix3/dist/index.mjs';
import { createCall, createFetch } from 'file:///Users/yuyin/i/steam-card/node_modules/.pnpm/unenv@0.6.2/node_modules/unenv/runtime/fetch/index.mjs';
import { createHooks } from 'file:///Users/yuyin/i/steam-card/node_modules/.pnpm/hookable@5.3.0/node_modules/hookable/dist/index.mjs';
import { snakeCase } from 'file:///Users/yuyin/i/steam-card/node_modules/.pnpm/scule@0.3.2/node_modules/scule/dist/index.mjs';
import { hash } from 'file:///Users/yuyin/i/steam-card/node_modules/.pnpm/ohash@0.1.5/node_modules/ohash/dist/index.mjs';
import { withoutTrailingSlash, parseURL } from 'file:///Users/yuyin/i/steam-card/node_modules/.pnpm/ufo@0.8.5/node_modules/ufo/dist/index.mjs';
import { createStorage } from 'file:///Users/yuyin/i/steam-card/node_modules/.pnpm/unstorage@0.5.6/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/yuyin/i/steam-card/node_modules/.pnpm/unstorage@0.5.6/node_modules/unstorage/dist/drivers/fs.mjs';
import i18n from 'file:///Users/yuyin/i/steam-card/node_modules/.pnpm/i18n@0.15.1/node_modules/i18n/index.js';
import { fileURLToPath } from 'url';
import axios from 'file:///Users/yuyin/i/steam-card/node_modules/.pnpm/axios@0.27.2/node_modules/axios/index.js';
import * as tunnel from 'file:///Users/yuyin/i/steam-card/node_modules/.pnpm/tunnel@0.0.6/node_modules/tunnel/index.js';
import { load } from 'file:///Users/yuyin/i/steam-card/node_modules/.pnpm/cheerio@1.0.0-rc.10/node_modules/cheerio/lib/index.js';

class H3Error extends Error {
  constructor() {
    super(...arguments);
    this.statusCode = 500;
    this.fatal = false;
    this.unhandled = false;
    this.statusMessage = "Internal Server Error";
  }
}
H3Error.__h3_error__ = true;
function createError(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage, input.cause ? { cause: input.cause } : void 0);
  if ("stack" in input) {
    try {
      Object.defineProperty(err, "stack", { get() {
        return input.stack;
      } });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.statusCode) {
    err.statusCode = input.statusCode;
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.res.writableEnded) {
    return;
  }
  const h3Error = isError(error) ? error : createError(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.res.writableEnded) {
    return;
  }
  event.res.statusCode = h3Error.statusCode;
  event.res.statusMessage = h3Error.statusMessage;
  event.res.setHeader("Content-Type", MIMES.json);
  event.res.end(JSON.stringify(responseBody, null, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public"].concat(opts.cacheControls || []);
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.req.headers["if-modified-since"];
    event.res.setHeader("Last-Modified", modifiedTime.toUTCString());
    if (ifModifiedSince) {
      if (new Date(ifModifiedSince) >= opts.modifiedTime) {
        cacheMatched = true;
      }
    }
  }
  if (opts.etag) {
    event.res.setHeader("Etag", opts.etag);
    const ifNonMatch = event.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.res.setHeader("Cache-Control", cacheControls.join(", "));
  if (cacheMatched) {
    event.res.statusCode = 304;
    event.res.end("");
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const defer = typeof setImmediate !== "undefined" ? setImmediate : (fn) => fn();
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      event.res.end(data);
      resolve(void 0);
    });
  });
}
function defaultContentType(event, type) {
  if (type && !event.res.getHeader("Content-Type")) {
    event.res.setHeader("Content-Type", type);
  }
}
function setResponseHeader(event, name, value) {
  event.res.setHeader(name, value);
}
const setHeader = setResponseHeader;
function isStream(data) {
  return data && typeof data === "object" && typeof data.pipe === "function" && typeof data.on === "function";
}
function sendStream(event, data) {
  return new Promise((resolve, reject) => {
    data.pipe(event.res);
    data.on("end", () => resolve(void 0));
    data.on("error", (error) => reject(createError(error)));
  });
}

class H3Headers {
  constructor(init) {
    if (!init) {
      this._headers = {};
    } else if (Array.isArray(init)) {
      this._headers = Object.fromEntries(init.map(([key, value]) => [key.toLowerCase(), value]));
    } else if (init && "append" in init) {
      this._headers = Object.fromEntries([...init.entries()]);
    } else {
      this._headers = Object.fromEntries(Object.entries(init).map(([key, value]) => [key.toLowerCase(), value]));
    }
  }
  append(name, value) {
    const _name = name.toLowerCase();
    this.set(_name, [this.get(_name), value].filter(Boolean).join(", "));
  }
  delete(name) {
    delete this._headers[name.toLowerCase()];
  }
  get(name) {
    return this._headers[name.toLowerCase()];
  }
  has(name) {
    return name.toLowerCase() in this._headers;
  }
  set(name, value) {
    this._headers[name.toLowerCase()] = String(value);
  }
  forEach(callbackfn) {
    Object.entries(this._headers).forEach(([key, value]) => callbackfn(value, key, this));
  }
}

class H3Response {
  constructor(body = null, init = {}) {
    this.body = null;
    this.type = "default";
    this.bodyUsed = false;
    this.headers = new H3Headers(init.headers);
    this.status = init.status ?? 200;
    this.statusText = init.statusText || "";
    this.redirected = !!init.status && [301, 302, 307, 308].includes(init.status);
    this._body = body;
    this.url = "";
    this.ok = this.status < 300 && this.status > 199;
  }
  clone() {
    return new H3Response(this.body, {
      headers: this.headers,
      status: this.status,
      statusText: this.statusText
    });
  }
  arrayBuffer() {
    return Promise.resolve(this._body);
  }
  blob() {
    return Promise.resolve(this._body);
  }
  formData() {
    return Promise.resolve(this._body);
  }
  json() {
    return Promise.resolve(this._body);
  }
  text() {
    return Promise.resolve(this._body);
  }
}

class H3Event {
  constructor(req, res) {
    this["__is_event__"] = true;
    this.context = {};
    this.req = req;
    this.res = res;
    this.event = this;
    req.event = this;
    req.context = this.context;
    req.req = req;
    req.res = res;
    res.event = this;
    res.res = res;
    res.req = res.req || {};
    res.req.res = res;
    res.req.req = req;
  }
  respondWith(r) {
    Promise.resolve(r).then((_response) => {
      if (this.res.writableEnded) {
        return;
      }
      const response = _response instanceof H3Response ? _response : new H3Response(_response);
      response.headers.forEach((value, key) => {
        this.res.setHeader(key, value);
      });
      if (response.status) {
        this.res.statusCode = response.status;
      }
      if (response.statusText) {
        this.res.statusMessage = response.statusText;
      }
      if (response.redirected) {
        this.res.setHeader("Location", response.url);
      }
      if (!response._body) {
        return this.res.end();
      }
      if (typeof response._body === "string" || "buffer" in response._body || "byteLength" in response._body) {
        return this.res.end(response._body);
      }
      if (!response.headers.has("content-type")) {
        response.headers.set("content-type", MIMES.json);
      }
      this.res.end(JSON.stringify(response._body));
    });
  }
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function callHandler(handler, req, res) {
  const isMiddleware = handler.length > 2;
  return new Promise((resolve, reject) => {
    const next = (err) => {
      if (isMiddleware) {
        res.off("close", next);
        res.off("error", next);
      }
      return err ? reject(createError(err)) : resolve(void 0);
    };
    try {
      const returned = handler(req, res, next);
      if (isMiddleware && returned === void 0) {
        res.once("close", next);
        res.once("error", next);
      } else {
        resolve(returned);
      }
    } catch (err) {
      next(err);
    }
  });
}

function defineEventHandler(handler) {
  handler.__is_handler__ = true;
  return handler;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return "__is_handler__" in input;
}
function toEventHandler(handler) {
  if (isEventHandler(handler)) {
    return handler;
  }
  if (typeof handler !== "function") {
    throw new TypeError("Invalid handler. It should be a function:", handler);
  }
  return eventHandler((event) => {
    return callHandler(handler, event.req, event.res);
  });
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler = r.default || r;
        if (typeof handler !== "function") {
          throw new TypeError("Invalid lazy handler result. It should be a function:", handler);
        }
        _resolved = toEventHandler(r.default || r);
        return _resolved;
      });
    }
    return _promise;
  };
  return eventHandler((event) => {
    if (_resolved) {
      return _resolved(event);
    }
    return resolveHandler().then((handler) => handler(event));
  });
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const nodeHandler = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await handler(event);
    } catch (_error) {
      const error = createError(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      if (options.onError) {
        await options.onError(error, event);
      } else {
        if (error.unhandled || error.fatal) {
          console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
        }
        await sendError(event, error, !!options.debug);
      }
    }
  };
  const app = nodeHandler;
  app.nodeHandler = nodeHandler;
  app.stack = stack;
  app.handler = handler;
  app.use = (arg1, arg2, arg3) => use(app, arg1, arg2, arg3);
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    arg1.forEach((i) => use(app, i, arg2, arg3));
  } else if (Array.isArray(arg2)) {
    arg2.forEach((i) => use(app, arg1, i, arg3));
  } else if (typeof arg1 === "string") {
    app.stack.push(normalizeLayer({ ...arg3, route: arg1, handler: arg2 }));
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, route: "/", handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.req.originalUrl = event.req.originalUrl || event.req.url || "/";
    const reqUrl = event.req.url || "/";
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!reqUrl.startsWith(layer.route)) {
          continue;
        }
        event.req.url = reqUrl.slice(layer.route.length) || "/";
      } else {
        event.req.url = reqUrl;
      }
      if (layer.match && !layer.match(event.req.url, event)) {
        continue;
      }
      const val = await layer.handler(event);
      if (event.res.writableEnded) {
        return;
      }
      const type = typeof val;
      if (type === "string") {
        return send(event, val, MIMES.html);
      } else if (isStream(val)) {
        return sendStream(event, val);
      } else if (val === null) {
        event.res.statusCode = 204;
        return send(event);
      } else if (type === "object" || type === "boolean" || type === "number") {
        if (val.buffer) {
          return send(event, val);
        } else if (val instanceof Error) {
          throw createError(val);
        } else {
          return send(event, JSON.stringify(val, null, spacing), MIMES.json);
        }
      }
    }
    if (!event.res.writableEnded) {
      throw createError({ statusCode: 404, statusMessage: "Not Found" });
    }
  });
}
function normalizeLayer(input) {
  let handler = input.handler || input.handle;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}

const RouterMethods = ["connect", "delete", "get", "head", "options", "post", "put", "trace", "patch"];
function createRouter() {
  const _router = createRouter$1({});
  const routes = {};
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      method.forEach((m) => addRoute(path, handler, m));
    } else {
      route.handlers[method] = toEventHandler(handler);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  router.handler = eventHandler((event) => {
    let path = event.req.url || "/";
    const queryUrlIndex = path.lastIndexOf("?");
    if (queryUrlIndex > -1) {
      path = path.substring(0, queryUrlIndex);
    }
    const matched = _router.lookup(path);
    if (!matched) {
      throw createError({
        statusCode: 404,
        name: "Not Found",
        statusMessage: `Cannot find any route matching ${event.req.url || "/"}.`
      });
    }
    const method = (event.req.method || "get").toLowerCase();
    const handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      throw createError({
        statusCode: 405,
        name: "Method Not Allowed",
        statusMessage: `Method ${method} is not allowed on this route.`
      });
    }
    const params = matched.params || {};
    event.event.context.params = params;
    event.req.context.params = params;
    return handler(event);
  });
  return router;
}

const _runtimeConfig = {"app":{"baseURL":"/"},"nitro":{"routes":{"./":{"redirect":"https://www.baidu.com"}}}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
function timingMiddleware(_req, res, next) {
  const start = globalTiming.start();
  const _end = res.end;
  res.end = (data, encoding, callback) => {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!res.headersSent) {
      res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(res, data, encoding, callback);
  };
  next();
}

const serverAssets = [{"baseName":"server","dir":"/Users/yuyin/i/steam-card/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir }));
}

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/yuyin/i/steam-card","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/yuyin/i/steam-card","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/yuyin/i/steam-card/.nitro","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/yuyin/i/steam-card/.nitro/cache","ignore":["**/node_modules/**","**/.git/**"]}));

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl;
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event);
    const headers = event.res.getHeaders();
    headers.Etag = `W/"${hash(body)}"`;
    headers["Last-Modified"] = new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["Cache-Control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["Last-Modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(req, header, includes) {
  const value = req.headers[header];
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event.req, "accept", "application/json") || hasReqHeader(event.req, "user-agent", "curl/") || hasReqHeader(event.req, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Route Not Found" : "Internal Server Error");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const isDev = "development" === "development";
const errorHandler = (function(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const showDetails = isDev && statusCode !== 404;
  const errorObject = {
    url: event.req.url || "",
    statusCode,
    statusMessage,
    message,
    stack: showDetails ? stack.map((i) => i.text) : void 0
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nitro]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]"
    ].filter(Boolean).join(" ");
    console.error(tags, error.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  event.res.statusCode = statusCode;
  event.res.statusMessage = statusMessage;
  if (isJsonRequest(event)) {
    event.res.setHeader("Content-Type", "application/json");
    event.res.end(JSON.stringify(errorObject));
  } else {
    event.res.setHeader("Content-Type", "text/html");
    event.res.end(renderHTMLError(errorObject));
  }
});
function renderHTMLError(error) {
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "server";
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${statusCode} ${statusMessage}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico/css/pico.min.css">
  </head>
  <body>
    <main class="container">
      <dialog open>
        <article>
          <header>
            <h2>${statusCode} ${statusMessage}</h2>
          </header>
          <code>
            ${error.message}<br><br>
            ${"\n" + (error.stack || []).map((i) => `&nbsp;&nbsp;${i}`).join("<br>")}
          </code>
          <footer>
            <a href="/" onclick="event.preventDefault();history.back();">Go Back</a>
          </footer>
        </article>
      </dialog>
    </main>
  </body>
</html>
`;
}

const _lazy_EYYHkv = () => Promise.resolve().then(function () { return card$1; });
const _lazy_ZJkHSC = () => Promise.resolve().then(function () { return index$1; });

const handlers = [
  { route: '/api/card', handler: _lazy_EYYHkv, lazy: true, middleware: false, method: undefined },
  { route: '/card/:steamid/:settings', handler: _lazy_ZJkHSC, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(true),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter();
  const routerOptions = createRouter$1({ routes: config.nitro.routes });
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    const referenceRoute = h.route.replace(/:\w+|\*\*/g, "_");
    const routeOptions = routerOptions.lookup(referenceRoute) || {};
    if (routeOptions.swr) {
      handler = cachedEventHandler(handler, {
        group: "nitro/routes"
      });
    }
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(h3App.nodeHandler);
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();

const server = new Server(nitroApp.h3App.nodeHandler);
function getAddress() {
  if (provider === "stackblitz" || process.env.NITRO_NO_UNIX_SOCKET) {
    return "0";
  }
  const socketName = `worker-${process.pid}-${threadId}.sock`;
  if (isWindows) {
    return join("\\\\.\\pipe\\nitro", socketName);
  } else {
    const socketDir = join(tmpdir(), "nitro");
    mkdirSync(socketDir, { recursive: true });
    return join(socketDir, socketName);
  }
}
const listenAddress = getAddress();
server.listen(listenAddress, () => {
  const _address = server.address();
  parentPort.postMessage({
    event: "listen",
    address: typeof _address === "string" ? { socketPath: _address } : { host: "localhost", port: _address.port }
  });
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection]", err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException]", err));
}

const agent = tunnel.httpOverHttp({
  proxy: {
    host: process.env.PROXY_HOST,
    port: Number(process.env.PROXY_PORT)
  }
});
const instance = axios.create({
  baseURL: "https://api.steampowered.com",
  httpsAgent: process.env.MODE === "development" ? agent : false
});
instance.interceptors.response.use((response) => {
  return response;
}, (err) => {
  var _a;
  if (((_a = err.response) == null ? void 0 : _a.status) === 404 && err.response.request.host === "steamcdn-a.akamaihd.net")
    return err;
  else
    return Promise.reject(err);
});
const request = async (config) => {
  try {
    const { data } = await instance.request(config);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
const request$1 = request;

const getPlayerSummaries = (params) => {
  return request$1({
    url: "/ISteamUser/GetPlayerSummaries/v0002/",
    params
  });
};
const getRecentlyPlayedGames = (params) => {
  return request$1({
    url: "/IPlayerService/GetRecentlyPlayedGames/v0001/",
    params
  });
};
const getBadges = (params) => {
  return request$1({
    url: "/IPlayerService/GetBadges/v1/",
    params
  });
};
const getImage = (url) => {
  return request$1({
    url,
    responseType: "arraybuffer"
  });
};
const getSteamProfile = (id) => {
  return request$1({
    url: `https://steamcommunity.com/profiles/${id}/`,
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36"
    }
  });
};

const themes = {
  "dark": {
    bg_color: "#1B2838",
    text_color: "white",
    online_color: "#10B981",
    offline_color: "white"
  },
  "light": {
    bg_color: "#f7f7f7",
    text_color: "#363636",
    online_color: "#10B981",
    offline_color: "#363636"
  },
  "radical": {
    bg_color: "#141321",
    text_color: "#a9fef7",
    online_color: "#10B981",
    offline_color: "#a9fef7"
  },
  "tokyonight": {
    text_color: "#38bdae",
    bg_color: "#1a1b27",
    online_color: "#10B981",
    offline_color: "#1a1b27"
  },
  "solarized-light": {
    text_color: "#859900",
    bg_color: "#fdf6e3",
    online_color: "#10B981",
    offline_color: "#fdf6e3"
  },
  "ocean-dark": {
    text_color: "#92D534",
    bg_color: "#151A28",
    online_color: "#10B981",
    offline_color: "#151A28"
  }
};

class Card {
  constructor({
    name,
    avatarUrlBase64,
    playerLevel,
    isOnline,
    gameImgList,
    theme,
    bgColor,
    textColor,
    playTime,
    groupIconList,
    badgeIcon,
    i18n,
    counts
  }) {
    this.name = "";
    this.avatarUrlBase64 = "";
    this.playerLevel = 0;
    this.gamesSvg = "";
    this.gameImgList = [];
    this.groupIconList = [];
    this.groupSvg = "";
    this.badgeIcon = "";
    this.badgeSvg = "";
    this.theme = "dark";
    this.bgColor = "";
    this.textColor = "";
    this.playTime = 0;
    this.style = {
      bgColor: "",
      borderColor: "",
      fontColor: "",
      onlineColor: "",
      offlineColor: ""
    };
    this.isOnline = 0;
    this.onlineSvg = "";
    this.countSvg = "";
    this.name = name;
    this.avatarUrlBase64 = avatarUrlBase64;
    this.playerLevel = playerLevel;
    this.isOnline = isOnline;
    this.gameImgList = gameImgList;
    this.theme = theme;
    this.playTime = playTime;
    this.groupIconList = groupIconList;
    this.badgeIcon = badgeIcon;
    this.i18n = i18n;
    this.counts = counts;
    this.bgColor = bgColor;
    this.textColor = textColor;
  }
  setStyle() {
    const { bg_color, text_color, online_color, offline_color } = themes[this.theme];
    this.style.bgColor = this.bgColor || bg_color;
    this.style.fontColor = this.textColor || text_color;
    this.style.onlineColor = online_color;
    this.style.offlineColor = offline_color;
  }
  updateIsOnline() {
    let onlineText = "";
    let onlineClassName = "";
    if (this.isOnline > 0) {
      onlineText = this.i18n.__("online");
      onlineClassName = "online";
    } else {
      onlineText = this.i18n.__("offline");
      onlineClassName = "offline";
    }
    this.onlineSvg = `<span class="${onlineClassName}">${onlineText}</span>`;
  }
  renderGames() {
    let gamesSvg = "";
    this.gameImgList.forEach((game) => {
      gamesSvg += `
      <img width="70" height="33" src="${game}"></img>
      `;
    });
    this.gamesSvg = gamesSvg;
  }
  renderGroup() {
    let groupSvg = "";
    this.groupIconList.forEach((group) => {
      groupSvg += `
        <img width="35" height="35" src="${group}"></img>
      `;
    });
    this.groupSvg = groupSvg;
  }
  renderBadge() {
    this.badgeSvg = `
      <img height="35" width="35" src="${this.badgeIcon}" />
    `;
  }
  renderCounts() {
    this.counts.forEach((count) => {
      this.countSvg += `
        <div class="count-item">
          <div class="count">${count.count}</div>
          <div class="name">${count.name}</div>
        </div>
      `;
    });
  }
  render() {
    return `
    <svg width="400" height="150" xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns="http://www.w3.org/2000/svg">
    <style>
        .foregin{
        background-color: ${this.style.bgColor};
        padding:10px;
        width:400px;
        height:150px;
        border-radius:5px;
        font-family: "SimHei";
        }
        
        .card {
        color: ${this.style.fontColor};
        font-size:14px;
        height:130px;
        width:380px;
        gap:10px;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        }

        .online {
        color: ${this.style.onlineColor};
        }

        .offline {
        color: ${this.style.offlineColor};
        }
        
        .top {
        display: flex;
        justify-content: space-between;
        }
        
        .avatar {
        border-radius: 5px;
        }
        
        .user-info {
        display: flex;
        gap:10px;
        }
        
        .status {
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        }
        
        .counts {
        font-size:12px;
        display:flex;
        gap:20px;
        }
  
        .count-item {
        display:flex;
        flex-direction: column;
        align-items: center;
        }
  
        .game-list {
        display:flex;
        gap:8px;
        }
  
        .icon-list {
          position: absolute;
          right: 7px;
          top: 50px;
          display: flex;
          gap: 10px;
        }
    </style>
    <foreignObject class="foregin">
      <div class="card"
        xmlns="http://www.w3.org/1999/xhtml">
        <div class="top">
          <div class="user-info">
            <img class="avatar" src="${this.avatarUrlBase64}" width="60" height="60" />
            <div class="status">
              <div style="font-size:12px;font-weight:bold">
                  ${this.name}
              </div>
              <div style="font-size:12px;font-weight:bold">
                  LV. ${this.playerLevel}
              </div>
              <div style="font-size:12px;font-weight:bold">
                  ${this.onlineSvg}
              </div>
            </div>
          </div>
          <div class="counts">
              ${this.countSvg}
          </div>
        </div>
  
        <div class="bottom">
          <div style="font-size:12px;margin-bottom:5px">
              ${this.playTime} ${this.i18n.__("hours")} (${this.i18n.__("past_2_weeks")})
          </div>
          <div class="game-list">
              ${this.gamesSvg}
          </div>
        </div>
  
        <div class="icon-list">
            ${this.groupSvg}
            ${this.badgeSvg}
        </div>
      </div>
    </foreignObject>
  </svg>  
`;
  }
}
const Card$1 = Card;

const steamCard = (name, avatarUrlBase64, playerLevel, isOnline, gameImgList, theme, isBadge, isGroup, bgColor, textColor, playTime, groupIconList, badgeIcon, i18n, counts) => {
  const card = new Card$1({
    name,
    avatarUrlBase64,
    playerLevel,
    isOnline,
    gameImgList,
    theme,
    bgColor,
    textColor,
    playTime,
    groupIconList,
    badgeIcon,
    i18n,
    counts
  });
  card.updateIsOnline();
  card.setStyle();
  card.renderGames();
  card.renderCounts();
  if (isGroup)
    card.renderGroup();
  if (isBadge)
    card.renderBadge();
  return card.render();
};

const imageUrl2Base64 = async (url) => {
  const image = await getImage(url);
  if (image) {
    const _base64 = Buffer.from(image).toString("base64");
    return _base64;
  }
  return "";
};

const errorCard = (errMsg, i18n) => {
  return `
    <svg width="400" height="140" xmlns="http://www.w3.org/2000/svg">
      <rect fill="#F3F4F6" rx="4.5" stroke="#e4e2e2" stroke-opacity="1" width="100%" height="100%"></rect>
      <text x="10" y="50" text-anchor="start" fill="red">
        ${i18n.__("error-info")}
      </text>
      <text x="10" y="80" fill="red" font-size="10">
        ${errMsg}
      </text>
    </svg>
  `;
};
const errorCard$1 = errorCard;

function crawler(html) {
  const $ = load(html);
  let gameCount = "0";
  let screenshotCount = "0";
  let artWorkCount = "0";
  let reviewCount = "0";
  let guideCount = "0";
  const groupIconList = [];
  $(".profile_group_links").children().last().children().each((i, el) => {
    const groupIconUrl = $(el).children().first().children().children().attr("src");
    groupIconList.unshift(groupIconUrl);
  });
  let groupCount = $(".profile_group_links").children().first().children().find(".profile_count_link_total").text();
  groupCount = groupCount.toString().replaceAll("\n", "").replaceAll("	", "");
  const badgeIconUrl = $(".favorite_badge_icon").children().attr("src");
  $(".profile_item_links").children().each((i, el) => {
    const itemName = $(el).children().find(".count_link_label").text();
    let itemCount = $(el).children().find(".profile_count_link_total").text();
    itemCount = itemCount.toString().replaceAll("\n", "").replaceAll("	", "");
    if (itemName === "Games")
      gameCount = itemCount;
    if (itemName === "Screenshots")
      screenshotCount = itemCount;
    if (itemName === "Artwork")
      artWorkCount = itemCount;
    if (itemName === "Reviews")
      reviewCount = itemCount;
    if (itemName === "Guides")
      guideCount = itemCount;
  });
  return {
    gameCount,
    groupCount,
    badgeIconUrl,
    groupIconList,
    screenshotCount,
    artWorkCount,
    reviewCount,
    guideCount
  };
}

const blockApps = [
  1060360,
  1111370,
  1171700,
  1203660,
  1234060,
  1248060,
  1265e3,
  1302750,
  1304390,
  1314250,
  1352740,
  1449250,
  1574190,
  1594990,
  1700250,
  1702550,
  1731360,
  1835840,
  724370,
  1315160,
  1447430,
  1574750,
  1831250,
  1109130,
  1248820,
  1330430,
  1519010,
  1519140,
  1753100,
  1809540,
  1819020,
  339350,
  740790,
  936790,
  1936790,
  1189100,
  1345760,
  986680,
  271590,
  1238860,
  236850,
  42960,
  603850,
  1124300,
  936790,
  246620,
  555220,
  1034140,
  644560,
  1600370,
  733790,
  740790,
  1570070,
  1239020,
  1582680,
  1049890,
  381210,
  1866180,
  1354760,
  63957,
  223100,
  1954750,
  1220140
];

function data(userInfo, playedGames, badges) {
  const { avatarfull: avatarUrl, personaname: name, personastate: isOnline } = userInfo;
  const _name = name.replaceAll("<", "&lt;");
  let playTime = 0;
  let games = playedGames.response.games || [];
  const badgeCount = badges.response.badges.length;
  const playerLevel = badges.response.player_level;
  games.forEach((game) => {
    playTime += game.playtime_2weeks;
  });
  playTime = parseInt(String(playTime / 60), 10);
  games = games.filter((game) => !blockApps.includes(game.appid));
  games.splice(5, games.length - 5);
  return { games, playTime, badgeCount, playerLevel, avatarUrl, name: _name, isOnline };
}

function setting(_setting) {
  const setting2 = {
    theme: "dark",
    group: false,
    badge: false,
    lang: "zh-CN",
    counts: [],
    textColor: "",
    bgColor: ""
  };
  const textReg = /text-([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/;
  const bgReg = /bg-([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/;
  const countsSet = /* @__PURE__ */ new Set();
  if (_setting) {
    const settings = _setting.split(",");
    settings.forEach((item) => {
      switch (item) {
        case "dark":
          setting2.theme = "dark";
          break;
        case "light":
          setting2.theme = "light";
          break;
        case "tokyonight":
          setting2.theme = "tokyonight";
          break;
        case "radical":
          setting2.theme = "radical";
          break;
        case "solarized-light":
          setting2.theme = "solarized-light";
          break;
        case "ocean-dark":
          setting2.theme = "ocean-dark";
          break;
        case (item.match(textReg) || {}).input:
          setting2.textColor = `#${item.split("-")[1]}`;
          break;
        case (item.match(bgReg) || {}).input:
          setting2.bgColor = `#${item.split("-")[1]}`;
          break;
        case "group":
          setting2.group = true;
          break;
        case "badge":
          setting2.badge = true;
          break;
        case "zh-CN":
          setting2.lang = "zh-CN";
          break;
        case "en":
          setting2.lang = "en";
          break;
        case "games":
          countsSet.add("games");
          break;
        case "groups":
          countsSet.add("groups");
          break;
        case "badges":
          countsSet.add("badges");
          break;
        case "screenshots":
          countsSet.add("screenshots");
          break;
        case "artworks":
          countsSet.add("artworks");
          break;
        case "reviews":
          countsSet.add("reviews");
          break;
        case "guides":
          countsSet.add("guides");
          break;
      }
    });
  }
  ["games", "groups", "badges"].forEach((item) => {
    countsSet.add(item);
  });
  const counts = Array.from(countsSet);
  if (counts.length > 3)
    counts.splice(3, counts.length - 3);
  setting2.counts = counts;
  return {
    setting: setting2
  };
}

const key$1 = process.env.STEAM_KEY;
const JPEG_PREFIX$1 = "data:image/jpeg;base64,";
const PNG_PREFIX$1 = "data:image/png;base64,";
const card = async (req, res) => {
  var _a;
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", `public, max-age=${3600 * 24}`);
  try {
    let { steamid, settings } = req.query;
    const { setting: _setting } = setting(settings);
    i18n.configure({
      locales: ["en", "zh-CN"],
      directory: path.join(__dirname, "../locales")
    });
    i18n.setLocale(_setting.lang);
    const numberReg = /[A-Za-z]/;
    if (steamid.match(numberReg) !== null)
      res.send(errorCard$1(i18n.__("invalid_steamid"), i18n));
    const AllData = await Promise.all([
      getPlayerSummaries({ key: key$1, steamids: steamid }),
      getRecentlyPlayedGames({
        format: "json",
        steamid,
        key: key$1,
        count: 0
      }),
      getSteamProfile(steamid),
      getBadges({ key: key$1, steamid })
    ]);
    const [player, playedGames, profile, badges] = AllData;
    const {
      gameCount,
      groupCount,
      badgeIconUrl,
      groupIconList,
      screenshotCount,
      artWorkCount,
      reviewCount,
      guideCount
    } = crawler(profile);
    const { games, playTime, badgeCount, playerLevel, avatarUrl, name, isOnline } = data((_a = player == null ? void 0 : player.response) == null ? void 0 : _a.players[0], playedGames, badges);
    let badgeIcon = await imageUrl2Base64(badgeIconUrl);
    let avatarUrlBase64 = await imageUrl2Base64(avatarUrl);
    badgeIcon = PNG_PREFIX$1 + badgeIcon;
    avatarUrlBase64 = avatarUrlBase64 ? JPEG_PREFIX$1 + avatarUrlBase64 : "";
    for (let i = 0; i < groupIconList.length; i++) {
      groupIconList[i] = await imageUrl2Base64(groupIconList[i]);
      groupIconList[i] = JPEG_PREFIX$1 + groupIconList[i];
    }
    for (let i = 0; i < games.length; i++) {
      const url = `https://steamcdn-a.akamaihd.net/steam/apps/${games[i].appid}/header.jpg`;
      games[i] = await imageUrl2Base64(url);
      games[i] = JPEG_PREFIX$1 + games[i];
    }
    const counts = [];
    _setting.counts.forEach((item) => {
      switch (item) {
        case "games":
          counts.push({
            name: i18n.__("games"),
            count: gameCount
          });
          break;
        case "screenshots":
          counts.push({
            name: i18n.__("screenshots"),
            count: screenshotCount
          });
          break;
        case "artworks":
          counts.push({
            name: i18n.__("artworks"),
            count: artWorkCount
          });
          break;
        case "reviews":
          counts.push({
            name: i18n.__("reviews"),
            count: reviewCount
          });
          break;
        case "guides":
          counts.push({
            name: i18n.__("guides"),
            count: guideCount
          });
          break;
        case "groups":
          counts.push({
            name: i18n.__("groups"),
            count: groupCount
          });
          break;
        case "badges":
          counts.push({
            name: i18n.__("badges"),
            count: badgeCount
          });
          break;
      }
    });
    res.send(
      steamCard(
        name,
        avatarUrlBase64,
        playerLevel,
        isOnline,
        games,
        _setting.theme,
        _setting.badge,
        _setting.group,
        _setting.bgColor,
        _setting.textColor,
        playTime,
        groupIconList,
        badgeIcon,
        i18n,
        counts
      )
    );
  } catch (error) {
    console.log("\u{1F680} ~ file: card.ts ~ line 177 ~ async ~ error", error);
    res.send(errorCard$1(error, i18n));
  }
};

const card$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': card
});

const key = process.env.STEAM_KEY;
const JPEG_PREFIX = "data:image/jpeg;base64,";
const PNG_PREFIX = "data:image/png;base64,";
const __filename = fileURLToPath(globalThis._importMeta_.url);
const __dirname$1 = path.dirname(__filename);
const index = eventHandler(async (event) => {
  var _a;
  setHeader(event, "Content-Type", "image/svg+xml");
  setHeader(event, "Cache-Control", `public, max-age=${3600 * 24}`);
  try {
    const { steamid, settings } = event.context.params;
    const { setting: _setting } = setting(settings);
    i18n.configure({
      locales: ["en", "zh-CN"],
      directory: path.join(__dirname$1, "../../../../locales")
    });
    i18n.setLocale(_setting.lang);
    const numberReg = /[A-Za-z]/;
    if (steamid.match(numberReg) !== null)
      return errorCard$1(i18n.__("invalid_steamid"), i18n);
    const AllData = await Promise.all([
      getPlayerSummaries({ key, steamids: steamid }),
      getRecentlyPlayedGames({
        format: "json",
        steamid,
        key,
        count: 0
      }),
      getSteamProfile(steamid),
      getBadges({ key, steamid })
    ]);
    const [player, playedGames, profile, badges] = AllData;
    const {
      gameCount,
      groupCount,
      badgeIconUrl,
      groupIconList,
      screenshotCount,
      artWorkCount,
      reviewCount,
      guideCount
    } = crawler(profile);
    const { games, playTime, badgeCount, playerLevel, avatarUrl, name, isOnline } = data((_a = player == null ? void 0 : player.response) == null ? void 0 : _a.players[0], playedGames, badges);
    let badgeIcon = await imageUrl2Base64(badgeIconUrl);
    let avatarUrlBase64 = await imageUrl2Base64(avatarUrl);
    badgeIcon = PNG_PREFIX + badgeIcon;
    avatarUrlBase64 = avatarUrlBase64 ? JPEG_PREFIX + avatarUrlBase64 : "";
    for (let i = 0; i < groupIconList.length; i++) {
      groupIconList[i] = await imageUrl2Base64(groupIconList[i]);
      groupIconList[i] = JPEG_PREFIX + groupIconList[i];
    }
    for (let i = 0; i < games.length; i++) {
      const url = `https://steamcdn-a.akamaihd.net/steam/apps/${games[i].appid}/header.jpg`;
      games[i] = await imageUrl2Base64(url);
      games[i] = JPEG_PREFIX + games[i];
    }
    const counts = [];
    _setting.counts.forEach((item) => {
      switch (item) {
        case "games":
          counts.push({
            name: i18n.__("games"),
            count: gameCount
          });
          break;
        case "screenshots":
          counts.push({
            name: i18n.__("screenshots"),
            count: screenshotCount
          });
          break;
        case "artworks":
          counts.push({
            name: i18n.__("artworks"),
            count: artWorkCount
          });
          break;
        case "reviews":
          counts.push({
            name: i18n.__("reviews"),
            count: reviewCount
          });
          break;
        case "guides":
          counts.push({
            name: i18n.__("guides"),
            count: guideCount
          });
          break;
        case "groups":
          counts.push({
            name: i18n.__("groups"),
            count: groupCount
          });
          break;
        case "badges":
          counts.push({
            name: i18n.__("badges"),
            count: badgeCount
          });
          break;
      }
    });
    return steamCard(
      name,
      avatarUrlBase64,
      playerLevel,
      isOnline,
      games,
      _setting.theme,
      _setting.badge,
      _setting.group,
      _setting.bgColor,
      _setting.textColor,
      playTime,
      groupIconList,
      badgeIcon,
      i18n,
      counts
    );
  } catch (error) {
    console.log("\u{1F680} ~ file: card.ts ~ line 177 ~ async ~ error", error);
    return "error";
  }
});

const index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': index
});
//# sourceMappingURL=index.mjs.map
